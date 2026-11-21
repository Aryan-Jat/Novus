import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./PromotionBanner.css";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1664817529103-757e086db571?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "NEW SEASON",
    title: "The New Edit",
    description: "Fresh silhouettes for every day.",
    button: "Shop Now",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1762764919554-cfd608ffc1a0?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "WOMENSWEAR",
    title: "Made To Move",
    description: "Effortless pieces for modern wardrobes.",
    button: "Explore Collection",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1713952039744-be9844f21e7e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "NOVUS COLLECTION",
    title: "Everyday Style",
    description: "Simple pieces. Strong style.",
    button: "Discover More",
  },
];

const PromotionBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="promotion-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="promotion-slider__track">
        {banners.map((banner, index) => (
          <article
            key={banner.id}
            className={`promotion-slide ${
              index === activeSlide ? "is-active" : ""
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="promotion-slide__image"
            />

            <div className="promotion-slide__overlay" />

            <div className="promotion-slide__content">
              <p className="promotion-slide__eyebrow">
                {banner.eyebrow}
              </p>

              <h2>{banner.title}</h2>

              <p className="promotion-slide__description">
                {banner.description}
              </p>

              <Link
                to="/shop"
                className="promotion-slide__button"
              >
                <span>{banner.button}</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="promotion-slider__dots">
        {banners.map((banner, index) => (
          <button
            type="button"
            key={banner.id}
            className={`promotion-slider__dot ${
              index === activeSlide ? "is-active" : ""
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotionBanner;