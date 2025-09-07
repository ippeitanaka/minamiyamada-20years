// 南山田小学校 20歳を祝う会 前日祭 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール機能
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // スクロール時のアニメーション
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.content-card, .guest-card, .overview-card, .detail-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // カウントダウン機能
    function countdown() {
        const eventDate = new Date('2026-01-11T13:00:00');
        
        function updateCountdown() {
            const now = new Date();
            const timeLeft = eventDate - now;
            
            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                // カウントダウン表示要素があれば更新
                const countdownElement = document.querySelector('.countdown');
                if (countdownElement) {
                    countdownElement.innerHTML = `
                        <div class="countdown-item">
                            <span class="countdown-number">${days}</span>
                            <span class="countdown-label">日</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${hours}</span>
                            <span class="countdown-label">時間</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${minutes}</span>
                            <span class="countdown-label">分</span>
                        </div>
                        <div class="countdown-item">
                            <span class="countdown-number">${seconds}</span>
                            <span class="countdown-label">秒</span>
                        </div>
                    `;
                }
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // パーティクル効果（オプション）
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        
        document.body.appendChild(particleContainer);
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ff6b6b;
                border-radius: 50%;
                opacity: 0.6;
                animation: float 8s linear infinite;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 8}s;
            `;
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 8000);
        }
        
        // パーティクルアニメーションCSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-10px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // パーティクルを定期的に生成
        setInterval(createParticle, 2000);
    }

    // イースターエッグ：校歌再生機能（オプション）
    function addSchoolSongEasterEgg() {
        let clickCount = 0;
        const schoolLogo = document.querySelector('.hero-title');
        
        if (schoolLogo) {
            schoolLogo.addEventListener('click', function() {
                clickCount++;
                
                if (clickCount === 5) {
                    // 5回クリックで特別メッセージ
                    const message = document.createElement('div');
                    message.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                        color: white;
                        padding: 20px 40px;
                        border-radius: 15px;
                        font-size: 1.2rem;
                        z-index: 1000;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                        animation: bounceIn 0.6s ease;
                    `;
                    message.textContent = '�� おめでとうございます！20歳の門出を心よりお祝いします！ 🎉';
                    
                    document.body.appendChild(message);
                    
                    setTimeout(() => {
                        message.remove();
                        clickCount = 0;
                    }, 3000);
                }
            });
        }
    }

    // ローディング完了後のアニメーション
    function initializeAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDetails = document.querySelector('.hero-details');
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroTitle) {
            heroTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
        }
        if (heroDetails) {
            heroDetails.style.animation = 'fadeInUp 1s ease 0.4s both';
        }
        if (heroDescription) {
            heroDescription.style.animation = 'fadeInUp 1s ease 0.6s both';
        }
    }

    // 画像の遅延読み込み
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // すべての機能を初期化
    smoothScroll();
    handleScrollAnimation();
    countdown();
    createParticles();
    addSchoolSongEasterEgg();
    initializeAnimations();
    lazyLoadImages();
    
    // ページ読み込み完了メッセージ
    console.log('🌸 南山田小学校 20歳を祝う会 前日祭のWebサイトへようこそ！ 🌸');
    console.log('📅 2026年1月11日（日）13:00〜16:00');
    console.log('🏫 会場：南山田小学校');
    console.log('🎉 皆様のご参加をお待ちしております！');
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', function() {
    // レスポンシブ対応の追加処理があればここに記述
});

// ページ離脱前の確認（必要に応じて）
window.addEventListener('beforeunload', function(e) {
    // 特別な処理が必要な場合のみ使用
    // e.preventDefault();
    // e.returnValue = '';
});
