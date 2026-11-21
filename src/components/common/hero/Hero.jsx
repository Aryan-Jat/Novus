import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?q=80&w=1712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "SPRING COLLECTION",
    title: "Effortless",
    accent: "Everyday Style",
    description: "Light layers. Soft tones. Made for real life.",
    button: "SHOP NOW",
    link: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1739867440414-578d39d14ec6?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "NEW ARRIVALS",
    title: "Made for",
    accent: "Every Moment",
    description: "Easy silhouettes designed for your everyday.",
    button: "EXPLORE",
    link: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1694316904385-19fce081265b?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "THE NEW EDIT",
    title: "Simple",
    accent: "By Design",
    description: "Modern pieces with an effortless point of view.",
    button: "VIEW COLLECTION",
    link: "/shop",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1750513954918-a445d236aaf6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "NOVUS COLLECTION",
    title: "Your Style,",
    accent: "Your Way",
    description: "Thoughtful pieces made to move with you.",
    button: "SHOP COLLECTION",
    link: "/shop",
  },
  {
    image: "https://images.unsplash.com/photo-1566752670781-61f57d5c7ec4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "NOVUS COLLECTION",
    title: "Your Style,",
    accent: "Your Way",
    description: "Soft Lenin made to move with you.",
    button: "SHOP COLLECTION",
    link: "/shop",
  },
];

const slides = [
  banners[banners.length - 1],
  ...banners,
  banners[0],
];

export default function Hero() {
  const [current, setCurrent] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const previousSlide = () => {
    setCurrent((prev) => prev - 1);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (current !== slides.length - 1 && current !== 0) return;

    timeoutRef.current = setTimeout(() => {
      setTransitionEnabled(false);

      if (current === slides.length - 1) {
        setCurrent(1);
      }

      if (current === 0) {
        setCurrent(banners.length);
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, 750);

    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const activeDot =
    current === 0
      ? banners.length - 1
      : current === banners.length + 1
      ? 0
      : current - 1;

  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`hero__track ${
          transitionEnabled ? "hero__track--animated" : ""
        }`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((banner, index) => (
          <article className="hero__slide" key={`${banner.image}-${index}`}>
            <img
              className="hero__image"
              src={banner.image}
              alt={banner.title}
            />

            <div className="hero__overlay" />

            <div className="hero__content">
              <span className="hero__eyebrow">
                {banner.eyebrow}
              </span>

              <h1 className="hero__title">
                {banner.title}
                <span>{banner.accent}</span>
              </h1>

              <p className="hero__description">
                {banner.description}
              </p>

              <Link to={banner.link} className="hero__button">
                <span>{banner.button}</span>
                <ArrowRight size={17} strokeWidth={1.7} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="hero__arrow hero__arrow--prev"
        onClick={previousSlide}
        aria-label="Previous banner"
      >
        <ArrowLeft size={19} strokeWidth={1.6} />
      </button>

      <button
        type="button"
        className="hero__arrow hero__arrow--next"
        onClick={nextSlide}
        aria-label="Next banner"
      >
        <ArrowRight size={19} strokeWidth={1.6} />
      </button>

      <div className="hero__dots">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hero__dot ${
              activeDot === index ? "hero__dot--active" : ""
            }`}
            onClick={() => setCurrent(index + 1)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

      <div className="hero__progress">
        <span
          key={`${current}-${isPaused}`}
          className={isPaused ? "is-paused" : ""}
        />
      </div>
    </section>
  );
}