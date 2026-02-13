(function () {
    /***
     * Portrait Slideshow
     * - Fetches images from a Google Drive folder (client-side list, server-side bytes)
     * - Converts to warm portrait style (3:4 by default), optional face-aware crop
     * - Generates one-line compliments via Gemini/OpenAI with fallback lines
     * - Animates as a stacked-card slideshow
     */

    const config = window.VALENTINE_CONFIG?.portraitSlideshow;
    const videoConfig = window.VALENTINE_CONFIG
    const API_BASE = "api/*"
    const showModal = document.getElementById('celebrationNextBtn')

    if (!config) return;

    // ---------- Defaults & helpers ----------
    //   const defaults = {
    //     cacheKeyPrefix: "valentine:portrait",
    //     portraitRatio: 3 / 4, // 3:4 or 4:5 (set via config)
    //     maxStackCards: 8,
    //     animation: { holdMs: 3500 },
    //     processing: {
    //       useFaceDetection: true,          // try FaceDetector if available
    //       warmthOverlayRGBA: "rgba(255, 180, 150, 0.14)", // subtle warmth
    //       backdropFilter: "blur(18px) brightness(0.75)",  // soft BG
    //       subjectFilter: "contrast(1.08) saturate(1.05) sepia(0.06)", // portrait vibe
    //       outputWidth: 720
    //     },
    //     googleDrive: {
    //       apiKey: "",          // if you keep client-side listing
    //       folderLink: ""       // optional default
    //     },
    //     ai: {
    //       enabled: false,
    //       provider: "gemini",  // or "openai"
    //       apiKey: "",
    //       model: "gemini-1.5-flash", // or "gpt-4o-mini" etc.
    //       prompt:
    //         "Write a short, sweet, romantic one-liner expressing love and appreciation."
    //     },
    //     fallbackCompliments: [
    //       "Your smile turns every ordinary moment into a beautiful memory.",
    //       "You make my heart feel calm, brave, and endlessly grateful.",
    //       "Loving you is my favorite chapter of every day.",
    //       "You are my safest place and my sweetest adventure.",
    //       "You glow with a kindness that makes the world softer."
    //     ]
    //   };

    //   const opts = {...config };

    const fallbackCompliments = config.fallbackCompliments || [
        'Your smile turns every ordinary moment into a beautiful memory.',
        'You make my heart feel calm, brave, and endlessly grateful.',
        'Loving you is my favorite chapter of every day.',
        'You are my safest place and my sweetest adventure.',
        'You glow with a kindness that makes the world softer.'
    ];

    // ---------- Slideshow class ----------
    class PortraitSlideshow {
        constructor(options) {
            this.options = options;

            this.state = {
                portraits: [],            // {id, name, originalUrl}
                compliments: new Map(),   // id -> text
                usedCompliments: new Set(), // to avoid repetition
                processed: [],            // { ...portrait, portraitDataUrl }
                currentIndex: 0,
                isPaused: false,
                isRunning: false,
                timer: null,
                preloadImage: null
            };

            this.elements = {
                folderInput: document.getElementById("driveFolderInput"),
                startBtn: document.getElementById("startPortraitBtn"),
                pauseBtn: document.getElementById("pausePortraitBtn"),
                resumeBtn: document.getElementById("resumePortraitBtn"),
                status: document.getElementById("portraitStatus"),
                stack: document.getElementById("portraitStack"),
                activeCard: document.getElementById("activePortraitCard"),
                activeImage: document.getElementById("activePortraitImage"),
                activeCompliment: document.getElementById("activePortraitCompliment"),
                finalMessage: document.getElementById("portraitFinalMessage")
            };

            this.bindEvents();
        }

        bindEvents() {
            //   this.elements.startBtn?.addEventListener("click", () => this.start());
            this.elements.startBtn?.addEventListener("click", () => this.start());
            this.elements.pauseBtn?.addEventListener("click", () => this.pause());
            this.elements.resumeBtn?.addEventListener("click", () => this.resume());
        }

        setStatus(message) {
            if (this.elements.status) this.elements.status.textContent = message;
        }

        // Create floating hearts and bears
 createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

        async start() {

            if (this.state.isRunning) return;


            const folderLink =
                this.elements.folderInput?.value?.trim() ||
                this.options.googleDrive.folderLink;

            if (!folderLink) {
                this.setStatus("Please paste a valid Google Drive folder link first.");
                return;
            }

            // reset state
            this.state.isRunning = true;
            this.state.currentIndex = 0;
            this.state.portraits = [];
            this.state.processed = [];
            this.state.compliments.clear();
            this.state.usedCompliments.clear();
            this.elements.stack.innerHTML = ` `;
            this.elements.finalMessage.classList.add("hidden");
            this.updateButtons("running");

            try {
                // 1) Fetch image list
                document.getElementById("portraitStatus").classList.remove('hidden')
                this.setStatus("Fetching your photos from Google Drive…");
                const images = await this.fetchDriveImages(folderLink);
                console.log("getting images", images)
                if (images.length === 0) {
                    throw new Error("No images found in the folder.");
                }


                const cleanedUrl = images.map(({ id, name, originalUrl }) => ({
                    id,
                    name,
                    originalUrl: String(originalUrl).replace(/\/$/, "")
                }));

                console.log("cleanedUrl", cleanedUrl)
                this.state.portraits = cleanedUrl;

                // // 2) Process into portrait cards
                this.setStatus("Converting photos into portrait cards…");
                this.state.processed = await Promise.all(
                    cleanedUrl.map((img) => this.processImage(img))
                );

                // 3) Generate or fetch compliments
                this.setStatus("Writing heartfelt one-liners…");
                console.log("his.state.processed", this.state.processed)
                await Promise.all(
                    this.state.processed.map((item) => this.generateCompliment(item))
                );

                // 4) Preload next and start
                this.preloadNext(this.state.currentIndex);
                this.setStatus("Starting your love story slideshow…");
                this.playCurrent();
            } catch (err) {
                console.error(err);
                this.setStatus(`Could not start slideshow: ${err.message}`);
                this.stop();
            }

        }

        updateButtons(mode) {
            const { startBtn, pauseBtn, resumeBtn } = this.elements;
            if (!startBtn || !pauseBtn || !resumeBtn) return;

            if (mode === "running") {
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                resumeBtn.disabled = true;
            } else if (mode === "paused") {
                pauseBtn.disabled = true;
                resumeBtn.disabled = false;
            } else {
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                resumeBtn.disabled = true;
            }
        }

        stop() {
            this.state.isPaused = false;
            this.state.isRunning = false;
            clearTimeout(this.state.timer);
            this.updateButtons("idle");
        }

        pause() {
            if (!this.state.isRunning) return;
            this.state.isPaused = true;
            clearTimeout(this.state.timer);
            this.setStatus("Paused. Press resume when you are ready 💖");
            this.updateButtons("paused");
        }

        resume() {
            if (!this.state.isRunning || this.state.isPaused === false) return;
            this.state.isPaused = false;
            this.setStatus("Resuming your portrait story…");
            this.updateButtons("running");
            this.playCurrent();
        }





        // --- GOOGLE DRIVE LISTING (server-side) ---
        async fetchDriveImages(folderLink) {

            const url = `${API_BASE}/api/drive-list?folder=${encodeURIComponent(folderLink)}`;
            console.log("Url of image", url)
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error("Drive list failed via server. Check service account & sharing.");
            }

            const data = await resp.json();
            if (!data.ok || !Array.isArray(data.files) || data.files.length === 0) {
                throw new Error("No images found (or not shared with the service account).");
            }

            // Map to image-streaming URLs via your proxy
            const finalData = data.files.map((file) => ({
                id: file.id,
                name: file.name,
                originalUrl: `${API_BASE}/api/drive-image?id=${encodeURIComponent(file.id)}`,
            }));

            console.log("finalData", finalData)

            return finalData
        }


        extractFolderId(link) {
            const patterns = [/folders\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/];
            for (const p of patterns) {
                const m = link.match(p);
                if (m?.[1]) return m[1];
            }
            return "";
        }

        // --- IMAGE → PORTRAIT PROCESSING ---
        async processImage(imageMeta) {

            console.log("imageMeta", imageMeta)
            const { processing = {}, cacheKeyPrefix, portraitRatio } = this.options;

            // Defensive defaults (in case config is mutated later)
            const outputW = processing.outputWidth || 720;
            const outputH = Math.round(outputW / (portraitRatio || (3 / 4)));

            const canvas = document.createElement("canvas");
            canvas.width = outputW;
            canvas.height = outputH;
            const ctx = canvas.getContext("2d");

            const image = await this.loadImage(imageMeta.originalUrl || imageMeta);
            const crop = await this.estimateCrop(image, portraitRatio || (3 / 4));

            // Safe filters
            const backdropFilter = processing.backdropFilter || "blur(18px) brightness(0.75)";
            const subjectFilter = processing.subjectFilter || "contrast(1.08) saturate(1.05) sepia(0.06)";
            const warmthOverlayRGBA = processing.warmthOverlayRGBA || "rgba(255, 180, 150, 0.14)";

            // 2) Backdrop
            ctx.filter = backdropFilter;
            ctx.drawImage(image, 0, 0, outputW, outputH);

            // 3) Subject
            ctx.filter = subjectFilter;
            ctx.globalAlpha = 0.98;
            ctx.drawImage(image, crop.x, crop.y, crop.w, crop.h, 0, 0, outputW, outputH);
            ctx.filter = "none";
            ctx.globalAlpha = 1;

            // 4) Vignette
            const vignette = ctx.createRadialGradient(
                outputW / 2, outputH / 2, outputH / 3,
                outputW / 2, outputH / 2, outputH
            );
            vignette.addColorStop(0, "rgba(255,255,255,0)");
            vignette.addColorStop(1, "rgba(25,10,20,0.35)");
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, outputW, outputH);

            // 5) Warm overlay
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = warmthOverlayRGBA;
            ctx.fillRect(0, 0, outputW, outputH);
            ctx.globalCompositeOperation = "source-over";

            const portraitDataUrl = canvas.toDataURL("image/jpeg", 0.92);
            localStorage.setItem(`${cacheKeyPrefix}:${imageMeta.id}`, portraitDataUrl);
            return { ...imageMeta, portraitDataUrl };
        }

        async estimateCrop(image, ratio) {
            const useFD = !!(this.options?.processing?.useFaceDetection);
            if (useFD && "FaceDetector" in window) {
                try {
                    const detector = new window.FaceDetector({ fastMode: true });
                    const faces = await detector.detect(image);
                    if (faces?.length) {
                        const main = faces.reduce((a, b) =>
                            (a.boundingBox.width * a.boundingBox.height) >
                                (b.boundingBox.width * b.boundingBox.height) ? a : b
                        );
                        const bb = main.boundingBox;
                        const cx = bb.x + bb.width / 2;
                        const cy = bb.y + bb.height * 0.45;

                        const targetH = Math.min(image.height, bb.height * 3.0);
                        const targetW = targetH * ratio;

                        let w = Math.min(image.width, Math.max(targetW, bb.width * 2.0));
                        let h = Math.round(w / ratio);

                        let x = Math.max(0, Math.round(cx - w / 2));
                        let y = Math.max(0, Math.round(cy - h / 2));
                        if (x + w > image.width) x = image.width - w;
                        if (y + h > image.height) y = image.height - h;

                        return { x, y, w, h };
                    }
                } catch {
                    // fall through to heuristic
                }
            }

            // Heuristic fallback
            const sourceRatio = image.width / image.height;
            let w = image.width, h = image.height, x = 0, y = 0;
            if (sourceRatio > ratio) {
                w = Math.round(image.height * ratio);
                x = Math.round((image.width - w) / 2);
            } else {
                h = Math.round(image.width / ratio);
                y = Math.round((image.height - h) * 0.3);
            }
            return { x, y, w, h };
        }

        // --- AI COMPLIMENTS ---
        async generateCompliment(item) {
            const cacheKey = `${this.options.cacheKeyPrefix}:compliment:${item.id}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                this.state.compliments.set(item.id, cached);
                this.state.usedCompliments.add(cached.toLowerCase());
                return;
            }

            let compliment = this.getFallbackCompliment(this.state.compliments.size);
            const aiConfig = this.options.ai || {};

            if (aiConfig.enabled && aiConfig.apiKey) {
                try {
                    compliment = await this.callAiForCompliment(item.id);
                } catch (error) {
                    console.warn("AI compliment failed, using fallback:", error.message);
                }
            }

            compliment = this.deDupeCompliment(compliment);
            this.state.compliments.set(item.id, compliment);
            this.state.usedCompliments.add(compliment.toLowerCase());
            localStorage.setItem(cacheKey, compliment);
        }

        deDupeCompliment(text) {
            // Avoid duplicates; if seen, rotate to a fallback line
            if (this.state.usedCompliments.has(text.toLowerCase())) {
                const alt = this.getFallbackCompliment(this.state.usedCompliments.size);
                return alt;
            }
            return text;
        }

        async callAiForCompliment(seed) {
            const usedList = Array.from(this.state.usedCompliments).join(" | ").slice(0, 600);
            const prompt =
                `${this.options.ai.prompt} Keep it under 15 words. and add loving emoji's at end of every compliment` +
                `Avoid repeating earlier lines. Seed: ${seed}. ` +
                (usedList ? `Already used: ${usedList}` : "");

            const provider = this.options.ai.provider;

            if (provider === "gemini") {
                const endpoint =
                    `https://generativelanguage.googleapis.com/v1beta/models/` +
                    `${this.options.ai.model}:generateContent?key=${this.options.ai.apiKey}`;

                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });
                if (!response.ok) throw new Error("Gemini request failed.");
                const data = await response.json();
                return this.normalizeCompliment(
                    data.candidates?.[0]?.content?.parts?.[0]?.text || ""
                );
            }

            if (provider === "openai") {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.options.ai.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.options.ai.model,
                        messages: [{ role: "user", content: prompt }],
                        temperature: 0.9,
                        max_tokens: 40
                    })
                });
                if (!response.ok) throw new Error("OpenAI request failed.");
                const data = await response.json();
                return this.normalizeCompliment(
                    data.choices?.[0]?.message?.content || ""
                );
            }

            return this.getFallbackCompliment(this.state.compliments.size);
        }

        normalizeCompliment(text) {
            // strip quotes/newlines, trim and cap at 15 words
            const clean = text.replace(/[\n\r]/g, " ").replace(/^"|"$/g, "").trim();
            const words = clean.split(/\s+/).filter(Boolean).slice(0, 15);
            const out = words.join(" ");
            return `"${out}"` || this.getFallbackCompliment(this.state.compliments.size);
        }

        getFallbackCompliment(index) {
            return fallbackCompliments[index % fallbackCompliments.length];
        }



        // --- PLAYBACK / ANIMATION ---
        playCurrent() {
            if (!this.state.isRunning || this.state.isPaused) return;
            createFloatingElements()
            const current = this.state.processed[this.state.currentIndex];
            console.log("current", current)
            if (!current) {
                this.finish();
                return;
            }



            const compliment =
                this.state.compliments.get(current.id) ||
                this.getFallbackCompliment(this.state.currentIndex);

            this.elements.activeImage.classList.remove("hidden")
            this.elements.activeImage.src = current.portraitDataUrl;
            this.elements.activeCompliment.textContent = compliment;

            // Restart animation classes to trigger CSS transitions
            this.elements.activeCard.classList.remove("portrait-enter", "portrait-settle");
            void this.elements.activeCard.offsetWidth; // reflow
            this.elements.activeCard.classList.add("portrait-enter");

            // Show for holdMs, then push to stack & advance
            const holdDuration = this.options.animation.holdMs;

            this.state.timer = setTimeout(() => {
                this.pushToStack(current);
                this.preloadNext(this.state.currentIndex); // Preload next based on current
                this.state.currentIndex += 1;
                this.playCurrent();
            }, holdDuration);

        }

        pushToStack(item) {
            const card = document.createElement("div");
            card.className = "portrait-stack-card";
            card.innerHTML = `<img src="${item.portraitDataUrl}" alt="Memory portrait" />`;

            // Update CSS variable for depth & rotation effects
            const previousCards = Array.from(this.elements.stack.children);
            previousCards.forEach((existing, idx) => {
                existing.style.setProperty("--stack-index", String(idx + 1));
            });

            card.style.setProperty("--stack-index", "0");
            this.elements.stack.prepend(card);

            // Trim stack
            const maxStack = this.options.maxStackCards;
            while (this.elements.stack.children.length > maxStack) {
                this.elements.stack.lastElementChild?.remove();
            }
        }

        preloadNext(currentIndex) {
            const nextItem = this.state.processed[currentIndex + 1];
            if (!nextItem) return;
            const img = new Image();
            img.src = nextItem.portraitDataUrl;
            this.state.preloadImage = img;
        }



        finish() {
            this.stop();
            document.getElementById("portraitFeature").classList.add('hidden')
            this.elements.activeCard.classList.add("hidden");
            this.elements.activeImage.classList.add("hidden");
            document.getElementById("videoSection").classList.remove('hidden')
            this.startVideoAfterDelay(5)
            // this.setStatus("All portraits shown. Every memory is now part of our stack.");
            // this.elements.finalMessage.classList.add("hidden");
            
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
                timerDisplay.textContent = `That's not it..."I may not be your first love but I wanna be your last forever.🥹💕"`;
                timerDisplay.textContent = `Starting in: ${timer}s`;
    
                if (timer <= 0) {
                    clearInterval(intervalId);
                    timerDisplay.remove();
    
                    // Autoplay the video
                    video.src = videoConfig.video.url;
                    video.autoplay = config.video.autoplay;
                    video.playsInline = true;
                    video.muted = false;
                }
            }, 1000);
        }
    
        

        loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();

                // IMPORTANT: set crossOrigin BEFORE src if you're loading from a different origin
                // Use it when API_BASE is non-empty (i.e., cross-origin) or when hostname differs.
                try {
                    const u = new URL(src, window.location.href);
                    const isCross =
                        u.origin !== window.location.origin; // 127.0.0.1:5500 vs localhost:8000
                    if (isCross) img.crossOrigin = "anonymous";
                } catch {
                    // if URL parsing fails, leave as-is
                    img.crossOrigin = "anonymous";
                }

                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error("Image failed to load for portrait conversion."));
                img.src = src;
            });
        }
    }

    // window.addEventListener("DOMContentLoaded", () => {
    //         new PortraitSlideshow(config);

    // });

    showModal.addEventListener('click', function () {
        console.log("click")
        document.getElementById("container").classList.add('hidden')
        document.getElementById("orderModal").classList.remove('hidden')
        document.getElementById("portraitFeature").classList.remove('hidden')
        document.getElementById("videoSection").classList.add('hidden')
        new PortraitSlideshow(config);
    })
})();
