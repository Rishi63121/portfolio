/**
 * A Bitmoji-style cartoon guy drawn as stacked depth layers. LookAt (the wrapper) rotates the head
 * stage in 3D toward the cursor; the layers sit at different translateZ values so they parallax.
 * It is a generic friendly cartoon, not a likeness. Swap in a real Bitmoji PNG via public/rishi.png.
 */
const SKIN = "#e3ad84";
const SKIN_LIGHT = "#f3c7a2";
const SKIN_SHADE = "#c78b63";
const HAIR = "#1b1110";
const HAIR_LIGHT = "#42281f";

function Layer({ z, children, uid, label }: { z: number; children: React.ReactNode; uid: string; label: string }) {
  return (
    <div className="av-layer" style={{ transform: `translateZ(${z}px)` }} data-layer={label}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax meet" aria-hidden focusable="false" id={`${uid}-${label}`}>
        {children}
      </svg>
    </div>
  );
}

export default function Avatar({ uid = "av" }: { uid?: string }) {
  const g = (n: string) => `${uid}-${n}`;
  return (
    <div className="relative size-full" role="img" aria-label="Illustrated cartoon avatar that turns to look at your cursor. Click to make it wink.">
      {/* defs shared by every layer */}
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <radialGradient id={g("skin")} cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor={SKIN_LIGHT} />
            <stop offset="55%" stopColor={SKIN} />
            <stop offset="100%" stopColor={SKIN_SHADE} />
          </radialGradient>
          <linearGradient id={g("neck")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8694a" />
            <stop offset="45%" stopColor={SKIN_SHADE} />
            <stop offset="100%" stopColor={SKIN} />
          </linearGradient>
          <linearGradient id={g("hair")} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={HAIR_LIGHT} />
            <stop offset="55%" stopColor={HAIR} />
            <stop offset="100%" stopColor="#0b0606" />
          </linearGradient>
          <linearGradient id={g("hood")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a2424" />
            <stop offset="60%" stopColor="#201212" />
            <stop offset="100%" stopColor="#120a0a" />
          </linearGradient>
          <linearGradient id={g("rim")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={g("blush")}>
            <stop offset="0%" stopColor="#e2776a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e2776a" stopOpacity="0" />
          </radialGradient>
          <clipPath id={g("mouth")}>
            <path d="M169 276C178 306 222 306 231 276C216 285 184 285 169 276Z" />
          </clipPath>
        </defs>
      </svg>

      {/* body: stays put, only drifts a touch the other way */}
      <div className="av-body absolute inset-0">
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax meet" aria-hidden focusable="false" className="size-full overflow-visible">
          <path d="M96 392C122 346 278 346 304 392C280 418 120 418 96 392Z" fill="#150c0c" />
          <path d="M14 500C14 436 62 392 138 374L200 398L262 374C338 392 386 436 386 500Z" fill={`url(#${g("hood")})`} />
          <path d="M14 500C14 436 62 392 138 374L160 382C92 402 52 440 48 500Z" fill={`url(#${g("rim")})`} opacity="0.7" />
          <path d="M138 374L200 398L262 374" fill="none" stroke="#0c0606" strokeWidth="5" strokeLinejoin="round" />
          <g stroke="#eadcc4" strokeWidth="4" strokeLinecap="round">
            <path d="M172 406L169 452" />
            <path d="M228 406L231 452" />
          </g>
          <g fill="#eadcc4">
            <circle cx="169" cy="455" r="4.5" />
            <circle cx="231" cy="455" r="4.5" />
          </g>
          <path d="M200 398V500" stroke="#0c0606" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>

      {/* head stage: tilts in 3D toward the pointer */}
      <div className="av-head absolute inset-0">
        <Layer z={1} uid={uid} label="neck">
          <path d="M166 318V384C166 404 234 404 234 384V318Z" fill={`url(#${g("neck")})`} />
        </Layer>

        <Layer z={2} uid={uid} label="ears">
          <ellipse cx="108" cy="212" rx="15" ry="26" fill={SKIN_SHADE} />
          <ellipse cx="110" cy="214" rx="8" ry="16" fill="#b5764f" />
          <ellipse cx="292" cy="212" rx="15" ry="26" fill={SKIN_SHADE} />
          <ellipse cx="290" cy="214" rx="8" ry="16" fill="#b5764f" />
        </Layer>

        <Layer z={3} uid={uid} label="head">
          <path d="M110 208C110 118 150 70 200 70C250 70 290 118 290 208C290 274 256 322 200 326C144 322 110 274 110 208Z" fill={`url(#${g("skin")})`} />
          <path d="M110 208C110 118 150 70 200 70C250 70 290 118 290 208C290 274 256 322 200 326C144 322 110 274 110 208Z" fill="none" stroke={`url(#${g("rim")})`} strokeWidth="5" />
          <ellipse cx="143" cy="246" rx="30" ry="22" fill={`url(#${g("blush")})`} />
          <ellipse cx="257" cy="246" rx="30" ry="22" fill={`url(#${g("blush")})`} />
          <path d="M150 300C175 322 225 322 250 300C240 316 214 326 200 326C186 326 160 316 150 300Z" fill="#b87650" opacity="0.35" />
        </Layer>

        <Layer z={4} uid={uid} label="face">
          {/* brows */}
          <g fill="none" stroke="#24140f" strokeWidth="9" strokeLinecap="round">
            <path d="M136 168C148 156 174 153 189 161" />
            <path d="M211 161C226 153 252 156 264 168" />
          </g>
          {/* eyes: the eyeball squashes shut and a lash line takes its place. Both eyes share the same
              blink animation (on .av-eye, never swapped out, so they can't drift apart). The wink is a
              separate layer inside the second eye (.wink-eye / .wink-lash) that a tap triggers. */}
          {[162, 238].map((cx, i) => (
            <g key={cx}>
              <g className="av-eye">
                <g className={i === 1 ? "wink-eye" : undefined}>
                <ellipse cx={cx} cy="199" rx="21" ry="14" fill="#fffdf8" />
                <g className="av-pupil">
                  <circle cx={cx} cy="199" r="10.5" fill="#4a2c1c" />
                  <circle cx={cx} cy="199" r="6" fill="#0d0707" />
                  <circle cx={cx - 3.5} cy="195" r="2.8" fill="#fff" />
                  <circle cx={cx + 3} cy="203" r="1.4" fill="#fff" opacity="0.8" />
                </g>
                {/* upper lash line travels down with the lid */}
                <path d={`M${cx - 22} 197C${cx - 13} 183 ${cx + 13} 183 ${cx + 22} 197`} fill="none" stroke="#1d0f0b" strokeWidth="4" strokeLinecap="round" />
                </g>
              </g>
              <path
                d={`M${cx - 21} 198C${cx - 11} 208 ${cx + 11} 208 ${cx + 21} 198`}
                fill="none"
                stroke="#1d0f0b"
                strokeWidth="4"
                strokeLinecap="round"
                className="av-lash"
              />
              {i === 1 && (
                <path
                  d={`M${cx - 21} 198C${cx - 11} 208 ${cx + 11} 208 ${cx + 21} 198`}
                  fill="none"
                  stroke="#1d0f0b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="wink-lash"
                />
              )}
            </g>
          ))}
          {/* nose */}
          <path d="M200 206C196 232 189 240 193 247C199 252 208 252 213 246" fill="none" stroke="#a8694a" strokeOpacity="0.7" strokeWidth="3.2" strokeLinecap="round" />
          <ellipse cx="197" cy="226" rx="4" ry="9" fill="#fff" opacity="0.12" />
          {/* smile */}
          <path d="M169 276C178 306 222 306 231 276C216 285 184 285 169 276Z" fill="#6b1f2a" />
          <g clipPath={`url(#${g("mouth")})`}>
            <path d="M168 276H232V288C216 292 184 292 168 288Z" fill="#fffaf0" />
            <ellipse cx="200" cy="304" rx="16" ry="8" fill="#c4505a" />
          </g>
          <path d="M163 272C176 288 224 288 237 272" fill="none" stroke="#7a2a2a" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M160 270C162 276 165 279 169 280M240 270C238 276 235 279 231 280" fill="none" stroke="#b27150" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </Layer>

        <Layer z={6} uid={uid} label="hair">
          {/* clean cap: wraps the crown, covers both temples, sweeps into a fringe */}
          <path
            d="M104 218C90 124 132 46 204 44C278 42 316 120 298 218C296 186 288 160 272 146C246 156 212 150 184 134C158 142 134 164 122 204C120 212 114 216 104 218Z"
            fill={`url(#${g("hair")})`}
          />
          <path d="M150 92C166 56 232 46 262 84C236 72 196 72 166 98Z" fill={`url(#${g("hair")})`} />
          <path d="M164 68C190 54 226 54 248 68" fill="none" stroke="#6a463a" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
          <path d="M124 100C134 80 150 66 168 60" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" strokeLinecap="round" />
          <path d="M104 218C90 124 132 46 204 44" fill="none" stroke={`url(#${g("rim")})`} strokeWidth="4" strokeLinecap="round" />
        </Layer>
      </div>
    </div>
  );
}
