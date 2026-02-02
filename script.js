// script.js — replace your existing file with this

// Read config from global exported by config.js
const config = window.VALENTINE_CONFIG || window.config || {};

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Basic required
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Colors validation
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    if (config.colors) {
        Object.entries(config.colors).forEach(([key, value]) => {
            if (!isValidHex(value)) {
                warnings.push(`Invalid color for ${key}! Using default.`);
                config.colors[key] = getDefaultColor(key);
            }
        });
    } else {
        config.colors = {
            backgroundStart: "#ffafbd",
            backgroundEnd: "#ffc3a0",
            buttonBackground: "#ff6b6b",
            buttonHover: "#ff8787",
            textColor: "#ff4757"
        };
    }

    // Animations
    if (!config.animations) config.animations = {};
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }
    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(w => console.warn("- " + w));
    }
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key] || "#ffffff";
}

// Helper to safely set textContent if element exists
function safeText(id, value) {
    const el = document.getElementById(id);
    if (el && typeof value !== 'undefined') el.textContent = value;
}

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Clean up any existing
    container.innerHTML = '';

    if (config.floatingEmojis && Array.isArray(config.floatingEmojis.hearts)) {
        config.floatingEmojis.hearts.forEach(heart => {
            const div = document.createElement('div');
            div.className = 'floating heart';
            div.innerHTML = heart;
            setRandomPosition(div);
            container.appendChild(div);
        });
    }

    if (config.floatingEmojis && Array.isArray(config.floatingEmojis.bears)) {
        config.floatingEmojis.bears.forEach(bear => {
            const div = document.createElement('div');
            div.className = 'floating bear';
            div.innerHTML = bear;
            setRandomPosition(div);
            container.appendChild(div);
        });
    }
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 80 + 'vh';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = (10 + Math.random() * 20) + 's';
}

// Show/hide question sections by number (1..4)
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const target = document.getElementById(`question${questionNumber}`);
    if (target) {
        target.classList.remove('hidden');

        // If we've shown question3, reset its no button transform so it's not off-screen
        if (questionNumber === 3) {
            const noBtn3 = document.getElementById('noBtn3');
            if (noBtn3) noBtn3.style.transform = '';
        }
    }
}

// Move button helper (used for older "moveButton(this)" calls)
function moveButton(button) {
    if (!button) return;
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter helpers
function setInitialPosition() {
    const loveMeterEl = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    if (loveMeterEl && loveValue) {
        loveMeterEl.value = 100;
        loveValue.textContent = 100;
    }
}

// Celebration
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    if (celebration) celebration.classList.remove('hidden');

    safeText('celebrationTitle', config.celebration.title);
    safeText('celebrationMessage', config.celebration.message);
    safeText('celebrationEmojis', config.celebration.emojis);

    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = (config.floatingEmojis && config.floatingEmojis.hearts)
            ? config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)]
            : '❤️';
        heart.innerHTML = randomHeart;
        heart.className = 'floating heart';
        setRandomPosition(heart);
        container.appendChild(heart);
    }
}

// Music player setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

    if (!config.music || !config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    musicSource.src = config.music.musicUrl || '';
    bgMusic.volume = typeof config.music.volume === 'number' ? config.music.volume : 0.5;
    bgMusic.load();

    // Try autoplay
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                musicToggle.textContent = config.music.startText || 'Play';
            });
        } else {
            musicToggle.textContent = config.music.startText || 'Play';
        }
    } else {
        musicToggle.textContent = config.music.startText || 'Play';
    }

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText || 'Stop';
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText || 'Play';
        }
    });
}

