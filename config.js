const CONFIG = {
    valentineName: "JASON",

    pageTitle: "Will You Be My Valentine?",

    //imageUrl: "https://i.imgur.com/7nRk9zP.jpeg",
    personalPhoto: {
        enabled: true,
        imageUrl: "https://i.imgur.com/gWkR90b.png"
    },
    
    floatingEmojis: {
        hearts: ['🤍', '🫧', '🪩'],
        bears: []
    },

    questions: {
        first: {
            text: "DO YOU LIKE ME? ",
            yesBtn: "YES",
            noBtn: "🦔",
            secretAnswer: "I DON'T LIKE YOU, I BUB YOU!"
        },
        second: {
            text: "How much do u fw me?",
            startText: "YOU CAN DO BETTER!",
            nextBtn: "LOCK IN"
        },
        third: {
            text: "will you be my valentine? 🐧 ",
            yesBtn: "HELL YEAH",
            noBtn: "YES"
        }
    },

    loveMessages: {
        extreme: "MMHM THAT'S WHAT I THOUGHT 🙂‍↔️",
        high: "NOT MORE THAN VIDEO GAMES?? 😔",
        normal: "YOU CAN DO BETTER"
    },

    celebration: {
        title: "I'm so lucky you're mine",
        message: "OKI PU, WE GOT PLANS",
        emojis: "💋"
    },

    colors: {
        backgroundStart: "#C3C9E9",
        backgroundEnd: "#AAABBC",
        buttonBackground: "#6C91C2",
        buttonHover: "#8B8982",
        textColor: "#373F47"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    music: {
        enabled: true,
        autoplay: false,
        musicUrl: "https://res.cloudinary.com/dqfa0ps78/video/upload/v1770057896/Dave_-_Raindance_ft._Tems_-_AudioTrimmer.com_nkb3q3.mp3",
        startText: "💿 PLAY MUSIC",
        stopText: "STOP MUSIC",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
