(function () {
  "use strict";
  var APP_LINK = "https://clubcard.cc/app"; // Smartlink-Route: öffnet je nach Gerät den passenden Store

  /* QR-Codes für Desktop-Besucher */
  if (window.QRCode) {
    document.querySelectorAll("[data-qr]").forEach(function (el) {
      new window.QRCode(el, {
        text: APP_LINK,
        width: 160,
        height: 160,
        colorDark: "#181818",
        colorLight: "#ffffff",
        correctLevel: window.QRCode.CorrectLevel.M
      });
    });
  }

  /* Live-Uhr auf dem Nachweis-Screen */
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var d = new Date();
    var t = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
    document.querySelectorAll("[data-clock]").forEach(function (el) { el.textContent = t; });
  }
  tick();
  setInterval(tick, 1000);

  /* Wischen zum Einlösen */
  document.querySelectorAll(".swipe").forEach(function (track) {
    var knob = track.querySelector(".swipe-knob");
    var fill = track.querySelector(".swipe-fill");
    var screen = track.closest(".screen");
    var startX = 0, x = 0, max = 0, dragging = false;

    function set(v) {
      x = Math.max(0, Math.min(v, max));
      knob.style.transform = "translateX(" + x + "px)";
      fill.style.width = (x + 56) + "px";
    }
    function redeem() {
      screen.classList.add("redeemed");
      set(max);
    }
    function reset() {
      screen.classList.remove("redeemed");
      track.classList.remove("dragging");
      set(0);
    }

    knob.addEventListener("pointerdown", function (e) {
      max = track.clientWidth - knob.offsetWidth - 8;
      startX = e.clientX - x;
      dragging = true;
      track.classList.add("dragging");
      knob.setPointerCapture(e.pointerId);
    });
    knob.addEventListener("pointermove", function (e) {
      if (dragging) set(e.clientX - startX);
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");
      if (x > max * 0.82) redeem(); else set(0);
    }
    knob.addEventListener("pointerup", end);
    knob.addEventListener("pointercancel", end);
    knob.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        max = track.clientWidth - knob.offsetWidth - 8;
        redeem();
      }
    });
    var back = screen.querySelector("[data-reset]");
    if (back) back.addEventListener("click", reset);
  });

  /* Preise: Standard / Studierende */
  var toggle = document.querySelector("[data-plan-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var mode = btn.dataset.mode;
      toggle.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      document.querySelectorAll("[data-price]").forEach(function (el) {
        el.textContent = el.dataset[mode];
      });
    });
  }

  /* Tabs auf der Partnerseite */
  document.querySelectorAll("[role=tablist]").forEach(function (list) {
    var tabs = list.querySelectorAll("[role=tab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", String(on));
          document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
        });
      });
    });
  });

  /* Regler: Wie oft pro Gast / Wie viele pro Tag */
  var freq = ["täglich", "alle 7 Tage", "alle 14 Tage", "alle 30 Tage"];
  var f = document.getElementById("ctl-freq");
  var q = document.getElementById("ctl-quota");
  function syncControls() {
    if (f) document.querySelectorAll("[data-freq]").forEach(function (el) { el.textContent = freq[+f.value]; });
    if (q) document.querySelectorAll("[data-quota]").forEach(function (el) { el.textContent = q.value; });
  }
  if (f) f.addEventListener("input", syncControls);
  if (q) q.addEventListener("input", syncControls);
  syncControls();

  /* Partner-Formular: noch ohne Backend */
  var form = document.getElementById("pform");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      form.classList.add("sent");
    });
    form.addEventListener("change", function () {
      var guest = form.querySelector("input[name=typ][value=gast]");
      document.getElementById("guest-note").hidden = !(guest && guest.checked);
    });
  }

  /* Kopieren von Kontaktdaten */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.dataset.copy;
      var done = function () { btn.textContent = "Kopiert"; setTimeout(function () { btn.textContent = "Kopieren"; }, 1600); };
      try {
        navigator.clipboard.writeText(text).then(done, function () {});
      } catch (err) { /* Fallback: Text ist per user-select: all markierbar */ }
    });
  });
})();
