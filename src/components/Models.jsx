import Viewer3D from "./Viewer3D.jsx";

export default function Models({ t }) {
  return (
    <section id="modelos">
      <div className="viewer-card">
        <Viewer3D />
        <div className="viewer-info">
          <h3>{t.t3d}</h3>
          <p>{t.p3d}</p>
          <p className="hint">
            <span aria-hidden="true">🖱️</span> <span>{t.hint3d}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
