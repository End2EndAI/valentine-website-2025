(function () {
    const config = window.VALENTINE_CONFIG?.portraitSlideshow;

    if (!config) {
        return;
    }

    const fallbackCompliments = config.fallbackCompliments || [
        'Your smile turns every ordinary moment into a beautiful memory.',
        'You make my heart feel calm, brave, and endlessly grateful.',
        'Loving you is my favorite chapter of every day.',
        'You are my safest place and my sweetest adventure.',
        'You glow with a kindness that makes the world softer.'
    ];

    class PortraitSlideshow {
        constructor(options) {
            this.options = options;
            this.state = {
                portraits: [],
                compliments: new Map(),
                processed: [],
                currentIndex: 0,
                isPaused: false,
                isRunning: false,
                timer: null,
                preloadImage: null
            };

            this.elements = {
                folderInput: document.getElementById('driveFolderInput'),
                startBtn: document.getElementById('startPortraitBtn'),
                pauseBtn: document.getElementById('pausePortraitBtn'),
                resumeBtn: document.getElementById('resumePortraitBtn'),
                status: document.getElementById('portraitStatus'),
                stack: document.getElementById('portraitStack'),
                activeCard: document.getElementById('activePortraitCard'),
                activeImage: document.getElementById('activePortraitImage'),
                activeCompliment: document.getElementById('activePortraitCompliment'),
                finalMessage: document.getElementById('portraitFinalMessage')
            };

            this.bindEvents();
        }

        bindEvents() {
            this.elements.startBtn?.addEventListener('click', () => this.start());
            this.elements.pauseBtn?.addEventListener('click', () => this.pause());
            this.elements.resumeBtn?.addEventListener('click', () => this.resume());
        }

        setStatus(message) {
            if (this.elements.status) {
                this.elements.status.textContent = message;
            }
        }

        async start() {
            if (this.state.isRunning) {
                return;
            }

            const folderLink = this.elements.folderInput?.value?.trim() || this.options.googleDrive.folderLink;
            console.log("folderLink", folderLink)
            if (!folderLink) {
                this.setStatus('Please paste a valid Google Drive folder link first.');
                return;
            }

            this.state.isRunning = true;
            this.state.currentIndex = 0;
            this.state.portraits = [];
            this.state.processed = [];
            this.state.compliments.clear();
            this.elements.stack.innerHTML = '';
            this.elements.finalMessage.classList.add('hidden');

            this.updateButtons('running');

            try {
                this.setStatus('Fetching your photos from Google Drive…');
                const images = await this.fetchDriveImages(folderLink);
                if (images.length === 0) {
                    throw new Error('No images found in the folder.');
                }

                this.setStatus('Converting photos into portrait cards…');
                this.state.processed = await Promise.all(images.map((image) => this.processImage(image)));

                this.setStatus('Writing heartfelt one-liners…');
                await Promise.all(this.state.processed.map((item) => this.generateCompliment(item)));

                this.preloadNext(0);
                this.setStatus('Starting your love story slideshow…');
                this.playCurrent();
            } catch (error) {
                console.error(error);
                this.setStatus(`Could not start slideshow: ${error.message}`);
                this.stop();
            }
        }

        updateButtons(mode) {
            if (!this.elements.startBtn || !this.elements.pauseBtn || !this.elements.resumeBtn) {
                return;
            }

            if (mode === 'running') {
                this.elements.startBtn.disabled = true;
                this.elements.pauseBtn.disabled = false;
                this.elements.resumeBtn.disabled = true;
            } else if (mode === 'paused') {
                this.elements.pauseBtn.disabled = true;
                this.elements.resumeBtn.disabled = false;
            } else {
                this.elements.startBtn.disabled = false;
                this.elements.pauseBtn.disabled = true;
                this.elements.resumeBtn.disabled = true;
            }
        }

        stop() {
            this.state.isPaused = false;
            this.state.isRunning = false;
            clearTimeout(this.state.timer);
            this.updateButtons('idle');
        }

        pause() {
            if (!this.state.isRunning) {
                return;
            }
            this.state.isPaused = true;
            clearTimeout(this.state.timer);
            this.setStatus('Paused. Press resume when you are ready 💖');
            this.updateButtons('paused');
        }

        resume() {
            if (!this.state.isRunning || !this.state.isPaused) {
                return;
            }
            this.state.isPaused = false;
            this.setStatus('Resuming your portrait story…');
            this.updateButtons('running');
            this.playCurrent();
        }

        async fetchDriveImages(folderLink) {
            const folderId = this.extractFolderId(folderLink);
            if (!folderId) {
                throw new Error('Invalid Google Drive folder link.');
            }

            const pageSize = 100;
            let nextPageToken = '';
            const allFiles = [];

            do {
                const queryParams = new URLSearchParams({
                    key: this.options.googleDrive.apiKey,
                    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
                    fields: "nextPageToken, files(id, name, mimeType)",
                    pageSize: String(pageSize),
                    supportsAllDrives: "true",
                    includeItemsFromAllDrives: "true"
                });

        

                if (nextPageToken) {
                    queryParams.set('pageToken', nextPageToken);
                }

                const response = await fetch(`https://www.googleapis.com/drive/v3/files?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Google Drive API request failed. Check API key and sharing settings.');
                }

                const data = await response.json();
                console.log("dataImages",data)
                allFiles.push(...(data.files || []));
                nextPageToken = data.nextPageToken || '';
            } while (nextPageToken);


            const finalData = allFiles.map((file) => ({
                id: file.id,
                name: file.name,
                originalUrl: `http://localhost:8000/api/drive-image?id=${encodeURIComponent(file.id)}`
            }));

            console.log("finalData", finalData)

            return finalData
        }

        extractFolderId(link) {
            const patterns = [/folders\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/];
            for (const pattern of patterns) {
                const match = link.match(pattern);
                if (match?.[1]) {
                    return match[1];
                }
            }
            return '';
        }

        async processImage(imageMeta) {
            const cacheKey = `${this.options.cacheKeyPrefix}:${imageMeta.id}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                return { ...imageMeta, portraitDataUrl: cached };
            }

            const image = await this.loadImage(imageMeta.originalUrl);
            const canvas = document.createElement('canvas');
            const ratio = this.options.portraitRatio;
            const outputWidth = 720;
            const outputHeight = Math.round(outputWidth / ratio);
            canvas.width = outputWidth;
            canvas.height = outputHeight;

            const ctx = canvas.getContext('2d');
            const sourceRatio = image.width / image.height;

            let sourceWidth = image.width;
            let sourceHeight = image.height;
            let sourceX = 0;
            let sourceY = 0;

            if (sourceRatio > ratio) {
                sourceWidth = image.height * ratio;
                sourceX = (image.width - sourceWidth) / 2;
            } else {
                sourceHeight = image.width / ratio;
                sourceY = (image.height - sourceHeight) * 0.3;
            }

            ctx.filter = 'blur(18px) brightness(0.75)';
            ctx.drawImage(image, 0, 0, outputWidth, outputHeight);

            ctx.filter = 'none';
            ctx.globalAlpha = 0.95;
            ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, outputWidth, outputHeight);

            const vignette = ctx.createRadialGradient(
                outputWidth / 2,
                outputHeight / 2,
                outputHeight / 3,
                outputWidth / 2,
                outputHeight / 2,
                outputHeight
            );
            vignette.addColorStop(0, 'rgba(255, 255, 255, 0)');
            vignette.addColorStop(1, 'rgba(25, 10, 20, 0.35)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, outputWidth, outputHeight);

            ctx.globalCompositeOperation = 'overlay';
            ctx.fillStyle = 'rgba(255, 180, 150, 0.14)';
            ctx.fillRect(0, 0, outputWidth, outputHeight);
            ctx.globalCompositeOperation = 'source-over';

            const portraitDataUrl = canvas.toDataURL('image/jpeg', 0.92);
            localStorage.setItem(cacheKey, portraitDataUrl);

            return {
                ...imageMeta,
                portraitDataUrl
            };
        }

        async generateCompliment(item) {
            const cacheKey = `${this.options.cacheKeyPrefix}:compliment:${item.id}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                this.state.compliments.set(item.id, cached);
                return;
            }

            let compliment = this.getFallbackCompliment(this.state.compliments.size);
            const aiConfig = this.options.ai || {};

            if (aiConfig.enabled && aiConfig.apiKey) {
                try {
                    compliment = await this.callAiForCompliment(item.id);
                } catch (error) {
                    console.warn('AI compliment failed, using fallback:', error.message);
                }
            }

            this.state.compliments.set(item.id, compliment);
            localStorage.setItem(cacheKey, compliment);
        }

        async callAiForCompliment(seed) {
            const prompt = `${this.options.ai.prompt} Keep it under 15 words. Avoid repeating earlier lines. Seed: ${seed}.`;
            const aiProvider = this.options.ai.provider;

            if (aiProvider === 'gemini') {
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.options.ai.model}:generateContent?key=${this.options.ai.apiKey}`;
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                });

                if (!response.ok) {
                    throw new Error('Gemini request failed.');
                }

                const data = await response.json();
                return this.normalizeCompliment(data.candidates?.[0]?.content?.parts?.[0]?.text || '');
            }

            if (aiProvider === 'openai') {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.options.ai.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.options.ai.model,
                        messages: [{ role: 'user', content: prompt }],
                        temperature: 0.9,
                        max_tokens: 40
                    })
                });

                if (!response.ok) {
                    throw new Error('OpenAI request failed.');
                }

                const data = await response.json();
                return this.normalizeCompliment(data.choices?.[0]?.message?.content || '');
            }

            return this.getFallbackCompliment(this.state.compliments.size);
        }

        normalizeCompliment(text) {
            const clean = text.replace(/[\n\r]/g, ' ').replace(/^"|"$/g, '').trim();
            const words = clean.split(/\s+/).filter(Boolean).slice(0, 15);
            return words.join(' ') || this.getFallbackCompliment(this.state.compliments.size);
        }

        getFallbackCompliment(index) {
            return fallbackCompliments[index % fallbackCompliments.length];
        }

        playCurrent() {
            if (!this.state.isRunning || this.state.isPaused) {
                return;
            }

            const current = this.state.processed[this.state.currentIndex];
            if (!current) {
                this.finish();
                return;
            }

            const compliment = this.state.compliments.get(current.id) || this.getFallbackCompliment(this.state.currentIndex);
            this.elements.activeImage.src = current.portraitDataUrl;
            this.elements.activeCompliment.textContent = compliment;

            this.elements.activeCard.classList.remove('portrait-enter', 'portrait-settle');
            void this.elements.activeCard.offsetWidth;
            this.elements.activeCard.classList.add('portrait-enter');

            const holdDuration = this.options.animation.holdMs;
            this.state.timer = setTimeout(() => {
                this.pushToStack(current);
                this.state.currentIndex += 1;
                this.preloadNext(this.state.currentIndex);
                this.playCurrent();
            }, holdDuration);
        }

        pushToStack(item) {
            const card = document.createElement('div');
            card.className = 'portrait-stack-card';
            card.innerHTML = `<img src="${item.portraitDataUrl}" alt="Memory portrait">`;

            const previousCards = Array.from(this.elements.stack.children);
            previousCards.forEach((existing, idx) => {
                existing.style.setProperty('--stack-index', String(idx + 1));
            });

            card.style.setProperty('--stack-index', '0');
            this.elements.stack.prepend(card);

            const maxStack = this.options.maxStackCards;
            while (this.elements.stack.children.length > maxStack) {
                this.elements.stack.lastElementChild?.remove();
            }
        }

        preloadNext(nextIndex) {
            const nextItem = this.state.processed[nextIndex + 1];
            if (!nextItem) {
                return;
            }

            const img = new Image();
            img.src = nextItem.portraitDataUrl;
            this.state.preloadImage = img;
        }

        finish() {
            this.stop();
            this.elements.activeCard.classList.add('portrait-fade-out');
            this.setStatus('All portraits shown. Every memory is now part of our stack.');
            this.elements.finalMessage.classList.remove('hidden');
        }

        loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                // img.crossOrigin = 'anonymous';
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('Image failed to load for portrait conversion.'));
                img.src = src;
            });
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        new PortraitSlideshow(config);
    });
})();
