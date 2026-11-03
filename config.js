// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Camila novia bella",

    // The title that appears in the browser tab
    // You can use emojis! 💝 🐵 💙 💚 🙊
    pageTitle: "feliz cumple mes 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💙', '🐵', '💚', '🐱'],  // Heart emojis
        bears: ['🌻', '🐱']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Un nuevo Mes siendo su novio es un placer para mi",                                    // First interaction
            yesBtn: "busque boton secreto",                                             // Text for "Yes" button
            noBtn: "pasteliyo",                                               // Text for "No" button
            secretAnswer: "Te amo muxisimo! 💙🐱"           // Secret hover message
        },
        second: {
            text: "Cuanto crees que te amo?",                          // For the love meter
            startText: "asi de muxo!",                                   // Text before the percentage
            nextBtn: "siguiente ❤️"                                         // Text for the next button
        },
        third: {
            text: "Te amo y quisiera estar contigo siempre uste a mi lado donde va", // The big question!
            yesBtn: "acepto",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "eso es mucho bebe 🥰🐵💙",  // Shows when they go past 5000%
        high: "harto! 🚀💝",              // Shows when they go past 1000%
        normal: "muxooo! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "El mas suertudo del mundo! 🎉💙💘💙💘",
        message: "un besiyo y un abrazo en ese culo de cumplee mes te amo Muxisimo!",
        emojis: "🎁💙🤗💙"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#a8e6cf",      // Fondo verde claro pastel
        backgroundEnd: "#dcedc1",        // Fondo verde menta suave
        buttonBackground: "#2ecc71",     // Botón verde brillante
        buttonHover: "#27ae60",          // Botón verde al pasar el cursor
        textColor: "#1b4d3e"             // Texto verde oscuro (para excelente legibilidad)
    },

    // Optional Footer Image Settings
    // Reemplaza imageUrl con el enlace directo a tu imagen en Cloudinary (ej: .png o .jpg)
    footerImage: {
        enabled: true,
        imageUrl: "https://res.cloudinary.com/btdvqmdn/image/upload/f_auto,q_auto/1000101593", // Reemplazar con el link directo de la imagen
        maxWidth: "150px"  // Tamaño pequeño para no tapar el texto
    },
    // Video especial al final de la página
    footerVideo: {
        enabled: true,
        // Tu link de embed de Cloudinary
        videoUrl: "https://player.cloudinary.com/embed/?cloud_name=btdvqmdn&public_id=image-to-video%2Fi2v_b638752c45ad40a983797cd8f161a950&fluid=true&controls=true"
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
        musicUrl: "https://collection.cloudinary.com/btdvqmdn/https://res.cloudinary.com/btdvqmdn/video/upload/v1793714624/ssstik.io_1793714524048.mp3", // Music streaming URL
        startText: "🎵 Poner Musiquita",        // Button text to start music
        stopText: "🔇 parar Musica",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
