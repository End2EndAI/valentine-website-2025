// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Yasmeen",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Surprise Surprise its A Question about Valentines!💝",

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
            text: "Who's the most lovely girl in the World?",                                    // First interaction
            yesBtn: "Yasmeen",                                             // Text for "Yes" button
            noBtn: "Yasmeen",                                               // Text for "No" button
            secretAnswer: "Bet you thought this would be a different answer... Sike its still Yasmeen  ❤️"           // Secret hover message
        },
        second: {
            text: "How much do you love me?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️"                                         // Text for the next button
        },
        third: { 
            text: "Am I your favorite person?",
                yesBtn: "Yes",
                noBtn: " Nah your fucking wack",
                secretAnswer: " Of course I am, would be kind of wild if you chose that other answer!!!
        },
        fourth: {
            text: "Do I make you laugh?", 
            yesBtn: "Your freaking hilarous!",
            noBtn: "No your a cornball",
            secretAnswer: "We both know what the right answer is but I think your pretty funny too!
        },
        
                
        
        fifth: {
            text: "Will you make my year and be my Valentine? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? Still not more than I love you though babycakes  🥰🚀💝",  // Shows when they go past 5000%
        high: "Whooo weee thats quite a high number, my number towards you is still double though! 🚀💝",              // Shows when they go past 1000%
        normal: "Well well what a luck guy I am! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Oh Yeah Oh Yeah you said yes Oh yeah Oh Yeah ",
        message: "If you said no I was gonna throw pebbles at you!",
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
        musicUrl: "https://res.cloudinary.com/dqjviftao/video/upload/v1770492174/n06bf16f1f0372a63d520eac6cf7c5af7-c047879292bd8bf3f6c02e0afd65b333_whexsx.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
