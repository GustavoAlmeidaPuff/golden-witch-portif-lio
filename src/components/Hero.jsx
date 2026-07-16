export default function Hero({ t }) {
  return (
    <section className="hero">
      <span className="sparkle" style={{ top: "8%", left: "6%", fontSize: "1.3rem" }} aria-hidden="true">✦</span>
      <span className="sparkle" style={{ top: "18%", right: "8%", fontSize: "1rem", animationDelay: ".8s" }} aria-hidden="true">✧</span>
      <span className="sparkle" style={{ bottom: "18%", left: "12%", fontSize: ".9rem", animationDelay: "1.5s" }} aria-hidden="true">✦</span>

      <div className="hero-inner">
        <div className="hero-copy">
          <h1>Golden <span className="gold">Witch</span></h1>
          <p className="tag">{t.tagline}</p>
        </div>
        <div className="hero-visual">
          <img
            src="/img/hero-avi.png"
            alt={t.alt}
            width={640}
            height={640}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