// Main DOM ready setup (single listener)
window.addEventListener('DOMContentLoaded', () => {
    // validate config
    validateConfig();

    // page title
    document.title = config.pageTitle || document.title;

    // populate UI texts safely
    safeText('valentineTitle', `${config.valentineName}, my love`);

    // Q1
    safeText('question1Text', (config.questions && config.questions.first) ? config.questions.first.text : '');
    safeText('yesBtn1', (config.questions && config.questions.first) ? config.questions.first.yesBtn : 'Yes');
    safeText('noBtn1', (config.questions && config.questions.first) ? config.questions.first.noBtn : 'No');
    safeText('secretAnswerBtn', (config.questions && config.questions.first) ? config.questions.first.secretAnswer : '');

    // Q2
    safeText('question2Text', (config.questions && config.questions.second) ? config.questions.second.text : '');
    safeText('startText', (config.questions && config.questions.second) ? config.questions.second.startText : '');
    safeText('nextBtn', (config.questions && config.questions.second) ? config.questions.second.nextBtn : 'Next');

    // Q3
    safeText('question3Text', (config.questions && config.questions.third) ? config.questions.third.text : '');
    safeText('yesBtn3', (config.questions && config.questions.third) ? (config.questions.third.yesBtn || config.questions.third.nextBtn) : 'Yes');
    safeText('noBtn3', (config.questions && config.questions.third) ? config.questions.third.noBtn : 'No');

    // Q4
    safeText('question4Text', (config.questions && config.questions.fourth) ? config.questions.fourth.text : '');
    safeText('yesBtn4', (config.questions && config.questions.fourth) ? config.questions.fourth.yesBtn : 'Yes');
    safeText('noBtn4', (config.questions && config.questions.fourth) ? config.questions.fourth.noBtn : 'No');

    // Floating elements and music
    createFloatingElements();
    setupMusicPlayer();

    // Q3 no button shake + dodge
    const noBtn3 = document.getElementById('noBtn3');
    if (noBtn3) {
        noBtn3.style.transition = 'transform 0.2s ease';
        const dodge = () => {
            // Limit travel so button remains visible
            const margin = 24;
            const maxX = Math.max(window.innerWidth - noBtn3.offsetWidth - margin, margin);
            const maxY = Math.max(window.innerHeight - noBtn3.offsetHeight - margin, margin);
            const x = (Math.random() * maxX) - (maxX / 2);
            const y = (Math.random() * maxY) - (maxY / 2);
            noBtn3.style.transform = `translate(${x}px, ${y}px)`;
        };

        noBtn3.addEventListener('mouseover', dodge);
        noBtn3.addEventListener('click', () => {
            noBtn3.classList.add('shake');
            setTimeout(() => {
                noBtn3.classList.remove('shake');
                dodge();
            }, 300);
        });
    }

    // Love meter wiring (only if present)
    const loveMeterEl = document.getElementById('loveMeter');
    const loveValueEl = document.getElementById('loveValue');
    const extraLoveEl = document.getElementById('extraLove');

    function updateLoveUI(value) {
        if (loveValueEl) loveValueEl.textContent = value;
        if (!extraLoveEl) return;

        if (value > 100) {
            extraLoveEl.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            if (loveMeterEl) loveMeterEl.style.width = `calc(100% + ${extraWidth}px)`;
            if (value >= 5000) {
                extraLoveEl.classList.add('super-love');
                extraLoveEl.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLoveEl.classList.remove('super-love');
                extraLoveEl.textContent = config.loveMessages.high;
            } else {
                extraLoveEl.classList.remove('super-love');
                extraLoveEl.textContent = config.loveMessages.normal;
            }
        } else {
            extraLoveEl.classList.add('hidden');
            extraLoveEl.classList.remove('super-love');
            if (loveMeterEl) loveMeterEl.style.width = '100%';
        }
    }

    if (loveMeterEl) {
        loveMeterEl.value = 100;
        updateLoveUI(100);
        loveMeterEl.addEventListener('input', () => {
            const value = parseInt(loveMeterEl.value, 10) || 0;
            updateLoveUI(value);
        });
    }

    // Initialize initial positions after everything
    setInitialPosition();
});
