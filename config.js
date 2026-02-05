// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Jade",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

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
            text: "Will you be my Valentine on February 14th, 2025? 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    video: {
        url: "./video/anjuAndme.mp4",
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
        nextBtn: "Poke me!!😘"
    },

    // Waffle order flow
    waffleOrder: {
        enabled: true,
        title: "Waffle order in motion! 🧇💌",
        subtitle: "We'll auto-detect your location and place the order without opening another app.",
        itemName: "Kikki & Oreo Cream Waffle",
        storeQuery: "Belgian waffle store",
        deliveryLabel: "Auto-detecting Google coordinates...",
        linkText: "Open directions",
        statusMessages: {
            locating: "Finding your Google coordinates…",
            ordering: "Sending the order request now…",
            apiPending: "Submitting the order with your delivery partner…",
            apiSuccess: "Order placed! Your waffles are on the way. 🧇",
            apiFailure: "Order request failed. Please try again or use the directions link.",
            fallback: "Location access denied. Using the default coordinates instead.",
            unavailable: "Location access unavailable. Please enable it and try again.",
            complete: "Order prepared! If you need directions, use the link below."
        },
        api: {
            mode: "mock", // "mock" simulates order placement. Switch to "live" with a real endpoint.
            provider: "swiggy", // or "zomato"
            endpoint: "",
            apiKey: ""
        },
        fallbackCoordinates: {
            lat: 40.7128,
            lng: -74.006
        }
    },

    orderFlow: {
        provider: "swiggy", // "swiggy" or "zomato"
        itemName: "Kikki & Oreo Cream Waffle",
        quantity: 1,
        searchQuery: "waffle",
        swiggy: {
            app: "swiggy://search?query={{waffle}}",
            web: "https://www.swiggy.com/search?query={{query}}"
        },
        zomato: {
            app: "zomato://search?query={{waffle}}",
            web: "https://www.zomato.com/search?query={{waffle}}"
        },
        upi: {
            enabled: true,
            upiId: "9167652399@yescred",
            payeeName: "Waffle Treats",
            amount: "0",
            note: "Waffle order payment",
            currency: "INR"
        }
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
        musicUrl: "", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    },

    // Portrait slideshow feature configuration
    portraitSlideshow: {
        googleDrive: {
            folderLink: "", // Example: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
            apiKey: "YOUR_GOOGLE_DRIVE_API_KEY"
        },
        ai: {
            enabled: false,
            provider: "gemini", // "gemini" or "openai"
            apiKey: "YOUR_AI_API_KEY",
            model: "gemini-1.5-flash",
            prompt: "Write a short, sweet, romantic one-liner expressing love and appreciation."
        },
        animation: {
            holdMs: 3800
        },
        portraitRatio: 0.8, // 4:5 ratio
        maxStackCards: 8,
        cacheKeyPrefix: "valentine-portrait-v1",
        fallbackCompliments: [
            "You make every ordinary second feel magical and deeply cherished.",
            "Your laughter is my favorite melody and my calmest place.",
            "I fall in love with your heart a little more each day.",
            "Your kindness paints my world with warmth, hope, and wonder.",
            "With you, even silence feels like the sweetest love song."
        ]
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
