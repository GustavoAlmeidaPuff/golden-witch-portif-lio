export default function Butterfly({ color, style }) {
  return (
    <div className="bfly rest" style={style}>
      <svg viewBox="0 0 34 30" aria-hidden="true">
        <g className="wingL">
          <path
            d="M16 15 C8 2, -2 4, 2 13 C4 19, 11 19, 16 15 Z M16 15 C9 16, 3 20, 6 25 C9 29, 14 22, 16 15 Z"
            fill={color}
            opacity=".92"
          />
        </g>
        <g className="wingR">
          <path
            d="M18 15 C26 2, 36 4, 32 13 C30 19, 23 19, 18 15 Z M18 15 C25 16, 31 20, 28 25 C25 29, 20 22, 18 15 Z"
            fill={color}
            opacity=".92"
          />
        </g>
        <ellipse cx="17" cy="15.5" rx="1.6" ry="5.4" fill="var(--text)" />
        <path
          d="M16 10 q-2 -3 -3.5 -3.5 M18 10 q2 -3 3.5 -3.5"
          stroke="var(--text)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
