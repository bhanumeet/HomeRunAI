import { useState, type ReactNode } from 'react'
import {
  SoccerBall, Baseball, Football, Basketball,
  SoccerField, BaseballField, FootballField, BasketballCourt,
  Phone, Laptop,
  WindowsIcon, AppleIcon, AppStoreBadge,
  IconAI, IconSwitch, IconPhoneUp, IconBolt, IconWifi, IconRec, IconMic, IconTruck, IconWallet,
  IconChart, IconHeatmap, IconRun, IconTarget, IconClip, IconTrend, IconReplay,
} from './components/art'

function Logo() {
  return <img className="logo" src="/logo.png" alt="HomerunAI logo" width={36} height={36} />
}

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <Logo />
          <span>Homerun<b>AI</b></span>
        </a>
        <nav className="nav-links">
          <a href="#problem">Why</a>
          <a href="#how">How it works</a>
          <a href="#sports">Sports</a>
          <a href="#replay">Replay</a>
          <a href="#analysis">Analysis</a>
          <a href="#download">Download</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-primary" href="#download">Get HomerunAI</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">AI camera director + commentator</span>
          <h1>
            Broadcast your game.<br />
            <span className="hl">No crew required.</span>
          </h1>
          <p className="lead">
            Pro leagues have camera crews and broadcast trucks. Your league has phones.
            Prop a few around the field, hit go, and HomerunAI films every angle, cuts
            to the best shot, and calls the play-by-play — automatically.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#download">
              <AppleIcon /> Download for Mac
            </a>
            <a className="btn btn-ghost" href="#download">
              <WindowsIcon /> Download for Windows
            </a>
          </div>
          <p className="hero-note">Free while in beta · Director app for laptop + Camera app for phones</p>

          <div className="sport-pills">
            <span className="sport-pill live"><SoccerBall /> Soccer · Live</span>
            <span className="sport-pill"><Baseball /> Baseball</span>
            <span className="sport-pill"><Football /> Football</span>
            <span className="sport-pill"><Basketball /> Basketball</span>
          </div>
        </div>

        <div className="hero-art">
          <HeroScene />
        </div>
      </div>
    </section>
  )
}

function HeroScene() {
  // Single self-contained SVG — no nested <svg>, so nothing overlaps.
  return (
    <svg viewBox="0 0 480 400" aria-hidden style={{ width: '100%' }}>
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF4E4" />
          <stop offset="1" stopColor="#CFE7C4" />
        </linearGradient>
      </defs>

      {/* pitch backdrop */}
      <rect x="16" y="20" width="448" height="360" rx="30" fill="url(#heroBg)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={16 + i * 76} y="20" width="38" height="360" fill="#A9D69C" opacity="0.30" />
      ))}
      <circle cx="240" cy="150" r="46" fill="none" stroke="#FBFAF4" strokeWidth="3" opacity="0.9" />
      <line x1="240" y1="20" x2="240" y2="380" stroke="#FBFAF4" strokeWidth="3" opacity="0.5" />

      {/* dashed feeds from phones -> director */}
      <g stroke="#5E9A5E" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 11" opacity="0.7" fill="none">
        <path d="M92 150 C 140 190, 190 220, 224 252" />
        <path d="M300 96 C 292 150, 278 210, 262 250" />
        <path d="M78 300 C 120 300, 170 292, 200 282" />
      </g>

      {/* three phone cameras around the field */}
      <PhoneNode x={48} y={70} rot={-12} tint="#A9D69C" delay="" />
      <PhoneNode x={268} y={40} rot={8} tint="#B7DCEC" delay="d1" />
      <PhoneNode x={40} y={228} rot={-4} tint="#E4B896" delay="d2" />

      {/* the director laptop, showing the live multiview */}
      <g className="floaty">
        {/* screen */}
        <rect x="168" y="238" width="176" height="112" rx="12" fill="#3C5A3E" />
        <rect x="176" y="246" width="160" height="88" rx="6" fill="#EAF4E4" />
        <rect x="182" y="252" width="70" height="38" rx="3" fill="#A9D69C" />
        <rect x="260" y="252" width="70" height="38" rx="3" fill="#B7DCEC" />
        <rect x="182" y="294" width="70" height="34" rx="3" fill="#E4B896" />
        {/* the live-selected tile */}
        <rect x="260" y="294" width="70" height="34" rx="3" fill="#8EC48A" stroke="#F2A488" strokeWidth="3" />
        <circle cx="322" cy="300" r="3.4" fill="#F2A488" />
        {/* base */}
        <path d="M150 350h212l-14 18H164z" fill="#5E9A5E" />
        <rect x="238" y="350" width="36" height="5" rx="2.5" fill="#3C5A3E" />
      </g>

      {/* AI commentary bubble */}
      <g className="floaty d2">
        <rect x="330" y="150" width="120" height="52" rx="16" fill="#FBFAF4" stroke="#E6E2D4" strokeWidth="2" />
        <path d="M348 202l-10 16 24-12z" fill="#FBFAF4" />
        <circle cx="352" cy="176" r="10" fill="#F2A488" />
        <path d="M352 171v10M348 176h8" stroke="#FBFAF4" strokeWidth="2" strokeLinecap="round" />
        <rect x="370" y="167" width="66" height="6" rx="3" fill="#CFE7C4" />
        <rect x="370" y="180" width="48" height="6" rx="3" fill="#CFE7C4" />
      </g>

      {/* LIVE badge */}
      <g className="floaty d1">
        <rect x="196" y="196" width="70" height="30" rx="15" fill="#F2A488" />
        <circle cx="214" cy="211" r="5" fill="#FBFAF4" />
        <text x="226" y="216" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="800" fill="#FBFAF4">LIVE</text>
      </g>
    </svg>
  )
}

