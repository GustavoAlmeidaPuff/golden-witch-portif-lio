import { PHOTOS } from "../i18n.js";
import Butterfly from "./Butterfly.jsx";

const BUTTERFLY_PICKS = [1, 5, 9, 14];
const BUTTERFLY_COLORS = ["var(--gold)", "var(--lav)", "var(--gold-soft)", "var(--gold)"];

function butterflyFor(index) {
  const n = BUTTERFLY_PICKS.indexOf(index);
  if (n === -1) return null;
  const left = n % 2 === 0;
  const style = {
    top: "-16px",
    [left ? "left" : "right"]: `${12 + n * 6}px`,
    transform: `rotate(${left ? -12 : 14}deg)`,
  };
  return <Butterfly color={BUTTERFLY_COLORS[n % BUTTERFLY_COLORS.length]} style={style} />;
}

export default function Gallery({ t, onOpen }) {
  return (
    <section id="galeria">
      <h2 className="sec-title">{t.galTitle}</h2>
      <p className="sec-sub">{t.galSub}</p>
      <div className="gallery">
        {PHOTOS.map(({ name, w, h }, i) => (
          <figure
            className="polaroid"
            key={name}
            style={BUTTERFLY_PICKS.includes(i) ? { overflow: "visible" } : undefined}
          >
            <img
              loading="lazy"
              width={w}
              height={h}
              style={{ aspectRatio: `${w}/${h}` }}
              src={`/img/thumb/${name}.jpg`}
              alt={t.alt}
              onClick={() => onOpen(`/img/${name}.jpg`, t.alt)}
            />
            {butterflyFor(i)}
          </figure>
        ))}
      </div>
    </section>
  );
}
