// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    valentineName: "Bella",
    pageTitle: "Will You Be My Valentine? 💝",
    
    // Logic for the interaction
    questions: {
        first: {
            text: "Bella, will you be my valentine?",
            yesBtn: "Yes",
            noBtn: "No",
            subText: "'No' seems a bit shy 😏"
        }
    },

    // Final screen content
    celebration: {
        title: "You chose correctly! 🎉💝",
        message: "I knew you couldn't say no!",
        gifUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2J6NnIzY2d1eGx1cXdpcWl4aXlyMTh1NGo3bGYzNTZyMTR6eDR1diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b2VxjMhx8nnjy/giphy.gif" 
    },

    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        yesButton: "#ff4b2b", // Red
        noButton: "#8e8e8e",  // Grey
        textColor: "#ffffff"
    },

    // Music is disabled as requested
    music: {
        enabled: false,
        autoplay: false,
        musicUrl: "",
        startText: "",
        stopText: "",
        volume: 0
    }
};

// Logic to handle the "Runaway No" and "Growing Yes"
// This will work automatically if your index.html supports it.
window.VALENTINE_CONFIG = CONFIG;
