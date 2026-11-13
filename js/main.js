(function () {
  "use strict";

  var roles = [
    "Python Developer",
    "JavaScript Developer",
    "Web Developer",
    "Front-End Developer",
  ];

  if (window.Typed) {
    new Typed(".typing-text", {
      strings: roles,
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 750,
      showCursor: false,
    });
  } else {
    var el = document.querySelector(".typing-text");
    if (el) el.textContent = roles[0];
  }

  var menuBtn = document.getElementById("menu");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector("header");

  function closeMenu() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("nav-toggle");
    menuBtn.setAttribute("aria-expanded", "false");
    header && header.classList.remove("menu-open");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("nav-toggle");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      header && header.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".navbar a");
  var scrollTop = document.getElementById("scroll-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var marker = y + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (marker >= top && marker < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id
          );
        });
      }
    });

    if (scrollTop) {
      scrollTop.classList.toggle("show", y > 400);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (form.querySelector("#name") || {}).value || "";
      var email = (form.querySelector("#user_email") || {}).value || "";
      var title = (form.querySelector("#title") || {}).value || "";
      var message = (form.querySelector("#message") || {}).value || "";
      var body =
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\n\n" +
        message;
      var mailto =
        "mailto:sharkmessi1020@gmail.com" +
        "?subject=" +
        encodeURIComponent(title) +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = mailto;
      if (status) {
        status.textContent = "Opening your email client…";
      }
    });
  }

  if (window.ParticlesLite) {
    ParticlesLite.init("particles-js", {
      color: "#000000",
      count: 48,
      maxSize: 2.4,
      speed: 0.35,
      linkDistance: 120,
      linkOpacity: 0.12,
    });
  }

  var revealTargets = document.querySelectorAll(
    ".about .row, .skills .bar, .experience .box, .contact form, .footer .box"
  );
  revealTargets.forEach(function (node) {
    node.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (node) {
      io.observe(node);
    });
  } else {
    revealTargets.forEach(function (node) {
      node.classList.add("in");
    });
  }
})();
