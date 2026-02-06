const CONFIG = {
    // Your Valentine's name that will appear in the title
    valentineName: "Charmaine",

    // The title that appears in the browser tab
    pageTitle: "Will You Be My Valentines? 💝",

    // Floating emojis that appear in the background
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  
        bears: ['🧸', '🐻']                       
    },

    // Questions and answers
    questions: {
        first: {
            text: "Do you love me?",                                   
            yesBtn: "Yes",                                             
            noBtn: "No",                                                 
            secretAnswer: "I don't like you, I love you all! ❤️"          
        },
        second: {
            text: "How much do you love me?",                           
            startText: "This much!",                                   
            nextBtn: "Next ❤️"                                         
        },
        third: {
            text: "Will you be my Valentines on February 14th, 2025? 🌹",
            yesBtn: "Yes!",                                             
            noBtn: "No"                                                 
        }
    },

    // Love meter messages
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  
        high: "To infinity and beyond! 🚀💝",              
        normal: "And beyond! 🥰"                           
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your gifts, big warm hugs and huge kisses!",
        emojis: "🎁💖🤗💝💋❤️💕"  
    },

    // Color scheme for the website
    colors: {
        backgroundStart: "#ffafbd",      
        backgroundEnd: "#ffc3a0",        
        buttonBackground: "#ff6b6b",     
        buttonHover: "#ff8787",          
        textColor: "#ff4757"             
    },

    // Animation settings
    animations: {
        floatDuration: "15s",           
        floatDistance: "50px",          
        bounceSpeed: "0.5s",            
        heartExplosionSize: 1.5          
    },

    // Background Music
    music: {
        enabled: true,                     
        autoplay: true,                    
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", 
        startText: "🎵 Play Music",        
        stopText: "🔇 Stop Music",         
        volume: 0.5                        
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;