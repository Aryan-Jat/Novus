
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import "./FeaturedCategories.css";

const categories = [
  {
    name: "Dresses",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1767469697155-310a287e6972?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Tops",
    count: 62,
    image:
      "https://plus.unsplash.com/premium_photo-1688572300420-41a1f54873ea?q=80&w=776&auto=format&fit=crop",
  },
  {
    name: "Bottoms",
    count: 39,
    image:
      "https://plus.unsplash.com/premium_photo-1689371953420-b6981e43fa38?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    count: 87,
    image:
      "https://plus.unsplash.com/premium_photo-1661645417454-fabe3698fe4a?q=80&w=1740&auto=format&fit=crop",
  },
  {
    name: "Knitwear",
    count: 31,
    image:
      "https://plus.unsplash.com/premium_photo-1688572300420-41a1f54873ea?q=80&w=776&auto=format&fit=crop",
  },
  {
    name: "Outerwear",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1767469697155-310a287e6972?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Footwear",
    count: 22,
    image:
      "https://plus.unsplash.com/premium_photo-1689371953420-b6981e43fa38?q=80&w=774&auto=format&fit=crop",
  },
  {
    name: "Bags",
    count: 18,
    image:
      "https://plus.unsplash.com/premium_photo-1661645417454-fabe3698fe4a?q=80&w=1740&auto=format&fit=crop",
  },
];

const FeaturedCategories = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`cats ${visible ? "is-visible" : ""}`}
    >
      <div className="cats__wrap">

        <header className="cats__head">
          <div className="cats__headline">
            <span className="cats__eyebrow">
              Shop by Category
            </span>

            <h2 className="cats__title">
              <span>Find your</span>
              <em> every day</em>
            </h2>
          </div>

          <div className="cats__aside">
            <p className="cats__copy">
              Eight edits, one wardrobe. Refined silhouettes,
              natural fibres, made to be worn for years.
            </p>

            <Link to="/collection" className="cats__all">
              <span>View all collections</span>
              <ArrowRight size={15} strokeWidth={1.8} />
            </Link>
          </div>
        </header>

        <div className="cats__grid">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/collections/${category.name.toLowerCase()}`}
              className="cat"
              style={{ "--i": index }}
              aria-label={`Shop ${category.name}`}
            >
              <div className="cat__media">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                />

                <span className="cat__overlay" aria-hidden="true" />

                <span className="cat__arrow" aria-hidden="true">
                  <ArrowUpRight size={19} strokeWidth={1.7} />
                </span>
              </div>

              <div className="cat__body">
                <h3 className="cat__name">
                  {category.name}
                </h3>

                <span className="cat__count">
                  {category.count} pieces
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;
