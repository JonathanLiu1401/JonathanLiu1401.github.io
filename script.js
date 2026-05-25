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
})();
