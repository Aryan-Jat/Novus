import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "../../components/product/ProductCard";
import products from "../../data/products";
import ProductFilter from "../../components/product/ProductFilter";
import ProductSort from "../../components/product/ProductSort";
import "./Shop.css";

const categories = ["ALL", "DRESSES", "TOPS", "BOTTOMS", "ACCESSORIES"];

const INITIAL_VISIBLE_COUNT = 8;

const initialFilters = {
  category: "ALL",
  price: "",
  sizes: [],
  colors: [],
};

const getPrice = (product) =>
  Number(String(product.price).replace(/[₹,]/g, ""));

export default function Shop() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [sortOption, setSortOption] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        appliedFilters.category !== "ALL" &&
        product.category !== appliedFilters.category
      ) {
        return false;
      }

      const price = getPrice(product);

      if (appliedFilters.price === "under-1500" && price >= 1500) {
        return false;
      }

      if (
        appliedFilters.price === "1500-2500" &&
        (price < 1500 || price > 2500)
      ) {
        return false;
      }

      if (
        appliedFilters.price === "2500-4000" &&
        (price < 2500 || price > 4000)
      ) {
        return false;
      }

      if (appliedFilters.price === "above-4000" && price <= 4000) {
        return false;
      }

      if (appliedFilters.sizes.length > 0) {
        const productSizes = product.sizes || [];
        const hasSize = appliedFilters.sizes.some((size) =>
          productSizes.includes(size)
        );
        if (!hasSize) return false;
      }

      if (appliedFilters.colors.length > 0) {
        const productColors = product.colors || [];
        const hasColor = appliedFilters.colors.some((color) =>
          productColors.includes(color)
        );
        if (!hasColor) return false;
      }

      return true;
    });
  }, [appliedFilters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortOption === "price-low") {
      sorted.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sortOption === "price-high") {
      sorted.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (sortOption === "best-selling") {
      sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));
    }

    return sorted;
  }, [filteredProducts, sortOption]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    const updatedFilters = { ...filters, category };
    setFilters(updatedFilters);
    setAppliedFilters(updatedFilters);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setSortOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + INITIAL_VISIBLE_COUNT, sortedProducts.length)
    );
  };

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [filteredProducts.length]);

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
        setFilterOpen(false);
        setSortOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeFilterCount =
    (appliedFilters.category !== "ALL" ? 1 : 0) +
    (appliedFilters.price ? 1 : 0) +
    appliedFilters.sizes.length +
    appliedFilters.colors.length;

  const hasMore = visibleCount < sortedProducts.length;

  return (
    <main className="shop">
      <section className="shop__hero">
        <div className="shop__wrap">
          <nav className="shop__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Shop</span>
          </nav>

          <div className="shop__hero-grid">
            <div className="shop__hero-text">
              <span className="shop__eyebrow">The Full Catalogue</span>

              <h1 className="shop__title">
                <span>Every piece,</span>
                <em>one place.</em>
              </h1>
            </div>

            <p className="shop__intro">
              Browse the complete Novus wardrobe — dresses, tops, bottoms and
              outerwear. Filter, sort and find the pieces that fit your
              everyday.
            </p>
          </div>
        </div>
      </section>

      <nav className="shop__cats" aria-label="Product categories">
        <div className="shop__wrap shop__cats-inner">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filters.category === category}
              className={`shop__cat ${
                filters.category === category ? "is-active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      <section className="shop__catalog">
        <div className="shop__wrap">
          <header className="shop__toolbar">
            <span className="shop__count">
              <strong>{sortedProducts.length}</strong>{" "}
              <span>
                {sortedProducts.length === 1 ? "product" : "products"}
              </span>
            </span>

            <div className="shop__toolbar-actions">
              <button
                type="button"
                className={`shop__tool ${filterOpen ? "is-active" : ""}`}
                onClick={() => setFilterOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={filterOpen}
              >
                <SlidersHorizontal size={15} strokeWidth={1.8} />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="shop__tool-badge">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={`shop__tool ${sortOpen ? "is-active" : ""}`}
                onClick={() => setSortOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <span className="shop__tool-label">Sort:</span>
                <span className="shop__tool-value">
                  {sortOption === "recommended"
                    ? "Recommended"
                    : sortOption === "price-low"
                    ? "Price ↑"
                    : sortOption === "price-high"
                    ? "Price ↓"
                    : sortOption === "newest"
                    ? "Newest"
                    : "Best Selling"}
                </span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.8}
                  className={`shop__tool-chev ${sortOpen ? "is-open" : ""}`}
                />
              </button>
            </div>
          </header>

          {sortOpen && (
            <div className="shop__sort">
              <ProductSort value={sortOption} onChange={handleSortChange} />
            </div>
          )}

          {visibleProducts.length > 0 ? (
            <div className="shop__grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop__empty">
              <span className="shop__empty-eyebrow">No results</span>

              <h2 className="shop__empty-title">
                <span>Nothing here</span>
                <em>just yet.</em>
              </h2>

              <p className="shop__empty-copy">
                We couldn&apos;t find anything matching your selected filters.
                Try adjusting or clearing them.
              </p>

              <button
                type="button"
                className="shop__empty-btn"
                onClick={handleClearFilters}
              >
                <span>Clear Filters</span>
                <span className="shop__empty-btn-icon" aria-hidden="true">
                  <X size={14} strokeWidth={1.8} />
                </span>
              </button>
            </div>
          )}

          {sortedProducts.length > 0 && (
            <div className="shop__load">
              <p className="shop__load-count">
                Showing <strong>{visibleProducts.length}</strong> of{" "}
                <strong>{sortedProducts.length}</strong>
              </p>

              {hasMore && (
                <button
                  type="button"
                  className="shop__load-btn"
                  onClick={handleLoadMore}
                >
                  <span>Load More</span>
                  <span className="shop__load-icon" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <ProductFilter
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
      />
    </main>
  );
}