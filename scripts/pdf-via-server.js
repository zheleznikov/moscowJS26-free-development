#!/usr/bin/env node
/**
 * Генерация PDF через локальный HTTP-сервер, чтобы fetch() слайдов работал.
 * Стандартная команда "shower pdf" открывает file://, из-за чего fetch блокируется и на слайдах остаётся "Ошибка загрузки".
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const http = require('http');

const cwd = process.cwd();
const port = 8080;
const output = process.argv.includes('-o') ? process.argv[process.argv.indexOf('-o') + 1] : path.join(cwd, 'index.pdf');

// Подключаем puppeteer-core и chrome-launcher из @shower/cli
const cliDir = path.dirname(require.resolve('@shower/cli/package.json'));
const puppeteer = require(require.resolve('puppeteer-core', { paths: [path.join(cliDir, 'node_modules')] }));
const { getPlatform } = require(require.resolve('chrome-launcher/dist/utils.js', { paths: [path.join(cliDir, 'node_modules')] }));
const chromeFinder = require(require.resolve('chrome-launcher/dist/chrome-finder.js', { paths: [path.join(cliDir, 'node_modules')] }));

function evalCalcExpression(value) {
  const expression = (value || '960px').replace(/calc/g, '').replace(/px/g, '');
  return eval(expression) + 'px';
}

function waitForServer(url, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const tryRequest = () => {
      attempts++;
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (attempts >= maxAttempts) return reject(new Error('Server did not start'));
        setTimeout(tryRequest, 500);
      });
      req.setTimeout(2000, () => {
        req.destroy();
        if (attempts >= maxAttempts) return reject(new Error('Server timeout'));
        setTimeout(tryRequest, 500);
      });
    };
    tryRequest();
  });
}

async function main() {
  const serveDir = path.dirname(require.resolve('serve/package.json'));
  const serveBin = path.join(serveDir, 'build/main.js');
  const serverProcess = spawn(process.execPath, [serveBin, '.', '-p', String(port)], {
    cwd,
    stdio: 'pipe',
    shell: true,
  });

  let serverKilledByUs = false;
  serverProcess.on('exit', (code) => {
    if (!serverKilledByUs && code !== 0 && code !== null) console.error('Сервер завершился с кодом', code);
  });

  try {
    await waitForServer(`http://127.0.0.1:${port}`);
  } catch (e) {
    serverProcess.kill();
    console.error('Не удалось запустить сервер на порту', port, e.message);
    process.exit(1);
  }

  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (await chromeFinder[getPlatform()]())[0];
  if (!executablePath) {
    serverProcess.kill();
    console.error('Chrome не найден. Установите Chrome или задайте PUPPETEER_EXECUTABLE_PATH.');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ executablePath });
  const page = await browser.newPage();

  try {
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (e) {
    await browser.close();
    serverProcess.kill();
    console.error('Не удалось открыть страницу:', e.message);
    process.exit(1);
  }

  // Ждём, пока все слайды загрузятся (исчезнет класс slide--loading)
  await page
    .waitForFunction(
      () => document.querySelectorAll('.slide--loading').length === 0,
      { timeout: 30000 }
    )
    .catch(() => {});

  const [width, height] = await page.evaluate(() => {
    const container = document.querySelector('.shower');
    if (!container) return ['960px', '540px'];
    const styles = window.getComputedStyle(container);
    return [
      styles.getPropertyValue('--slide-width') || '960px',
      styles.getPropertyValue('--slide-height') || '540px',
    ];
  });

  const dir = path.dirname(output);
  if (dir !== '.' && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  await page.pdf({
    path: output,
    width: evalCalcExpression(width),
    height: evalCalcExpression(height),
  });

  await browser.close();
  serverKilledByUs = true;
  serverProcess.kill();
  console.log('PDF сохранён:', output);
}

main().catch((err) => {
  if (err.code === 'EBUSY' && err.syscall === 'open') {
    console.error('Не удалось записать PDF: файл открыт в другой программе. Закройте', output, 'и запустите снова.');
  } else {
    console.error(err);
  }
  process.exit(1);
});
