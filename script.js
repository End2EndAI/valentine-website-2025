// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

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

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Setup Music Player (Common for both pages)
    setupMusicPlayer();

    // Create initial floating elements (Common for both pages)
    createFloatingElements();

    // Index Page Logic
    const valentineTitle = document.getElementById('valentineTitle');
    if (valentineTitle) {
        // Set texts from config
        valentineTitle.textContent = `${config.valentineName}, my love...`;

        // Set first question texts
        document.getElementById('question1Text').textContent = config.questions.first.text;
        document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
        document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
        document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;

        // Set second question texts
        document.getElementById('question2Text').textContent = config.questions.second.text;
        document.getElementById('startText').textContent = config.questions.second.startText;
        document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;

        // Set third question texts
        document.getElementById('question3Text').textContent = config.questions.third.text;
        document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
        document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

        // Setup gallery button on index page
        const galleryBtn = document.getElementById('galleryBtn');
        if (config.gallery && config.gallery.enabled) {
            galleryBtn.textContent = config.gallery.buttonText;
            galleryBtn.style.display = 'inline-block';
            galleryBtn.onclick = () => window.location.href = 'gallery.html';
        } else {
            galleryBtn.style.display = 'none';
        }
    }

    // Gallery Page Logic
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        const galleryTitle = document.getElementById('galleryTitle');
        if (galleryTitle) galleryTitle.textContent = config.gallery.title;

        config.gallery.images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.className = 'gallery-img';
            img.onclick = () => window.open(imgUrl, '_blank');
            galleryGrid.appendChild(img);
        });
    }
});

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    // Clear existing elements if any (useful for updates)
    container.innerHTML = '';

    // Create hearts
    const heartCount = config.floatingEmojis.heartCount || config.floatingEmojis.hearts.length;
    for (let i = 0; i < heartCount; i++) {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = config.floatingEmojis.hearts[i % config.floatingEmojis.hearts.length];
        setRandomPosition(div);
        container.appendChild(div);
    }

    // Create bears
    const bearCount = config.floatingEmojis.bearCount || (config.floatingEmojis.bears ? config.floatingEmojis.bears.length : 0);
    if (config.floatingEmojis.bears && config.floatingEmojis.bears.length > 0) {
        for (let i = 0; i < bearCount; i++) {
            const div = document.createElement('div');
            div.className = 'bear';
            div.innerHTML = config.floatingEmojis.bears[i % config.floatingEmojis.bears.length];
            setRandomPosition(div);
            container.appendChild(div);
        }
    }
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// Alias for next question
function nextQuestion(questionNumber) {
    showNextQuestion(questionNumber);
}

// Function to handle "No" button click
let noClickCount = 0;
function handleNoClick() {
    noClickCount++;
    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');

    // Increase size of Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.5}px`;

    // Optional: add text changes to No button like "Are you sure?", etc.
    // For now, implementing exactly what was asked: increase size until no disappears.
    // As Yes grows, it will naturally take up more space.
}

// Function to move the "No" button when clicked (kept for Question 3)
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;

    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';

        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add('super-love');
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Create heart explosion effect
    createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Reveal secret message
function revealMessage() {
    const message = document.getElementById('celebrationMessage');
    const hint = document.getElementById('clickHint');

    if (!message.classList.contains('revealed')) {
        message.classList.add('revealed');
        hint.classList.add('hidden');
        createMagicalSparkles(message);
    }
}

// Create magical sparkles around an element
function createMagicalSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '🌟', '💫', '⭐', '🎇'];
    const sparkleCount = 30;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.className = 'magic-sparkle';

        // Random position around the center of the element
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';

        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100; // pixels
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';

        sparkle.style.setProperty('--tx', tx);
        sparkle.style.setProperty('--ty', ty);

        // Random size and rotation
        sparkle.style.fontSize = (10 + Math.random() * 20) + 'px';
        sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
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

// Toggle Gallery
function toggleGallery() {
    const gallery = document.getElementById('gallery');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryTitle = document.getElementById('galleryTitle');

    if (gallery.classList.contains('hidden')) {
        gallery.classList.remove('hidden');
        galleryTitle.textContent = config.gallery.title;

        // Populate if empty
        if (galleryGrid.children.length === 0) {
            config.gallery.images.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.className = 'gallery-img';
                img.onclick = () => window.open(imgUrl, '_blank');
                galleryGrid.appendChild(img);
            });
        }

        // Scroll to gallery
        gallery.scrollIntoView({ behavior: 'smooth' });
    } else {
        gallery.classList.add('hidden');
    }
} 