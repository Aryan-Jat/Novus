import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import {
  categories,
  featuredCollections,
  collections,
  moods,
} from "./collectionData";
import "./Collection.css";

const CollectionPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
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
  }, [activeCategory]);

  const visibleCollections = useMemo(() => {
    if (activeCategory === "All") return collections;
    return collections.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <main ref={rootRef} className="cp">
        <section className="cp__hero" aria-labelledby="cp-hero-title">
          <div className="cp__hero-media">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2200&auto=format&fit=crop"
              alt="Novus curated collection campaign"
            />
            <span className="cp__hero-scrim" aria-hidden="true" />
          </div>

          <div className="cp__hero-content">
            <span className="cp__hero-eyebrow">
              <span className="cp__dot" aria-hidden="true" />
              Collections
            </span>

            <h1 id="cp-hero-title" className="cp__hero-title">
              <span>Curated for</span>
              <em>the way you wear.</em>
            </h1>

            <p className="cp__hero-copy">
              Considered pieces across everyday essentials, modern tailoring and
              statement styles.
            </p>

            <a href="#collections" className="cp__hero-cta">
              <span>Explore Collections</span>
              <span className="cp__hero-cta-icon" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </section>

        <section className="cp__featured">
          <div className="cp__wrap">
            <header className="cp__section-head" data-reveal>
              <span className="cp__eyebrow">Featured Collections</span>
              <h2 className="cp__section-title">
                <span>The edits</span> <em>defining now.</em>
              </h2>
              <p className="cp__section-copy">
                Explore the pieces defining the current Novus edit.
              </p>
            </header>

            <div className="cp__featured-grid" data-reveal>
              {featuredCollections.map((item, index) => (
                <article
                  key={item.id}
                  className={`cp__featured-card cp__featured-card--${
                    index === 0 ? "large" : "small"
                  }`}
                >
                  <Link to={item.to} className="cp__featured-link">
                    <div className="cp__featured-media">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="cp__featured-body">
                      <h3 className="cp__featured-name">{item.title}</h3>
                      <p className="cp__featured-desc">{item.description}</p>

                      <span className="cp__featured-cta">
                        <span>Explore</span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cp__banner">
          <div className="cp__banner-media">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2200&auto=format&fit=crop"
              alt="Novus new edit campaign"
              loading="lazy"
            />
            <span className="cp__banner-scrim" aria-hidden="true" />
          </div>

          <div className="cp__banner-content" data-reveal>
            <span className="cp__banner-kicker">
              <span className="cp__dot" aria-hidden="true" />
              The New Edit
            </span>

            <h2 className="cp__banner-title">
              <span>Designed around</span>
              <em>movement.</em>
            </h2>

            <p className="cp__banner-copy">
              Comfort, considered silhouettes and pieces that work beyond a
              single season.
            </p>

            <Link to="/collections" className="cp__banner-cta">
              <span>Explore the Edit</span>
              <span className="cp__banner-cta-icon" aria-hidden="true">
                <ArrowRight size={15} strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </section>

        <section className="cp__catalog" id="collections">
          <div className="cp__wrap">
            <header className="cp__catalog-head" data-reveal>
              <span className="cp__eyebrow">Browse by category</span>
              <h2 className="cp__section-title">
                <span>Every collection,</span> <em>one place.</em>
              </h2>
            </header>

            <nav
              className="cp__filters"
              aria-label="Filter collections"
              data-reveal
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  className={`cp__filter ${
                    activeCategory === cat ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {visibleCollections.length === 0 ? (
              <p className="cp__empty" data-reveal>
                Nothing here yet — try another category.
              </p>
            ) : (
              <div key={activeCategory} className="cp__grid">
                {visibleCollections.map((item, index) => (
                  <article
                    key={item.id}
                    className="cp__card"
                    data-reveal
                    style={{ "--i": index % 6 }}
                  >
                    <Link to={item.to} className="cp__card-link">
                      <div className="cp__card-media">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      <div className="cp__card-body">
                        <h3 className="cp__card-name">{item.name}</h3>
                        <p className="cp__card-desc">{item.description}</p>

                        <span className="cp__card-cta">
                          <span>Explore collection</span>
                          <ArrowUpRight
                            size={13}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="cp__split">
          <div className="cp__wrap">
            <div className="cp__split-inner" data-reveal>
              <figure className="cp__split-media">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
                  alt="Novus atelier detail"
                  loading="lazy"
                />
              </figure>

              <div className="cp__split-content">
                <span className="cp__eyebrow">Designed to move</span>

                <h2 className="cp__split-title">
                  <span>Wearable forms,</span>
                  <em>quietly made.</em>
                </h2>

                <p className="cp__split-copy">
                  Every Novus collection is built around wearable silhouettes,
                  considered details and pieces that work beyond a single
                  season.
                </p>

                <Link to="/about" className="cp__link">
                  <span>Discover Novus</span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="cp__moods">
          <div className="cp__wrap">
            <header className="cp__section-head" data-reveal>
              <span className="cp__eyebrow">Shop by mood</span>
              <h2 className="cp__section-title">
                <span>Dress to</span> <em>the moment.</em>
              </h2>
            </header>

            <div className="cp__moods-grid">
              {moods.map((mood, index) => (
                <Link
                  key={mood.id}
                  to={mood.to}
                  className="cp__mood"
                  data-reveal
                  style={{ "--i": index % 4 }}
                >
                  <div className="cp__mood-media">
                    <img
                      src={mood.image}
                      alt={mood.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="cp__mood-scrim" aria-hidden="true" />
                  </div>

                  <div className="cp__mood-body">
                    <span className="cp__mood-name">{mood.name}</span>
                    <span className="cp__mood-phrase">{mood.phrase}</span>
                    <span className="cp__mood-cta">
                      <span>Explore</span>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cp__final">
          <div className="cp__wrap">
            <div className="cp__final-inner" data-reveal>
              <h2 className="cp__final-title">
                <span>Find your</span>
                <em>collection.</em>
              </h2>

              <p className="cp__final-copy">
                Explore the Novus wardrobe — from everyday essentials to
                considered statement pieces.
              </p>

              <Link to="/collection" className="cp__final-cta">
                <span>Explore All Collections</span>
                <span className="cp__final-cta-icon" aria-hidden="true">
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

export default CollectionPage;
