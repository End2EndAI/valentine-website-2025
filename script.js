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
function setTextIfExists(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    setTextIfExists('valentineTitle', `${config.valentineName}, my love...`);
    
    // Set first question texts
    setTextIfExists('question1Text', config.questions.first.text);
    setTextIfExists('yesBtn1', config.questions.first.yesBtn);
    setTextIfExists('noBtn1', config.questions.first.noBtn);
    setTextIfExists('secretAnswerBtn', config.questions.first.secretAnswer);
    
    // Set second question texts
    setTextIfExists('question2Text', config.questions.second.text);
    setTextIfExists('startText', config.questions.second.startText);
    setTextIfExists('nextBtn', config.questions.second.nextBtn);
    
    // Set third question texts
    setTextIfExists('question3Text', config.questions.third.text);
    setTextIfExists('yesBtn3', config.questions.third.yesBtn);
    setTextIfExists('noBtn3', config.questions.third.noBtn);

    // Set video modal texts
    setTextIfExists('orderModalTitle', config.video.modalTitle);
    setTextIfExists('orderModalText', config.video.modalText);
    setTextIfExists('orderNowBtn', config.video.orderButtonText);
    setTextIfExists('upiFallbackBtn', config.video.upiButtonText);
    setTextIfExists('orderDisclaimer', config.video.disclaimer);

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    // setupMusicPlayer();

 
});

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

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
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

// Function to move the "No" button when clicked
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
    if (!loveMeter || !loveValue) {
        return;
    }
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

if (loveMeter && loveValue && extraLove) {
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
}

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    // document.getElementById('orderSection').classList.add('hidden');
    
    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    setTextIfExists('celebrationNextBtn', config.celebration.nextBtn);
    

}   


// Music Player Setup
// function setupMusicPlayer() {
//     console.log("clciked to play")
//     const musicControls = document.getElementById('musicControls');
//     const musicToggle = document.getElementById('musicToggle');
//     const bgMusic = document.getElementById('bgMusic');
//     const musicSource = document.getElementById('musicSource');

//     // Only show controls if music is enabled in config
//     if (!config.music.enabled) {
//         musicControls.style.display = 'none';
//         return;
//     }

//     // Set music source and volume
//     musicSource.src = config.music.musicUrl;
//     bgMusic.volume = config.music.volume || 0.5;
//     bgMusic.load();

//     // Try autoplay if enabled
//     if (config.music.autoplay) {
//         const playPromise = bgMusic.play();
//         if (playPromise !== undefined) {
//             playPromise.catch(error => {
//                 console.log("Autoplay prevented by browser");
//                 musicToggle.textContent = config.music.startText;
//             });
//         }
//     }

//     // Toggle music on button click
//     musicToggle.addEventListener('click', () => {
//         if (bgMusic.paused) {
//             bgMusic.play();
//             musicToggle.textContent = config.music.stopText;
//         } else {
//             bgMusic.pause();
//             musicToggle.textContent = config.music.startText;
//         }
//     });
// } 
