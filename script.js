document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & State ---
    const correctPassword = "ZAKARIA+NASSIMA=LOVE+00";
    let currentQuizStep = 0;
    const quizAnswers = { meeting: '', feeling: '', future: '' };
    const quizQuestions = [
        { id: 'meeting', q: 'Fin tlaqina awel merra? ✨', p: 'Gouli liya dik l-lblasa...' },
        { id: 'feeling', q: 'Chnou akbar haja kat bghih fia? ❤️', p: 'Ktebi dakchi li f-qalbek...' },
        { id: 'future', q: 'Fin katchoufi blastna mn hnaya l-5 snin? 🏠', p: 'Ahlamak m3aya...' }
    ];

    const memories = [
        { id: 1, url: './assets/m4.png', title: "أول ركوب خيل", caption: "هاد النهار كان من أحلى الأيام، ركبنا الخيل وضحكنا من قلبنا.. كانت لحظة سحرية معاك." },
        { id: 2, url: './assets/m5.jpg', title: "نهار التخرج", caption: "فرحة التخرج كانت كبيرة، ولكن الفرحة الحقيقية هي أنك كنتي جالسة جنبي ومنورة ليا هاد النهار." },
        { id: 3, url: './assets/m1.jpg', title: "وسط الطبيعة", caption: "الهدوء والخضورية.. وشوفاتك اللي كيكفيوني عن العالم كامل." },
        { id: 4, url: './assets/m6.png', title: "سحر النظرات", caption: "كل نظرة منك كتقول ليا أنني محظوظ بزاف حيت نتي في حياتي." },
        { id: 5, url: './assets/m7.png', title: "ضحكتك المنورة", caption: "الضحكة اللي مكاتفارقش بالي، هي الأمل ديالي كل نهار." },
        { id: 6, url: './assets/m8.png', title: "لحظات السعادة", caption: "معاك ديما كنكون فرحان ومرتاح، كأن العالم وقف في ديك اللحظة." },
        { id: 7, url: './assets/m9.png', title: "انتي الحياة", caption: "ببلا بيك الحياة ناقصة بزاف، نتي هي الروح ديال هاد العلاقة." },
        { id: 8, url: './assets/m2.jpg', title: "وقت الثلج", caption: "وخا يكون البرد قارس، دفء قلبك كيخلي كلشي جميل وحنين." },
        { id: 9, url: './assets/m3.png', title: "ضحكة من القلب", caption: "ضحكتك هي الموسيقى اللي كنبغي نسمعها كل صباح." }
    ];

    // --- DOM Elements ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const startBtn = document.getElementById('start-btn');
    const passwordError = document.getElementById('password-error');
    const youtubeIframe = document.getElementById('youtube-iframe');
    
    const quizQuestion = document.getElementById('quiz-question');
    const quizTextarea = document.getElementById('quiz-textarea');
    const quizDots = document.getElementById('quiz-dots');
    const quizNext = document.getElementById('quiz-next');
    const quizBtnText = document.getElementById('quiz-btn-text');
    const quizContentWrap = document.getElementById('quiz-content');
    const quizSuccessWrap = document.getElementById('quiz-success');

    const optYes = document.getElementById('opt-yes');
    const optNo = document.getElementById('opt-no');
    const sendRequestBtn = document.getElementById('send-request-btn');
    const requestSuccess = document.getElementById('request-success');

    // --- Welcome Logic ---
    startBtn.addEventListener('click', () => {
        const input = passwordInput.value.replace(/\s+/g, '').toUpperCase();
        const target = correctPassword.replace(/\s+/g, '').toUpperCase();

        if (input === target) {
            welcomeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Play Music
            youtubeIframe.src = "https://www.youtube.com/embed/6GWEr2hK1cg?autoplay=1&loop=1&playlist=6GWEr2hK1cg";
            startAnimations();
        } else {
            welcomeScreen.querySelector('.glass-card').classList.add('shake');
            passwordError.classList.remove('hidden');
            setTimeout(() => {
                welcomeScreen.querySelector('.glass-card').classList.remove('shake');
            }, 500);
        }
    });

    // --- Floating Hearts ---
    function createFloatingHeart() {
        if (mainContent.classList.contains('hidden')) return;
        const container = document.getElementById('heart-container');
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.setProperty('--duration', (Math.random() * 5 + 10) + 's');
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }
    setInterval(createFloatingHeart, 1000);

    // --- Heart Trail ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.1) return; // Save performance
        const heart = document.createElement('div');
        heart.className = 'heart-cursor';
        heart.innerHTML = '❤️';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    });

    // --- Quiz Logic ---
    function updateQuiz() {
        const step = quizQuestions[currentQuizStep];
        quizQuestion.innerText = step.q;
        quizTextarea.placeholder = step.p;
        quizTextarea.value = quizAnswers[step.id] || '';
        
        // Update Dots
        quizDots.innerHTML = '';
        quizQuestions.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `dot ${i === currentQuizStep ? 'active' : ''}`;
            quizDots.appendChild(dot);
        });

        quizBtnText.innerText = currentQuizStep === quizQuestions.length - 1 ? 'نرسل قلبي' : 'السؤال لي جاي';
    }

    quizNext.addEventListener('click', () => {
        const stepId = quizQuestions[currentQuizStep].id;
        quizAnswers[stepId] = quizTextarea.value;
        
        if (currentQuizStep < quizQuestions.length - 1) {
            currentQuizStep++;
            updateQuiz();
        } else {
            // Send to WhatsApp
            const msg = `أجوبة على علاقتنا ❤️:\n1. تلاقينا: ${quizAnswers.meeting}\n2. كتعجبني: ${quizAnswers.feeling}\n3. المستقبل: ${quizAnswers.future}`;
            window.open(`https://wa.me/212710282367?text=${encodeURIComponent(msg)}`, '_blank');
            quizContentWrap.classList.add('hidden');
            quizSuccessWrap.classList.remove('hidden');
        }
    });

    updateQuiz();

    // --- Personal Request ---
    let selectedRequest = null;
    optYes.addEventListener('click', () => {
        selectedRequest = 'yes';
        optYes.classList.add('selected');
        optNo.classList.remove('selected');
        sendRequestBtn.disabled = false;
    });
    optNo.addEventListener('click', () => {
        selectedRequest = 'no';
        optNo.classList.add('selected');
        optYes.classList.remove('selected');
        sendRequestBtn.disabled = false;
    });

    sendRequestBtn.addEventListener('click', () => {
        const ans = selectedRequest === 'yes' ? 'Ah (Wakha) ❤️' : 'La (No) 🙊';
        window.open(`https://wa.me/212710282367?text=${encodeURIComponent('جاوبات على السؤال 😉: ' + ans)}`, '_blank');
        document.getElementById('personal-request-ui').classList.add('hidden');
        requestSuccess.classList.remove('hidden');
    });

    // --- Gallery ---
    const galleryGrid = document.getElementById('gallery-grid');
    memories.forEach(m => {
        const card = document.createElement('div');
        card.className = 'gallery-card glass-card';
        card.innerHTML = `
            <img src="${m.url}" alt="${m.title}">
            <div class="gallery-overlay">
                <p class="font-bold">${m.title}</p>
                <p class="text-sm">كليكي للقصة ❤️</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(m));
        galleryGrid.appendChild(card);
    });

    function openModal(m) {
        document.getElementById('modal-img').src = m.url;
        document.getElementById('modal-title').innerText = m.title;
        document.getElementById('modal-caption').innerText = m.caption;
        document.getElementById('gallery-modal').classList.remove('hidden');
    }

    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('gallery-modal').classList.add('hidden');
    });

    // --- About Zakaria ---
    const aboutZakariaBtn = document.getElementById('send-about-zakaria');
    const aboutZakariaText = document.getElementById('about-zakaria-text');
    const aboutZakariaSuccess = document.getElementById('about-zakaria-success');

    if (aboutZakariaBtn) {
        aboutZakariaBtn.addEventListener('click', () => {
            const val = aboutZakariaText.value;
            if (!val) return;

            const msg = `هضرة من القلب على زكرياء ❤️:\n\n"${val}"`;
            window.open(`https://wa.me/212710282367?text=${encodeURIComponent(msg)}`, '_blank');
            
            aboutZakariaBtn.style.display = 'none';
            aboutZakariaSuccess.classList.remove('hidden');
        });
    }

    // --- Scroll Reveal ---
    function startAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-active');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }
});
