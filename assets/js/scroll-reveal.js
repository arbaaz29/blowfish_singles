(function () {
  "use strict";

  var SELECTOR = ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale";

  function revealAll() {
    document.querySelectorAll(SELECTOR).forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAll();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  function applyStagger() {
    document.querySelectorAll(".card-animate").forEach(function (card, index, all) {
      var parent = card.parentElement;
      var siblings = parent ? Array.from(parent.querySelectorAll(".card-animate")) : [];
      var pos = siblings.indexOf(card);
      var delay = Math.min(pos + 1, 4);
      var revealEl = card.querySelector(".scroll-reveal, .scroll-reveal-scale");
      if (revealEl && delay > 0) {
        revealEl.setAttribute("data-delay", delay);
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  function init() {
    applyStagger();
    document.querySelectorAll(SELECTOR).forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
