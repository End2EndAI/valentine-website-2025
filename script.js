// Initialize configuration
const config = window.VALENTINE_CONFIG;

// ================= VALIDATION =================
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name not set. Using default.");
        config.valentineName = "Babygirl";
    }

    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            config.colors[key] = getDefaultColor(key);
        }
    });
}

function getDefaultColor(key) {
    return {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    }[key];
}

document.title = config.pageTitle;

// ================= DOM READY =================
window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // TEXTS
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

    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();   // ← CRITICAL FIX
});

// ================= FLOATING ELEMENTS =================
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears]
        .forEach(emoji => {
            const div = document.createElement('div');
            div.className = emoji === '🐻' || emoji === '🧸' ? 'bear' : 'heart';
            div.innerHTML = emoji;
            setRandomPosition(div);
            container.appendChild(div);
        });
}

function setRandomPosition(el) {
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDelay = Math.random() * 5 + 's';
    el.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// ================= QUESTIONS =================
function showNextQuestion(n) {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${n}`)
        .classList.remove('hidden');
}

function moveButton(btn) {
    btn.style.position = 'fixed';
    btn.style.left =
        Math.random() * (window.innerWidth - btn.offsetWidth) + 'px';
    btn.style.top =
        Math.random() * (window.innerHeight - btn.offsetHeight) + 'px';
}

// ================= LOVE METER (FIXED) =================
function setupLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    loveMeter.value = 100;
    loveValue.textContent = 100;

    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value <= 100) return;

        extraLove.classList.remove('hidden');

        if (value >= 6000) {
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value >= 2500) {
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.textContent = config.loveMessages.normal;
        }
    });
}

// ================= CELEBRATION =================
function celebrate() {
    document.querySelectorAll('.question-section')
        .forEach(q => q.classList.add('hidden'));

    document.getElementById('celebration').classList.remove('hidden');
    document.getElementById('celebrationTitle').textContent =
        config.celebration.title;
    document.getElementById('celebrationMessage').textContent =
        config.celebration.message;
    document.getElementById('celebrationEmojis').textContent =
        config.celebration.emojis;

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML =
            config.floatingEmojis.hearts[
                Math.floor(Math.random() *
                config.floatingEmojis.hearts.length)
            ];
        heart.className = 'heart';
        setRandomPosition(heart);
        document.querySelector('.floating-elements')
            .appendChild(heart);
    }
}

// ================= MUSIC =================
function setupMusicPlayer() {
    const toggle = document.getElementById('musicToggle');
    const music = document.getElementById('bgMusic');
    const source = document.getElementById('musicSource');

    if (!config.music.enabled) return;

    source.src = config.music.musicUrl;
    music.volume = config.music.volume || 0.5;
    music.load();

    if (config.music.autoplay) {
        music.play().catch(() => {});
    }

    toggle.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            toggle.textContent = config.music.stopText;
        } else {
            music.pause();
            toggle.textContent = config.music.startText;
        }
    });
}
