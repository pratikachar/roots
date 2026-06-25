/**
 * ================================================================
 *  ROOTS NOW — main.js
 *  Hyper-local Agri-Tech & Automated Micro-Logistics Platform
 * ================================================================ */

(function () {
    'use strict';

    /* ============================================================
       BOOT
    ============================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initHeroParticles();
        initCityGrid();
        initReveal();
        initCounters();
        initHarvestTimer();
        initTestimonials();
        initPricingToggle();
        initMagnetic();
        initCaptcha();
        initContactForm();
        initModal();
        initBackToTop();
        initActiveNav();
    });

    /* ============================================================
       1. THEME TOGGLE  (dark ↔ light, persisted in localStorage)
    ============================================================ */
    function initTheme() {
        var root = document.documentElement;
        var btn  = document.getElementById('themeToggle');
        var stored = localStorage.getItem('rn-theme') || 'dark';
        root.setAttribute('data-theme', stored);

        if (!btn) return;
        btn.addEventListener('click', function () {
            var current = root.getAttribute('data-theme');
            var next    = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('rn-theme', next);
        });
    }

    /* ============================================================
       2. STICKY HEADER  (transparent → frosted glass on scroll)
    ============================================================ */
    function initHeader() {
        var header = document.getElementById('siteHeader');
        if (!header) return;
        function onScroll() {
            header.classList.toggle('is-scrolled', window.scrollY > 28);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ============================================================
       3. MOBILE MENU
    ============================================================ */
    function initMobileMenu() {
        var burger   = document.getElementById('hamburger');
        var nav      = document.getElementById('mobileNav');
        var backdrop = document.getElementById('mobileBackdrop');
        var closeBtn = document.getElementById('mobileClose');
        if (!burger || !nav) return;

        var links = nav.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

        function open() {
            nav.classList.add('is-open');
            backdrop.classList.add('is-open');
            burger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            nav.classList.remove('is-open');
            backdrop.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        burger.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        links.forEach(function (l) { l.addEventListener('click', close); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });
    }

    /* ============================================================
       4. SMOOTH SCROLL  (offset for fixed header)
    ============================================================ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var id     = this.getAttribute('href');
                var target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                var header = document.getElementById('siteHeader');
                var offset = header ? header.offsetHeight : 0;
                var top    = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    /* ============================================================
       5. HERO PARTICLE CANVAS  (ambient background field)
    ============================================================ */
    function initHeroParticles() {
        var canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var particles = [];
        var W, H, animId;

        function resize() {
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            buildParticles();
        }

        function buildParticles() {
            particles = [];
            var count = Math.min(85, Math.floor((W * H) / 11000));
            for (var i = 0; i < count; i++) {
                particles.push({
                    x:  Math.random() * W,
                    y:  Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.32,
                    vy: (Math.random() - 0.5) * 0.32,
                    r:  Math.random() * 1.4 + 0.5,
                    a:  Math.random() * 0.38 + 0.12,
                    lime: Math.random() > 0.62,
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);

            /* connection lines */
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var p1 = particles[i], p2 = particles[j];
                    var dx = p1.x - p2.x, dy = p1.y - p2.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 115) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(142,198,64,' + ((1 - dist / 115) * 0.07) + ')';
                        ctx.lineWidth   = 0.6;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            /* particles */
            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.fillStyle = p.lime
                    ? 'rgba(142,198,64,' + p.a + ')'
                    : 'rgba(0,148,68,' + p.a + ')';
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

        /* resize observer */
        if (window.ResizeObserver) {
            new ResizeObserver(resize).observe(canvas.parentElement || document.body);
        } else {
            window.addEventListener('resize', resize);
        }

        resize();
        draw();

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) { cancelAnimationFrame(animId); } else { draw(); }
        });
    }

    /* ============================================================
       6. CITY GRID CANVAS  (live farm-network visualisation)
    ============================================================ */
    function initCityGrid() {
        var canvas = document.getElementById('cityCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        /* intrinsic resolution */
        var CW = 480, CH = 340;
        canvas.width  = CW;
        canvas.height = CH;

        /* Farm node definitions */
        var farmDefs = [
            { fx: 0.13, fy: 0.22, label: 'Farm #3 — Harvesting Now'  },
            { fx: 0.47, fy: 0.14, label: 'Farm #7 — Harvesting Now'  },
            { fx: 0.80, fy: 0.26, label: 'Farm #12 — Harvesting Now' },
            { fx: 0.21, fy: 0.70, label: 'Farm #1 — Harvesting Now'  },
            { fx: 0.59, fy: 0.78, label: 'Farm #9 — Harvesting Now'  },
            { fx: 0.86, fy: 0.65, label: 'Farm #15 — Harvesting Now' },
        ];

        var farms = farmDefs.map(function (f) {
            return {
                x:         f.fx * CW,
                y:         f.fy * CH,
                label:     f.label,
                rings:     [],
                ringTimer: Math.floor(Math.random() * 100),
                phase:     Math.random() * Math.PI * 2,
            };
        });

        /* Delivery paths (farm-index pairs) */
        var pathDefs = [[0,1],[1,2],[3,4],[4,5],[1,4],[0,3]];
        var deliveries = pathDefs.map(function (p) {
            return {
                from:  p[0],
                to:    p[1],
                t:     Math.random(),
                speed: 0.0025 + Math.random() * 0.002,
            };
        });

        var tick      = 0;
        var activeIdx = 1;   /* which farm is "harvesting now" */

        /* ---- theme-aware colours ---- */
        function gridFill() {
            return document.documentElement.getAttribute('data-theme') === 'light'
                ? 'rgba(0,90,30,0.13)'
                : 'rgba(142,198,64,0.11)';
        }
        function bgFill() {
            return document.documentElement.getAttribute('data-theme') === 'light'
                ? 'rgba(228,242,228,0.55)'
                : 'rgba(4,10,4,0.93)';
        }

        /* ---- grid dots ---- */
        function drawGrid() {
            var step = 28;
            ctx.fillStyle = gridFill();
            for (var c = 0; c * step < CW + step; c++) {
                for (var r = 0; r * step < CH + step; r++) {
                    ctx.beginPath();
                    ctx.arc(c * step + 14, r * step + 14, 1.15, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        /* ---- delivery particles ---- */
        function drawDeliveries() {
            deliveries.forEach(function (d) {
                var from = farms[d.from], to = farms[d.to];
                var x = from.x + (to.x - from.x) * d.t;
                var y = from.y + (to.y - from.y) * d.t;

                /* dashed path */
                ctx.save();
                ctx.setLineDash([4, 7]);
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(196,154,108,0.10)';
                ctx.lineWidth   = 0.9;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
                ctx.restore();

                /* trail */
                for (var i = 1; i <= 5; i++) {
                    var tt = Math.max(0, d.t - i * 0.018);
                    var tx = from.x + (to.x - from.x) * tt;
                    var ty = from.y + (to.y - from.y) * tt;
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(196,154,108,' + (0.28 - i * 0.04) + ')';
                    ctx.arc(tx, ty, Math.max(0.5, 2.2 - i * 0.3), 0, Math.PI * 2);
                    ctx.fill();
                }

                /* head dot */
                ctx.save();
                ctx.shadowBlur  = 7;
                ctx.shadowColor = '#C49A6C';
                ctx.beginPath();
                ctx.fillStyle = '#C49A6C';
                ctx.arc(x, y, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                /* advance */
                d.t += d.speed;
                if (d.t >= 1) {
                    d.t = 0;
                    if (Math.random() > 0.45) {
                        var tmp = d.from; d.from = d.to; d.to = tmp;
                    }
                }
            });
        }

        /* ---- farm nodes + rings ---- */
        function drawFarms() {
            var t = tick * 0.04;
            farms.forEach(function (farm, i) {
                var active = (i === activeIdx);
                var glow   = Math.sin(t + farm.phase) * 0.5 + 0.5;

                /* halo */
                var grad = ctx.createRadialGradient(farm.x, farm.y, 0, farm.x, farm.y, active ? 30 : 18);
                grad.addColorStop(0, 'rgba(142,198,64,' + (active ? 0.24 + glow * 0.14 : 0.09) + ')');
                grad.addColorStop(1, 'rgba(142,198,64,0)');
                ctx.beginPath();
                ctx.fillStyle = grad;
                ctx.arc(farm.x, farm.y, active ? 30 : 18, 0, Math.PI * 2);
                ctx.fill();

                /* node body */
                ctx.beginPath();
                ctx.fillStyle = active ? '#8EC640' : 'rgba(0,148,68,0.82)';
                ctx.arc(farm.x, farm.y, active ? 7 : 5, 0, Math.PI * 2);
                ctx.fill();

                /* centre highlight */
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255,255,255,0.88)';
                ctx.arc(farm.x, farm.y, active ? 2.4 : 1.7, 0, Math.PI * 2);
                ctx.fill();

                /* spawn new ring */
                farm.ringTimer++;
                if (farm.ringTimer > (active ? 58 : 145)) {
                    farm.ringTimer = 0;
                    farm.rings.push({ r: 0, alpha: active ? 0.68 : 0.28 });
                }

                /* animate rings */
                farm.rings = farm.rings.filter(function (ring) {
                    ring.r    += active ? 0.72 : 0.42;
                    ring.alpha *= 0.955;
                    if (ring.alpha < 0.012) return false;
                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(142,198,64,' + ring.alpha + ')';
                    ctx.lineWidth   = active ? 1.4 : 0.9;
                    ctx.arc(farm.x, farm.y, ring.r, 0, Math.PI * 2);
                    ctx.stroke();
                    return true;
                });
            });
        }

        /* ---- main loop ---- */
        function draw() {
            ctx.fillStyle = bgFill();
            ctx.fillRect(0, 0, CW, CH);
            drawGrid();
            drawDeliveries();
            drawFarms();
            tick++;

            /* rotate active farm every ~3 s at 60 fps */
            if (tick % 180 === 0) {
                activeIdx = (activeIdx + 1) % farms.length;
                var label = document.getElementById('activeFarmLabel');
                if (label) label.textContent = farms[activeIdx].label;
            }

            requestAnimationFrame(draw);
        }

        draw();
    }

    /* ============================================================
       7. SCROLL REVEAL  (Intersection Observer)
    ============================================================ */
    function initReveal() {
        var items = document.querySelectorAll('.reveal-item');
        if (!items.length || !window.IntersectionObserver) {
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.11, rootMargin: '0px 0px -44px 0px' });

        items.forEach(function (el) { io.observe(el); });
    }

    /* ============================================================
       8. ANIMATED COUNTERS  (stat numbers count up on scroll)
    ============================================================ */
    function initCounters() {
        var counters = document.querySelectorAll('.stat-num[data-target]');
        if (!counters.length || !window.IntersectionObserver) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) { io.observe(c); });
    }

    function animateCounter(el) {
        var target   = parseInt(el.getAttribute('data-target'), 10);
        var suffix   = el.getAttribute('data-suffix') || '';
        var duration = 1650;
        var start    = performance.now();

        function update(now) {
            var elapsed  = now - start;
            var progress = Math.min(elapsed / duration, 1);
            /* cubic ease-out */
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* ============================================================
       9. LIVE HARVEST TIMER  (hero counter ticks up each minute)
    ============================================================ */
    function initHarvestTimer() {
        var el = document.getElementById('liveHarvestMin');
        if (!el) return;

        var min = Math.floor(Math.random() * 9) + 2;
        el.textContent = min;

        /* tick every real minute */
        setInterval(function () {
            min++;
            if (min > 29) min = 1;   /* simulate a new harvest */
            el.textContent = min;
        }, 60000);

        /* occasional random "just harvested" reset */
        setInterval(function () {
            if (Math.random() > 0.68) {
                min = Math.floor(Math.random() * 3);
                el.textContent = min;
            }
        }, 43000);
    }

    /* ============================================================
       10. TESTIMONIALS SLIDER
    ============================================================ */
    function initTestimonials() {
        var track    = document.getElementById('testimonialsTrack');
        var dotsWrap = document.getElementById('tDots');
        var prev     = document.getElementById('tPrev');
        var next     = document.getElementById('tNext');
        if (!track) return;

        var cards  = track.querySelectorAll('.testimonial-card');
        var total  = cards.length;
        var current = 0;
        var autoTimer;

        /* build dots */
        cards.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 't-dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
            dot.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
            dotsWrap.appendChild(dot);
        });

        function goTo(idx) {
            current = ((idx % total) + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dotsWrap.querySelectorAll('.t-dot').forEach(function (d, i) {
                d.classList.toggle('is-active', i === current);
            });
        }
        function startAuto() { autoTimer = setInterval(function () { goTo(current + 1); }, 5800); }
        function stopAuto()  { clearInterval(autoTimer); }

        prev.addEventListener('click', function () { stopAuto(); goTo(current - 1); startAuto(); });
        next.addEventListener('click', function () { stopAuto(); goTo(current + 1); startAuto(); });

        /* touch / swipe support */
        var touchX = 0;
        track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend',   function (e) {
            var diff = touchX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
        });

        startAuto();
    }

    /* ============================================================
       11. PRICING TOGGLE  (weekly ↔ monthly)
    ============================================================ */
    function initPricingToggle() {
        var btn = document.getElementById('pricingToggle');
        if (!btn) return;

        var prices  = document.querySelectorAll('.pc-price');
        var periods = document.querySelectorAll('.pc-period');
        var labelW  = document.getElementById('pToggleLabelW');
        var labelM  = document.getElementById('pToggleLabelM');
        var monthly = false;

        btn.addEventListener('click', function () {
            monthly = !monthly;
            btn.setAttribute('aria-checked', monthly.toString());

            prices.forEach(function (p) {
                p.textContent = monthly ? p.dataset.monthly : p.dataset.weekly;
            });
            periods.forEach(function (p) {
                p.textContent = monthly ? '/month' : '/week';
            });

            if (labelW) labelW.style.opacity = monthly ? '0.5' : '1';
            if (labelM) labelM.style.opacity = monthly ? '1'   : '0.5';
        });
    }

    /* ============================================================
       12. MAGNETIC CTA BUTTONS
    ============================================================ */
    function initMagnetic() {
        document.querySelectorAll('.magnetic-btn').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width  / 2;
                var y = e.clientY - rect.top  - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.20) + 'px,' + (y * 0.20) + 'px)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
            });
        });
    }

    /* ============================================================
       13. MATH CAPTCHA
    ============================================================ */
    var _captchaAnswer = 0;

    function initCaptcha() { generateCaptcha(); }

    function generateCaptcha() {
        var a   = Math.floor(Math.random() * 10) + 1;
        var b   = Math.floor(Math.random() * 9)  + 1;
        var ops = [
            { sym: '+', fn: function (x, y) { return x + y; } },
            { sym: '+', fn: function (x, y) { return x + y; } },
            { sym: '×', fn: function (x, y) { return x * y; } },
        ];
        var op = ops[Math.floor(Math.random() * ops.length)];
        _captchaAnswer = op.fn(a, b);
        var qEl = document.getElementById('captchaQuestion');
        if (qEl) qEl.textContent = a + ' ' + op.sym + ' ' + b;
        var inp = document.getElementById('captchaInput');
        if (inp) inp.value = '';
    }

    /* ============================================================
       14. CONTACT FORM  (validation + captcha + modal response)
    ============================================================ */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(form)) return;

            /* Simulate async submit */
            var btn = document.getElementById('submitBtn');
            if (btn) { btn.disabled = true; btn.innerHTML = '<span>Sending…</span>'; }

            setTimeout(function () {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<span>Send Message</span><span class="btn-arrow">→</span>';
                }
                form.reset();
                generateCaptcha();
                showModal(
                    '🌿',
                    'Message Received!',
                    'Thank you for reaching out. Our team will be in touch within 2 business hours. In the meantime, explore our blog to learn more about our urban container farms!'
                );
            }, 1300);
        });

        /* live field clearing on input */
        form.querySelectorAll('input, textarea, select').forEach(function (el) {
            el.addEventListener('input', function () {
                el.classList.remove('is-error');
                var err = form.querySelector('#err-' + el.id);
                if (err) { err.textContent = ''; err.classList.remove('is-shown'); }
            });
        });
    }

    function validateForm(form) {
        var valid   = true;
        var required = ['fname', 'lname', 'email', 'interest', 'message'];

        required.forEach(function (id) {
            var el  = form.querySelector('#' + id);
            var err = form.querySelector('#err-' + id);
            if (!el) return;
            var msg = '';
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

        /* captcha */
        var capInput = document.getElementById('captchaInput');
        var capErr   = document.getElementById('err-captcha');
        var capVal   = parseInt((capInput ? capInput.value : ''), 10);

        if (!capInput || !capInput.value || capVal !== _captchaAnswer) {
            valid = false;
            if (capInput) capInput.classList.add('is-error');
            if (capErr)   { capErr.textContent = 'Incorrect answer. A new question has been set.'; capErr.classList.add('is-shown'); }
            generateCaptcha();
        } else {
            if (capInput) capInput.classList.remove('is-error');
            if (capErr)   { capErr.textContent = ''; capErr.classList.remove('is-shown'); }
        }

        return valid;
    }

    /* ============================================================
       15. MODAL
    ============================================================ */
    function initModal() {
        var overlay = document.getElementById('modalOverlay');
        var closeEl = document.getElementById('modalClose');
        var btnEl   = document.getElementById('modalBtn');
        if (!overlay) return;

        function close() {
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }
        if (closeEl) closeEl.addEventListener('click', close);
        if (btnEl)   btnEl.addEventListener('click',   close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
        });
    }

    function showModal(icon, title, body) {
        var overlay  = document.getElementById('modalOverlay');
        var iconWrap = document.getElementById('modalIconWrap');
        var titleEl  = document.getElementById('modalTitle');
        var bodyEl   = document.getElementById('modalBody');
        if (!overlay) return;

        if (iconWrap) iconWrap.textContent = icon;
        if (titleEl)  titleEl.textContent  = title;
        if (bodyEl)   bodyEl.textContent   = body;

        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    /* ============================================================
       16. BACK TO TOP + SVG PROGRESS RING
    ============================================================ */
    function initBackToTop() {
        var btn  = document.getElementById('backToTop');
        var ring = document.getElementById('progressRingFill');
        if (!btn || !ring) return;

        var R    = 22;
        var CIRC = 2 * Math.PI * R;          /* ≈ 138.23 */
        ring.style.strokeDasharray  = CIRC.toFixed(1);
        ring.style.strokeDashoffset = CIRC.toFixed(1);

        function onScroll() {
            var scrolled = window.scrollY;
            var total    = document.body.scrollHeight - window.innerHeight;
            var pct      = total > 0 ? Math.min(scrolled / total, 1) : 0;
            ring.style.strokeDashoffset = (CIRC * (1 - pct)).toFixed(2);
            btn.classList.toggle('is-visible', scrolled > 320);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       17. ACTIVE NAV LINK ON SCROLL
    ============================================================ */
    function initActiveNav() {
        var sections = document.querySelectorAll('section[id]');
        var links    = document.querySelectorAll('.nav-link');
        if (!sections.length || !window.IntersectionObserver) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id;
                    links.forEach(function (l) {
                        l.classList.toggle('is-active', l.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { threshold: 0.38 });

        sections.forEach(function (s) { io.observe(s); });
    }

})();
