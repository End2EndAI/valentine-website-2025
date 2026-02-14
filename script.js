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

// Counter for "No" button clicks
let noClickCount = 0;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
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

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();

    // Initialize new features
    initializeNewFeatures();
});

// ============================================
// 🎉 NOUVELLES FONCTIONNALITÉS MARRANTES 🎉
// ============================================

function initializeNewFeatures() {
    // Lancer les messages d'amour aléatoires
    if (config.randomLoveMessages && config.randomLoveMessages.length > 0) {
        startRandomLoveMessages();
    }

    // Compte à rebours
    if (config.countdown && config.countdown.enabled) {
        startCountdown();
    }

    // Faits mignons
    if (config.cuteFacts && config.cuteFacts.enabled) {
        showRandomCuteFact();
    }

    // Jeu du cœur caché
    if (config.hiddenHeartGame && config.hiddenHeartGame.enabled) {
        createHiddenHeart();
    }

    // Compliments au survol
    if (config.hoverCompliments && config.hoverCompliments.enabled) {
        setupHoverCompliments();
    }

    // Effet neige de cœurs
    if (config.heartSnow && config.heartSnow.enabled) {
        startHeartSnow();
    }
}

// Messages d'amour qui apparaissent aléatoirement
function startRandomLoveMessages() {
    setInterval(() => {
        const message = config.randomLoveMessages[Math.floor(Math.random() * config.randomLoveMessages.length)];
        showFloatingMessage(message);
    }, 8000); // Toutes les 8 secondes
}

function showFloatingMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'floating-love-message';
    messageDiv.textContent = text;
    messageDiv.style.left = Math.random() * 80 + 10 + '%';
    messageDiv.style.top = Math.random() * 60 + 20 + '%';
    document.body.appendChild(messageDiv);

    // Animation d'apparition
    setTimeout(() => messageDiv.classList.add('show'), 10);

    // Disparition après 4 secondes
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => messageDiv.remove(), 500);
    }, 4000);
}

// Compte à rebours jusqu'à la Saint-Valentin
function startCountdown() {
    const countdownDiv = document.createElement('div');
    countdownDiv.id = 'countdown';
    countdownDiv.className = 'countdown-display';
    document.body.appendChild(countdownDiv);

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const targetDate = new Date(config.countdown.targetDate);
    const now = new Date();
    const diff = targetDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const message = config.countdown.message.replace('{days}', days);
        document.getElementById('countdown').textContent = message;
    } else {
        document.getElementById('countdown').textContent = "C'est aujourd'hui ! 💝🎉";
    }
}

// Faits mignons aléatoires
function showRandomCuteFact() {
    const factDiv = document.createElement('div');
    factDiv.id = 'cuteFact';
    factDiv.className = 'cute-fact-display';
    document.body.appendChild(factDiv);

    function updateFact() {
        const fact = config.cuteFacts.facts[Math.floor(Math.random() * config.cuteFacts.facts.length)];
        factDiv.textContent = fact;
        factDiv.classList.add('show');
        
        setTimeout(() => {
            factDiv.classList.remove('show');
        }, 6000);
    }

    updateFact();
    setInterval(updateFact, 15000); // Nouveau fait toutes les 15 secondes
}

// Jeu du cœur caché
function createHiddenHeart() {
    const hiddenHeart = document.createElement('div');
    hiddenHeart.className = 'hidden-heart';
    hiddenHeart.innerHTML = '💝';
    hiddenHeart.style.left = Math.random() * 90 + 5 + '%';
    hiddenHeart.style.top = Math.random() * 80 + 10 + '%';
    document.body.appendChild(hiddenHeart);

    hiddenHeart.addEventListener('click', () => {
        alert(config.hiddenHeartGame.secretMessage);
        hiddenHeart.classList.add('found');
        createSparkles(hiddenHeart);
        setTimeout(() => hiddenHeart.remove(), 2000);
        // Créer un nouveau cœur caché
        setTimeout(createHiddenHeart, 5000);
    });
}

function createSparkles(element) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = element.offsetLeft + 'px';
        sparkle.style.top = element.offsetTop + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Compliments au survol
