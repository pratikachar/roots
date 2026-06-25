/* Roots Now v6 — Custom Mixed Edition */
window.setSelectedPlan = function (plan) {
  var select = document.getElementById("cf-plan");
  if (select) {
    var opt = Array.from(select.options).find(function (o) { return o.value === plan; });
    if (opt) select.value = plan;
  }
  var mode = "weekly";
  var activeBill = document.querySelector('.billing-toggle .active');
  if (activeBill) mode = activeBill.dataset.bill;
  var fb = document.querySelector('.plan-billing-toggle .pbf-btn[data-pb="' + mode + '"]');
  if (fb) fb.click();
};
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("rn-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("rn-theme", next);
  });

  /* Year */
  $("#year").textContent = new Date().getFullYear();

  /* Live city rotator */
  const cities = ["Brooklyn · NY", "Jersey City · NJ", "Silver Lake · LA", "Mission · SF", "East Side · ATX"];
  let ci = 0;
  setInterval(() => {
    ci = (ci + 1) % cities.length;
    const el = $("#liveCity");
    if (el) { el.style.opacity = 0; setTimeout(() => { el.textContent = cities[ci]; el.style.opacity = 1; }, 200); }
  }, 3500);

  /* Header scroll */
  const header = $("#siteHeader");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (y / h) * 100);
    $("#scrollProgress").style.width = pct + "%";
    const bt = $("#backTop");
    bt.classList.toggle("show", y > 600);
    const ring = $("#ringFill");
    if (ring) ring.style.strokeDashoffset = 100.5 - (pct * 100.5) / 100;
    updateActiveLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const menuBtn = $("#menuToggle");
  const mobileNav = $("#mobileNav");
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    mobileNav.setAttribute("aria-hidden", !open);
  });
  $$("#mobileNav a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open"); menuBtn.classList.remove("open");
  }));

  /* Smooth scroll + active section */
  const sections = $$("main section[id]");
  function updateActiveLink() {
    let current = "hero";
    const top = window.scrollY + 120;
    for (const s of sections) {
      if (s.offsetTop <= top) current = s.id;
    }
    $$(".primary-nav a[data-link]").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }
  updateActiveLink();

  /* Back to top */
  $("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Reveal-item from v5 */
  const revealItems = $$(".reveal-item");
  if (revealItems.length && window.IntersectionObserver) {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          rio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11, rootMargin: "0px 0px -44px 0px" });
    revealItems.forEach(el => rio.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  /* Reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = (parseInt(e.target.dataset.delay || "0", 10)) || 0;
        setTimeout(() => e.target.classList.add("in"), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  $$(".reveal").forEach((el, i) => {
    const parent = el.parentElement;
    const sibs = $$(":scope > .reveal", parent);
    const idx = sibs.indexOf(el);
    if (idx > -1 && sibs.length > 1) el.dataset.delay = idx * 90;
    io.observe(el);
  });





  /* Testimonials carousel */
  (function initTestimonials() {
    var track = document.getElementById('testimonialsTrack');
    var dotsWrap = document.getElementById('tDots');
    var prev = document.getElementById('tPrev');
    var next = document.getElementById('tNext');
    if (!track) return;

    var cards = track.querySelectorAll('.testimonial-card');
    var total = cards.length;
    var current = 0;
    var autoTimer;

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

    var touchX = 0;
    track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
    });

    startAuto();
  })();

  /* Billing toggle */
  const billBtns = $$(".billing-toggle button");
  billBtns.forEach(b => b.addEventListener("click", () => {
    billBtns.forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    const mode = b.dataset.bill;
    $$(".price .amt").forEach(a => {
      a.textContent = "$" + a.dataset[mode];
    });
    $$(".price .per").forEach(p => p.textContent = mode === "weekly" ? "/ week" : "/ month");
    const label = mode === "weekly" ? "Weekly" : "Monthly";
    $$(".price-card .btn").forEach(btn => {
      btn.textContent = btn.textContent.replace(/Weekly|Monthly/, label);
    });
    /* sync form billing toggle */
    var fb = $('.plan-billing-toggle .pbf-btn[data-pb="' + mode + '"]');
    if (fb) { fb.click(); }
  }));

  /* Form billing toggle */
  (function initFormBilling() {
    var pbfBtns = $$(".plan-billing-toggle .pbf-btn");
    var planSelect = document.getElementById("cf-plan");
    if (!pbfBtns.length || !planSelect) return;

    function updatePlanPrices(mode) {
      Array.from(planSelect.options).forEach(function (opt) {
        if (opt.value && opt.dataset[mode]) {
          var names = { "Nest Basket": "The Nest Basket", "Gastronomy Box": "The Gastronomy Box", "Atelier Palette": "The Atelier Palette" };
          var label = names[opt.value] || opt.value;
          opt.textContent = label + " — $" + opt.dataset[mode] + "/" + (mode === "weekly" ? "week" : "month");
        }
      });
    }

    pbfBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        pbfBtns.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        updatePlanPrices(b.dataset.pb);
      });
    });

    var defaultMode = (document.querySelector('.billing-toggle .active') || {}).dataset?.bill || "weekly";
    var fb = document.querySelector('.plan-billing-toggle .pbf-btn[data-pb="' + defaultMode + '"]');
    if (fb) fb.click();
  })();

  /* Count up */
  const counters = $$(".count");
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const to = parseFloat(el.dataset.to || "0");
      const dur = 1400;
      const start = performance.now();
      function tick(t) {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => countObs.observe(c));

  /* Hero particles */
  if (!reduced) {
    const wrap = $("#particles");
    const N = 22;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = 2 + Math.random() * 4;
      p.style.width = p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = -20 + "px";
      p.style.animationDuration = 14 + Math.random() * 16 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      wrap.appendChild(p);
    }
  }

  /* Live Harvest Network canvas */
  (function initCityGrid() {
    var canvas = document.getElementById('cityCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var CW = 480, CH = 340;
    canvas.width = CW; canvas.height = CH;

    var farmDefs = [
      { fx: 0.13, fy: 0.22, label: 'Farm #3 — Harvesting Now'  },
      { fx: 0.47, fy: 0.14, label: 'Farm #7 — Harvesting Now'  },
      { fx: 0.80, fy: 0.26, label: 'Farm #12 — Harvesting Now' },
      { fx: 0.21, fy: 0.70, label: 'Farm #1 — Harvesting Now'  },
      { fx: 0.59, fy: 0.78, label: 'Farm #9 — Harvesting Now'  },
      { fx: 0.86, fy: 0.65, label: 'Farm #15 — Harvesting Now' },
    ];
    var farms = farmDefs.map(function (f) {
      return { x: f.fx * CW, y: f.fy * CH, label: f.label, rings: [], ringTimer: Math.floor(Math.random() * 100), phase: Math.random() * Math.PI * 2 };
    });
    var pathDefs = [[0,1],[1,2],[3,4],[4,5],[1,4],[0,3]];
    var deliveries = pathDefs.map(function (p) {
      return { from: p[0], to: p[1], t: Math.random(), speed: 0.0025 + Math.random() * 0.002 };
    });
    var tick = 0, activeIdx = 1;

    function isLight() { return document.documentElement.getAttribute('data-theme') === 'light'; }
    function gridFill() { return isLight() ? 'rgba(0,90,30,0.13)' : 'rgba(142,198,64,0.11)'; }
    function bgFill()   { return isLight() ? 'rgba(228,242,228,0.55)' : 'rgba(4,10,4,0.93)'; }

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
    function drawDeliveries() {
      deliveries.forEach(function (d) {
        var from = farms[d.from], to = farms[d.to];
        var x = from.x + (to.x - from.x) * d.t;
        var y = from.y + (to.y - from.y) * d.t;
        ctx.save();
        ctx.setLineDash([4, 7]);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(196,154,108,0.10)';
        ctx.lineWidth = 0.9;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.restore();
        for (var i = 1; i <= 5; i++) {
          var tt = Math.max(0, d.t - i * 0.018);
          ctx.beginPath();
          ctx.fillStyle = 'rgba(196,154,108,' + (0.28 - i * 0.04) + ')';
          ctx.arc(from.x + (to.x - from.x) * tt, from.y + (to.y - from.y) * tt, Math.max(0.5, 2.2 - i * 0.3), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.save();
        ctx.shadowBlur = 7; ctx.shadowColor = '#C49A6C';
        ctx.beginPath(); ctx.fillStyle = '#C49A6C';
        ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        d.t += d.speed;
        if (d.t >= 1) { d.t = 0; if (Math.random() > 0.45) { var tmp = d.from; d.from = d.to; d.to = tmp; } }
      });
    }
    function drawFarms() {
      var t = tick * 0.04;
      farms.forEach(function (farm, i) {
        var active = (i === activeIdx);
        var glow = Math.sin(t + farm.phase) * 0.5 + 0.5;
        var grad = ctx.createRadialGradient(farm.x, farm.y, 0, farm.x, farm.y, active ? 30 : 18);
        grad.addColorStop(0, 'rgba(142,198,64,' + (active ? 0.24 + glow * 0.14 : 0.09) + ')');
        grad.addColorStop(1, 'rgba(142,198,64,0)');
        ctx.beginPath(); ctx.fillStyle = grad;
        ctx.arc(farm.x, farm.y, active ? 30 : 18, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = active ? '#8EC640' : 'rgba(0,148,68,0.82)';
        ctx.arc(farm.x, farm.y, active ? 7 : 5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.arc(farm.x, farm.y, active ? 2.4 : 1.7, 0, Math.PI * 2); ctx.fill();
        farm.ringTimer++;
        if (farm.ringTimer > (active ? 58 : 145)) { farm.ringTimer = 0; farm.rings.push({ r: 0, alpha: active ? 0.68 : 0.28 }); }
        farm.rings = farm.rings.filter(function (ring) {
          ring.r += active ? 0.72 : 0.42; ring.alpha *= 0.955;
          if (ring.alpha < 0.012) return false;
          ctx.beginPath(); ctx.strokeStyle = 'rgba(142,198,64,' + ring.alpha + ')';
          ctx.lineWidth = active ? 1.4 : 0.9;
          ctx.arc(farm.x, farm.y, ring.r, 0, Math.PI * 2); ctx.stroke();
          return true;
        });
      });
    }
    function draw() {
      var root = document.documentElement;
      ctx.fillStyle = bgFill();
      ctx.fillRect(0, 0, CW, CH);
      drawGrid(); drawDeliveries(); drawFarms();
      tick++;
      if (tick % 180 === 0) {
        activeIdx = (activeIdx + 1) % farms.length;
        var label = document.getElementById('activeFarmLabel');
        if (label) label.textContent = farms[activeIdx].label;
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* Cursor glow */
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    const cg = $("#cursorGlow");
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    function loop() {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      cg.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* Magnetic buttons */
  if (!reduced) {
    $$(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* Captcha + form */
  let cA = 0, cB = 0;
  function newCaptcha() {
    cA = 2 + Math.floor(Math.random() * 8);
    cB = 1 + Math.floor(Math.random() * 7);
    const q = $("#captchaQ");
    if (q) q.textContent = `${cA} + ${cB} = ?`;
    const inp = $("#cf-captcha");
    if (inp) inp.value = "";
  }
  newCaptcha();
  $("#captchaRefresh").addEventListener("click", newCaptcha);

  function validateField(el) {
    const field = el.closest(".field");
    if (!field) return true;
    const valid = el.checkValidity() && el.value.trim() !== "";
    field.classList.toggle("invalid", !valid);
    return valid;
  }

  $$("#contactForm input, #contactForm select, #contactForm textarea").forEach(function (el) {
    el.addEventListener("blur", function () { validateField(el); });
    el.addEventListener("input", function () { if (el.closest(".invalid")) validateField(el); });
  });

  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalMsg = $("#modalMsg");
  const modalIcon = $("#modalIcon");
  function openModal(ok, title, msg) {
    modalIcon.classList.toggle("error", !ok);
    modalIcon.textContent = ok ? "✓" : "!";
    modalTitle.textContent = title;
    modalMsg.textContent = msg;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      var fields = $$("#contactForm input, #contactForm select, #contactForm textarea");
      var allValid = true;
      fields.forEach(function (el) {
        if (!validateField(el)) allValid = false;
      });
      if (!allValid) {
        openModal(false, "Missing details", "Please fill in all required fields.");
        return;
      }
      const data = new FormData(e.target);
      if (parseInt(data.get("captcha"), 10) !== cA + cB) {
        openModal(false, "Check the math", "That captcha answer doesn't add up. Give it another go.");
        newCaptcha();
        const cf = document.getElementById("cf-captcha").closest(".field");
        if (cf) cf.classList.add("invalid");
        return;
      }
      openModal(true, "You're on the list", "We'll be in touch within 24 hours to confirm your first harvest window.");
      e.target.reset();
      fields.forEach(function (el) { el.closest(".field").classList.remove("invalid"); });
      newCaptcha();
    });
  }

  onScroll();
})();
