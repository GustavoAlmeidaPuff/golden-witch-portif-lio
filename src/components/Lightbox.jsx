import { useEffect } from "react";

export default function Lightbox({ src, alt, onClose }) {
  const open = !!src;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={`lightbox${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="close" aria-label="Fechar" onClick={onClose}>×</button>
      <img src={src || ""} alt={alt || ""} />
    </div>
  );
}
