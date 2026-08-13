/* Jonathan Liu - site script
   Concerns:
     1. Dark-mode toggle + localStorage persistence
     2. Mobile hamburger nav
     3. Footer year stamp
   Defensive: all element queries null-checked.
*/
(function () {
  "use strict";

  /* ----- Theme toggle ----- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  // Sync initial aria state with whatever the head-script applied
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable - silent */
      }
    });
  }

  /* ----- Mobile nav ----- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    var use = navToggle.querySelector("use");
    if (use) use.setAttribute("href", "#i-menu");
  }
  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    var use = navToggle.querySelector("use");
    if (use) use.setAttribute("href", "#i-close");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });

    // Close after clicking a nav link (mobile)
    nav.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.tagName === "A" && window.matchMedia("(max-width: 767px)").matches) {
        closeNav();
      }
    });

    // Close if resized back to desktop
    var mql = window.matchMedia("(min-width: 768px)");
    var onChange = function () {
      if (mql.matches) closeNav();
    };
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else if (mql.addListener) mql.addListener(onChange);
  }

  /* ----- Footer year ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Gallery lightbox -----
     Works across any number of galleries: the UPWARDS grid and the per-project
     figure strips. Prev/next stay inside whichever gallery was opened. */
  var galleries = Array.prototype.slice.call(
    document.querySelectorAll("#upwardsGallery, .project-figs")
  );
  var dlg = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCap = document.getElementById("lightboxCap");
  var lbClose = document.getElementById("lightboxClose");
  var lbPrev = document.getElementById("lightboxPrev");
  var lbNext = document.getElementById("lightboxNext");

  if (galleries.length && dlg && lbImg && lbCap && typeof dlg.showModal === "function") {
    var buttons = [];
    var current = 0;

    function show(i) {
      if (!buttons.length) return;
      current = (i + buttons.length) % buttons.length;
      var btn = buttons[current];
      var thumb = btn.querySelector("img");
      lbImg.src = btn.getAttribute("data-full");
      lbImg.alt = thumb ? thumb.alt : "";
      lbCap.textContent =
        btn.getAttribute("data-caption") +
        "  (" + (current + 1) + " / " + buttons.length + ")";
    }

    galleries.forEach(function (gallery) {
      var group = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-btn"));
      group.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
          buttons = group;
          show(i);
          if (!dlg.open) dlg.showModal();
        });
      });
    });

    if (lbClose) lbClose.addEventListener("click", function () { dlg.close(); });
    if (lbPrev) lbPrev.addEventListener("click", function () { show(current - 1); });
    if (lbNext) lbNext.addEventListener("click", function () { show(current + 1); });

    // Arrow-key navigation (Esc is handled natively by <dialog>)
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    });

    // Click the backdrop (outside .lightbox-inner) to dismiss
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) dlg.close();
    });

    // Release the full-size image when closed
    dlg.addEventListener("close", function () { lbImg.removeAttribute("src"); });
  }
})();