/* A single flat phone-camera node drawn inline (no nested svg).
   Positioning lives on the OUTER <g> (transform attribute); the float
   animation lives on the INNER <g> so the CSS transform can't clobber it. */
function PhoneNode({ x, y, rot, tint, delay }: { x: number; y: number; rot: number; tint: string; delay?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <g className={`floaty ${delay ?? ''}`}>
        <rect x="0" y="0" width="52" height="96" rx="12" fill="#FBFAF4" stroke="#3C5A3E" strokeWidth="3" />
        <rect x="6" y="10" width="40" height="76" rx="5" fill={tint} />
        <rect x="18" y="4" width="16" height="3" rx="1.5" fill="#3C5A3E" />
        <circle cx="26" cy="91" r="2.4" fill="#3C5A3E" />
        <circle cx="26" cy="46" r="9" fill="#FBFAF4" stroke="#3C5A3E" strokeWidth="2" />
      </g>
    </g>
  )
}

function Problem() {
  return (
    <section className="pad problem-band" id="problem">
      <div className="wrap center">
        <span className="eyebrow">The problem</span>
        <h2 className="section-title">Great coverage shouldn't need a broadcast truck</h2>
        <p className="section-sub">
          The pros make it look easy — because they have a crew for it. Everyone else
          is stuck with one shaky phone on a fence. HomerunAI closes that gap.
        </p>

        <div className="compare">
          <div className="compare-card muted">
            <div className="compare-head">
              <span className="chip chip-muted">Big leagues</span>
              <h3>A truck full of gear &amp; a paid crew</h3>
            </div>
            <ul className="checklist">
              <li><IconTruck className="li-ic" /> Broadcast truck and racks of equipment</li>
              <li><IconRec className="li-ic" /> A camera operator on every angle</li>
              <li><IconSwitch className="li-ic" /> A director switching the live feed by hand</li>
              <li><IconMic className="li-ic" /> A commentator in the booth</li>
              <li><IconWallet className="li-ic" /> A budget most clubs will never have</li>
            </ul>
          </div>

          <div className="compare-card solution">
            <div className="compare-head">
              <span className="chip chip-live">Small leagues &amp; grassroots</span>
              <h3>A few phones. That's the whole rig.</h3>
            </div>
            <ul className="checklist">
              <li><IconPhoneUp className="li-ic" /> Prop phones around the field on any tripods</li>
              <li><IconSwitch className="li-ic" /> HomerunAI cuts to the best angle, live</li>
              <li><IconMic className="li-ic" /> AI commentary calls the play-by-play</li>
              <li><IconBolt className="li-ic" /> One clean broadcast to stream or record</li>
              <li><IconWallet className="li-ic" /> No crew, no truck, no budget</li>
            </ul>
            <div className="set-forget">Set up the phones and forget it — HomerunAI does the rest.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      n: 'Step 01',
      title: 'Phones become cameras',
      body: 'Install the HomerunAI Camera app on any phones and point them at the field. Each one streams over Wi-Fi — no capture cards, no cables.',
      art: <><Phone ball="soccer" style={{ height: 110 }} /><Phone ball="base" style={{ height: 110, marginLeft: -20 }} /></>,
    },
    {
      n: 'Step 02',
      title: 'The AI watches every feed',
      body: 'The Director app on your laptop runs a sports vision model on all feeds at once, tracking the ball and the play frame by frame.',
      art: <Laptop style={{ width: 210 }} />,
    },
    {
      n: 'Step 03',
      title: 'It cuts to the best shot',
      body: 'HomerunAI switches the live program to whichever camera has the clearest view — with smoothing so cuts feel like a real broadcast director.',
      art: <IconSwitch className="" />,
    },
  ]
  return (
    <section className="pad" id="how">
      <div className="wrap center">
        <span className="eyebrow">How it works</span>
        <h2 className="section-title">A broadcast crew in three taps</h2>
        <p className="section-sub">Phones capture, the laptop thinks, the AI directs. That's the whole rig.</p>
        <div className="steps" style={{ textAlign: 'left' }}>
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="art">{s.n === 'Step 03'
                ? <div className="step-badge"><IconSwitch /></div>
                : s.art}</div>
              <div className="n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Capability showcase rows ---------- */

function Showcase({ id, flip, eyebrow, title, body, bullets, visual }: {
  id: string; flip?: boolean; eyebrow: string; title: string; body: string;
  bullets: { ic: ReactNode; t: string }[]; visual: ReactNode;
}) {
  return (
    <div className={`showcase ${flip ? 'flip' : ''}`} id={id}>
      <div className="showcase-text">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="showcase-title">{title}</h2>
        <p className="showcase-body">{body}</p>
        <ul className="showcase-list">
          {bullets.map((b, i) => (
            <li key={i}><span className="li-ic">{b.ic}</span>{b.t}</li>
          ))}
        </ul>
      </div>
      <div className="showcase-visual">{visual}</div>
    </div>
  )
}

function SwitchVisual() {
  return (
    <svg viewBox="0 0 400 300" className="viz" aria-hidden>
      <rect x="0" y="0" width="400" height="300" rx="24" fill="#EAF4E4" />
      {/* four incoming feeds */}
      {[
        { x: 24, y: 26, c: '#A9D69C' }, { x: 24, y: 100, c: '#B7DCEC' },
        { x: 24, y: 174, c: '#E4B896' }, { x: 24, y: 248, c: '#8EC48A', live: true },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width="96" height="58" rx="8" fill={t.c}
            stroke={t.live ? '#F2A488' : '#CFE7C4'} strokeWidth={t.live ? 4 : 2} />
          {t.live && <circle cx={t.x + 84} cy={t.y + 12} r="4" fill="#F2A488" />}
          {/* confidence bar */}
          <rect x={t.x} y={t.y + 62} width="96" height="6" rx="3" fill="#Dfe7d8" />
          <rect x={t.x} y={t.y + 62} width={t.live ? 92 : 20 + i * 14} height="6" rx="3" fill={t.live ? '#F2A488' : '#A9D69C'} />
        </g>
      ))}
      {/* arrow to program */}
      <path d="M132 277 C 175 277, 175 150, 214 150" stroke="#5E9A5E" strokeWidth="3" fill="none" strokeDasharray="1 9" strokeLinecap="round" />
      {/* live program */}
      <rect x="214" y="40" width="162" height="120" rx="12" fill="#8EC48A" stroke="#F2A488" strokeWidth="4" />
      <rect x="266" y="196" width="58" height="26" rx="13" fill="#F2A488" />
      <circle cx="282" cy="209" r="4" fill="#FBFAF4" />
      <text x="291" y="213" fontFamily="Inter" fontSize="12" fontWeight="800" fill="#FBFAF4">LIVE</text>
      <text x="214" y="250" fontFamily="Inter" fontSize="13" fontWeight="700" fill="#3C5A3E">Live program · best angle</text>
    </svg>
  )
}

