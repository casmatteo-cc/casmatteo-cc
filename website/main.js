(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mitgliedskarte: kippt beim Scrollen und folgt dem Zeiger */
  var card = document.querySelector("[data-tilt]");
  if (card && !reduce) {
    var px = 0, py = 0, ticking = false;
    function render() {
      ticking = false;
      var r = card.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      var p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh)); // -1 … 1
      card.style.setProperty("--rz", (6 - (1 - Math.abs(p)) * 4 + p * 4).toFixed(2) + "deg");
      card.style.setProperty("--rx", (p * 14 + py * -8).toFixed(2) + "deg");
      card.style.setProperty("--ry", (px * 10).toFixed(2) + "deg");
      card.style.setProperty("--sheen", (-20 + px * 30 - p * 30).toFixed(1) + "%");
    }
    function request() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    card.parentElement.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      request();
    });
    card.parentElement.addEventListener("pointerleave", function () { px = 0; py = 0; request(); });
    render();
  }

  /* Sticky-Leiste erscheint nach dem Hero (mobil) */
  var bar = document.querySelector(".sticky-bar");
  var hero = document.querySelector("[data-hero]");
  var closing = document.querySelector("[data-closing]");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroVisible = true, closingVisible = false;
    var update = function () { bar.classList.toggle("show", !heroVisible && !closingVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    if (closing) new IntersectionObserver(function (e) { closingVisible = e[0].isIntersecting; update(); }).observe(closing);
  }

  /* „Android? Trag dich ein“ öffnet die passende FAQ-Antwort */
  document.querySelectorAll("[data-open]").forEach(function (link) {
    link.addEventListener("click", function () {
      var target = document.getElementById(link.dataset.open);
      if (target) target.open = true;
    });
  });

  /* Formulare: noch ohne Backend, also ehrlich sagen, dass nichts verschickt wurde */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var msg = form.querySelector("[data-msg]");
      if (msg) msg.hidden = false;
    });
  });
})();
