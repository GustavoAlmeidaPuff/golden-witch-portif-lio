export default function Header({ lang, onToggleLang, theme, onToggleTheme }) {
  return (
    <header>
      <nav className="nav">
        <a className="logo" href="#" aria-label="Golden Witch">
          <svg className="hat" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 3 L22 18 H10 Z" fill="var(--gold)" />
            <ellipse cx="16" cy="19.5" rx="12" ry="3.4" fill="var(--gold)" opacity=".85" />
            <rect x="11.5" y="15.5" width="9" height="2.6" rx="1.3" fill="var(--bg)" />
            <path d="M24.5 6.5 l.9 2 2 .9 -2 .9 -.9 2 -.9 -2 -2 -.9 2 -.9Z" fill="var(--gold-soft)" />
          </svg>
          Golden Witch
        </a>
        <div className="nav-right">
          <button className="pill" aria-label="Trocar idioma" onClick={onToggleLang}>
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <button className="pill" aria-label="Trocar tema" onClick={onToggleTheme}>
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>
      </nav>
    </header>
  );
}
