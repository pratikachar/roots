/* Roots-Now — vanilla JS interactions */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("rn-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("rn-theme", next);
  });

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Live city rotator ---------- */
  const cities = ["Brooklyn · NY", "Jersey City · NJ", "Silver Lake · LA", "Mission · SF", "East Side · ATX"];
  let ci = 0;
  setInterval(() => {
    ci = (ci + 1) % cities.length;
    const el = $("#liveCity");
    if (el) { el.style.opacity = 0; setTimeout(() => { el.textContent = cities[ci]; el.style.opacity = 1; }, 200); }
  }, 3500);

  /* ---------- Header scroll ---------- */
  const header = $("#siteHeader");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    // progress
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (y / h) * 100);
    $("#scrollProgress").style.width = pct + "%";
    // back to top
    const bt = $("#backTop");
    bt.classList.toggle("show", y > 600);
    const ring = $("#ringFill");
    if (ring) ring.style.strokeDashoffset = 100.5 - (pct * 100.5) / 100;
    // active link
    updateActiveLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
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

  /* ---------- Smooth scroll + active section ---------- */
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

  /* ---------- Back to top ---------- */
  $("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const delay = (parseInt(e.target.dataset.delay || "0", 10)) || 0;
        setTimeout(() => e.target.classList.add("in"), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  // stagger reveals within groups
  $$(".reveal").forEach((el, i) => {
    const parent = el.parentElement;
    const sibs = $$(":scope > .reveal", parent);
    const idx = sibs.indexOf(el);
    if (idx > -1 && sibs.length > 1) el.dataset.delay = idx * 90;
    io.observe(el);
  });

  /* ---------- Count up ---------- */
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

  /* ---------- Hero particles ---------- */
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

  /* ---------- Cursor glow ---------- */
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

  /* ---------- Magnetic buttons ---------- */
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

  /* ---------- Tilt (3D) ---------- */
  if (!reduced) {
    $$(".tilt").forEach(el => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Billing toggle ---------- */
  const billBtns = $$(".billing-toggle button");
  billBtns.forEach(b => b.addEventListener("click", () => {
    billBtns.forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    const mode = b.dataset.bill;
    $$(".price .amt").forEach(a => {
      const v = a.dataset[mode];
      a.textContent = "$" + v;
      a.previousElementSibling;
    });
    $$(".price .per").forEach(p => p.textContent = mode === "weekly" ? "/ week" : "/ month");
  }));

  /* ---------- Captcha + form ---------- */
  let cA = 0, cB = 0;
  function newCaptcha() {
    cA = 2 + Math.floor(Math.random() * 8);
    cB = 1 + Math.floor(Math.random() * 7);
    $("#captchaQ").textContent = `${cA} + ${cB} = ?`;
  }
  newCaptcha();

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

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (!data.get("name") || !data.get("email") || !data.get("city")) {
      openModal(false, "Missing details", "Please fill in your name, email, and city.");
      return;
    }
    if (parseInt(data.get("captcha"), 10) !== cA + cB) {
      openModal(false, "Check the math", "That captcha answer doesn't add up. Give it another go.");
      newCaptcha();
      return;
    }
    openModal(true, "You're on the list", "We'll be in touch within 24 hours to confirm your first harvest window.");
    e.target.reset();
    newCaptcha();
  });

  /* trigger once on load */
  onScroll();
})();
