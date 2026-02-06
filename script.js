// Get the config from the other file
const config = window.VALENTINE_CONFIG;

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mainContainer = document.getElementById('mainContainer');
const celebrationContainer = document.getElementById('celebrationContainer');
const celebrationGif = document.getElementById('celebrationGif');

let yesSize = 1;

// Function to move the No button and grow the Yes button
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    yesSize += 0.2;
    yesBtn.style.transform = `scale(${yesSize})`;
});

// Function when Yes is clicked
yesBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    celebrationContainer.classList.remove('hidden');
    
    // This line pulls the gif link from your config.js
    celebrationGif.src = config.celebration.gifUrl;
});
