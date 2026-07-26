"use client";

import { FormEvent, useEffect, useState } from "react";

const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_URL ?? "";

const stories = [
  { image: "/assets/portrait-balcony.png", label: "Home on a rainy afternoon", quote: "The view from my balcony keeps me grounded." },
  { image: "/assets/portrait-cafe.png", label: "Chiya before a call", quote: "I always make time to speak to home." },
  { image: "/assets/mist-walk.png", label: "Back home for Losar", quote: "Some journeys feel familiar before they begin.", wide: true },
  { image: "/assets/portrait-man.png", label: "Making a life away", quote: "Sikkim is still where I reset." },
  { image: "/assets/daylight.png", label: "A familiar corner", quote: "The places you know by heart matter.", wide: true },
  { image: "/assets/conversation-prompt.png", label: "An easy bhetghat", quote: "A conversation can make the next step feel simple." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formNote, setFormNote] = useState("Early-circle capture will open soon.");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("on")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal:not(.hero .reveal)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormNote("Please enter a valid email address.");
      return;
    }
    if (!waitlistUrl) {
      setFormNote("Early-circle capture will open soon. Please check back shortly.");
      return;
    }
    setSubmitting(true);
    setFormNote("Saving your request…");
    try {
      const response = await fetch(waitlistUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "sainoo-landing" }),
      });
      if (!response.ok) throw new Error("Waitlist request failed");
      setEmail("");
      setFormNote("Thank you. We’ll be in touch.");
    } catch {
      setFormNote("We could not save your request. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={menuOpen ? "menu-open" : ""}>
      <header className="nav">
        <div className="nav-inner wrap">
          <a className="brand" href="#top" aria-label="Sainoo home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Sainoo</span>
            <span className="brand-script">साइनो</span>
          </a>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#conversation" onClick={closeMenu}>The idea</a>
            <a href="#stories" onClick={closeMenu}>Stories</a>
            <a className="nav-cta" href="#invite" onClick={closeMenu}>Ask for an invitation</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="thread-hero" aria-hidden="true"><svg viewBox="0 0 600 520" preserveAspectRatio="none"><path className="red" d="M-20 465C128 390 97 222 241 258S395 454 542 337 513 80 656 14"/><path className="moss" d="M-12 370C135 444 181 167 312 206S385 440 522 277 465 76 626 89"/></svg></div>
        <div className="hero-content wrap">
          <div className="hero-copy"><h1 className="reveal delay">A good introduction<br />has its <em>own pace.</em></h1></div>
          <div className="hero-bottom reveal delay"><p>For people who call Sikkim home—here, and wherever life has taken them.</p><a className="button" href="#invite">Ask for an invitation ↗</a></div>
        </div>
      </section>

      <section className="prompt-section" id="conversation">
        <div className="weave-divider" aria-hidden="true"><svg viewBox="0 0 1600 74" preserveAspectRatio="none"><path d="M-30 36C128 2 184 73 329 37s154-5 300 0 178-31 345 0 235-41 379 0 196-28 311-7 181 3 366-31"/></svg></div>
        <div className="prompt-grid wrap">
          <div className="reveal"><h2>Not a perfect bio.<br />Just a <em>good question.</em></h2><p className="prompt-copy">Sainoo begins with the small things that tell you more: how someone spends a Sunday, where they feel most themselves, the traditions they want to carry forward.</p></div>
          <figure className="prompt-media reveal"><img src="/assets/conversation-prompt.png" alt="Two people in conversation in a calm Gangtok setting" /><figcaption className="prompt-card">The ritual I return to every Sunday is…</figcaption></figure>
        </div>
      </section>

      <section className="belonging" id="stories">
        <div className="belonging-head wrap"><div className="reveal"><h2>From <em>home</em>, into what comes next.</h2><p className="belonging-copy">A smaller, considered place for people with real lives, familiar places and futures still being figured out.</p><p className="scroll-hint"><span />Explore the stories</p></div></div>
        <div className="gallery" aria-label="Prototype member story gallery">
          {stories.map((story) => <figure className={`story${story.wide ? " wide" : ""}`} key={story.label}><img src={story.image} alt={story.label} /><figcaption className="story-caption"><small>{story.label}</small><strong>“{story.quote}”</strong></figcaption></figure>)}
        </div>
      </section>

      <section className="invite" id="invite">
        <div className="invite-grid wrap">
          <div className="reveal"><h2>Curious?<br /><em>Start here.</em></h2><p className="invite-copy">We’re opening Sainoo slowly, with people who want to meet with intention.</p></div>
          <div className="reveal"><figure className="pinned-photo"><img src="/assets/portrait-man.png" alt="Portrait used as a prototype for the early circle" /><figcaption>SAINOO / EARLY CIRCLE</figcaption></figure>
            <form onSubmit={handleSubmit} noValidate><label htmlFor="email">Your email address</label><div className="input-row"><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /><button type="submit" disabled={submitting}>Ask for an invitation ↗</button></div><p className="form-note">{formNote}</p></form>
          </div>
        </div>
        <footer className="wrap"><span>© 2026 Sainoo · Thoughtful introductions</span><span>Gangtok · Sikkim · India</span></footer>
      </section>
    </main>
  );
}
