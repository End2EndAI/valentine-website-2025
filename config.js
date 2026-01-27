// ============================================
// 💝 SITE VALENTINE POUR ARTEMIS 💝
// La femme de ma vie ✨
// ============================================

const CONFIG = {
    // Le nom de ta Valentine
    valentineName: "Artemis",

    // Titre de la page
    pageTitle: "Pour Artemis, l'amour de ma vie, ma femme",

    // Emojis flottants dans le fond
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓','💕', '💞', '💘', '💌', '💟'],
        special: ['✨', '🌟', '⭐', '💫', '🌙', '🦋', '🌹', '🌺']
    },

    // Les questions
    questions: {
        first: {
            text: "Artemis, tu sais que tu es la femme de ma vie ? 🌟",
            yesBtn: "Oui je sais",
            noBtn: "Dis-moi pourquoi",
            secretAnswer: "Il faudra lire ma lettre"
        },
        second: {
            text: "À quel point tu m'aimes, mon amour ? 💝",
            startText: "Je t'aime comme ça...",
            nextBtn: "Continue mon cœur ❤️"
        },
        third: {
            text: "Artemis, veux-tu être ma Valentine le 14 février 2025 ? 🌹💍",
            yesBtn: "OUI mon amour ! 💕",
            noBtn: "Jamais !"
        }
    },

    // Messages du love-mètre
    loveMessages: {
        extreme: "ET MOI ENCORE PLUS QUE ÇA !",
        high: "C'est cosmique cet amour ! ",
        veryHigh: "Wow, mon cœur va exploser ! ",
        normal: "C'est tellement beau ! "
    },

    // Célébration finale
    celebration: {
        title: "YAAAAAY ! Je suis la femme le plus heureuse du monde ! 🎉💝✨",
        message: "Artemis, tu es ma déesse mon amour, tu auras une grosse récompense hihi !",
        emojis: "🎁💖🤗💝💋❤️💕✨🌟🎊🎉💫🌹"
    },

    // Nouveaux messages aléatoires qui apparaissent !
    randomLoveMessages: [
        "Tu es magnifique mon coeur ! ",
        "Mon cœur bat pour toi ! 💓",
        "Je t'aime plus que tout ! 💖",
        "Tu es parfaite pour moi ",
        "Mon amour éternel ",
        "Ma princesse, ma reine ",
        "toi et moi contre le reste du monde",
    ],

    // Messages drôles quand elle clique sur "Non"
    funnyNoMessages: [
        "Allez, je sais que tu veux dire oui ! ",
        "je crois que c'est plutot oui que tu veux dire",
        "Attention à toi😏"
    ],

    // Palette de couleurs romantique
    colors: {
        backgroundStart: "#ff9a9e",      // Rose doux
        backgroundEnd: "#fecfef",        // Rose-violet doux
        buttonBackground: "#ff6b9d",     // Rose vif
        buttonHover: "#ff8fb3",          // Rose clair
        textColor: "#c71585",            // Rose foncé
        accentColor: "#ffd700"           // Or pour les touches spéciales
    },

    // Animations
    animations: {
        floatDuration: "12s",
        floatDistance: "60px",
        bounceSpeed: "0.4s",
        heartExplosionSize: 2.0,
        sparkleEffect: true,             // Effet étincelles ✨
        heartRain: true                  // Pluie de cœurs 💕
    },

    // Musique d'ambiance
    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3",
        startText: "🎵 Musique romantique",
        stopText: "🔇 Pause musique",
        volume: 0.6
    },

    // NOUVELLES FONCTIONNALITÉS MARRANTES !
    
    // Compte à rebours jusqu'à la Saint-Valentin
    countdown: {
        enabled: true,
        targetDate: "2026-02-14T00:00:00",
        message: "Plus que {days} jours avant notre Saint-Valentin ! 💝"
    },

    // Faits mignons aléatoires
    cuteFacts: {
        enabled: true,
        facts: [
            "Savais-tu qu'Artemis était la déesse de la lune ? 🌙 Toi aussi tu illumines mes nuits !",
            "Mon cœur bat 150 fois par minute quand je te vois ! 💓",
            "Si l'amour était de l'eau, je te donnerais l'océan ! 🌊💙",
            "Tu es plus précieuse que tous les diamants du monde ! 💎",
            "Chaque moment avec toi est mon préféré ! ⭐",
            "Tu me fais sourire même dans mes rêves ! 😴💭💕"
        ]
    },

    // Mini-jeu : trouve le cœur caché
    hiddenHeartGame: {
        enabled: true,
        message: "Trouve le cœur caché sur la page pour un message secret ! 💝",
        secretMessage: "Tu es la plus belle chose qui me soit arrivée"
    },

    // Compliments qui apparaissent au survol
    hoverCompliments: {
        enabled: true,
        compliments: [
            "Magnifique ! 😍",
            "Sublime ! ✨",
            "Parfaite ! 💖",
            "Éblouissante ! 🌟",
            "Radieuse ! ☀️",
            "Extraordinaire ! 💫"
        ]
    },

    // Effet de neige de cœurs
    heartSnow: {
        enabled: true,
        intensity: "medium"  // "light", "medium", "heavy"
    }
};

// ============================================
// NE PAS MODIFIER EN DESSOUS
// ============================================
window.VALENTINE_CONFIG = CONFIG;
