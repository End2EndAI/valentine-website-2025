const CONFIG = {
    valentineName: "Jason",

    pageTitle: "Will You Be My Valentine?",

    //imageUrl: "https://i.imgur.com/7nRk9zP.jpeg",

    floatingEmojis: {
        hearts: ['🤍', '🫧', '🪩'],
        bears: []
    },

    questions: {
        first: {
            text: "Do you like me? ",
            yesBtn: "Yes",
            noBtn: "🦔",
            secretAnswer: "I don't like you, I bub you!"
        },
        second: {
            text: "How much do you fw me?",
            startText: "down bad level:",
            nextBtn: "Lock in"
        },
        third: {
            text: "Be my Valentine? 🐧 ",
            yesBtn: "hell yeah",
            noBtn: "yes"
        }
    },

    loveMessages: {
        extreme: "you can do better",
        high: "W fr",
        normal: "ymmhm that's what I thought "
    },

    celebration: {
        title: "I'm so luck you're mine",
        message: "oki pu, we got plans",
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
        startText: "🎵 Play Music",
        stopText: "Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
