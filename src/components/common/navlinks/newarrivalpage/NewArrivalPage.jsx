import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import NewProductCard from "../newproductpage/NewProductCard";
import { newArrivals, moreProducts, categories } from "../arrivaldata/product";
import "../newarrivalpage/NewArrivalPage.css";

/* ------------------------------------------------------------------
   CAMPAIGN SLIDES
   `focus` = object-position → keeps the subject of each photo in frame
   so the image never looks badly cropped.
------------------------------------------------------------------ */
const campaignSlides = [
  {
    id: 1,
    kicker: "New Arrivals",
    title: ["The Latest", "Edit."],
    copy: "Thirty-two pieces landed this week — soft tailoring, natural fibres.",
    image:
      "https://images.unsplash.com/photo-1713693210102-46d55c70983f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    focus: "50% 28%",
    cta: "Shop the Edit",
  },
  {
    id: 2,
    kicker: "Everyday Form",
    title: ["Pieces in", "Rotation."],
    copy: "Designed for the way you live — cut soft, worn often.",
    image:
      "https://images.unsplash.com/photo-1583914143620-46298183773a?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    focus: "50% 22%",
    cta: "See the Edit",
  },
  {
    id: 3,
    kicker: "Modern Silhouettes",
    title: ["The New", "Shape."],
    copy: "Quiet architecture — soft structure and clean line.",
    image:
      "https://images.unsplash.com/photo-1779401811197-b449f89e8fe6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    focus: "50% 25%",
    cta: "View the Edit",
  },
  {
    id: 4,
    kicker: "The New Edit",
    title: ["Soft", "Tailoring."],
    copy: "Twelve ateliers, six countries, one standard — built for a decade.",
    image:
      "https://images.unsplash.com/photo-1700190614680-9d941703181e?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    focus: "50% 32%",
    cta: "Open the Edit",
  },
  {
    id: 5,
    kicker: "Novus",
    title: ["Quietly", "Considered."],
    copy: "Made to be worn — and worn again.",
    image:
      "https://images.unsplash.com/photo-1739867440386-9bb994d73bd6?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    focus: "50% 24%",
    cta: "Shop Collection",
  },
];

/* ⚡ Faster slide speed */
const SLIDE_DURATION = 4200;

const CampaignBanner = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = campaignSlides.length;

  const goTo = useCallback(
    (index) => setActive(((index % count) + count) % count),
    [count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;

    const id = window.setTimeout(next, SLIDE_DURATION);
    return () => window.clearTimeout(id);
  }, [paused, next]);

  return (
    <section
      className="banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Novus campaign"
    >
      <div className="banner__viewport">
        {campaignSlides.map((slide, index) => (
          <article
            key={slide.id}
            className={`banner__slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            <div className="banner__media">
              <img
                src={slide.image}
                alt=""
                style={{ "--focus": slide.focus }}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="banner__scrim" aria-hidden="true" />
            </div>

            <div className="banner__content">
              <span className="banner__kicker">
                <span className="banner__dot" aria-hidden="true" />
                {slide.kicker}
              </span>

              <h1 className="banner__title">
                <span className="banner__line">
                  <span>{slide.title[0]}</span>
                </span>
                <span className="banner__line">
                  <em>{slide.title[1]}</em>
                </span>
              </h1>

              <p className="banner__copy">{slide.copy}</p>

              <Link to="/collections" className="banner__cta">
                <span>{slide.cta}</span>
                <span className="banner__cta-icon" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </article>
        ))}

        {/* ---- Progress (clickable, replaces arrows + counter) ---- */}
        <div className="banner__progress">
          {campaignSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`banner__progress-line ${
                i === active ? "is-active" : ""
              }`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className="banner__progress-track">
                {i === active && (
                  <span
                    key={`p-${active}-${paused}`}
                    className={`banner__progress-fill ${
                      paused ? "is-paused" : ""
                    }`}
                    style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewArrivalsPage = () => {
  const [filter, setFilter] = useState("All");
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach((node) => {
      if (!node.classList.contains("is-revealed")) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [filter]);

  const filtered =
    filter === "All"
      ? newArrivals
      : newArrivals.filter((p) => p.category === filter);

  return (
    <main ref={rootRef} className="nap">
      <CampaignBanner />

      <nav className="nap__filters" aria-label="Filter products">
        <div className="nap__wrap nap__filters-inner">
          <div className="nap__filters-list">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filter === cat}
                className={`nap__filter ${filter === cat ? "is-active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="nap__filters-count">
            {String(filtered.length).padStart(2, "0")} pieces
          </span>
        </div>
      </nav>

      <section className="nap__section" id="grid">
        <div className="nap__wrap">
          <header className="nap__head" data-reveal>
            <h2 className="nap__title">
              <span>New</span> <em>Arrivals</em>
            </h2>

            <p className="nap__sub">
              New pieces selected for the season — released in small batches.
            </p>
          </header>

          <div className="nap__grid">
            {filtered.map((product, index) => (
              <NewProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="nap__editorial">
        <div className="nap__wrap">
          <div className="nap__editorial-inner" data-reveal>
            <figure className="nap__editorial-media">
              <img
                src="https://images.unsplash.com/photo-1715541448388-22d3701b1b19?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Novus editorial"
              />
            </figure>

            <div className="nap__editorial-body">
              <span className="nap__editorial-kicker">The New Edit</span>

              <h2 className="nap__editorial-title">
                <span>Designed for</span>
                <em>everyday movement.</em>
              </h2>

              <p className="nap__editorial-copy">
                Twelve ateliers, six countries, one standard. Every piece is
                built to be worn for years, not seasons.
              </p>

              <Link to="/collection" className="nap__link">
                <span>Explore collection</span>
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="nap__section nap__section--more">
        <div className="nap__wrap">
          <header className="nap__head nap__head--inline" data-reveal>
            <h2 className="nap__title">
              <span>More from</span> <em>Novus</em>
            </h2>

            <Link to="/collections" className="nap__link">
              <span>View all</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </header>

          <div className="nap__grid">
            {moreProducts.map((product, index) => (
              <NewProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="nap__final">
        <div className="nap__wrap">
          <div className="nap__final-inner" data-reveal>
            <h2 className="nap__final-title">
              <span>Made to be</span>
              <em>worn.</em>
            </h2>

            <Link to="/collection" className="nap__final-cta">
              <span>Shop the Full Collection</span>
              <span className="nap__final-cta-icon" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewArrivalsPage;
