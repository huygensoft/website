/**
 * Decorative architecture illustration for the homepage hero.
 *
 * The artwork is intentionally self-contained so it can be used before the
 * design system or an icon package is available. Its accessible name describes
 * the concept while the individual SVG shapes remain presentational.
 */
type SystemsCanvasProps = {
  label?: string;
  caption?: string;
};

export function SystemsCanvas({
  label = 'An abstract software system: connected services, a secure core, and a flowing data path.',
  caption = 'Connected systems, designed to move as one.',
}: SystemsCanvasProps) {
  return (
    <figure
      className="systems-canvas"
      role="img"
      aria-label={label}
    >
      <div className="systems-canvas__backdrop" aria-hidden="true" />

      <svg
        className="systems-canvas__art"
        viewBox="0 0 720 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="systems-canvas-surface" x1="104" y1="60" x2="628" y2="544" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.72" />
            <stop offset="1" stopColor="#DCEBFF" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="systems-canvas-orbit" x1="101" y1="151" x2="609" y2="427" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7DD3FC" stopOpacity="0.05" />
            <stop offset="0.48" stopColor="#A78BFA" stopOpacity="0.85" />
            <stop offset="1" stopColor="#FB923C" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="systems-canvas-core" x1="306" y1="212" x2="427" y2="384" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EFF6FF" stopOpacity="0.98" />
            <stop offset="0.48" stopColor="#B7D8FF" stopOpacity="0.76" />
            <stop offset="1" stopColor="#9B8AFB" stopOpacity="0.58" />
          </linearGradient>
          <linearGradient id="systems-canvas-flow" x1="120" y1="398" x2="608" y2="236" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>
          <radialGradient id="systems-canvas-glow" cx="0" cy="0" r="1" gradientTransform="translate(365 300) rotate(90) scale(223)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.86" />
            <stop offset="0.42" stopColor="#A5D8FF" stopOpacity="0.24" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </radialGradient>
          <filter id="systems-canvas-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="systems-canvas-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1E3A5F" floodOpacity="0.18" />
          </filter>
        </defs>

        <circle className="systems-canvas__glow" cx="365" cy="300" r="222" fill="url(#systems-canvas-glow)" />
        <circle className="systems-canvas__glow systems-canvas__glow--soft" cx="365" cy="300" r="176" fill="#8B5CF6" fillOpacity="0.16" filter="url(#systems-canvas-blur)" />

        <g className="systems-canvas__orbits" stroke="url(#systems-canvas-orbit)">
          <ellipse cx="365" cy="300" rx="269" ry="132" strokeWidth="1.25" />
          <ellipse cx="365" cy="300" rx="214" ry="214" transform="rotate(-31 365 300)" strokeWidth="1.1" strokeDasharray="4 9" />
          <ellipse cx="365" cy="300" rx="254" ry="154" transform="rotate(30 365 300)" strokeWidth="1.15" strokeDasharray="2 11" />
        </g>

        <g className="systems-canvas__flow" stroke="url(#systems-canvas-flow)" strokeLinecap="round">
          <path d="M123 403C203 403 226 424 283 374C325 337 326 299 362 299C398 299 404 350 442 366C488 385 516 274 601 246" strokeWidth="2.25" />
          <path d="M163 195C213 230 238 232 275 218C313 204 319 160 361 158C414 154 437 204 481 213C523 223 555 179 585 151" strokeWidth="1.25" strokeOpacity="0.48" strokeDasharray="4 8" />
          <path d="M150 401C222 449 286 470 362 456C438 442 495 405 574 357" strokeWidth="1.1" strokeOpacity="0.36" strokeDasharray="2 9" />
        </g>

        <g className="systems-canvas__core" filter="url(#systems-canvas-shadow)">
          <rect x="286" y="222" width="158" height="158" rx="42" fill="url(#systems-canvas-surface)" stroke="#FFFFFF" strokeOpacity="0.72" />
          <rect x="304" y="240" width="122" height="122" rx="31" fill="url(#systems-canvas-core)" fillOpacity="0.72" stroke="#FFFFFF" strokeOpacity="0.58" />
          <path d="M343 280C343 266.745 353.745 256 367 256C380.255 256 391 266.745 391 280V292H343V280Z" fill="#172554" fillOpacity="0.78" />
          <rect x="336" y="288" width="62" height="49" rx="14" fill="#172554" fillOpacity="0.78" />
          <circle cx="367" cy="312" r="6" fill="#F8FAFC" />
          <path d="M367 318V326" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
          <path d="M323 349H411" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="329" cy="349" r="3" fill="#38BDF8" />
          <circle cx="342" cy="349" r="3" fill="#A78BFA" />
          <circle cx="355" cy="349" r="3" fill="#FB923C" />
        </g>

        <g className="systems-canvas__nodes" filter="url(#systems-canvas-shadow)">
          <g className="systems-canvas__node systems-canvas__node--top">
            <rect x="315" y="88" width="100" height="74" rx="22" fill="url(#systems-canvas-surface)" stroke="#FFFFFF" strokeOpacity="0.66" />
            <path d="M346 119H384M346 132H374" stroke="#1E3A5F" strokeOpacity="0.76" strokeWidth="5" strokeLinecap="round" />
            <circle cx="392" cy="132" r="5" fill="#38BDF8" />
          </g>
          <g className="systems-canvas__node systems-canvas__node--right">
            <rect x="544" y="216" width="104" height="74" rx="22" fill="url(#systems-canvas-surface)" stroke="#FFFFFF" strokeOpacity="0.66" />
            <rect x="574" y="238" width="44" height="9" rx="4.5" fill="#1E3A5F" fillOpacity="0.76" />
            <rect x="574" y="255" width="31" height="7" rx="3.5" fill="#1E3A5F" fillOpacity="0.48" />
            <circle cx="620" cy="259" r="6" fill="#FB923C" />
          </g>
          <g className="systems-canvas__node systems-canvas__node--bottom">
            <rect x="304" y="448" width="122" height="77" rx="24" fill="url(#systems-canvas-surface)" stroke="#FFFFFF" strokeOpacity="0.66" />
            <path d="M334 488C344 470 360 470 370 488C380 506 396 506 406 488" stroke="#1E3A5F" strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round" />
            <circle cx="334" cy="488" r="5" fill="#38BDF8" />
            <circle cx="370" cy="488" r="5" fill="#A78BFA" />
            <circle cx="406" cy="488" r="5" fill="#FB923C" />
          </g>
          <g className="systems-canvas__node systems-canvas__node--left">
            <rect x="75" y="290" width="108" height="76" rx="22" fill="url(#systems-canvas-surface)" stroke="#FFFFFF" strokeOpacity="0.66" />
            <path d="M109 326H149M109 340H136" stroke="#1E3A5F" strokeOpacity="0.76" strokeWidth="5" strokeLinecap="round" />
            <circle cx="155" cy="340" r="5" fill="#A78BFA" />
          </g>
        </g>

        <g className="systems-canvas__signals">
          <circle cx="182" cy="403" r="7" fill="#38BDF8" />
          <circle cx="245" cy="408" r="5" fill="#A78BFA" />
          <circle cx="469" cy="351" r="7" fill="#FB923C" />
          <circle cx="526" cy="300" r="5" fill="#38BDF8" />
          <circle cx="487" cy="211" r="6" fill="#A78BFA" />
          <circle cx="245" cy="220" r="5" fill="#FB923C" />
          <circle cx="219" cy="443" r="4" fill="#E0F2FE" />
          <circle cx="531" cy="390" r="4" fill="#EDE9FE" />
        </g>
      </svg>

      <figcaption className="systems-canvas__caption">
        {caption}
      </figcaption>
    </figure>
  );
}

export default SystemsCanvas;
