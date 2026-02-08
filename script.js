// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Set page title
document.title = config.pageTitle;

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Validate configuration
function validateConfig() {
    const warnings = [];

    if (!config.valentineName) {
        warnings.push("Valentine's name missing. Using default.");
        config.valentineName = "Babygirl";
    }

    const isValidHex = (hex) =>
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}. Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    if (warnings.length) {
        console.warn("⚠️ Config warnings:", warnings);
    }
}

// DOM Ready
window.addEventListener("DOMContentLoaded", () => {
    validateConfig();

    // Titles and buttons
    document.getElementById("valentineTitle").textContent =
        `${config.valentineName}, babygirl ...`;

    document.getElementById("question1Text").textContent =
        config.questions.first.text;
    document.getElementById("yesBtn1").textContent =
        config.questions.first.yesBtn;
    document.getElementById("noBtn1").textContent =
        config.questions.first.noBtn;
    document.getElementById("secretAnswerBtn").textContent =
        config.questions.first.secretAnswer;

    document.getElementById("question2Text").textContent =
        config.questions.second.text;
    document.getElementById("startText").textContent =
        config.questions.second.startText;
    document.getElementById("nextBtn").textContent =
        config.questions.second.nextBtn;

    document.getElementById("question3Text").textContent =
        config.questions.third.text;
    document.getElementById("yesBtn3").textContent =
        config.questions.third.yesBtn;
    document.getElementById("noBtn3").textContent =
        config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();
});

// Floating elements
function createFloatingElements() {
    const container = document.querySelector(".floating-elements");

    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(
        (emoji) => {
            const div = document.createElement("div");
            div.className = "heart";
            div.innerHTML = emoji;
            div.style.left = Math.random() * 100 + "vw";
            div.style.animationDelay = Math.random() * 5 + "s";
            div.style.animationDuration = 10 + Math.random() * 20 + "s";
            container.appendChild(div);
        }
    );
}

// Question flow
function showNextQuestion(n) {
    document
        .querySelectorAll(".question-section")
        .forEach((q) => q.classList.add("hidden"));
    document.getElementById(`question${n}`).classList.remove("hidden");
}

function moveButton(btn) {
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - btn.offsetWidth) + "px";
    btn.style.top = Math.random() * (window.innerHeight - btn.offsetHeight) + "px";
}

// ✅ LOVE METER (fixed)
function setupLoveMeter() {
    const loveMeter = document.getElementById("loveMeter");
    const loveValue = document.getElementById("loveValue");
    const extraLove = document.getElementById("extraLove");

    loveMeter.value = 100;
    loveValue.textContent = 100;

    loveMeter.addEventListener("input", () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;

        if (value > 100) {
            extraLove.classList.remove("hidden");

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

// Celebration
function celebrate() {
    document
        .querySelectorAll(".question-section")
        .forEach((q) => q.classList.add("hidden"));

    const c = document.getElementById("celebration");
    c.classList.remove("hidden");

    document.getElementById("celebrationTitle").textContent =
        config.celebration.title;
    document.getElementById("celebrationMessage").textContent =
        config.celebration.message;
    document.getElementById("celebrationEmojis").textContent =
        config.celebration.emojis;
}

// Music
function setupMusicPlayer() {
    const controls = document.getElementById("musicControls");
    const toggle = document.getElementById("musicToggle");
    const music = document.getElementById("bgMusic");
    const source = document.getElementById("musicSource");

    if (!config.music.enabled) {
        controls.style.display = "none";
        return;
    }

    source.src = config.music.musicUrl;
    music.volume = config.music.volume || 0.5;
    music.load();

    toggle.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            toggle.textContent = config.music.stopText;
        } else {
            music.pause();
            toggle.textContent = config.music.startText;
        }
    });
}
