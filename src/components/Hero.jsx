export default function Hero({ t }) {
  return (
    <section className="hero">
      <span className="sparkle" style={{ top: "8%", left: "14%", fontSize: "1.3rem" }} aria-hidden="true">✦</span>
      <span className="sparkle" style={{ top: "22%", right: "12%", fontSize: "1rem", animationDelay: ".8s" }} aria-hidden="true">✧</span>
      <span className="sparkle" style={{ bottom: "14%", left: "22%", fontSize: ".9rem", animationDelay: "1.5s" }} aria-hidden="true">✦</span>
      <h1>Golden <span className="gold">Witch</span></h1>
      <p className="tag">{t.tagline}</p>
      <a className="down" href="#galeria"><span>{t.scroll}</span></a>
    </section>
  );
}