function CommentaryVisual() {
  return (
    <svg viewBox="0 0 400 300" className="viz" aria-hidden>
      <rect x="0" y="0" width="400" height="300" rx="24" fill="#EAF4E4" />
      <rect x="30" y="34" width="340" height="150" rx="12" fill="#A9D69C" />
      <circle cx="200" cy="100" r="30" fill="none" stroke="#FBFAF4" strokeWidth="3" />
      {/* lower-third caption bar */}
      <rect x="30" y="150" width="340" height="34" rx="8" fill="#3C5A3E" opacity="0.9" />
      <circle cx="52" cy="167" r="9" fill="#F2A488" />
      <path d="M52 162v10M48 167h8" stroke="#FBFAF4" strokeWidth="2" strokeLinecap="round" />
      <rect x="70" y="163" width="150" height="7" rx="3.5" fill="#CFE7C4" />
      {/* waveform */}
      <g fill="#F6E2A0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const h = [10, 20, 30, 16, 26, 12, 22, 30, 14][i]
          return <rect key={i} x={250 + i * 12} y={167 - h / 2} width="6" height={h} rx="3" />
        })}
      </g>
      {/* speech bubble */}
      <rect x="40" y="212" width="320" height="56" rx="14" fill="#FBFAF4" stroke="#E6E2D4" strokeWidth="2" />
      <rect x="58" y="228" width="220" height="8" rx="4" fill="#CFE7C4" />
      <rect x="58" y="244" width="160" height="8" rx="4" fill="#CFE7C4" />
      <text x="300" y="246" fontFamily="Inter" fontSize="13" fontWeight="800" fill="#5E9A5E">AI · play-by-play</text>
    </svg>
  )
}

