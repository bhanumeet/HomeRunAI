import { useState } from 'react'
import {
  SoccerBall, Baseball, Football, Basketball,
  SoccerField, BaseballField, FootballField, BasketballCourt,
  Phone, Laptop,
  WindowsIcon, AppleIcon, AppStoreBadge,
  IconAI, IconSwitch, IconPhoneUp, IconBolt, IconWifi, IconRec,
} from './components/art'

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" rx="11" fill="#8EC48A" />
      <circle cx="20" cy="20" r="10" fill="#FBFAF4" />
      <path d="M20 12l2.4 1.8-.9 2.8h-3l-.9-2.8L20 12z" fill="#3C5A3E" />
      <path d="M20 12V8M14 19l-3 1M26 19l3 1M16 24.5l-2 3M24 24.5l2 3" stroke="#3C5A3E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
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
          <a href="#how">How it works</a>
          <a href="#sports">Sports</a>
          <a href="#features">Features</a>
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
          <span className="eyebrow">AI camera director for sports</span>
          <h1>
            Every angle.<br />
            <span className="hl">One AI director.</span>
          </h1>
          <p className="lead">
            Turn a few phones into wireless cameras, and let HomerunAI automatically
            cut the live broadcast to whoever has the best view of the play — no
            crew, no switcher, no missed moments.
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
  return (
    <svg viewBox="0 0 440 380" aria-hidden style={{ width: '100%' }}>
      {/* soft field backdrop */}
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF4E4" />
          <stop offset="1" stopColor="#CFE7C4" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="400" height="340" rx="30" fill="url(#heroBg)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={20 + i * 80} y="20" width="40" height="340" fill="#A9D69C" opacity="0.35" />
      ))}

      {/* laptop = director, center */}
      <g transform="translate(90 150)" className="floaty">
        <Laptop style={{ width: 260 }} />
      </g>

      {/* phones streaming in */}
      <g transform="translate(40 40) scale(0.7)" className="floaty d1">
        <Phone ball="soccer" style={{ width: 90 }} />
      </g>
      <g transform="translate(330 30) scale(0.7)" className="floaty d2">
        <Phone ball="base" style={{ width: 90 }} />
      </g>

      {/* floating balls */}
      <g transform="translate(360 250)" className="floaty d1"><Basketball style={{ width: 46 }} /></g>
      <g transform="translate(30 250)" className="floaty d2"><Football style={{ width: 46 }} /></g>

      {/* connecting dashes */}
      <g stroke="#5E9A5E" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 10" opacity="0.6" fill="none">
        <path d="M96 120 C 150 160, 170 180, 200 210" />
        <path d="M356 110 C 320 150, 300 175, 260 210" />
      </g>
    </svg>
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
                ? <div style={{ width: 96, height: 96, background: 'var(--field-100)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IconSwitch className="" /></div>
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
    { ic: <IconPhoneUp className="" />, title: 'Any phone is a camera', body: 'Add one phone or four. Each streams 720p/1080p over local Wi-Fi straight into the Director.' },
    { ic: <IconBolt className="" />, title: 'Smooth 30fps program', body: 'Video display stays buttery even while inference runs on a separate thread — slow hardware never stutters the show.' },
    { ic: <IconWifi className="" />, title: 'Runs on your Wi-Fi', body: 'Everything happens on your own network and laptop. No cloud upload required to direct the game.' },
    { ic: <IconRec className="" />, title: 'One clean program feed', body: 'Watch the multiview and the live cut side by side, ready to record or restream.' },
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
        <HowItWorks />
        <Sports />
        <Features />
        <Downloads />
      </main>
      <Footer />
    </>
  )
}
