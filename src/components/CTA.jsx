import Butterfly from "./Butterfly.jsx";

export default function CTA({ t }) {
  return (
    <section id="discord">
      <div className="cta">
        <span className="sparkle" style={{ top: "18px", left: "8%", fontSize: "1.1rem" }} aria-hidden="true">✦</span>
        <span className="sparkle" style={{ bottom: "24px", right: "10%", fontSize: "1rem", animationDelay: "1.2s" }} aria-hidden="true">✧</span>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaSub}</p>
        <a className="btn-discord" href="https://discord.com/invite/4K2qCg628X" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.26 20.26 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.92-1.37 1.3-2.1a12.88 12.88 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.16 14.16 0 0 0 12.16 0c.17.13.33.26.5.38-.65.39-1.34.71-2.05.98.37.73.81 1.43 1.3 2.1a19.84 19.84 0 0 0 6.07-3.03 20.18 20.18 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42c1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
          </svg>
          <span>{t.ctaBtn}</span>
        </a>
        <Butterfly color="var(--lav)" style={{ top: "36px", right: "22%", transform: "rotate(8deg)" }} />
      </div>
    </section>
  );
}
