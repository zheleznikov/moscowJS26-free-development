# Презентация

Презентация на [Shower](https://shwr.me/). Каждый слайд лежит в своей папке в `slides/`, контент — в `index.html` внутри папки.

## Запуск

```bash
npm install
npm run serve
```

Откроется браузер с презентацией на http://localhost:8080. При изменении файлов страница автоматически обновляется (live reload). Остановить сервер: Ctrl+C.

## Команды

| Команда | Описание |
|--------|----------|
| `npm run serve` | Запуск с автообновлением при изменениях (live reload) |
| `npm run serve:no-browser` | То же, но без автоматического открытия браузера |
| `npm run serve:shower` | То же, что `serve` (альтернатива прежней команде shower) |
| `npm run serve:static` | Простой сервер без live reload |
| `npm run pdf` | Экспорт в PDF (запускается локальный сервер, чтобы слайды подгрузились; для другого имени файла: `npm run pdf -- -o имя.pdf`) |
| `npm run archive` | Собрать архив презентации |
| `npm run publish` | Опубликовать на GitHub Pages |

## GitHub Pages

1. Создайте репозиторий на GitHub и привяжите его к проекту:
   ```bash
   git remote add origin https://github.com/ВАШ_USERNAME/ВАШ_РЕПОЗИТОРИЙ.git
   ```

2. Опубликуйте презентацию:
   ```bash
   npm run publish
   ```
   Команда соберёт проект, создаст/обновит ветку `gh-pages` и запушит её в GitHub.

3. В настройках репозитория на GitHub: **Settings → Pages** — источник должен быть **Deploy from a branch**; ветка **gh-pages**, папка **/ (root)**. Обычно GitHub подхватывает это сам после первого пуша в `gh-pages`.

4. Сайт будет доступен по адресу:  
   `https://ВАШ_USERNAME.github.io/ВАШ_РЕПОЗИТОРИЙ/`

## Структура слайдов

```
slides/
  01-title/
    index.html    ← первый слайд
  02-text-list/
    index.html    ← второй слайд
  03-columns/
    index.html
  ...
```

## Как добавлять слайды

1. Создайте папку в `slides/`, например `slides/05-mой-слайд/`.
2. Внутри создайте `index.html` с одним блоком `<section class="slide">`:

```html
<section class="slide">
    <h2>Заголовок слайда</h2>
    <p>Текст, списки, код — любой HTML.</p>
</section>
```

3. Добавьте имя папки в массив `slides` в `config.js` (в том порядке, в каком слайд должен идти).

Классы Shower:
- `columns two` — две колонки
- `next` — показывать элемент по клику
- `note` — заметка для спикера (видна в режиме списка)

Тема: **Ribbon** (указана в `index.html`).

## Цветовая тема (theme.js)

В файле `theme.js` задаётся визуальная тема презентации. Можно настроить:

- **page** — общий фон страницы в режиме списка слайдов (по умолчанию серый `#585a5e` из Shower): `background`
- **slide** — фон и цвета текста для полноэкранных слайдов: `background`, `text`, `heading`, `link`, `codeBackground`, `codeText`, `preBackground`
- **card** — то же для карточек в режиме списка плюс `activeBorder` (рамка активной карточки)
- **ribbon** — флажок с номером слайда: `icon` (путь к SVG, например `assets/ribbon-js.svg`), `textColor`
- **progress** — полоска прогресса внизу: `track`, `fill` (цвет или градиент)
- **placeholder** — текст «Загрузка…»: `textColor`
- **caption** — блок заголовка над слайдами: `background`, `textColor`

Измените значения в `theme.js` и перезагрузите страницу — стили подхватятся автоматически.
