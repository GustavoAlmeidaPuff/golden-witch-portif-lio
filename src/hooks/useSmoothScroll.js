import { useEffect } from "react";

export default function useSmoothScroll() {
  useEffect(() => {
    let current = window.scrollY;
    let target = current;
    let raf;

    function clamp(v) {
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(max, Math.max(0, v));
    }

    function onWheel(e) {
      e.preventDefault();
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 18;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      target = clamp(target + dy);
    }

    function loop() {
      const nativeY = window.scrollY;
      if (Math.abs(nativeY - current) > 1.5) {
        target = current = nativeY; // teclado, barra de rolagem ou toque assumiram o controle
      } else if (Math.abs(target - current) > 0.25) {
        current = clamp(current + (target - current) * 0.1);
        window.scrollTo(0, current);
      } else {
        current = target;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);
}
