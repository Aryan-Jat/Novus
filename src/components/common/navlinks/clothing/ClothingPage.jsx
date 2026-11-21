import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Heart,
  SlidersHorizontal,
  X,
  Check,
  ShoppingBag,
} from "lucide-react";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import {
  clothingCategories,
  clothingSizes,
  clothingColors,
  clothingSortOptions,
  clothingProducts,
} from "./ClothingData";
import { useWishlist } from "../../../../hooks/useWishlist";import { useBag } from "../../../../hooks/useBag";
import "./ClothingPage.css";

const ITEMS_PER_PAGE = 12;
const MAX_PRICE = 5000;

const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const ClothingPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filterOpen, setFilterOpen] = useState(false);

  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToBag } = useBag();

  const rootRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!filterOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [filterOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSortOpen(false);
        setFilterOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!sortOpen) return;

    const onClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [sortOpen]);

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

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, activeSizes, activeColors, priceRange, sort]);

  const toggleSize = (size) =>
    setActiveSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );

  const toggleColor = (color) =>
    setActiveColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );

  const handleAddToBag = (product) => {
    addToBag(product, {
      size: product.sizes?.[0] || undefined,
      color: product.color || undefined,
      quantity: 1,
    });
  };

  const clearAll = () => {
    setActiveCategory("All");
    setActiveSizes([]);
    setActiveColors([]);
    setPriceRange([0, MAX_PRICE]);
  };

  const hasActiveFilters =
    activeCategory !== "All" ||
    activeSizes.length > 0 ||
    activeColors.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== MAX_PRICE;

  const filtered = useMemo(() => {
    let list = clothingProducts.slice();

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeSizes.length) {
      list = list.filter((p) =>
        p.sizes.some((size) => activeSizes.includes(size))
      );
    }
    if (activeColors.length) {
      list = list.filter((p) => activeColors.includes(p.color));
    }
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return list;
  }, [activeCategory, activeSizes, activeColors, priceRange, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  const sortLabel =
    clothingSortOptions.find((option) => option.value === sort)?.label ||
    "Featured";

  const gridKey = `${activeCategory}|${activeSizes.join(",")}|${activeColors.join(
    ","
  )}|${priceRange[0]}-${priceRange[1]}`;

  const filterCount = [
    activeCategory !== "All" ? 1 : 0,
    activeSizes.length,
    activeColors.length,
    priceRange[0] !== 0 || priceRange[1] !== MAX_PRICE ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <>

      <main ref={rootRef} className="cl">
        <section className="cl__hero">
          <div className="cl__wrap">
            <span className="cl__eyebrow">Clothing</span>

            <h1 className="cl__hero-title">
              <span>Everyday pieces,</span>
              <em>thoughtfully made.</em>
            </h1>

            <p className="cl__hero-copy">
              Explore dresses, tops, bottoms and outerwear designed to work
              effortlessly across your wardrobe.
            </p>
          </div>
        </section>

        <nav className="cl__cats" aria-label="Filter by category">
          <div className="cl__wrap cl__cats-inner">
            {clothingCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={activeCategory === cat}
                className={`cl__cat ${
                  activeCategory === cat ? "is-active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <section className="cl__catalog">
          <div className="cl__wrap">
            <header className="cl__toolbar">
              <span className="cl__count">
                <strong>{filtered.length}</strong>{" "}
                <span>{filtered.length === 1 ? "piece" : "pieces"}</span>
              </span>

              <div className="cl__toolbar-actions">
                <button
                  type="button"
                  className={`cl__tool ${filterOpen ? "is-active" : ""}`}
                  onClick={() => setFilterOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={filterOpen}
                >
                  <SlidersHorizontal size={15} strokeWidth={1.8} />
                  <span>Filter</span>
                  {filterCount > 0 && (
                    <span className="cl__tool-badge">{filterCount}</span>
                  )}
                </button>

                <div className="cl__sort" ref={sortRef}>
                  <button
                    type="button"
                    className={`cl__tool ${sortOpen ? "is-active" : ""}`}
                    onClick={() => setSortOpen((v) => !v)}
                    aria-haspopup="listbox"
                    aria-expanded={sortOpen}
                  >
                    <span className="cl__tool-label">Sort:</span>
                    <span className="cl__tool-value">{sortLabel}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={1.8}
                      className={`cl__tool-chev ${
                        sortOpen ? "is-open" : ""
                      }`}
                    />
                  </button>

                  {sortOpen && (
                    <ul className="cl__sort-menu" role="listbox">
                      {clothingSortOptions.map((option) => (
                        <li key={option.value}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={sort === option.value}
                            className={`cl__sort-option ${
                              sort === option.value ? "is-active" : ""
                            }`}
                            onClick={() => {
                              setSort(option.value);
                              setSortOpen(false);
                            }}
                          >
                            <span>{option.label}</span>
                            {sort === option.value && (
                              <Check size={14} strokeWidth={2} />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </header>

            {hasActiveFilters && (
              <div className="cl__pills">
                {activeCategory !== "All" && (
                  <button
                    type="button"
                    className="cl__pill"
                    onClick={() => setActiveCategory("All")}
                  >
                    <span>{activeCategory}</span>
                    <X size={12} strokeWidth={2} />
                  </button>
                )}

                {activeSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="cl__pill"
                    onClick={() => toggleSize(size)}
                  >
                    <span>Size {size}</span>
                    <X size={12} strokeWidth={2} />
                  </button>
                ))}

                {activeColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="cl__pill"
                    onClick={() => toggleColor(color)}
                  >
                    <span>{color}</span>
                    <X size={12} strokeWidth={2} />
                  </button>
                ))}

                {(priceRange[0] !== 0 || priceRange[1] !== MAX_PRICE) && (
                  <button
                    type="button"
                    className="cl__pill"
                    onClick={() => setPriceRange([0, MAX_PRICE])}
                  >
                    <span>
                      {formatPrice(priceRange[0])} –{" "}
                      {formatPrice(priceRange[1])}
                    </span>
                    <X size={12} strokeWidth={2} />
                  </button>
                )}

                <button
                  type="button"
                  className="cl__pill cl__pill--clear"
                  onClick={clearAll}
                >
                  Clear all
                </button>
              </div>
            )}

            {visibleProducts.length === 0 ? (
              <div className="cl__empty">
                <h3>No pieces match your filters</h3>
                <p>Try adjusting or clearing your selection.</p>
                <button
                  type="button"
                  className="cl__empty-btn"
                  onClick={clearAll}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="cl__grid" key={gridKey}>
                  {visibleProducts.slice(0, 8).map((product, index) => (
                    <ClothingProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      wishlisted={isWishlisted(product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAddToBag={handleAddToBag}
                    />
                  ))}

                  {visibleProducts.length > 8 && (
                    <aside className="cl__break">
                      <span className="cl__break-eyebrow">
                        Made for everyday movement
                      </span>

                      <h2 className="cl__break-title">
                        <span>Pieces designed</span>
                        <em>to work together.</em>
                      </h2>

                      <p className="cl__break-copy">
                        Considered silhouettes, quiet details — made to stay
                        relevant beyond a single season.
                      </p>

                      <Link to="/collection" className="cl__break-link">
                        <span>Explore the Edit</span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </Link>
                    </aside>
                  )}

                  {visibleProducts.slice(8).map((product, index) => (
                    <ClothingProductCard
                      key={product.id}
                      product={product}
                      index={index + 8}
                      wishlisted={isWishlisted(product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAddToBag={handleAddToBag}
                    />
                  ))}
                </div>

                {canLoadMore && (
                  <div className="cl__load">
                    <button
                      type="button"
                      className="cl__load-btn"
                      onClick={() =>
                        setVisibleCount((count) => count + ITEMS_PER_PAGE)
                      }
                    >
                      <span>Load More</span>
                      <span className="cl__load-icon" aria-hidden="true">
                        <ArrowRight size={15} strokeWidth={1.8} />
                      </span>
                    </button>

                    <span className="cl__load-count">
                      Showing {visibleProducts.length} of {filtered.length}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="cl__final">
          <div className="cl__wrap">
            <div className="cl__final-inner" data-reveal>
              <span className="cl__eyebrow">Find your everyday uniform</span>

              <h2 className="cl__final-title">
                <span>Pieces that move</span>
                <em>through your wardrobe.</em>
              </h2>

              <Link to="/collection" className="cl__final-cta">
                <span>Explore Collections</span>
                <span className="cl__final-cta-icon" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`cl__overlay ${filterOpen ? "is-open" : ""}`}
        onClick={() => setFilterOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`cl__drawer ${filterOpen ? "is-open" : ""}`}
        aria-hidden={!filterOpen}
        role="dialog"
        aria-label="Filters"
      >
        <header className="cl__drawer-head">
          <h2>Filter</h2>
          <button
            type="button"
            className="cl__drawer-close"
            onClick={() => setFilterOpen(false)}
            aria-label="Close filters"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </header>

        <div className="cl__drawer-body">
          <div className="cl__group">
            <h3>Category</h3>
            <div className="cl__chips">
              {clothingCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cl__chip ${
                    activeCategory === cat ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="cl__group">
            <h3>Size</h3>
            <div className="cl__chips">
              {clothingSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`cl__chip ${
                    activeSizes.includes(size) ? "is-active" : ""
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="cl__group">
            <h3>Color</h3>
            <div className="cl__chips">
              {clothingColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`cl__chip ${
                    activeColors.includes(color) ? "is-active" : ""
                  }`}
                  onClick={() => toggleColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="cl__group">
            <h3>
              Price
              <span className="cl__group-value">
                {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
              </span>
            </h3>

            <div className="cl__price">
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="100"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(Number(e.target.value), priceRange[1] - 100),
                    priceRange[1],
                  ])
                }
                aria-label="Minimum price"
              />
              <input
                type="range"
                min="0"
                max={MAX_PRICE}
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0] + 100),
                  ])
                }
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>

      </aside>

    </>
  );
};

const ClothingProductCard = ({
  product,
  index,
  wishlisted,
  onToggleWishlist,
  onAddToBag,
}) => {
  return (
    <article className="cl-card" style={{ "--i": index % 8 }}>
      <div className="cl-card__media">
        <Link
          to={`/product/${product.id}`}
          className="cl-card__link"
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            className="cl-card__img cl-card__img--primary"
            loading="lazy"
            decoding="async"
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden="true"
              className="cl-card__img cl-card__img--hover"
              loading="lazy"
              decoding="async"
            />
          )}
        </Link>

        {product.badge && (
          <span className="cl-card__badge">{product.badge}</span>
        )}

        <button
          type="button"
          className={`cl-card__wish ${wishlisted ? "is-active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
        >
          <Heart
            size={15}
            strokeWidth={1.8}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          className="cl-card__bag"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToBag(product);
          }}
          aria-label={`Add ${product.name} to bag`}
        >
          <ShoppingBag size={14} strokeWidth={1.8} />
          <span>Add to Bag</span>
        </button>
      </div>

      <div className="cl-card__info">
        <span className="cl-card__cat">{product.category}</span>

        <h3 className="cl-card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <span className="cl-card__price">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
};

export default ClothingPage;