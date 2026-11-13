(function () {
  "use strict";

  var top = document.querySelector(".top");
  function onScroll() {
    if (!top) return;
    top.classList.toggle("scrolled", (window.scrollY || 0) > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll(".stack-list li");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var idx = Array.prototype.indexOf.call(items, el);
          window.setTimeout(function () {
            el.classList.add("in");
          }, Math.max(0, idx) * 90);
          io.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );
    items.forEach(function (item) {
      io.observe(item);
    });
  } else {
    items.forEach(function (item) {
      item.classList.add("in");
    });
  }
})();
