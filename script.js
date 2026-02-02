// script.js — main website logic

const config = window.VALENTINE_CONFIG;

// Safety check
if (!config) {
  console.error("VALENTINE_CONFIG not found. Make sure config.js loads before script.js");
}

// Set page title
document.title = config.pageTitle || document.title;

// Show/hide question sections
function showNextQuestion(questionNumber) {
  document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));

  const next = document.getElementById(`question${questionNumber}`);
  if (next) next.classList.remove("hidden");

  // Reset Q3 no button position when returning to Q3
  if (questionNumber === 3) {
    const noBtn3 = document.getElementById("noBtn3");
    if (noBtn3) noBtn3.style.transform = "";
  }
}

// Move button (used in Q1 + Q4 "No")
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// Floating emojis
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  container.innerHTML = "";

  (config.floatingEmojis?.hearts || []).forEach(e => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = e;
    setRandomPosition(div);
    container.appendChild(div);
  });

  (config.floatingEmojis?.bears || []).forEach(e => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = e;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

function setRandomPosition(el) {
  el.style.left = Math.random() * 100 + "vw";
  el.style.animationDelay = Math.random() * 5 + "s";
  el.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Celebration
function celebrate() {
  document.querySelectorAll(".question-section").forEach(q => q.classList.add("hidden"));
  document.getElementById("celebration").classList.remove("hidden");

  document.getElementById("celebrationTitle").textContent = config.celebration.title;
  document.getElementById("celebrationMessage").textContent = config.celebration.message;
  document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;
}

// Music
function setupMusicPlayer() {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");

  if (!config.music?.enabled) {
    musicControls.style.display = "none";
    return;
  }

  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume ?? 0.5;
  bgMusic.load();

  // Autoplay attempt
  if (config.music.autoplay) {
    bgMusic.play().catch(() => {
      musicToggle.textContent = config.music.startText;
    });
  }

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = config.music.stopText;
    } else {
      bgMusic.pause();
      musicToggle.textContent = config.music.startText;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  // Title header
  document.getElementById("valentineTitle").textContent = `${config.valentineName}, my love`;

  // Q1 text
  document.getElementById("question1Text").textContent = config.questions.first.text;
  document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
  document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
  document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

  // Q2 text
  document.getElementById("question2Text").textContent = config.questions.second.text;
  document.getElementById("startText").textContent = config.questions.second.startText;
  document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

  // Q3 text (new)
  document.getElementById("question3Text").textContent = config.questions.third.text;
  document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
  document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

  // Q4 text (final)
  document.getElementById("question4Text").textContent = config.questions.fourth.text;
  document.getElementById("yesBtn4").textContent = config.questions.fourth.yesBtn;
  document.getElementById("noBtn4").textContent = config.questions.fourth.noBtn;

  // Love meter
  const loveMeter = document.getElementById("loveMeter");
  const loveValue = document.getElementById("loveValue");
  const extraLove = document.getElementById("extraLove");

  if (loveMeter) {
    loveMeter.addEventListener("input", () => {
      const value = parseInt(loveMeter.value, 10);
      loveValue.textContent = value;

      if (value > 100) {
        extraLove.classList.remove("hidden");
        if (value >= 5000) extraLove.textContent = config.loveMessages.extreme;
        else if (value > 1000) extraLove.textContent = config.loveMessages.high;
        else extraLove.textContent = config.loveMessages.normal;
      } else {
        extraLove.classList.add("hidden");
      }
    });
  }

  // Floating emojis + music
  createFloatingElements();
  setupMusicPlayer();

  // Q3 YES button: go to Question 4
const yesBtn3 = document.getElementById("yesBtn3");
if (yesBtn3) {
  yesBtn3.addEventListener("click", () => showNextQuestion(4));
}

  // Q3 NO button: shake + dodge
  const noBtn3 = document.getElementById("noBtn3");
  if (noBtn3) {
    noBtn3.style.transition = "transform 0.2s ease";

    const dodge = () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 120 - 60;
      noBtn3.style.transform = `translate(${x}px, ${y}px)`;
    };

    noBtn3.addEventListener("mouseover", dodge);
    noBtn3.addEventListener("click", () => {
      noBtn3.classList.add("shake");
      setTimeout(() => {
        noBtn3.classList.remove("shake");
        dodge();
      }, 300);
    });
  }
});

// Expose functions to HTML onclick handlers
window.showNextQuestion = showNextQuestion;
window.moveButton = moveButton;
window.celebrate = celebrate;
