export const I18N = {
  pt: {
    tagline: "Avatares feitos à mão pra VRChat, com um toquinho de magia em cada um",
    galTitle: "O varal de fotos",
    galSub: "Clica pra ver de pertinho.",
    t3d: "Modelos inspecionáveis",
    p3d: "Aqui vai dar pra explorar os modelos 3D dos avatares em detalhe. Por enquanto tem essa bruxinha de plantão segurando o lugar. Podemos fazer de um jeito que tenha vários desses visualizadores pro pessoal ver, ou até mesmo fazer uma galeria alternativa com os modelos 3D.",
    hint3d: "Arrasta pra girar o modelo",
    zoomHint: "Dá dois toques ou pinça pra dar zoom",
    close: "Fechar",
    ctaTitle: "Quer um avatar só seu?",
    ctaSub: "É no Discord que tudo acontece: encomendas, prévias e o processo de criação de cada avi.",
    ctaBtn: "Entrar no Discord",
    alt: "Avatar criado pela Golden Witch",
  },
  en: {
    tagline: "Handmade avatars for VRChat, each one with a little bit of magic",
    galTitle: "The photo line",
    galSub: "Click to take a closer look.",
    t3d: "Inspectable models",
    p3d: "Soon you'll be able to explore the 3D models of the avatars in detail. For now this little witch is holding the spot. We might set it up so there are several of these viewers for everyone to see, or even make an alternate gallery with the 3D models.",
    hint3d: "Drag to spin the model",
    zoomHint: "Double tap or pinch to zoom",
    close: "Close",
    ctaTitle: "Want an avatar of your own?",
    ctaSub: "Everything happens on Discord: commissions, previews and the making of each avi.",
    ctaBtn: "Join the Discord",
    alt: "Avatar created by Golden Witch",
  },
};

export const PHOTOS = [
  { name: "avi01", w: 700, h: 393 },
  { name: "avi02", w: 393, h: 700 },
  { name: "avi03", w: 393, h: 700 },
  { name: "avi04", w: 393, h: 700 },
  { name: "avi05", w: 700, h: 393 },
  { name: "avi06", w: 700, h: 393 },
  { name: "avi07", w: 393, h: 700 },
  { name: "avi08", w: 393, h: 700 },
  { name: "avi09", w: 700, h: 393 },
  { name: "avi10", w: 700, h: 393 },
  { name: "avi11", w: 700, h: 393 },
  { name: "avi12", w: 700, h: 393 },
  { name: "avi13", w: 700, h: 393 },
  { name: "avi14", w: 700, h: 393 },
  { name: "avi15", w: 393, h: 700 },
  { name: "avi16", w: 393, h: 700 },
  { name: "avi17", w: 387, h: 700 },
];

export async function detectLang() {
  const saved = localStorage.getItem("gw-lang");
  if (saved) return saved;
  let l = (navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en";
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3500);
    const r = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
    clearTimeout(t);
    const d = await r.json();
    l = d.country_code === "BR" || d.country_code === "PT" ? "pt" : "en";
  } catch (e) {
    /* fica no fallback do navegador */
  }
  return l;
}
