/* ============================================================
   Butterfly ABA — interactions & animations
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Brand butterfly SVG (from official icon) ---------- */
  const BODY_PATH = "M712.64,164.13c-1.74-15.49-14-27.3-28.49-27.05-12.86.2-20.4,8.49-27.15,18.17-4.67,6.75-8.69,14.59-14.99,19.61-37.48,29.93-60.51,69.15-75.65,113.87-2.83,8.49-6.5,16.63-9.28,23.53-13.73,3.67-26.67,3.26-38.82-1.24-2.08-6.75-4.57-14.69-6.95-22.54-10.92-36.24-28.89-68.26-55.5-95.36-12.66-12.81-26.06-24.37-35-41.15-12.56-23.58-48.94-18.57-55.6,11.07-1.09,4.96-.65,10.13,1.19,14.84,4.42,11.02,12.66,19.21,25.22,20.4,8.98.84,18.07.2,27.85.2,46.31,29.04,70.79,72.72,85.58,121.92-2.73,5.71-4.07,9.23-6.06,12.46-13.6,22.04-13.95,44.18-.7,66.52,1.49,2.63,3.57,5.11,4.42,7.89,1.14,3.72.1,8.98-1.44,13.9-3.62,11.42-1.44,24.08,6.75,32.86,5.41,5.76,12.76,10.67,22.64,12.46,3.43.35,7.05.55,10.97.6h.35c10.92-.74,19.21-5.11,25.42-10.67,9.63-8.59,12.56-22.14,9.18-34.6-1.14-4.12-1.69-8.39-1.84-14,20.05-35.69,19.96-43.19-1.94-88.46,16.53-49.99,40.11-96.1,89.65-121.42,10.52,0,18.96.94,27.15-.2,16.13-2.23,24.92-15.79,22.93-33.61h.1Z";
  const WING_R_PATH = "M704.2,677.06c21,10.57,42.89,19.76,62.89,31.97,83.1,50.83,68.21,183.57-13.25,223.83-30.13,14.89-62.1,12.81-92.43-3.23-30.83-16.28-50.38-43.04-65.82-72.82-38.97-75.06-55.3-154.53-46.96-239.22,6.25-63.49,22.83-123.55,53.46-179.45,21.54-39.36,49.09-73.96,84.74-101.96,116.06-91.19,309.56-9.23,278.23,171.8-47.65,78.08-120.08,95.85-190.42,119.24-20.8,6.9-41.35,14.64-61.65,22.93-10.18,4.17-19.06,11.57-28.89,16.58,6.75,3.38,13.4,6.9,20.1,10.33h0Z";
  const WING_L_PATH = "M391.96,667.53c-22.29-18.22-44.87-25.71-67.16-33.46-31.92-11.12-64.48-20.5-96-32.66-31.67-12.21-61.55-27.85-83.99-54.9-45.07-54.26-47.95-139.59,13.95-198.06,69.6-65.72,168.08-66.72,240.9-4.96,61.16,51.92,96.25,119.73,116.06,195.88,29.44,113.18,19.41,222.44-38.02,325.64-13.65,24.47-30.48,46.56-55.5,61.31-15.19,8.98-30.83,13.4-48.5,15.19-55.35,5.61-94.32-36.98-107.72-74.01-9.63-26.51-14-53.66-7.74-82.05,8.79-40.01,31.82-67.91,68.4-85.43,20.95-10.03,41.65-20.7,65.33-32.51v.05Z";

  function butterflySVG(color, flapDur) {
    return (
      '<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">' +
      '<g class="wing-l" style="animation-duration:' + flapDur + 's">' +
      '<path fill="' + color + '" d="' + WING_L_PATH + '"/></g>' +
      '<g class="wing-r" style="animation-duration:' + flapDur + 's">' +
      '<path fill="' + color + '" d="' + WING_R_PATH + '"/></g>' +
      '<path fill="' + color + '" d="' + BODY_PATH + '"/>' +
      "</svg>"
    );
  }

  const PALETTE = {
    coral: "#f89592",
    navy: "#2e3680",
    butter: "#f8b03f",
    lilac: "#9d94e0",
    mint: "#6fc7a5",
  };

  /* ---------- Inject ambient butterflies ---------- */
  document.querySelectorAll(".bfly").forEach(function (el, i) {
    const color = PALETTE[el.dataset.color || "coral"] || PALETTE.coral;
    const dur = 0.7 + (i % 4) * 0.18;
    el.innerHTML = butterflySVG(color, dur);
    if (el.classList.contains("bfly-drift")) {
      el.style.animationDuration = 4 + (i % 5) + "s";
      el.style.animationDelay = (i % 3) * 0.8 + "s";
    }
  });

  /* ---------- Header ---------- */
  const header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("open");
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll reveal (staggered) ---------- */
  document.querySelectorAll(".stagger").forEach(function (parent) {
    parent.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.setProperty("--d", i * 0.12 + "s");
    });
  });
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!open) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---------- Forms (demo submit) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const success = form.parentElement.querySelector(".form-success");
      form.style.display = "none";
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
        burstButterflies(success);
      }
    });
  });

  /* ---------- Butterfly burst (celebration) ---------- */
  function burstButterflies(anchor) {
    const rect = anchor.getBoundingClientRect();
    const colors = ["coral", "butter", "lilac", "mint", "navy"];
    for (let i = 0; i < 7; i++) {
      const b = document.createElement("div");
      b.style.cssText =
        "position:fixed;z-index:999;pointer-events:none;width:44px;height:44px;" +
        "left:" + (rect.left + rect.width / 2) + "px;top:" + (rect.top + rect.height / 2) + "px;";
      b.innerHTML = butterflySVG(PALETTE[colors[i % colors.length]], 0.4);
      b.querySelectorAll(".wing-l,.wing-r").forEach(function (w) {
        w.style.animation = "flap 0.4s ease-in-out infinite";
        w.style.transformOrigin = "540px 620px";
      });
      document.body.appendChild(b);
      const ang = (Math.PI * 2 * i) / 7 - Math.PI / 2;
      const dist = 130 + Math.random() * 130;
      b.animate(
        [
          { transform: "translate(0,0) scale(0.4) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + Math.cos(ang) * dist + "px," + (Math.sin(ang) * dist - 90) + "px) scale(1) rotate(" + (Math.random() * 60 - 30) + "deg)", opacity: 0 },
        ],
        { duration: 1600 + Math.random() * 700, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" }
      );
      setTimeout(function () { b.remove(); }, 2600);
    }
  }

  /* ---------- Scroll companion butterfly ---------- */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && window.innerWidth > 920) {
    const comp = document.createElement("div");
    comp.id = "scroll-bfly";
    comp.style.width = "58px";
    comp.style.height = "58px";
    comp.innerHTML = butterflySVG(PALETTE.coral, 0.8);
    document.body.appendChild(comp);
    const wings = comp.querySelectorAll(".wing-l,.wing-r");

    let curX = window.innerWidth - 110, curY = 140;
    let lastScroll = window.scrollY, velocity = 0, t = 0, lastRot = 0;

    function loop() {
      t += 0.016;
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);

      velocity += (window.scrollY - lastScroll) * 0.06;
      velocity *= 0.9;
      lastScroll = window.scrollY;

      const targetY = 110 + progress * (window.innerHeight - 260) + Math.sin(t * 1.4) * 24;
      const targetX = window.innerWidth - 110 + Math.sin(t * 0.9) * 34 - Math.abs(velocity) * 2;

      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      const rot = Math.max(-28, Math.min(28, velocity * 3 + Math.sin(t * 1.4) * 8));
      lastRot += (rot - lastRot) * 0.1;

      comp.style.transform =
        "translate(" + curX + "px," + curY + "px) rotate(" + lastRot + "deg)";

      const flapDur = Math.abs(velocity) > 2 ? "0.35s" : "0.85s";
      wings.forEach(function (w) { w.style.animationDuration = flapDur; });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------- Gentle parallax on blobs ---------- */
  if (!prefersReduced) {
    const blobs = document.querySelectorAll(".blob");
    window.addEventListener(
      "scroll",
      function () {
        const y = window.scrollY;
        blobs.forEach(function (b, i) {
          const speed = 0.03 + (i % 3) * 0.02;
          b.style.transform = "translateY(" + y * speed * (i % 2 === 0 ? 1 : -1) + "px)";
        });
      },
      { passive: true }
    );
  }

  /* ---------- Step hover pop-up scenes ---------- */
  const SCENES = {
    submit:
      '<div class="scene sc-submit">' +
      '<div class="mini-form"><i></i><i></i><i></i></div>' +
      '<div class="pop-check">✓</div>' +
      '<div class="conf c1"></div><div class="conf c2"></div><div class="conf c3"></div>' +
      '<div class="conf c4"></div><div class="conf c5"></div><div class="conf c6"></div>' +
      "</div>",
    hello:
      '<div class="scene sc-hello">' +
      '<div class="bub b1">👋 Hi!</div>' +
      '<div class="bub b2">Hello!</div>' +
      '<div class="bub b3">💬 Tell us…</div>' +
      "</div>",
    paperwork:
      '<div class="scene sc-paperwork">' +
      '<div class="doc d1">📄</div><div class="doc d2">📄</div><div class="doc d3">📋</div>' +
      '<div class="pop-check">✓</div>' +
      "</div>",
    reach:
      '<div class="scene sc-reach">' +
      '<div class="ring r1"></div><div class="ring r2"></div>' +
      '<div class="phone">📞</div>' +
      "</div>",
    plan:
      '<div class="scene sc-plan">' +
      '<div class="rowline p1"><span class="cbx"></span><span class="rbar"></span></div>' +
      '<div class="rowline p2"><span class="cbx"></span><span class="rbar"></span></div>' +
      '<div class="rowline p3"><span class="cbx"></span><span class="rbar"></span></div>' +
      "</div>",
    begin:
      '<div class="scene sc-begin">' +
      '<div class="fly-bf">' + butterflySVG(PALETTE.coral, 0.35) + "</div>" +
      '<div class="spark s1">✨</div><div class="spark s2">⭐</div><div class="spark s3">✨</div>' +
      "</div>",
  };

  document.querySelectorAll(".step[data-scene]").forEach(function (step) {
    const scene = SCENES[step.dataset.scene];
    if (!scene) return;
    const pop = document.createElement("div");
    pop.className = "step-pop";
    pop.innerHTML = scene;
    step.appendChild(pop);

    if (!prefersReduced) {
      step.addEventListener("mouseenter", function () {
        const rect = step.getBoundingClientRect();
        const colors = ["coral", "butter", "lilac"];
        for (let i = 0; i < 3; i++) {
          const b = document.createElement("div");
          b.style.cssText =
            "position:fixed;z-index:999;pointer-events:none;width:26px;height:26px;" +
            "left:" + (rect.left + rect.width * (0.25 + 0.25 * i)) + "px;top:" + rect.top + "px;";
          b.innerHTML = butterflySVG(PALETTE[colors[i]], 0.3);
          document.body.appendChild(b);
          b.animate(
            [
              { transform: "translateY(0) scale(0.4) rotate(0deg)", opacity: 1 },
              { transform: "translateY(-" + (70 + i * 26) + "px) translateX(" + (i - 1) * 44 + "px) scale(1) rotate(" + (i - 1) * 24 + "deg)", opacity: 0 },
            ],
            { duration: 1100 + i * 180, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" }
          );
          setTimeout(function () { b.remove(); }, 1500);
        }
      });
    }
  });

  /* ---------- Insurance logo pop-ups ---------- */
  document.querySelectorAll(".ins-logos span[data-logo]").forEach(function (pill) {
    const domain = pill.dataset.logo;
    const pop = document.createElement("div");
    pop.className = "ins-pop";
    const img = document.createElement("img");
    img.alt = pill.textContent.trim() + " logo";
    img.loading = "lazy";
    img.src = "https://logo.clearbit.com/" + domain + "?size=160";
    img.onerror = function () {
      img.onerror = null;
      img.src = "https://www.google.com/s2/favicons?domain=" + domain + "&sz=128";
    };
    pop.appendChild(img);
    pill.appendChild(pop);
  });

  /* ---------- Pre-select job role from URL (?role=rbt|bcba) ---------- */
  const roleSelect = document.getElementById("job-role");
  if (roleSelect) {
    const role = new URLSearchParams(location.search).get("role");
    if (role && roleSelect.querySelector('option[value="' + role + '"]')) {
      roleSelect.value = role;
      roleSelect.style.borderColor = "var(--coral)";
      roleSelect.style.background = "#fff";
      setTimeout(function () {
        roleSelect.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.03)" },
            { transform: "scale(1)" },
          ],
          { duration: 600, easing: "cubic-bezier(0.34,1.56,0.64,1)" }
        );
      }, 400);
    }
  }

  /* ---------- Mobile butterfly fly-bys ---------- */
  if (!prefersReduced && window.innerWidth <= 920) {
    const flyColors = ["coral", "butter", "lilac", "mint"];
    function flyBy() {
      if (document.hidden) return;
      const size = 26 + Math.random() * 16;
      const fromLeft = Math.random() > 0.5;
      const y = 70 + Math.random() * (window.innerHeight * 0.4);
      const b = document.createElement("div");
      b.style.cssText =
        "position:fixed;z-index:60;pointer-events:none;" +
        "width:" + size + "px;height:" + size + "px;top:" + y + "px;" +
        "left:" + (fromLeft ? -70 : window.innerWidth + 70) + "px;";
      b.innerHTML = butterflySVG(
        PALETTE[flyColors[Math.floor(Math.random() * flyColors.length)]],
        0.45
      );
      document.body.appendChild(b);

      const dist = window.innerWidth + 160;
      const dir = fromLeft ? 1 : -1;
      const flip = fromLeft ? "" : " scaleX(-1)";
      const frames = [];
      for (let i = 0; i <= 12; i++) {
        const p = i / 12;
        frames.push({
          transform:
            "translate(" + dir * dist * p + "px," +
            (Math.sin(p * Math.PI * 2.5) * -34 - p * 30) + "px) " +
            "rotate(" + Math.cos(p * Math.PI * 2.5) * 10 * dir + "deg)" + flip,
          offset: p,
        });
      }
      b.animate(frames, {
        duration: 6500 + Math.random() * 3000,
        easing: "linear",
      }).onfinish = function () { b.remove(); };
    }
    setTimeout(flyBy, 2200);
    setInterval(flyBy, 8500);
  }

  /* ---------- Active nav link ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a.nav-link").forEach(function (a) {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
})();
