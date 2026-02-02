window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Set page title (do this after validation)
    document.title = config.pageTitle;

    // Set texts from config
    const safeText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    safeText('valentineTitle', `${config.valentineName}, my love`);

    // Q1
    safeText('question1Text', config.questions.first.text);
    safeText('yesBtn1', config.questions.first.yesBtn);
    safeText('noBtn1', config.questions.first.noBtn);
    safeText('secretAnswerBtn', config.questions.first.secretAnswer);

    // Q2
    safeText('question2Text', config.questions.second.text);
    safeText('startText', config.questions.second.startText);
    safeText('nextBtn', config.questions.second.nextBtn);

    // Q3 (new)
    safeText('question3Text', config.questions.third.text);
    safeText('yesBtn3', config.questions.third.yesBtn || config.questions.third.nextBtn || 'Yes');
    safeText('noBtn3', config.questions.third.noBtn || 'No');

    // Q4 (final)
    safeText('question4Text', config.questions.fourth.text);
    safeText('yesBtn4', config.questions.fourth.yesBtn);
    safeText('noBtn4', config.questions.fourth.noBtn);

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();

    // ===== Q3 NO BUTTON: SHAKE + DODGE =====
    const noBtn3 = document.getElementById('noBtn3');
    if (noBtn3) {
        // make movement smooth
        noBtn3.style.transition = 'transform 0.2s ease';

        // Helper to compute a safe random position (keeps it on-screen)
        const dodge = () => {
            const margin = 20; // px from edges
            const maxX = Math.max(window.innerWidth - noBtn3.offsetWidth - margin, margin);
            const maxY = Math.max(window.innerHeight - noBtn3.offsetHeight - margin, margin);
            const x = (Math.random() * maxX) - (maxX / 2);
            const y = (Math.random() * maxY) - (maxY / 2);
            noBtn3.style.transform = `translate(${x}px, ${y}px)`;
        };

        // Dodge on hover
        noBtn3.addEventListener('mouseover', dodge);

        // Click = shake then dodge
        noBtn3.addEventListener('click', () => {
            noBtn3.classList.add('shake');
            setTimeout(() => {
                noBtn3.classList.remove('shake');
                dodge();
            }, 300);
        });

        // When Q3 becomes visible, reset any transform so button is back in place
        const observer = new MutationObserver(() => {
            const q3 = document.getElementById('question3');
            if (q3 && !q3.classList.contains('hidden')) {
                noBtn3.style.transform = '';
            }
        });
        observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    // ===== Love meter setup (only if element exists) =====
    const loveMeterEl = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    function updateLoveMeterUI(value) {
        if (!loveValue) return;
        loveValue.textContent = value;

        if (!extraLove) return;

        if (value > 100) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            if (loveMeterEl) {
                loveMeterEl.style.width = `calc(100% + ${extraWidth}px)`;
                loveMeterEl.style.transition = 'width 0.3s';
            }

            if (value >= 5000) {
                extraLove.classList.add('super-love');
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            if (extraLove) {
                extraLove.classList.add('hidden');
                extraLove.classList.remove('super-love');
            }
            if (loveMeterEl) loveMeterEl.style.width = '100%';
        }
    }

    if (loveMeterEl) {
        // set initial
        loveMeterEl.value = 100;
        updateLoveMeterUI(100);

        loveMeterEl.addEventListener('input', () => {
            const value = parseInt(loveMeterEl.value, 10) || 0;
            updateLoveMeterUI(value);
        });
    }

    // ensure initial position on load
    setInitialPosition();
});
