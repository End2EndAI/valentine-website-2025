# 💝 Happy Birtday to you Website 2026 💝

[![Stars](https://img.shields.io/github/stars/End2EndAI/happybirtdaytoyou-website-2025?style=social)](https://github.com/End2EndAI/valentine-website-2025/stargazers)
[![Fork](https://img.shields.io/github/forks/End2EndAI/happybirtdaytoyou-website-2025?style=social)](https://github.com/End2EndAI/valentine-website-2025/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Support me](https://img.shields.io/badge/Support-Stripe-blue)](https://buy.stripe.com/bJefZa8Le7fvgDe3ric7u00)

Happy birthday beautiful, may you grow older, become a successful person in the future, and I love you 

🌟 **[Live Demo](https://end2endai.github.io/happybirtdaytoyou-website-2025)** | 🚀 **[Quick Start](#-quick-start-guide)** | 🌐 **[Deploy Your Website](#4-make-it-live-get-your-online-website-url)**

## 🌟 Share The Love

## ✨ Features
- 💖 Floating hearts and bears
- 🎵 Custom music
- 📏 Love meter that goes beyond 100%
- 🏃‍♂️ Playful buttons that run away
- 🎁 Hidden answer for the first question, "Do you like me?"
- 🎉 Grand celebration when they say yes!

## 🚀 Quick Start Guide

### 1. Get Your Own Copy
1. Click the "Fork" button at the top right of this page or [click here](https://github.com/End2EndAI/happybirtdaytoyou-website-2025/fork)
2. Wait a few seconds while GitHub creates your copy
3. You now have your own version of the code!

Note: Make sure you're logged into your GitHub account. If you don't have one, you can [create a free account here](https://github.com/signup).

### 2. Customize for Your Valentine

#### Easy Way (Recommended)
1. In your new repository, click on `config.js`
2. Click the pencil icon (✏️) to edit
3. Change the values to personalize your website
4. Click "Commit changes" at the bottom

Here's what you can customize in `config.js`:
```javascript
// Basic Information
happybirtday Name: "lutpia"                    // Your Valentine's name
pageTitle: "happybirtdayy cantikk 💝" // Browser tab title

// Floating Background Elements
floatingEmojis: {
    hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis in background
    bears: ['🧸', '🐻']                       // Bear emojis in background
}

// Questions and Buttons
questions: {
    first: {
        text: "happy birtday lutpiaa",                   // First question
        yesBtn: "lanjut",                             // Yes button text
        noBtn: "No",                               // No button text
        secretAnswer: "tunggu sebentarr ❤️"  // Hidden message
    },
    second: {
        text: "kamuu suka enggaa",          // Second question
        startText: "suka",                   // Text before percentage
        nextBtn: "engga"                         // Next button text
    },
    third: {
        text: "semoga bertambahnyaa usia kamuu, kamuu menjadi orang sukses dunia akhirat",      // Final question
        yesBtn: "aamiin",                            // Yes button text
        noBtn: "aamiin"                                // No button text
    }
}

// Love Meter Messages
loveMessages: {
    extreme: "kamuu mauu hadiah enggaa??",  // Shows above 5000%
    high: "mauu",              // Shows above 1000%
    normal: "mauuu"    gaa adaa gamauu hehehee                       // Shows above 100%
}

// Final Celebration
celebration: {
    title: "maapp masii belajarr akuu hehee",     // Celebration title
    message: "semoga kamuu di lancarkann pkl nya di mudahkann urusannyaa sehatt selaluu aamiinn",          // Celebration message
    emojis: "🎁💖🤗💝💋❤️💕"                        // Celebration emojis
}

// Website Colors
colors: {
    backgroundStart: "#ffafbd",      // Background gradient start
    backgroundEnd: "#ffc3a0",        // Background gradient end
    buttonBackground: "#ff6b6b",     // Button color
    buttonHover: "#ff8787",          // Button hover color
    textColor: "#ff4757"            // Text color
}

// Animation Settings
animations: {
    floatDuration: "15s",           // How long hearts float (10-20s)
    floatDistance: "50px",          // Sideways movement (30-70px)
    bounceSpeed: "0.5s",            // Bounce animation speed (0.3-0.7s)
    heartExplosionSize: 1.5         // Final heart explosion size (1.2-2.0)
}

// Music Settings
music: {
    enabled: true, // Music feature is enabled
    autoplay: true, // Try to autoplay (note: some browsers may block this)
    musicUrl: "YOUR_CLOUDINARY_URL_HERE", // Paste your music URL here
    startText: "🎵 Play Music", // Button text to start music
    stopText: "🔇 Stop Music", // Button text to stop music
    volume: 0.5 // Volume level (0.0 to 1.0)
}
```

### 3. Adding Your Own Background Music 🎵

Want to make it extra special with your own romantic song? Follow these steps to add background music:

1. **Get a Cloudinary Account (Free):**
   - Go to [Cloudinary.com](https://cloudinary.com) and sign up for a free account

2. **Upload Your Music:**
   - Log in to your Cloudinary dashboard
   - Click on the "Upload" button in the top right
   - Select "Upload" from the dropdown menu
   - Choose your MP3 file (keep it under 10MB for better loading)
   - Wait for the upload to complete

3. **Get Your Music URL:**
   - After upload, find your music file in the Media Library
   - Click the "..." (more options) button on your music file
   - Click "Copy URL"
   - Select "Copy Original URL with options"
   - The URL should look like: `https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/your-file-name.mp3`

4. **Add to Your Website:**
   - Open `config.js`
   - Find the `music` section
   - Replace the `musicUrl` value with your Cloudinary URL

```javascript
music: {
    enabled: true,
    autoplay: true,
    musicUrl: "YOUR_CLOUDINARY_URL_HERE", // Paste your URL here
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5
}
```

### 4. Make It Live! (Get your online website URL)

#### Using GitHub Pages (Free)
1. Go to your repository's "Settings"
2. Click "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait a few minutes
6. Your site will be live at: `https://your-username.github.io/repository-name`

#### Using Netlify (Free, Recommended, Custom URL)
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Click "Deploy site"
6. Once deployed, click "Domain settings"
7. Choose a custom domain (e.g., `my-valentine-2025.netlify.app`)

## 💡 Tips
- Test the website before sending it to your Valentine
- Try all the buttons and interactions
- Check how it looks on mobile phones

## 🎨 Want Different Colors?
Use these tools to find beautiful colors:
- [Coolors](https://coolors.co/) - Color palette generator
- [ColorHunt](https://colorhunt.co/) - Color palettes

## 🔍 Need More Emojis?
Find more emojis at:
- [EmojiKeyboard](https://emojikeyboard.top/fr/)
- [Emojipedia](https://emojipedia.org/)

## 💖 Credits
Created with love for Valentine's Day 2026.
Feel free to use and modify for your special someone!

\- Louis Fontaine -

## ❤️ Support this project

This Valentine website template is completely **free and open-source**.

If it helped you create something special, you can support the project with a small donation:

👉 [Tip](https://buy.stripe.com/bJefZa8Le7fvgDe3ric7u00)

Thank you for keeping it alive!

## 📜 License
MIT License - Feel free to use this for your Valentine! 
