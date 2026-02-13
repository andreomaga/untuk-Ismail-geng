document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const body = document.body;
        const icon = themeToggle.querySelector('i');
        
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // ===== SLIDER FOTO =====
    function initSlider() {
        const slider = document.getElementById('slider');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (!slider || !slides.length) return;
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                if (dot) {
                    if (index === currentIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
        
        updateSlider();
        
        // AUTO SLIDE
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
    
    // ===== MUSIC PLAYER =====
    function initMusicPlayer() {
        const audio = document.getElementById('audio');
        const playBtn = document.getElementById('play-pause');
        const playIcon = document.getElementById('play-icon');
        const progress = document.getElementById('progress');
        const progressBar = document.getElementById('progress-bar');
        const playMusicBtn = document.getElementById('play-music-btn');
        
        if (!audio) return;
        
        audio.volume = 0.5;
        
        // Hero button
        if (playMusicBtn) {
            playMusicBtn.addEventListener('click', function(e) {
                e.preventDefault();
                audio.play()
                    .then(() => {
                        if (playIcon) {
                            playIcon.classList.remove('fa-play');
                            playIcon.classList.add('fa-pause');
                        }
                    })
                    .catch(err => {
                        console.log('Autoplay error:', err);
                        alert('Klik play di music player ya!');
                    });
            });
        }
        
        // Play/Pause button
        if (playBtn && playIcon) {
            playBtn.addEventListener('click', function() {
                if (audio.paused) {
                    audio.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                } else {
                    audio.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                }
            });
        }
        
        // Progress bar
        if (audio && progress && progressBar) {
            audio.addEventListener('timeupdate', function() {
                const percent = (audio.currentTime / audio.duration) * 100 || 0;
                progress.style.width = percent + '%';
            });
            
            progressBar.addEventListener('click', function(e) {
                const rect = progressBar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = (x / rect.width) * 100;
                const seekTime = (percent / 100) * audio.duration;
                audio.currentTime = seekTime;
                progress.style.width = percent + '%';
            });
        }
        
        // Close player
        const closeBtn = document.getElementById('close-player');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                const player = document.getElementById('music-player');
                if (player) player.style.display = 'none';
            });
        }
    }
    
    // ===== FLOATING BUBBLES =====
    function initBubbles() {
        function createBubble() {
            const container = document.getElementById('bubble-container');
            if (!container) return;
            
            const bubble = document.createElement('div');
            bubble.className = 'floating-bubble';
            
            const emojis = ['🤝', '🫶', '✨', '🎵', '🍜', '🥤', '🤙', '🏠', '❤️', '👋'];
            bubble.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            container.appendChild(bubble);
            
            setTimeout(() => {
                if (bubble.parentNode) bubble.remove();
            }, 10000);
        }
        
        // Create bubbles periodically
        setInterval(createBubble, 2000);
        for (let i = 0; i < 3; i++) setTimeout(createBubble, i * 300);
    }
    
    // ===== SCROLL BUTTON =====
    function initScrollButton() {
        const scrollBtn = document.getElementById('scroll-btn');
        if (scrollBtn) {
            scrollBtn.addEventListener('click', function() {
                const photoSection = document.querySelector('.photo-section');
                if (photoSection) {
                    photoSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // ===== RUN ALL =====
    initThemeToggle();
    initSlider();
    initMusicPlayer();
    initBubbles();
    initScrollButton();
});        const progress = document.getElementById('progress');
        const progressBar = document.getElementById('progress-bar');
        const playMusicBtn = document.getElementById('play-music-btn');
        
        // Set volume awal
        audio.volume = 0.4;
        
        // Play dari hero button
        if (playMusicBtn) {
            playMusicBtn.addEventListener('click', function() {
                audio.play()
                    .then(() => {
                        playIcon.classList.remove('fa-play');
                        playIcon.classList.add('fa-pause');
                    })
                    .catch(error => {
                        console.log('Autoplay dicegah browser:', error);
                        alert('Tekan play di music player ya!');
                    });
            });
        }
        
        // Play/Pause toggle
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        });
        
        // Update progress bar
        audio.addEventListener('timeupdate', function() {
            const percent = (audio.currentTime / audio.duration) * 100 || 0;
            progress.style.width = percent + '%';
        });
        
        // Click on progress bar to seek
        progressBar.addEventListener('click', function(e) {
            const rect = progressBar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / rect.width) * 100;
            const seekTime = (percent / 100) * audio.duration;
            audio.currentTime = seekTime;
            progress.style.width = percent + '%';
        });
        
        // Close player
        const closeBtn = document.getElementById('close-player');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                document.getElementById('music-player').style.display = 'none';
            });
        }
        
        // Next/Prev simulation
        const nextBtn = document.getElementById('next-song');
        const prevBtn = document.getElementById('prev-song');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                alert('Lagu berikutnya: "Kisah Kasih di Sekolah" - Chrisye ✨');
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                alert('Lagu sebelumnya: "Bendera" - Cokelat 🎸');
            });
        }
        
        // Auto play pause saat audio selesai
        audio.addEventListener('ended', function() {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            progress.style.width = '0%';
        });
    }
    
    // ========== 4. FLOATING BUBBLES ==========
    function initBubbles() {
        // Create bubble function global
        window.createBubble = function() {
            const bubbleContainer = document.getElementById('bubble-container');
            if (!bubbleContainer) return;
            
            const bubble = document.createElement('div');
            bubble.className = 'floating-bubble';
            
            // Random emoji persahabatan
            const emojis = ['🤝', '🫶', '✨', '🎵', '🍜', '🥤', '🤙', '🏠', '❤️', '👋', '💬', '📸'];
            bubble.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random position
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
            
            bubbleContainer.appendChild(bubble);
            
            // Remove after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 10000);
        };
        
        // Create bubbles periodically
        setInterval(createBubble, 2000);
        
        // Create initial bubbles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createBubble(), i * 300);
        }
