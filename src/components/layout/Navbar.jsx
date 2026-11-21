import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

import { useBag } from "../../hooks/useBag";

import { useWishlist } from "../../hooks/useWishlist";import "./Navbar.css";

const navLinks = [
  { label: "New Arrivals", to: "/new" },
  { label: "Clothing", to: "/clothing" },
  { label: "Collections", to: "/collection" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalCount: bagCount } = useBag();
  const { totalCount: wishCount } = useWishlist();

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");

    const handleChange = (e) => {
      if (e.matches) {
        setMenuOpen(false);
      }
    };

    mq.addEventListener("change", handleChange);

    return () => {
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header className="nv">
      <div className="nv__bar">
        <div className="nv__desktop">
          <Link to="/" className="nv__brand" aria-label="NOVUS — Home">
            <span className="nv__brand-text">Novus</span>
            <span className="nv__brand-dot" aria-hidden="true" />
          </Link>

          <nav className="nv__nav" aria-label="Main navigation">
            {navLinks.map((item) => (
              <Link key={item.label} to={item.to} className="nv__nav-link">
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="nv__tools">
            <label className="nv__search">
              <Search size={15} strokeWidth={1.7} aria-hidden="true" />
              <input
                type="search"
                placeholder="Search"
                aria-label="Search products"
              />
            </label>

            <Link
              to="/wishlist"
              className="nv__icon"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.7} />
              {wishCount > 0 && (
                <span className="nv__badge">{wishCount}</span>
              )}
            </Link>

            <Link
              to="/bag"
              className="nv__icon"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={18} strokeWidth={1.7} />
              {bagCount > 0 && (
                <span className="nv__badge">{bagCount}</span>
              )}
            </Link>

            <Link to="/login" className="nv__icon" aria-label="Account">
              <User size={18} strokeWidth={1.7} />
            </Link>
          </div>
        </div>

        <div className="nv__mobile">
          <Link to="/" className="nv__brand" aria-label="NOVUS — Home">
            <span className="nv__brand-text">Novus</span>
            <span className="nv__brand-dot" aria-hidden="true" />
          </Link>

          <div className="nv__mobile-tools">
            <Link
              to="/wishlist"
              className="nv__icon"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.7} />
              {wishCount > 0 && (
                <span className="nv__badge">{wishCount}</span>
              )}
            </Link>

            <Link
              to="/bag"
              className="nv__icon"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={18} strokeWidth={1.7} />
              {bagCount > 0 && (
                <span className="nv__badge">{bagCount}</span>
              )}
            </Link>

            <button
              type="button"
              className="nv__icon"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="nv-drawer"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <X size={19} strokeWidth={1.7} />
              ) : (
                <Menu size={19} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`nv__overlay ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="nv-drawer"
        className={`nv__drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nv__drawer-head">
          <span className="nv__drawer-label">Menu</span>

          <button
            type="button"
            className="nv__icon"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X size={19} strokeWidth={1.7} />
          </button>
        </div>

        <label className="nv__drawer-search">
          <Search size={15} strokeWidth={1.7} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search products"
          />
        </label>

        <nav className="nv__drawer-nav" aria-label="Mobile navigation">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className="nv__drawer-link"
              style={{ "--d": `${90 + index * 55}ms` }}
              onClick={closeMenu}
            >
              <span className="nv__drawer-num">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="nv__drawer-text">{item.label}</span>

              <span className="nv__drawer-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="nv__drawer-foot">
          <Link
            to="/login"
            className="nv__drawer-login"
            onClick={closeMenu}
          >
            <span>Login</span>
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            to="/login"
            className="nv__drawer-account"
            onClick={closeMenu}
          >
            <User size={16} strokeWidth={1.7} />
            <span>Account</span>
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;