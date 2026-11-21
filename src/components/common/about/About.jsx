import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import "./About.css";

const heroLines = [
  "We believe",
  "good clothing",
  "doesn't need",
  "to shout.",
];

const statement =
  "We create pieces that feel effortless, considered, and easy to live in.";

const beliefs = [
  {
    title: "Thoughtful Design",
    text: "We believe simplicity creates room for individuality.",
  },
  {
    title: "Quality",
    text: "Good clothing should feel good long after the first wear.",
  },
  {
    title: "Versatility",
    text: "Every piece should work naturally across different moments.",
  },
  {
    title: "Less, Better",
    text: "We prefer considered choices over constant newness.",
  },
];

const approach = ["Simple", "Considered", "Modern", "Effortless"];

const scrollLines = [
  "Designed to wear",
  "Designed to live in",
  "Designed to last",
];

const About = () => {
  const rootRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const update = () => {
      if (marqueeRef.current) {
        const offset = window.scrollY * 0.12;
        marqueeRef.current.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>

      <main ref={rootRef} className="about">
        <section className="about__hero">
          <div className="about__wrap">
            <span className="about__eyebrow">About Novus</span>

            <h1 className="about__hero-title">
              {heroLines.map((line, index) => (
                <span
                  key={line}
                  className="about__hero-line"
                  style={{ "--i": index }}
                >
                  <span className="about__hero-line-inner">{line}</span>
                </span>
              ))}
            </h1>

            <p className="about__hero-lede">
              NOVUS creates modern women&apos;s clothing with a focus on
              simplicity, comfort and everyday wearability.
            </p>

            <Link to="/collections" className="about__link about__link--hero">
              <span>Explore Collections</span>
              <span className="about__link-arrow" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </section>

        <section className="about__statement">
          <div className="about__wrap">
            <p
              className="about__statement-text"
              data-reveal
              aria-label={statement}
            >
              {statement.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className="about__word"
                  style={{ "--w": index }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="about__story">
          <div className="about__wrap about__story-grid">
            <div className="about__story-head" data-reveal>
              <span className="about__eyebrow">Our Story</span>
            </div>

            <div className="about__story-body">
              <p data-reveal>
                NOVUS began with a simple idea: clothing should feel
                considered, comfortable and relevant beyond a single season.
              </p>
              <p data-reveal style={{ "--i": 1 }}>
                We focus on clean silhouettes, thoughtful details and pieces
                that naturally become part of everyday life.
              </p>
            </div>
          </div>
        </section>

        <section className="about__marquee" aria-hidden="true">
          <div className="about__marquee-track" ref={marqueeRef}>
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="about__marquee-item">
                <span>Less Noise</span>
                <span className="about__marquee-dot">·</span>
                <span>More Style</span>
                <span className="about__marquee-dot">·</span>
              </span>
            ))}
          </div>
        </section>

        <section className="about__beliefs">
          <div className="about__wrap">
            <header className="about__beliefs-head" data-reveal>
              <span className="about__eyebrow">What We Believe</span>
            </header>

            <div className="about__beliefs-grid">
              {beliefs.map((belief, index) => (
                <article
                  key={belief.title}
                  className="about__belief"
                  data-reveal
                  style={{ "--i": index }}
                >
                  <h3 className="about__belief-title">{belief.title}</h3>
                  <span className="about__belief-rule" aria-hidden="true" />
                  <p className="about__belief-text">{belief.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about__approach">
          <div className="about__wrap">
            <header className="about__approach-head" data-reveal>
              <span className="about__eyebrow">The Novus Approach</span>
            </header>

            <ul className="about__approach-list">
              {approach.map((word, index) => (
                <li
                  key={word}
                  className="about__approach-item"
                  data-reveal
                  style={{ "--i": index }}
                >
                  <span className="about__approach-word">{word}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="about__manifesto">
          <div className="about__wrap">
            <p className="about__manifesto-line" data-reveal>
              <span>Clothing should not</span>
            </p>
            <p
              className="about__manifesto-line about__manifesto-line--em"
              data-reveal
              style={{ "--i": 1 }}
            >
              <span>
                <em>define</em> you.
              </span>
            </p>
            <p
              className="about__manifesto-line"
              data-reveal
              style={{ "--i": 2 }}
            >
              <span>It should become</span>
            </p>
            <p
              className="about__manifesto-line about__manifesto-line--em"
              data-reveal
              style={{ "--i": 3 }}
            >
              <span>
                part of <em>you.</em>
              </span>
            </p>
          </div>
        </section>

        <section className="about__scroll">
          <div className="about__wrap">
            {scrollLines.map((line, index) => (
              <p
                key={line}
                className="about__scroll-line"
                data-reveal
                style={{ "--i": index }}
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="about__final">
          <div className="about__wrap">
            <div className="about__final-inner" data-reveal>
              <span className="about__eyebrow">Discover Novus</span>

              <h2 className="about__final-title">
                Ready to explore <em>Novus?</em>
              </h2>

              <p className="about__final-copy">
                Discover the latest collection — quietly considered, made to
                be worn.
              </p>

              <Link
  to="/collection"
  className="about__final-link"
>
  <span>Explore Collections</span>
  <span className="about__final-link-arrow" aria-hidden="true">
    <ArrowRight size={15} strokeWidth={1.8} />
  </span>
</Link>
            </div>
          </div>
        </section>
      </main>

    </>
  );
};

export default About;