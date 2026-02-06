const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mainContainer = document.getElementById('mainContainer');
const celebrationContainer = document.getElementById('celebrationContainer');

let yesSize = 1;

// Function to move the No button and grow the Yes button
noBtn.addEventListener('mouseover', () => {
    // 1. Move the No button to a random position
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';

    // 2. Make the Yes button bigger
    yesSize += 0.2;
    yesBtn.style.transform = `scale(${yesSize})`;
});

// Function when Yes is clicked
yesBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    celebrationContainer.classList.remove('hidden');
});
