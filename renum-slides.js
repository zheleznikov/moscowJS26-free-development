/**
 * Переименование слайдов: номер = порядковый номер в config.js
 * Запуск: node renum-slides.js
 */
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.js');
const slidesDir = path.join(__dirname, 'slides');

// Парсим config.js чтобы взять массив slides (без eval/require из-за window.)
const content = fs.readFileSync(configPath, 'utf8');
const match = content.match(/slides:\s*\[([\s\S]*?)\],?\s*}/);
if (!match) throw new Error('slides array not found');
const slidesStr = '[' + match[1] + ']';
// Убираем комментарии и получаем строки вида '01-title'
const slideIds = slidesStr
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\/\/[^\n]*/g, '')
  .split(',')
  .map(s => s.trim().replace(/^'|'$/g, ''))
  .filter(Boolean);

const renames = []; // { old, new }
const newSlides = slideIds.map((id, i) => {
  const pos = i + 1;
  const num = String(pos).padStart(2, '0');
  const rest = id.replace(/^\d+-/, '');
  const newId = num + '-' + rest;
  if (id !== newId) renames.push({ old: id, new: newId });
  return newId;
});

// 1. Обновляем config.js
const newSlidesLines = newSlides.map(s => `        '${s}'`).join(',\n');
const newContent = content.replace(
  /slides:\s*\[[\s\S]*?\],?\s*}/,
  'slides: [\n' + newSlidesLines + '\n    ],\n};'
);
fs.writeFileSync(configPath, newContent, 'utf8');
console.log('Updated config.js');

// 2. Переименование папок: сначала во временные имена, потом в целевые (чтобы не перезаписать)
const TEMP_PREFIX = '__renum_';
for (const { old: oldId, new: newId } of renames) {
  const oldPath = path.join(slidesDir, oldId);
  const tempPath = path.join(slidesDir, TEMP_PREFIX + oldId);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, tempPath);
    console.log('Temp:', oldId, '->', TEMP_PREFIX + oldId);
  }
}
for (const { old: oldId, new: newId } of renames) {
  const tempPath = path.join(slidesDir, TEMP_PREFIX + oldId);
  const newPath = path.join(slidesDir, newId);
  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, newPath);
    console.log('Final:', oldId, '->', newId);
  }
}

console.log('Done. Renamed', renames.length, 'folders.');
