// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Anju!!",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓', '💞'],  // Heart emojis
        bears: ['🧸', '🐻', '🦋']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "I don't like you, I love you! ❤️"           // Secret hover message
        },
        second: {
            text: "How much do you love me?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️"                                         // Text for the next button
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    video: {
        url: "/video/anjuAndme.mp4",
        autoplay: true,
        allowSkipAfterSeconds: 3,
        modalTitle: "Let’s bring these sweet memories into taste",
        modalText: "Ready to order a Kikki & Oreo Cream Waffle?",
        orderButtonText: "Order Now",
        upiButtonText: "Pay via UPI",
        disclaimer: "Ordering is handled by Swiggy/Zomato. You will confirm the order and payment there."
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕",  // These will bounce around
        nextBtn: "Wanna see what makes you loved so much?😘"
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
        musicUrl: "./mp3/Ed-Sheeran-Perfect.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.2                        // Volume level (0.0 to 1.0)
    },

    // Portrait slideshow feature configuration
    portraitSlideshow: {
        // googleDrive: {
        //     folderLink: process.env.Google_Drive, // Example: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
        //     apiKey: process.env.GOOGLE_API_KEY
        // },
        ai: {
            enabled: false,
            provider: "gemini", // "gemini" or "openai"
            apiKey: "",
            model: "gemini-1.5-flash",
            prompt: "Write a short, sweet, romantic one-liner expressing love and appreciation."
        },
        animation: {
            holdMs: 3800
        },
        portraitRatio: 0.8, // 4:5 ratio
        maxStackCards: 10,
        cacheKeyPrefix: "valentine-portrait-v1",
        fallbackCompliments: [
            `“You make every ordinary second feel magical and deeply cherished.💕✨”`,
            `“Your laughter is my favorite melody and my calmest place.🎶💗”`,
            `“I fall in love with your heart a little more each day.❤️✨”`,
            `“Your kindness paints my world with warmth, hope, and wonder.🌷💞”`,
            `“With you, even silence feels like the sweetest love song.🎵🤍”`,
            `“You are my favorite forever 💕🌙”`,
            `“you make ordinary days feel a little more magical.🪄💫”`,
            `“Your smile could honestly fix any bad day.😊❤️”`,
            `“Every moment with you feels like a perfect scene in a movie.🎬💖”`,
            `“You’re my favorite place to go when I want peace, joy, or love.🌿💗”`
        ]
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
