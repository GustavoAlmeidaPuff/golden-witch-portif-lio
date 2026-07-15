export const I18N = {
  pt: {
    tagline: "avatares feitos à mão pra VRChat, com um toquinho de magia em cada um",
    scroll: "ver os avis ↓",
    galTitle: "o varal de fotos",
    galSub: "clica pra ver de pertinho.",
    t3d: "modelos inspecionáveis",
    p3d: "aqui vai dar pra explorar os modelos 3D dos avatares em detalhe. por enquanto tem essa bruxinha de plantão segurando o lugar. podemos fazer de um jeito que tenha vários desses visualizadores pro pessoal ver.",
    hint3d: "arrasta pra girar o modelo",
    ctaTitle: "quer um avatar só seu?",
    ctaSub: "é no Discord que tudo acontece: encomendas, prévias e o processo de criação de cada avi.",
    ctaBtn: "Entrar no Discord",
    alt: "Avatar criado pela Golden Witch",
  },
  en: {
    tagline: "handmade avatars for VRChat, each one with a little bit of magic",
    scroll: "see the avis ↓",
    galTitle: "the photo line",
    galSub: "click to take a closer look.",
    t3d: "inspectable models",
    p3d: "soon you'll be able to explore the 3D models of the avatars in detail. for now this little witch is holding the spot. we might set it up so there are several of these viewers for everyone to see.",
    hint3d: "drag to spin the model",
    ctaTitle: "want an avatar of your own?",
    ctaSub: "everything happens on Discord: commissions, previews and the making of each avi.",
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
