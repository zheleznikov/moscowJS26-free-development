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
        background: [
            'radial-gradient(ellipse 70% 70% at 15% 5%, rgba(60, 50, 120, 0.35), transparent 55%)',
            'radial-gradient(ellipse 65% 65% at 88% 45%, rgba(80, 40, 100, 0.3), transparent 50%)',
            'radial-gradient(ellipse 60% 60% at 20% 95%, rgba(40, 70, 120, 0.3), transparent 50%)',
            'radial-gradient(ellipse 55% 55% at 75% 15%, rgba(90, 50, 130, 0.25), transparent 50%)',
            '#12121a',
        ].join(', '),
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
