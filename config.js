// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Nalaura",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Eu te amo!!!💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Você gosta de mim?",                                    // First interaction
            yesBtn: "Sim",                                             // Text for "Yes" button
            noBtn: "Não",                                               // Text for "No" button
            secretAnswer: "Eu não gosto de você, eu te amo! ❤️"           // Secret hover message
        },
        second: {
            text: "Quanto você me ama?",                          // For the love meter
            startText: "Assim!",                                   // Text before the percentage
            nextBtn: "Próximo ❤️"                                         // Text for the next button
        },
        third: {
            text: "Você quer ser minha namorada pro resto da sua vida?", // The big question!
            yesBtn: "SIM!",                                             // Text for "Yes" button
            noBtn: "não!"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOOOW você me ama esse tanto?",  // Shows when they go past 5000%
        high: "EIIIIITAAAAA",              // Shows when they go past 1000%
        normal: "TAMBÉM TE AMO!!!"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Sou o cara mais sortudo do mundo💝💖💝💓",
        message: "Te amo meu amor, to com saudades! Você acabou de ganhar um vale massagem e filme com pipoca pro final de semana ",
        emojis: "🎁💖🤗💝💋❤️💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dm6mmoase/video/upload/v1772712866/Kali_Uchis_Daniel_Caesar_-_Get_You__mp3.pm_cn8kjn.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