function setupHoverCompliments() {
    let complimentDiv = document.createElement('div');
    complimentDiv.className = 'hover-compliment';
    document.body.appendChild(complimentDiv);

    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.002) { // 0.2% de chance à chaque mouvement
            const compliment = config.hoverCompliments.compliments[
                Math.floor(Math.random() * config.hoverCompliments.compliments.length)
            ];
            complimentDiv.textContent = compliment;
            complimentDiv.style.left = e.pageX + 20 + 'px';
            complimentDiv.style.top = e.pageY - 10 + 'px';
            complimentDiv.classList.add('show');
            
            setTimeout(() => {
                complimentDiv.classList.remove('show');
            }, 1500);
        }
    });
}

// Effet neige de cœurs
function startHeartSnow() {
    const intensity = {
        'light': 3,
        'medium': 6,
        'heavy': 10
    }[config.heartSnow.intensity] || 6;

    setInterval(() => {
        for (let i = 0; i < intensity; i++) {
            createSnowHeart();
        }
    }, 2000);
}

function createSnowHeart() {
    const heart = document.createElement('div');
    heart.className = 'snow-heart';
    const randomHeart = config.floatingEmojis.hearts[
        Math.floor(Math.random() * config.floatingEmojis.hearts.length)
    ];
    heart.innerHTML = randomHeart;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = 5 + Math.random() * 5 + 's';
    heart.style.fontSize = 15 + Math.random() * 20 + 'px';
    document.querySelector('.floating-elements').appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

// ============================================
// FONCTIONS ORIGINALES AMÉLIORÉES
// ============================================

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create special emojis (stars, butterflies, etc.)
    if (config.floatingEmojis.special) {
        config.floatingEmojis.special.forEach(emoji => {
            const div = document.createElement('div');
            div.className = 'heart'; // Use same class for similar animation
            div.innerHTML = emoji;
            setRandomPosition(div);
            container.appendChild(div);
        });
    }

    // Keep bears if they exist
    if (config.floatingEmojis.bears) {
        config.floatingEmojis.bears.forEach(bear => {
            const div = document.createElement('div');
            div.className = 'bear';
            div.innerHTML = bear;
            setRandomPosition(div);
            container.appendChild(div);
        });
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

// Function to move the "No" button when clicked - VERSION AMÉLIORÉE
function moveButton(button) {
    // Afficher un message drôle si configuré
    if (config.funnyNoMessages && config.funnyNoMessages.length > 0) {
        const message = config.funnyNoMessages[noClickCount % config.funnyNoMessages.length];
        showFloatingMessage(message);
        noClickCount++;
    }

    // Bouger le bouton
    const maxX = window.innerWidth - button.offsetWidth - 20;
    const maxY = window.innerHeight - button.offsetHeight - 20;
    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);
    
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    button.style.transition = 'all 0.3s ease';

    // Faire grandir le bouton "Oui" à chaque clic sur "Non"
    const yesButton = document.getElementById('yesBtn3');
    if (yesButton) {
        const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize) || 16;
        yesButton.style.fontSize = (currentSize + 2) + 'px';
        yesButton.style.padding = (parseFloat(window.getComputedStyle(yesButton).padding) + 2) + 'px';
    }
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
        } else if (value >= 2000) {
            extraLove.classList.remove('super-love');
            extraLove.textContent = config.loveMessages.veryHigh || config.loveMessages.high;
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

// Celebration function - VERSION AMÉLIORÉE
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
    
    // Lancer des confettis supplémentaires
    setTimeout(() => createHeartExplosion(), 500);
    setTimeout(() => createHeartExplosion(), 1000);
}

// Create heart explosion animation - VERSION AMÉLIORÉE
function createHeartExplosion() {
    const emojisToExplode = config.celebration.emojis.split('').filter(c => c.trim() !== '');
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomEmoji = emojisToExplode[Math.floor(Math.random() * emojisToExplode.length)];
        heart.innerHTML = randomEmoji;
        heart.className = 'heart explosion-heart';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
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
            playPromise.then(() => {
                musicToggle.textContent = config.music.stopText;
            }).catch(error => {
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