function ReplayVisual() {
  return (
    <svg viewBox="0 0 400 300" className="viz" aria-hidden>
      <rect x="0" y="0" width="400" height="300" rx="24" fill="#EAF4E4" />
      {/* replay clip card */}
      <rect x="30" y="30" width="340" height="150" rx="12" fill="#8EC48A" />
      <circle cx="200" cy="105" r="26" fill="#FBFAF4" opacity="0.9" />
      <path d="M193 93l18 12-18 12z" fill="#3C5A3E" />
      <rect x="42" y="42" width="78" height="26" rx="13" fill="#F2A488" />
      <text x="54" y="60" fontFamily="Inter" fontSize="13" fontWeight="800" fill="#FBFAF4">GOAL!</text>
      <rect x="300" y="42" width="58" height="24" rx="12" fill="#3C5A3E" />
      <text x="309" y="59" fontFamily="Inter" fontSize="11" fontWeight="700" fill="#FBFAF4">REPLAY</text>
      {/* timeline with event markers */}
      <rect x="30" y="214" width="340" height="6" rx="3" fill="#CFE7C4" />
      {[
        { x: 80, c: '#F2A488', label: 'Foul' }, { x: 170, c: '#5E9A5E', label: 'Goal' },
        { x: 250, c: '#7FBBD6', label: 'Save' }, { x: 320, c: '#5E9A5E', label: 'Goal' },
      ].map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy="217" r="8" fill={m.c} stroke="#FBFAF4" strokeWidth="2" />
          <text x={m.x} y="244" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="700" fill="#3C5A3E">{m.label}</text>
        </g>
      ))}
      <text x="30" y="268" fontFamily="Inter" fontSize="12" fontWeight="600" fill="#8A988B">Auto-detected key moments · one-tap clips</text>
    </svg>
  )
}

