/**
 * Конфиг стилей (тема) презентации.
 * Цвета и ресурсы применяются через CSS-переменные после загрузки страницы.
 */
window.PRESENTATION_THEME = {
    // Фон и текст слайдов в полноэкранном режиме
    slide: {
        background: '#000',
        text: '#e0e0e0',
        heading: 'linear-gradient(90deg, #b8b8b8, #fff)',
        link: '#7db8f0',
        codeBackground: 'rgba(255,255,255,0.1)',
        codeText: '#e0e0e0',
        preBackground: 'rgba(255,255,255,0.08)',
        listAccent: '#b8b8b8',
    },

    // Общий фон страницы (режим списка слайдов; по умолчанию — серый из Shower)
    page: {
        background: '#30343a',
    },

    // Карточки в режиме списка (можно задать свои цвета)
    card: {
        background: '#000',
        text: '#e0e0e0',
        heading: 'linear-gradient(90deg, #b8b8b8, #fff)',
        link: '#7db8f0',
        codeBackground: 'rgba(255,255,255,0.1)',
        codeText: '#e0e0e0',
        activeBorder: '#191c20',
    },

    // Флажок с номером слайда (угол слайда)
    ribbon: {
        icon: 'assets/ribbon-js.svg',
        textColor: '#323330',
    },

    // Полоска прогресса внизу экрана
    progress: {
        track: 'rgba(255, 255, 255, 0.15)',
        fill: 'linear-gradient(90deg, #f7df1e, #c9a227)',
    },

    // Текст плейсхолдера «Загрузка…»
    placeholder: {
        textColor: 'rgba(255, 255, 255, 0.5)',
    },

    // Фон области заголовка/капшена (над сеткой слайдов)
    caption: {
        background: 'transparent',
        textColor: '#fff',
    },
};
