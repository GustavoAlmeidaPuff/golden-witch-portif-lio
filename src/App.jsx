import { useEffect, useState } from "react";
import Sky from "./components/Sky.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Gallery from "./components/Gallery.jsx";
import Models from "./components/Models.jsx";
import CTA from "./components/CTA.jsx";
import Lightbox from "./components/Lightbox.jsx";
import useSmoothScroll from "./hooks/useSmoothScroll.js";
import { I18N, detectLang } from "./i18n.js";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("gw-theme") || "dark");
  const [lang, setLang] = useState("pt");
  const [lightbox, setLightbox] = useState({ src: "", alt: "" });

  useSmoothScroll();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gw-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    localStorage.setItem("gw-lang", lang);
  }, [lang]);

  useEffect(() => {
    const saved = localStorage.getItem("gw-lang");
    if (saved) {
      setLang(saved);
      return;
    }
    detectLang().then(setLang);
  }, []);

  const t = I18N[lang];

  return (
    <>
      <Sky />
      <Header
        lang={lang}
        onToggleLang={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
        theme={theme}
        onToggleTheme={() => setTheme((th) => (th === "dark" ? "light" : "dark"))}
      />
      <main className="wrap">
        <Hero t={t} />
        <Gallery t={t} onOpen={(src, alt) => setLightbox({ src, alt })} />
        <Models t={t} />
        <CTA t={t} />
      </main>
      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox({ src: "", alt: "" })} />
    </>
  );
}
