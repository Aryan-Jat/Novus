import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./EditorialSection.css";

import editorialImage from "../../../assets/photo-1766556513627-0762cf1f4767.avif";

const EditorialSection = () => {
  return (
    <section className="story">
      <div className="story__wrap">
        <header className="story__head">
          <span className="story__label">The Novus Story</span>
          <span className="story__meta">— Est. 2018</span>
        </header>

        <div className="story__content">
          <figure className="story__figure">
            <img src={editorialImage} alt="NOVUS fashion collection" />
            <figcaption className="story__figure-cap">
              <span>Atelier · Porto</span>
              <span>SS / 26</span>
            </figcaption>
          </figure>

          <div className="story__details">
            <span className="story__eyebrow">The Essence</span>

            <h2 className="story__title">
              <span>Designed for</span>
              <em>the way you live.</em>
            </h2>

            <p className="story__description">
              Thoughtful silhouettes, refined details, and quiet materials —
              pieces created to become part of your everyday wardrobe.
            </p>

            <a href="#" className="story__link">
              <span>Discover the collection</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <footer className="story__foot">
          <span>Novus / Womenswear</span>
          <span>2026 Collection</span>
        </footer>
      </div>
    </section>
  );
};

export default EditorialSection;