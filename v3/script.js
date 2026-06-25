(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    function initTheme() {
        const stored = localStorage.getItem('rn-theme') || 'dark';
        root.setAttribute('data-theme', stored);
        const btn = $('#themeToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('rn-theme', next);
        });
    }

    function initYear() {
        const el = $('#year');
        if (el) el.textContent = new Date().getFullYear();
    }

    function initHeader() {
        const header = $('#siteHeader');
        if (!header) return;
        function onScroll() {
            header.classList.toggle('scrolled', window.scrollY > 28);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function initMobileMenu() {
        const burger = $('#menuToggle');
        const nav = $('#mobileNav');
        const backdrop = $('#mobileBackdrop');
        const closeBtn = $('#mobileClose');
        if (!burger || !nav) return;

        const links = nav.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

        function open() {
            nav.classList.add('open');
            if (backdrop) backdrop.classList.add('open');
            burger.setAttribute('aria-expanded', 'true');
            burger.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            nav.classList.remove('open');
            if (backdrop) backdrop.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            burger.classList.remove('open');
            document.body.style.overflow = '';
        }

        burger.addEventListener('click', open);
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (backdrop) backdrop.addEventListener('click', close);
        links.forEach(l => l.addEventListener('click', close));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }

    function initSmoothScroll() {
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const header = $('#siteHeader');
                const offset = header ? header.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    function initScrollProgress() {
        const bar = $('#scrollProgress');
        const bt = $('#backTop');
        const ring = $('#ringFill');
        if (!bar) return;

        function onScroll() {
            const y = window.scrollY;
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const pct = Math.min(100, (y / h) * 100);
            bar.style.width = pct + '%';
            if (bt) bt.classList.toggle('show', y > 320);
            if (ring) ring.style.strokeDashoffset = 100.5 - (pct * 100.5) / 100;
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    function initBackToTop() {
        const btn = $('#backTop');
        if (!btn) return;
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function initActiveNav() {
        const sections = $$('section[id]');
        const links = $$('.primary-nav a[data-link]');
        if (!sections.length || !window.IntersectionObserver) return;

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { threshold: 0.38 });

        sections.forEach(s => io.observe(s));
    }

    function initReveal() {
        const items = $$('.reveal');
        if (!items.length || !window.IntersectionObserver) {
            items.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const sibs = $$(':scope > .reveal', parent);
                    const idx = sibs.indexOf(entry.target);
                    const delay = idx > -1 && sibs.length > 1 ? idx * 90 : 0;
                    setTimeout(() => entry.target.classList.add('in'), delay);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.11, rootMargin: '0px 0px -44px 0px' });

        items.forEach(el => io.observe(el));
    }

    function initCounters() {
        const counters = $$('.stat-num[data-target]');
        if (!counters.length || !window.IntersectionObserver) return;

        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => io.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1650;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    function initHeroParticles() {
        if (reduced) return;
        const canvas = $('#heroCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let W, H, animId;

        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            buildParticles();
        }

        function buildParticles() {
            particles = [];
            const count = Math.min(85, Math.floor((W * H) / 11000));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * W, y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
                    r: Math.random() * 1.4 + 0.5, a: Math.random() * 0.38 + 0.12,
                    lime: Math.random() > 0.62,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i], p2 = particles[j];
                    const dx = p1.x - p2.x, dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 115) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(142,198,64,' + ((1 - dist / 115) * 0.07) + ')';
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = p.lime ? 'rgba(142,198,64,' + p.a + ')' : 'rgba(0,148,68,' + p.a + ')';
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;
            });
            animId = requestAnimationFrame(draw);
        }

        if (window.ResizeObserver) {
            new ResizeObserver(resize).observe(canvas.parentElement || document.body);
        } else {
            window.addEventListener('resize', resize);
        }
        resize();
        draw();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { cancelAnimationFrame(animId); } else { draw(); }
        });
    }

    function initHarvestTimer() {
        const el = $('#liveHarvestMin');
        if (!el) return;
        let min = Math.floor(Math.random() * 9) + 2;
        el.textContent = min;

        setInterval(() => {
            min++;
            if (min > 29) min = 1;
            el.textContent = min;
        }, 60000);

        setInterval(() => {
            if (Math.random() > 0.68) {
                min = Math.floor(Math.random() * 3);
                el.textContent = min;
            }
        }, 43000);
    }

    function initTestimonials() {
        const track = $('#testimonialsTrack');
        const dotsWrap = $('#tDots');
        const prev = $('#tPrev');
        const next = $('#tNext');
        if (!track) return;

        const cards = track.querySelectorAll('.testimonial-card');
        const total = cards.length;
        let current = 0;
        let autoTimer;

        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 't-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
            dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
            if (dotsWrap) dotsWrap.appendChild(dot);
        });

        function goTo(idx) {
            current = ((idx % total) + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            if (dotsWrap) {
                dotsWrap.querySelectorAll('.t-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === current);
                });
            }
        }
        function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5800); }
        function stopAuto() { clearInterval(autoTimer); }

        if (prev) prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
        if (next) next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

        let touchX = 0;
        track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
        });

        startAuto();
    }

    function initPricingToggle() {
        const btn = $('#pricingToggle');
        if (!btn) return;

        const prices = $$('.pc-price');
        const periods = $$('.pc-period');
        const labelW = $('#pToggleLabelW');
        const labelM = $('#pToggleLabelM');
        let monthly = false;

        btn.addEventListener('click', () => {
            monthly = !monthly;
            btn.setAttribute('aria-checked', monthly.toString());
            prices.forEach(p => { p.textContent = monthly ? p.dataset.monthly : p.dataset.weekly; });
            periods.forEach(p => { p.textContent = monthly ? '/month' : '/week'; });
            if (labelW) labelW.style.opacity = monthly ? '0.5' : '1';
            if (labelM) labelM.style.opacity = monthly ? '1' : '0.5';
        });
    }

    function initMagnetic() {
        if (reduced) return;
        $$('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.20) + 'px,' + (y * 0.20) + 'px)';
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }

    function initTilt() {
        if (reduced) return;
        $$('.tilt').forEach(el => {
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform = 'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-4px)';
            });
            el.addEventListener('mouseleave', () => { el.style.transform = ''; });
        });
    }

    /* Captcha + Form */
    let _captchaAnswer = 0;

    function generateCaptcha() {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        const ops = [
            { sym: '+', fn: (x, y) => x + y },
            { sym: '+', fn: (x, y) => x + y },
            { sym: 'x', fn: (x, y) => x * y },
        ];
        const op = ops[Math.floor(Math.random() * ops.length)];
        _captchaAnswer = op.fn(a, b);
        const qEl = $('#captchaQuestion');
        if (qEl) qEl.textContent = a + ' ' + op.sym + ' ' + b;
        const inp = $('#captchaInput');
        if (inp) inp.value = '';
    }

    function initModal() {
        const overlay = $('#modalOverlay');
        const closeEl = $('#modalClose');
        const btnEl = $('#modalBtn');
        if (!overlay) return;

        function close() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
        if (closeEl) closeEl.addEventListener('click', close);
        if (btnEl) btnEl.addEventListener('click', close);
        overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && overlay.classList.contains('open')) close();
        });
    }

    function showModal(icon, title, body) {
        const overlay = $('#modalOverlay');
        const iconWrap = $('#modalIconWrap');
        const titleEl = $('#modalTitle');
        const bodyEl = $('#modalBody');
        if (!overlay) return;

        if (iconWrap) iconWrap.textContent = icon;
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.textContent = body;

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function validateForm(form) {
        let valid = true;
        const required = ['fname', 'lname', 'email', 'interest', 'message'];

        required.forEach(id => {
            const el = form.querySelector('#' + id);
            const err = form.querySelector('#err-' + id);
            if (!el) return;
            let msg = '';
            if (!el.value.trim()) {
                msg = 'This field is required.';
            } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
                msg = 'Please enter a valid email address.';
            }
            if (msg) {
                valid = false;
                el.classList.add('is-error');
                if (err) { err.textContent = msg; err.classList.add('is-shown'); }
            } else {
                el.classList.remove('is-error');
                if (err) { err.textContent = ''; err.classList.remove('is-shown'); }
            }
        });

        const capInput = $('#captchaInput');
        const capErr = $('#err-captcha');
        const capVal = parseInt((capInput ? capInput.value : ''), 10);

        if (!capInput || !capInput.value || capVal !== _captchaAnswer) {
            valid = false;
            if (capInput) capInput.classList.add('is-error');
            if (capErr) { capErr.textContent = 'Incorrect answer. A new question has been set.'; capErr.classList.add('is-shown'); }
            generateCaptcha();
        } else {
            if (capInput) capInput.classList.remove('is-error');
            if (capErr) { capErr.textContent = ''; capErr.classList.remove('is-shown'); }
        }

        return valid;
    }

    function initContactForm() {
        const form = $('#contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(form)) return;

            const btn = $('#submitBtn');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span>Sending...</span>'; }

            setTimeout(() => {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<span>Reserve My First Harvest</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
                }
                form.reset();
                generateCaptcha();
                showModal(
                    '🌿',
                    'Message Received!',
                    'Thank you for reaching out. Our team will be in touch within 2 business hours to confirm your first harvest window.'
                );
            }, 1300);
        });

        form.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('input', () => {
                el.classList.remove('is-error');
                const err = form.querySelector('#err-' + el.id);
                if (err) { err.textContent = ''; err.classList.remove('is-shown'); }
            });
        });
    }

    /* Boot */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initYear();
        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initScrollProgress();
        initBackToTop();
        initActiveNav();
        initReveal();
        initCounters();
        initHeroParticles();
        initHarvestTimer();
        initTestimonials();
        initPricingToggle();
        initMagnetic();
        initTilt();
        initModal();
        generateCaptcha();
        initContactForm();
    });

})();
