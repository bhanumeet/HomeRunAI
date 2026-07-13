/* Flat 2D pastel sports & field illustrations, all inline SVG. */
import type { CSSProperties } from 'react'

type P = { className?: string; style?: CSSProperties }

/* ---------------- Balls ---------------- */

export function SoccerBall({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <circle cx="24" cy="24" r="20" fill="#FBFAF4" stroke="#3C5A3E" strokeWidth="2" />
      <path d="M24 13l6 4.4-2.3 7h-7.4l-2.3-7L24 13z" fill="#3C5A3E" />
      <path d="M24 13V6M17.7 24.4l-6.6 2.2M30.3 24.4l6.6 2.2M20.3 31.4l-4 6M27.7 31.4l4 6" stroke="#3C5A3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Baseball({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <circle cx="24" cy="24" r="20" fill="#FBFAF4" stroke="#B87748" strokeWidth="2" />
      <path d="M14 8c5 6 5 26 0 32M34 8c-5 6-5 26 0 32" stroke="#D69A6E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g stroke="#D69A6E" strokeWidth="1.6" strokeLinecap="round">
        <path d="M15.5 14l-2 1.5M15.5 19l-2 1M15.5 24l-2 0M15.5 29l-2 -1M15.5 34l-2 -1.5" />
        <path d="M32.5 14l2 1.5M32.5 19l2 1M32.5 24l2 0M32.5 29l2 -1M32.5 34l2 -1.5" />
      </g>
    </svg>
  )
}

export function Football({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <ellipse cx="24" cy="24" rx="20" ry="12" fill="#D69A6E" stroke="#B87748" strokeWidth="2" />
      <path d="M8 24h6M34 24h6" stroke="#FBFAF4" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19 24h10M21 20.5h6M21 27.5h6" stroke="#FBFAF4" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function Basketball({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <circle cx="24" cy="24" r="20" fill="#EDB07C" stroke="#B87748" strokeWidth="2" />
      <path d="M24 4v40M4 24h40M9 9c8 6 8 24 0 30M39 9c-8 6-8 24 0 30" stroke="#B87748" strokeWidth="2" fill="none" />
    </svg>
  )
}

/* ---------------- Fields ---------------- */

export function SoccerField({ className }: P) {
  return (
    <svg viewBox="0 0 320 190" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="190" fill="#A9D69C" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={i * 54} width="27" height="190" fill="#8EC48A" opacity="0.55" />
      ))}
      <g stroke="#FBFAF4" strokeWidth="3" fill="none">
        <rect x="16" y="20" width="288" height="150" rx="4" />
        <line x1="160" y1="20" x2="160" y2="170" />
        <circle cx="160" cy="95" r="30" />
        <rect x="16" y="55" width="40" height="80" />
        <rect x="264" y="55" width="40" height="80" />
      </g>
      <circle cx="160" cy="95" r="4" fill="#FBFAF4" />
    </svg>
  )
}

export function BaseballField({ className }: P) {
  return (
    <svg viewBox="0 0 320 190" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="190" fill="#A9D69C" />
      {/* outfield grass wedge */}
      <path d="M160 178 L20 40 A200 200 0 0 1 300 40 Z" fill="#8EC48A" opacity="0.5" />
      {/* dirt infield diamond */}
      <path d="M160 60 L215 115 L160 170 L105 115 Z" fill="#E4B896" />
      <path d="M160 72 L203 115 L160 158 L117 115 Z" fill="#A9D69C" />
      {/* pitcher mound + bases */}
      <circle cx="160" cy="115" r="9" fill="#E4B896" />
      <g fill="#FBFAF4">
        <rect x="156" y="166" width="8" height="8" transform="rotate(45 160 170)" />
        <rect x="199" y="111" width="8" height="8" transform="rotate(45 203 115)" />
        <rect x="113" y="111" width="8" height="8" transform="rotate(45 117 115)" />
        <rect x="156" y="56" width="8" height="8" transform="rotate(45 160 60)" />
      </g>
    </svg>
  )
}

export function FootballField({ className }: P) {
  return (
    <svg viewBox="0 0 320 190" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="190" fill="#8EC48A" />
      <rect x="0" y="0" width="40" height="190" fill="#D69A6E" opacity="0.85" />
      <rect x="280" y="0" width="40" height="190" fill="#D69A6E" opacity="0.85" />
      <g stroke="#FBFAF4" strokeWidth="3">
        {[70, 110, 150, 190, 230, 270].map((x) => (
          <line key={x} x1={x} y1="14" x2={x} y2="176" />
        ))}
      </g>
      <g stroke="#FBFAF4" strokeWidth="2" opacity="0.8">
        {[90, 130, 170, 210, 250].map((x) => (
          <line key={x} x1={x} y1="80" x2={x} y2="110" />
        ))}
      </g>
    </svg>
  )
}

export function BasketballCourt({ className }: P) {
  return (
    <svg viewBox="0 0 320 190" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="190" fill="#E7C79B" />
      <rect x="0" y="0" width="320" height="190" fill="#EDB07C" opacity="0.25" />
      <g stroke="#FBFAF4" strokeWidth="3" fill="none">
        <rect x="14" y="18" width="292" height="154" rx="4" />
        <line x1="160" y1="18" x2="160" y2="172" />
        <circle cx="160" cy="95" r="26" />
        <path d="M14 55 A50 40 0 0 1 14 135" />
        <path d="M306 55 A50 40 0 0 0 306 135" />
        <rect x="14" y="70" width="42" height="50" />
        <rect x="264" y="70" width="42" height="50" />
      </g>
    </svg>
  )
}