function Capabilities() {
  return (
    <section className="pad cap-band">
      <div className="wrap center" style={{ marginBottom: 8 }}>
        <span className="eyebrow">What HomerunAI does on the field</span>
        <h2 className="section-title">Film it, call it, clip it</h2>
        <p className="section-sub">Three things a full broadcast crew does — running automatically on your laptop.</p>
      </div>
      <div className="wrap">
        <Showcase
          id="switching"
          eyebrow="Best-view switching"
          title="Always on the camera that sees the play"
          body="HomerunAI scores every feed frame by frame and cuts the live program to whichever phone has the clearest view of the ball and the action — with confidence margins and hold timers so cuts feel like a real director, not a nervous switch."
          bullets={[
            { ic: <IconTarget />, t: 'Per-frame confidence scoring across all cameras' },
            { ic: <IconSwitch />, t: 'Smooth, anti-flicker cuts with hold timers' },
            { ic: <IconRec />, t: 'One clean program feed to stream or record' },
          ]}
          visual={<SwitchVisual />}
        />
        <Showcase
          id="commentary"
          flip
          eyebrow="AI commentary"
          title="Play-by-play that sounds like a broadcast"
          body="Because HomerunAI understands what's happening on the field, it can call the game in real time — announcing goals, shots, saves and big plays, and captioning the stream so every match feels professionally covered."
          bullets={[
            { ic: <IconMic />, t: 'Real-time, event-aware play-by-play' },
            { ic: <IconAI />, t: 'Natural commentary tuned per sport' },
            { ic: <IconClip />, t: 'Auto-captions burned into the broadcast' },
          ]}
          visual={<CommentaryVisual />}
        />
        <Showcase
          id="replay"
          eyebrow="Smart replay"
          title="It knows the moment a goal is scored"
          body="HomerunAI detects the moments that matter — a goal, a basket, a home run, a foul — the instant they happen, and instantly cuts a replay from the best angle. No scrubbing footage after the game: your highlights are already tagged and ready."
          bullets={[
            { ic: <IconReplay />, t: 'Auto-detects goals, baskets, home runs & fouls' },
            { ic: <IconClip />, t: 'Instant best-angle replays, tagged as they happen' },
            { ic: <IconTrend />, t: 'A ready-made highlight reel by the final whistle' },
          ]}
          visual={<ReplayVisual />}
        />
      </div>
    </section>
  )
}

/* ---------- Post-game analysis ---------- */

