let config;

window.addEventListener('DOMContentLoaded', () => {
    config = window.VALENTINE_CONFIG;

    if (!config) {
        console.error("VALENTINE_CONFIG not found.");
        return;
    }

    initSite();
});

function initSite() {

    document.title = config.pageTitle;

    document.getElementById('valentineTitle').textContent =
        `${config.valentineName}, babygirl ...`;

    document.getElementById('question1Text').textContent =
        config.questions.first.text;
    document.getElementById('yesBtn1').textContent =
        config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent =
        config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent =
        config.questions.first.secretAnswer;

    document.getElementById('question2Text').textContent =
        config.questions.second.text;
    document.getElementById('startText').textContent =
        config.questions.second.startText;
    document.getElementById('nextBtn').textContent =
        config.questions.second.nextBtn;

    document.getElementById('question3Text').textContent =
        config.questions.third.text;
    document.getElementById('yesBtn3').textContent =
        config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent =
        config.questions.third.noBtn;

    setupLoveMeter();
    setupMusicPlayer();
}

function setupLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    loveMeter.value = 100;
    loveValue.textContent = 100;

    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value > 100) {
            extraLove.classList.remove('hidden');

            if (value >= 6000) {
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value >= 2500) {
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.textContent = config.loveMessages.normal;
            }
        }
    });
}

function showNextQuestion(n) {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${n}`)
        .classList.remove('hidden');
}

function moveButton(btn) {
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * window.innerWidth + 'px';
    btn.style.top = Math.random() * window.innerHeight + 'px';
}

function celebrate() {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));
    document.getElementById('celebration')
        .classList.remove('hidden');

    document.getElementById('celebrationTitle').textContent =
        config.celebration.title;
    document.getElementById('celebrationMessage').textContent =
        config.celebration.message;
    document.getElementById('celebrationEmojis').textContent =
        config.celebration.emojis;
}

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const source = document.getElementById('musicSource');

    if (!config.music.enabled) return;

    source.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;
    bgMusic.load();

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
