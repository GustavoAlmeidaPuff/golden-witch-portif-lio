import { useCallback, useEffect, useRef, useState } from "react";

const MAX_SCALE = 5;
const TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;

export default function Lightbox({ src, alt, onClose, t }) {
  const open = !!src;
  const stageRef = useRef(null);
  const imgRef = useRef(null);
  const view = useRef({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map());
  const pinch = useRef({ dist: 0, scale: 1 });
  const moved = useRef(false);
  const lastTap = useRef(0);
  /* o pointer capture redireciona o alvo do pointerup pro stage, então guarda no down */
  const downOnImg = useRef(false);
  const [zoomed, setZoomed] = useState(false);

  const apply = useCallback(() => {
    const el = imgRef.current;
    if (!el) return;
    const { scale, x, y } = view.current;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    setZoomed(scale > 1.01);
  }, []);

  const clamp = useCallback(() => {
    const el = imgRef.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const v = view.current;
    v.scale = Math.min(MAX_SCALE, Math.max(1, v.scale));
    const maxX = Math.max(0, (el.offsetWidth * v.scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (el.offsetHeight * v.scale - stage.clientHeight) / 2);
    v.x = Math.min(maxX, Math.max(-maxX, v.x));
    v.y = Math.min(maxY, Math.max(-maxY, v.y));
  }, []);

  /* Mantém o ponto sob os dedos parado enquanto a escala muda. */
  const zoomTo = useCallback(
    (next, fx, fy) => {
      const stage = stageRef.current;
      if (!stage) return;
      const v = view.current;
      const target = Math.min(MAX_SCALE, Math.max(1, next));
      const dx = fx - stage.clientWidth / 2;
      const dy = fy - stage.clientHeight / 2;
      v.x = dx - (dx - v.x) * (target / v.scale);
      v.y = dy - (dy - v.y) * (target / v.scale);
      v.scale = target;
      clamp();
      apply();
    },
    [apply, clamp]
  );

  useEffect(() => {
    view.current = { scale: 1, x: 0, y: 0 };
    pointers.current.clear();
    apply();
  }, [src, apply]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  /* Listener manual: o React registra wheel como passivo e preventDefault falharia. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !open) return undefined;
    function onWheel(e) {
      e.preventDefault();
      const r = stage.getBoundingClientRect();
      zoomTo(view.current.scale * Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
    }
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [open, zoomTo]);

  function pointFrom(e) {
    const r = stageRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (pointers.current.size === 0) downOnImg.current = e.target === imgRef.current;
    pointers.current.set(e.pointerId, pointFrom(e));
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.current.scale };
    }
  }

  function onPointerMove(e) {
    if (!pointers.current.has(e.pointerId)) return;
    const prev = pointers.current.get(e.pointerId);
    const p = pointFrom(e);
    pointers.current.set(e.pointerId, p);
    const pts = [...pointers.current.values()];

    if (pts.length >= 2) {
      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.current.dist > 0) {
        moved.current = true;
        zoomTo(pinch.current.scale * (dist / pinch.current.dist), (a.x + b.x) / 2, (a.y + b.y) / 2);
      }
      return;
    }

    if (view.current.scale > 1) {
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) moved.current = true;
      view.current.x += dx;
      view.current.y += dy;
      clamp();
      apply();
    }
  }

  function onPointerUp(e) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = { dist: 0, scale: view.current.scale };
    if (pointers.current.size > 0 || moved.current) return;

    if (!downOnImg.current) {
      onClose();
      return;
    }

    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      lastTap.current = 0;
      const p = pointFrom(e);
      zoomTo(view.current.scale > 1.01 ? 1 : TAP_SCALE, p.x, p.y);
    } else {
      lastTap.current = now;
    }
  }

  function onPointerCancel(e) {
    pointers.current.delete(e.pointerId);
    pinch.current = { dist: 0, scale: view.current.scale };
  }

  return (
    <div className={`lightbox${open ? " open" : ""}`} role="dialog" aria-modal="true">
      <div
        className="lb-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <img
          ref={imgRef}
          className={zoomed ? "zoomed" : undefined}
          src={src || ""}
          alt={alt || ""}
          draggable="false"
        />
      </div>
      {open && !zoomed && <p className="lb-hint">{t.zoomHint}</p>}
      <button className="close" aria-label={t.close} onClick={onClose}>×</button>
    </div>
  );
}
