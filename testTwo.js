(function () {


    const config = window.VALENTINE_CONFIG?.portraitSlideshow;
    const GlobalConfig = window.VALENTINE_CONFIG
    if (!config) return;

    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    const LOCAL_FOLDER = "./Ammu/";

    // 👉 Manually add your image names here
    const LOCAL_IMAGES = [
        "IMG_1301.JPG",
        "IMG_2130.JPG",
        "IMG_2594.JPG",
        "IMG_4175.JPG",
        "IMG_4181.JPG",
        "IMG_4182.JPG",
        "IMG_4185.JPG",
        "IMG_4187.JPG",
        "IMG_4370.JPG",
        "IMG_4375.JPG",
    ];

    class PortraitSlideshow {

        constructor() {
            this.state = {
                processed: [],
                currentIndex: 0,
                timer: null,
                isRunning: false
            };

            this.elements = {
                stack: document.getElementById("portraitStack"),
                activeImage: document.getElementById("activePortraitImage"),
                compliment: document.getElementById("portraitFinalMessage"),
                portraitSection: document.getElementById("portraitFeature"),
                videoSection: document.getElementById("videoSection"),
                video: document.getElementById("memoryVideo")
            };

            this.start();
        }

        async start() {
            if (this.state.isRunning) return;
            this.state.isRunning = true;
            this.setupMusicPlayer();

            const images = LOCAL_IMAGES.map((name, index) => ({
                id: index,
                originalUrl: LOCAL_FOLDER + name
            }));

            this.state.processed = await Promise.all(
                images.map(img => this.processImage(img))
            );

            this.playCurrent();
        }

        async processImage(imageMeta) {

            const outputW = 720;
            const outputH = 960; // 3:4 ratio

            const canvas = document.createElement("canvas");
            canvas.width = outputW;
            canvas.height = outputH;
            const ctx = canvas.getContext("2d");

            const image = await this.loadImage(imageMeta.originalUrl);

            // --- Background blur layer ---
            ctx.filter = "blur(25px) brightness(0.75)";
            ctx.drawImage(image, 0, 0, outputW, outputH);

            // --- Center crop subject ---
            ctx.filter = "contrast(1.08) saturate(1.1)";
            ctx.globalAlpha = 0.95;

            const cropSize = Math.min(image.width, image.height);
            const x = (image.width - cropSize) / 2;
            const y = (image.height - cropSize) / 2;

            ctx.drawImage(image, x, y, cropSize, cropSize, 0, 0, outputW, outputH);

            ctx.globalAlpha = 1;
            ctx.filter = "none";

            // --- Warm overlay ---
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "rgba(255, 180, 150, 0.15)";
            ctx.fillRect(0, 0, outputW, outputH);
            ctx.globalCompositeOperation = "source-over";

            // --- Soft vignette ---
            const vignette = ctx.createRadialGradient(
                outputW / 2, outputH / 2, outputH / 3,
                outputW / 2, outputH / 2, outputH
            );
            vignette.addColorStop(0, "rgba(255,255,255,0)");
            vignette.addColorStop(1, "rgba(25,10,20,0.4)");

            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, outputW, outputH);

            return {
                ...imageMeta,
                portraitDataUrl: canvas.toDataURL("image/jpeg", 0.95)
            };
        }

        playCurrent() {

            const current = this.state.processed[this.state.currentIndex];

            if (!current) {
                this.finish();
                return;
            }

            // Clear previous compliment (smooth fade out)
            this.elements.compliment.style.opacity = "0";

            setTimeout(() => {

                const compliment =
                    config.fallbackCompliments[
                    this.state.currentIndex % config.fallbackCompliments.length
                    ];

                // Update image
                this.elements.activeImage.src = current.portraitDataUrl;

                // Set new compliment
                this.elements.compliment.textContent = compliment;

                // Fade in new compliment
                this.elements.compliment.style.opacity = "1";

                const holdDuration = 5000;

                this.state.timer = setTimeout(() => {
                    this.pushToStack(current, compliment);

                    // Clear compliment AFTER pushing to stack
                    this.elements.compliment.textContent = "";
                    this.elements.compliment.style.opacity = "0";

                    this.state.currentIndex++;
                    this.playCurrent();

                }, holdDuration);

            }, 300); // fade delay
        }



        pushToStack(item, compliment) {
            const card = document.createElement("div");
            card.className = "portrait-stack-card";

            card.innerHTML = `
                <div class="stack-image-wrapper">
                    <img src="${item.portraitDataUrl}" />
                    <div class="stack-compliment">
                        ${compliment}
                    </div>
                </div>
            `;

            this.elements.stack.prepend(card);

            const cards = Array.from(this.elements.stack.children);

            cards.forEach((card, index) => {
                card.style.transform = `
                    translateY(${index * 6}px)
                    scale(${1 - index * 0.04})
                    rotate(${index % 2 === 0 ? -4 : 4}deg)
                `;
                card.style.zIndex = 100 - index;
                card.style.opacity = 1 - index * 0.1;
            });

            while (cards.length > 10) {
                this.elements.stack.lastElementChild.remove();
            }
        }



        finish() {
            clearTimeout(this.state.timer);
            // 💕 Fade out music
            this.fadeOutMusic(2000);
            setTimeout(() => {
                this.startVideoAfterDelay(5);
            }, 1200);
            // Fade out portrait
            this.elements.portraitSection.style.opacity = "0";
            this.elements.portraitSection.style.transition = "opacity 1s ease";

            // setTimeout(() => {
            //     this.elements.portraitSection.classList.add("hidden");
            //     this.elements.videoSection.classList.remove("hidden");

            //     this.elements.video.src = "YOUR_VIDEO_URL_HERE";
            //     this.elements.video.play();
            // }, 1000);
        }

        loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        }


        setupMusicPlayer() {


            // Only show controls if music is enabled in config
            if (!GlobalConfig.music.enabled) {
                musicControls.style.display = 'none';
                return;
            }

            // Set music source and volume
            musicSource.src = GlobalConfig.music.musicUrl;
            bgMusic.volume = GlobalConfig.music.volume || 0.3;
            bgMusic.load();

            // Try autoplay if enabled
            if (GlobalConfig.music.autoplay) {
                const playPromise = bgMusic.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented by browser", error);
                        musicToggle.textContent = GlobalConfig.music.startText;
                    });
                }
            }

            // Toggle music on button click
            musicToggle.addEventListener('click', () => {
                if (bgMusic.paused) {
                    bgMusic.play();
                    musicToggle.textContent = GlobalConfig.music.stopText;
                } else {
                    bgMusic.pause();
                    musicToggle.textContent = GlobalConfig.music.startText;
                }
            });
        }

        fadeOutMusic(duration = 2000) {

            const bgMusic = document.getElementById("bgMusic");

            if (!bgMusic || bgMusic.paused) return;

            const fadeInterval = 50;
            const step = bgMusic.volume / (duration / fadeInterval);

            const fadeAudio = setInterval(() => {
                if (bgMusic.volume > step) {
                    bgMusic.volume -= step;
                } else {
                    bgMusic.volume = 0;
                    bgMusic.pause();
                    clearInterval(fadeAudio);
                }
            }, fadeInterval);
        }


        startVideoAfterDelay(delayInSeconds) {

            const video = document.getElementById('memoryVideo');
            const portraitFeature = document.getElementById('portraitFeature');
            const videoSection = document.getElementById('videoSection');

            // Hide portrait slideshow
            portraitFeature.classList.add('hidden');
            videoSection.classList.remove('hidden');

            // Start the timer
            let timer = delayInSeconds;
            const timerDisplay = document.createElement('div');
            timerDisplay.style.position = 'absolute';
            timerDisplay.style.top = '30px';
            timerDisplay.style.left = '10px';
            timerDisplay.style.padding = "10px"
            timerDisplay.style.fontSize = '16px';
            timerDisplay.style.color = 'white';
            // timerDisplay.textContent = `That's not it..."I may not be your first love but I wanna be your last forever.🥹💕"`;
            // timerDisplay.textContent = `Starting in: ${timer}s`;
            videoSection.appendChild(timerDisplay);

            const intervalId = setInterval(() => {
                timer--;
                timerDisplay.textContent = `That's not it..."I may not be your first love but I wanna be your last forever.🥹💕" \n\n Starting in: ${timer}s`;

                if (timer <= 0) {
                    clearInterval(intervalId);
                    timerDisplay.remove();

                    // Autoplay the video
                    video.src = GlobalConfig.video.url;
                    video.autoplay = GlobalConfig.video.autoplay;
                    video.playsInline = true;
                }
            }, 1000);
        }
    }



    document.getElementById("celebrationNextBtn")
        ?.addEventListener("click", function () {

            document.getElementById("container").classList.add('hidden')
            document.getElementById("orderModal").classList.remove('hidden')
            document.getElementById("portraitFeature")
                ?.classList.remove("hidden");
            document.getElementById("videoSection").classList.add('hidden')


            new PortraitSlideshow(config);
        });

})();
