import { useEffect, useRef } from "react";

function drawSparkle(ctx, x, y, r, rot) {
  const outer = r * 2.6, inner = r * 0.45;
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? outer : inner;
    const a = rot + (Math.PI / 4) * i - Math.PI / 2;
    const px = x + Math.cos(a) * rad, py = y + Math.sin(a) * rad;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

export default function Sky() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sky = canvasRef.current;
    const ctx = sky.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars = [];
    let raf;

    function makeStars() {
      sky.width = window.innerWidth;
      sky.height = window.innerHeight;
      const n = Math.floor((window.innerWidth * window.innerHeight) / 11000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * sky.width,
        y: Math.random() * sky.height,
        r: Math.random() * 2.2 + 1,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 1.2,
        gold: Math.random() > 0.88,
        depth: 0.06 + Math.random() * 0.22,
      }));
    }

    function drawStars(t) {
      ctx.clearRect(0, 0, sky.width, sky.height);
      const rootStyle = getComputedStyle(document.documentElement);
      const gold = rootStyle.getPropertyValue("--gold").trim();
      const starC = rootStyle.getPropertyValue("--star-c").trim();
      const sc = window.scrollY;
      for (const st of stars) {
        const tw = reduced ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin((t / 1000) * st.s + st.p));
        ctx.globalAlpha = tw;
        ctx.fillStyle = st.gold ? gold : starC;
        const y = ((st.y - sc * st.depth) % sky.height + sky.height) % sky.height;
        drawSparkle(ctx, st.x, y, st.r, st.p);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(drawStars);
    }

    makeStars();
    raf = requestAnimationFrame(drawStars);
    window.addEventListener("resize", makeStars);

    return () => {
      window.removeEventListener("resize", makeStars);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="sky" ref={canvasRef} aria-hidden="true" />;
}