/* ---------------- Devices ---------------- */

export function Phone({ className, style, ball }: P & { ball?: 'soccer' | 'base' | 'foot' | 'bball' }) {
  return (
    <svg viewBox="0 0 90 170" className={className} style={style} aria-hidden>
      <rect x="6" y="4" width="78" height="162" rx="16" fill="#FBFAF4" stroke="#3C5A3E" strokeWidth="3" />
      <rect x="14" y="18" width="62" height="134" rx="7" fill="#CFE7C4" />
      <rect x="14" y="18" width="62" height="134" rx="7" fill="url(#phoneField)" opacity="0.6" />
      <circle cx="45" cy="160" r="3" fill="#3C5A3E" />
      <rect x="36" y="9" width="18" height="4" rx="2" fill="#3C5A3E" />
      {ball === 'soccer' && <circle cx="52" cy="70" r="9" fill="#FBFAF4" stroke="#3C5A3E" strokeWidth="2" />}
      {ball === 'base' && <circle cx="52" cy="70" r="9" fill="#FBFAF4" stroke="#B87748" strokeWidth="2" />}
      <rect x="20" y="126" width="30" height="8" rx="4" fill="#F2A488" />
      <defs>
        <linearGradient id="phoneField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9D69C" />
          <stop offset="1" stopColor="#8EC48A" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Laptop({ className, style }: P) {
  return (
    <svg viewBox="0 0 260 180" className={className} style={style} aria-hidden>
      <rect x="24" y="12" width="212" height="132" rx="12" fill="#3C5A3E" />
      <rect x="34" y="22" width="192" height="112" rx="5" fill="#EAF4E4" />
      {/* multiview quadrants */}
      <g>
        <rect x="40" y="28" width="88" height="48" rx="3" fill="#A9D69C" />
        <rect x="132" y="28" width="88" height="48" rx="3" fill="#B7DCEC" />
        <rect x="40" y="80" width="88" height="48" rx="3" fill="#E4B896" />
        <rect x="132" y="80" width="88" height="48" rx="3" fill="#8EC48A" stroke="#F2A488" strokeWidth="3" />
      </g>
      <circle cx="205" cy="90" r="5" fill="#F2A488" />
      <path d="M8 144h244l-14 22H22z" fill="#5E9A5E" />
      <rect x="110" y="144" width="40" height="6" rx="3" fill="#3C5A3E" />
    </svg>
  )
}

/* ---------------- OS / store badges ---------------- */

export function WindowsIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="6" y="6" width="16" height="16" rx="2" fill="#7FBBD6" />
      <rect x="26" y="6" width="16" height="16" rx="2" fill="#B7DCEC" />
      <rect x="6" y="26" width="16" height="16" rx="2" fill="#B7DCEC" />
      <rect x="26" y="26" width="16" height="16" rx="2" fill="#7FBBD6" />
    </svg>
  )
}

export function AppleIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M33 25.5c0-5 4-7.3 4.2-7.5-2.3-3.4-5.9-3.8-7.1-3.9-3-.3-5.9 1.8-7.4 1.8-1.5 0-3.9-1.8-6.4-1.7-3.3.05-6.3 1.9-8 4.9-3.4 6-.9 14.8 2.5 19.7 1.6 2.4 3.6 5 6.1 4.9 2.4-.1 3.4-1.6 6.3-1.6s3.8 1.6 6.4 1.5c2.6-.05 4.3-2.4 5.9-4.8 1.9-2.7 2.6-5.4 2.7-5.5-.05-.05-5.1-2-5.2-7.7z" fill="#3C5A3E" />
      <path d="M28.6 11.2c1.3-1.6 2.2-3.8 2-6-1.9.08-4.2 1.3-5.6 2.9-1.2 1.4-2.3 3.7-2 5.8 2.1.16 4.3-1.1 5.6-2.7z" fill="#3C5A3E" />
    </svg>
  )
}

export function AppStoreBadge({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#7FBBD6" />
      <path d="M24 12l7 12M24 12l-7 12M14 30h20M20 34l2-3.4M28 34l-2-3.4" stroke="#FBFAF4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------------- Feature icons ---------------- */

export function IconAI({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="8" y="8" width="16" height="16" rx="4" fill="#8EC48A" />
      <circle cx="13" cy="15" r="1.8" fill="#3C5A3E" />
      <circle cx="19" cy="15" r="1.8" fill="#3C5A3E" />
      <path d="M12 19h8" stroke="#3C5A3E" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8V4M8 16H4M28 16h-4M16 24v4" stroke="#5E9A5E" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}
export function IconSwitch({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M6 11h16l-4-4M26 21H10l4 4" stroke="#5E9A5E" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export function IconPhoneUp({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="10" y="6" width="12" height="20" rx="3" fill="#8EC48A" />
      <path d="M16 2v6m0-6l-3 3m3-3l3 3" stroke="#5E9A5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export function IconBolt({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M18 4l-10 14h7l-2 10 11-15h-8z" fill="#F6E2A0" stroke="#D69A6E" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
export function IconWifi({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M6 13a16 16 0 0 1 20 0M10 18a10 10 0 0 1 12 0M14 23a4 4 0 0 1 4 0" stroke="#7FBBD6" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="27" r="1.8" fill="#7FBBD6" />
    </svg>
  )
}
export function IconRec({ className }: P) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="9" width="16" height="14" rx="3" fill="#8EC48A" />
      <path d="M21 14l6-3v10l-6-3z" fill="#5E9A5E" />
      <circle cx="13" cy="16" r="3" fill="#FBFAF4" />
    </svg>
  )
}
