"use client";

import { FormEvent, useEffect, useState } from "react";

const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_URL ?? "";

const notes = [
  { image: "/assets/portrait-balcony.png", title: "The view from my balcony keeps me grounded.", place: "A rainy afternoon, Gangtok" },
  { image: "/assets/portrait-cafe.png", title: "I always make time to speak to home.", place: "Between calls, Bengaluru" },
  { image: "/assets/mist-walk.png", title: "Some journeys feel familiar before they begin.", place: "Back home for Losar" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [formNote, setFormNote] = useState("Early-circle capture will open soon.");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("on")),
      { threshold: 0.16 },
    );
    document.querySelectorAll(".reveal:not(.hero .reveal)").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

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
      const response = await fetch(waitlistUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, source: "sainoo-landing" }) });
      if (!response.ok) throw new Error("Waitlist request failed");
      setEmail("");
      setFormNote("Thank you. We’ll be in touch.");
    } catch {
      setFormNote("We could not save your request. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className={menuOpen ? "menu-open" : ""}>
      <header className="nav">
        <div className="nav-inner wrap">
          <a className="brand" href="#top" aria-label="Sainoo home"><span className="brand-mark" aria-hidden="true" /><span className="brand-name">Sainoo</span><span className="brand-script">साइनो</span></a>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
          <nav className="nav-links" aria-label="Main navigation"><a href="#idea" onClick={closeMenu}>The idea</a><a href="#notes" onClick={closeMenu}>Notes from home</a><a href="#invite" onClick={closeMenu}>Invitation</a></nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-picture" aria-hidden="true" />
        <div className="hero-thread one" aria-hidden="true" /><div className="hero-thread two" aria-hidden="true" />
        <div className="hero-content wrap">
          <p className="hero-signature reveal">Sainoo / साइनो</p>
          <h1 className="reveal">A good introduction<br />has its <em>own pace.</em></h1>
          <div className="hero-foot reveal"><p>For people who call Sikkim home—here, and wherever life has taken them.</p><a href="#idea">Begin with a question <span>↓</span></a></div>
        </div>
      </section>

      <section className="idea wrap" id="idea">
        <div className="idea-copy reveal"><h2>It starts with the<br /><em>stories we carry.</em></h2><p>Not a perfect bio. Not an endless stream of profiles. Just the ordinary things that make someone familiar: a ritual, a view, a place they return to when they need to reset.</p></div>
        <figure className="question-photo reveal"><img src="/assets/conversation-prompt.png" alt="Two people in a calm conversation" /><figcaption><span>A question for a first bhetghat</span><strong>What is a small ritual you never skip?</strong></figcaption></figure>
      </section>

      <section className="manifesto"><div className="manifesto-inner wrap"><p className="reveal">Meeting someone should feel less like searching,<br />and more like being <em>properly introduced.</em></p></div></section>

      <section className="notes wrap" id="notes">
        <div className="notes-head reveal"><h2>Notes from <em>home.</em></h2><p>Small glimpses of the lives people are already living.</p></div>
        <div className="notes-grid">
          {notes.map((note, index) => <figure className={`note note-${index + 1} reveal`} key={note.title}><img src={note.image} alt={note.place} /><figcaption><span>{note.place}</span><strong>“{note.title}”</strong></figcaption></figure>)}
        </div>
      </section>

      <section className="invite" id="invite"><div className="invite-thread" aria-hidden="true" /><div className="invite-grid wrap"><div className="reveal"><h2>For when you’re<br />ready to <em>meet well.</em></h2><p>We’re opening Sainoo slowly—with people who want to make room for a meaningful introduction.</p></div><div className="invite-form reveal"><p>Leave a note. We’ll write when the early circle opens.</p><form onSubmit={handleSubmit} noValidate><label htmlFor="email">Your email address</label><div className="input-row"><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /><button type="submit" disabled={submitting}>Ask for an invitation <span>→</span></button></div><p className="form-note">{formNote}</p></form></div></div><footer className="wrap"><span>© 2026 Sainoo</span><span>Thoughtful introductions · Sikkim</span></footer></section>
    </main>
  );
}
