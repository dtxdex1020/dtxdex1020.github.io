(function (global) {
  "use strict";

  function ParticlesLite() {}

  ParticlesLite.init = function (canvasId, options) {
    var host = document.getElementById(canvasId);
    if (!host) return null;

    var opts = options || {};
    var color = opts.color || "#000000";
    var count = opts.count || 50;
    var maxSize = opts.maxSize || 2.5;
    var speed = opts.speed || 0.4;
    var linkDistance = opts.linkDistance || 110;
    var linkOpacity = opts.linkOpacity || 0.15;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
    host.innerHTML = "";
    host.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var particles = [];
    var raf = 0;
    var reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      var rect = host.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect;
    }

    function spawn(width, height) {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * maxSize + 0.4,
        });
      }
    }

    function hexToRgb(hex) {
      var h = hex.replace("#", "");
      if (h.length === 3) {
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      }
      var n = parseInt(h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    var rgb = hexToRgb(color);

    function draw(width, height) {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0.55)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            var alpha = linkOpacity * (1 - dist / linkDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle =
              "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }

    var size = resize();
    spawn(size.width, size.height);

    function loop() {
      var rect = host.getBoundingClientRect();
      draw(rect.width, rect.height);
      raf = requestAnimationFrame(loop);
    }

    if (!reduced) {
      loop();
    } else {
      draw(size.width, size.height);
    }

    window.addEventListener("resize", function () {
      var rect = resize();
      spawn(rect.width, rect.height);
      if (reduced) draw(rect.width, rect.height);
    });

    return {
      destroy: function () {
        cancelAnimationFrame(raf);
      },
    };
  };

  global.ParticlesLite = ParticlesLite;
})(window);