function Analysis() {
  const groups = [
    {
      ic: <IconChart className="" />, title: 'Team & tactics',
      items: ['Possession % and possession by zone', 'Formation & team shape over time', 'Passing networks & completion %', 'Shot maps & expected goals (xG)', 'Pressing intensity & defensive line height', 'Transitions, turnovers & set pieces'],
    },
    {
      ic: <IconRun className="" />, title: 'Physical & movement',
      items: ['Total distance covered per player', 'Sprints & high-intensity runs', 'Top speed, acceleration & deceleration', 'Speed-zone distribution', 'Work-rate & fatigue trend across the game', 'Minutes & workload management'],
    },
    {
      ic: <IconHeatmap className="" />, title: 'Player performance',
      items: ['Per-player heatmaps & average position', 'Touches, involvements & time on ball', 'Goals, assists, key passes & shots', 'Tackles, interceptions, blocks & duels won', 'Pass completion per player', 'Individual event timelines'],
    },
    {
      ic: <IconTarget className="" />, title: 'Ball & events',
      items: ['Ball trajectory & speed', 'Full event timeline of the match', 'Auto-detected key moments', 'Momentum & scoring-chance graph', 'Zone & final-third entries', 'Shot / strike-zone location maps'],
    },
    {
      ic: <IconClip className="" />, title: 'Clips & video',
      items: ['Auto-generated highlight reels', 'Per-player & per-event clip reels', 'Searchable clips ("all shots by #10")', 'Shareable links for players & parents', 'Export to video, PDF & CSV', 'Coach-ready match summary'],
    },
    {
      ic: <IconTrend className="" />, title: 'Trends & scouting',
      items: ['Game-over-game & season dashboards', 'Player development tracking over time', 'Strengths & weaknesses breakdown', 'Opponent scouting reports', 'Benchmark vs. team averages', 'Training focus recommendations'],
    },
  ]
  const perSport = [
    { s: 'Soccer', m: 'xG, possession, passes, tackles, offsides, crosses, sprints, distance' },
    { s: 'Basketball', m: 'points, rebounds, assists, FG%/3P%/FT%, shot chart, fast breaks, turnovers, steals, pace' },
    { s: 'Baseball', m: 'pitch speed & type, exit velocity, launch angle, strike-zone map, at-bat outcomes, base running' },
    { s: 'Football', m: 'rush/pass yards, completion %, play-type breakdown, formation recognition, yards after catch, drive summaries' },
  ]
  return (
    <section className="pad analysis-band" id="analysis">
      <div className="wrap center">
        <span className="eyebrow">After the final whistle</span>
        <h2 className="section-title">Detailed analysis coaches &amp; players can train on</h2>
        <p className="section-sub">
          Every game HomerunAI films becomes data. It turns hours of footage into a full analytics
          report — automatically, no analyst required — so teams can see exactly what happened and get better.
        </p>
      </div>
      <div className="wrap">
        <div className="analysis-grid">
          {groups.map((g) => (
            <div className="analysis-card" key={g.title}>
              <div className="analysis-head"><span className="ic">{g.ic}</span><h3>{g.title}</h3></div>
              <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="persport">
          <h3>Metrics tuned to every sport</h3>
          <div className="persport-grid">
            {perSport.map((p) => (
              <div className="persport-row" key={p.s}>
                <span className="persport-sport">{p.s}</span>
                <span className="persport-metrics">{p.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Sports() {
  const sports = [
    { name: 'Soccer', tag: 'live', field: <SoccerField className="field-art" />, ball: <SoccerBall style={{ width: 28 }} />, desc: 'Ball tracking and auto-switching are live today, trained on real match footage.' },
    { name: 'Baseball', tag: 'soon', field: <BaseballField className="field-art" />, ball: <Baseball style={{ width: 28 }} />, desc: 'Follow the pitch, the hit, and the play at each base across every phone angle.' },
    { name: 'American Football', tag: 'soon', field: <FootballField className="field-art" />, ball: <Football style={{ width: 28 }} />, desc: 'Track the snap and the ball carrier down the field, sideline to sideline.' },
    { name: 'Basketball', tag: 'soon', field: <BasketballCourt className="field-art" />, ball: <Basketball style={{ width: 28 }} />, desc: 'Fast breaks and full-court action, with cuts that keep up with the ball.' },
  ]
  return (
    <section className="pad sports-band" id="sports">
      <div className="wrap center">
        <span className="eyebrow">Built for every field</span>
        <h2 className="section-title">One director. Four sports.</h2>
        <p className="section-sub">The same AI engine, tuned for the shape of each game. Soccer is live now — the rest are rolling out through the season.</p>
        <div className="sport-grid" style={{ textAlign: 'left' }}>
          {sports.map((s) => (
            <div className="sport-card" key={s.name}>
              {s.field}
              <div className="body">
                <h3>{s.ball}{s.name}
                  <span className={`tag ${s.tag}`} style={{ marginLeft: 'auto' }}>{s.tag === 'live' ? 'Live now' : 'Coming soon'}</span>
                </h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const feats = [
    { ic: <IconAI className="" />, title: 'Real sports vision', body: 'A detection model trained on match footage finds the ball and the action on every feed, not just motion.' },
    { ic: <IconSwitch className="" />, title: 'Smooth auto-cutting', body: 'Confidence margins and hold timers stop the flicker, so the program cuts like a human director would.' },
    { ic: <IconMic className="" />, title: 'AI commentary', body: 'HomerunAI calls the game as it happens — automatic play-by-play so every match sounds like a broadcast.' },
    { ic: <IconPhoneUp className="" />, title: 'Any phone is a camera', body: 'Add one phone or four. Each streams 720p/1080p over local Wi-Fi straight into the Director.' },
    { ic: <IconBolt className="" />, title: 'Smooth 30fps program', body: 'Video display stays buttery even while inference runs on a separate thread — slow hardware never stutters the show.' },
    { ic: <IconWifi className="" />, title: 'Runs on your Wi-Fi', body: 'Everything happens on your own network and laptop. No cloud upload required to direct the game.' },
  ]
  return (
    <section className="pad" id="features">
      <div className="wrap center">
        <span className="eyebrow">Features</span>
        <h2 className="section-title">Everything a switcher does, automatically</h2>
        <p className="section-sub">The gear a broadcast truck needs, packed into a laptop app and a few phones.</p>
        <div className="feat-grid" style={{ textAlign: 'left' }}>
          {feats.map((f) => (
            <div className="feat" key={f.title}>
              <div className="ic">{f.ic}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Downloads() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const cards = [
    { ic: <AppleIcon className="os-ic" />, kicker: 'Director · Desktop', title: 'HomerunAI for Mac', body: 'The AI director console. macOS 12+ · Apple Silicon & Intel.', cta: 'Download .dmg', meta: 'v0.1 beta · ~180 MB' },
    { ic: <WindowsIcon className="os-ic" />, kicker: 'Director · Desktop', title: 'HomerunAI for Windows', body: 'The AI director console. Windows 10 & 11 (64-bit).', cta: 'Download .exe', meta: 'v0.1 beta · ~190 MB' },
    { ic: <AppStoreBadge className="os-ic" />, kicker: 'Camera · Mobile', title: 'HomerunAI Camera for iOS', body: 'Turn your iPhone into a wireless camera for the Director.', cta: 'Get on the App Store', meta: 'iOS 16+ · iPhone & iPad' },
  ]
  return (
    <section className="pad dl-band" id="download">
      <div className="wrap center">
        <span className="eyebrow">Download</span>
        <h2 className="section-title">Get the whole rig</h2>
        <p className="section-sub">Install the Director on your laptop and the Camera app on your phones. Free while we're in beta.</p>

        <div className="dl-grid">
          {cards.map((c) => (
            <div className="dl-card" key={c.title}>
              {c.ic}
              <div className="kicker">{c.kicker}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <a className="btn btn-primary" href="#download" onClick={(e) => e.preventDefault()}>{c.cta}</a>
              <div className="meta">{c.meta}</div>
            </div>
          ))}
        </div>

        <div className="notify" style={{ textAlign: 'left' }}>
          <div>
            <h3>Builds aren't public yet.</h3>
            <p>Drop your email and we'll send the Mac, Windows, and iOS downloads the moment the beta opens.</p>
          </div>
          {sent ? (
            <div className="ok">✓ You're on the list — talk soon!</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSent(true) }}>
              <input
                type="email"
                required
                placeholder="you@team.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="btn btn-primary" type="submit">Notify me</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="brand" href="#top"><Logo /><span>Homerun<b>AI</b></span></a>
            <p>The AI camera director for grassroots and semi-pro sports. Every angle, one director.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#how">How it works</a>
              <a href="#sports">Sports</a>
              <a href="#features">Features</a>
              <a href="#download">Download</a>
            </div>
            <div className="footer-col">
              <h4>Sports</h4>
              <a href="#sports">Soccer</a>
              <a href="#sports">Baseball</a>
              <a href="#sports">Football</a>
              <a href="#sports">Basketball</a>
            </div>
            <div className="footer-col">
              <h4>Get it</h4>
              <a href="#download">macOS</a>
              <a href="#download">Windows</a>
              <a href="#download">iOS Camera app</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HomerunAI. All rights reserved.</span>
          <span>Made for the sidelines.</span>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Sports />
        <Features />
        <Capabilities />
        <Analysis />
        <Downloads />
      </main>
      <Footer />
    </>
  )
}
