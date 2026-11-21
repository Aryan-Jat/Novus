import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import "remixicon/fonts/remixicon.css";

const shopLinks = [
  "New Arrivals",
  "Dresses",
  "Tops",
  "Bottoms",
  "Accessories",
  "Best Sellers",
];

const customerLinks = [
  "Contact Us",
  "Shipping & Delivery",
  "Returns & Refunds",
  "FAQ",
  "Track Order",
];

const aboutLinks = ["About Us", "Our Story", "Contact Us", "FAQ"];

const socialLinks = [
  { label: "Instagram", icon: "ri-instagram-line" },
  { label: "Pinterest", icon: "ri-pinterest-line" },
  { label: "Facebook", icon: "ri-facebook-line" },
];

const Footer = () => {
  return (
    <footer className="ft">
      <div className="ft__wrap">
        <header className="ft__top">
          <span className="ft__top-label">
            <span className="ft__dot" aria-hidden="true" />
            Novus · Womenswear
          </span>
          <span className="ft__top-meta">Est. 2018 — Copenhagen</span>
        </header>

        <div className="ft__main">
          <div className="ft__brand">
            <a href="/" className="ft__logo">
              Novus
            </a>

            <p className="ft__tagline">
              Quietly considered womenswear — made to be worn for years, not
              seasons.
            </p>

            <Link to="/shop" className="ft__cta">
              <span>Shop the collection</span>
              <span className="ft__cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="ft__column">
            <h3 className="ft__col-title">Shop</h3>

            <nav className="ft__col-nav">
              {shopLinks.map((link) => (
                <a href="#" key={link} className="ft__link">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="ft__column">
            <h3 className="ft__col-title">Customer Care</h3>

            <nav className="ft__col-nav">
              {customerLinks.map((link) => (
                <a href="#" key={link} className="ft__link">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="ft__column">
            <h3 className="ft__col-title">About</h3>

            <nav className="ft__col-nav">
              {aboutLinks.map((link) => (
                <a href="#" key={link} className="ft__link">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="ft__column ft__column--social">
            <h3 className="ft__col-title">Follow</h3>

            <nav className="ft__col-nav">
              {socialLinks.map((item) => (
                <a
                  href="#"
                  key={item.label}
                  aria-label={item.label}
                  className="ft__link ft__link--social"
                >
                  <i className={item.icon} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <footer className="ft__bottom">
          <p className="ft__copy">© 2026 Novus. All rights reserved.</p>

          <div className="ft__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;