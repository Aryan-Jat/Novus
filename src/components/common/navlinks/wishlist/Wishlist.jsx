import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, X } from "lucide-react";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import ProductCard from "../../../product/ProductCard";
import products from "../../../../data/products";
import { useWishlist } from "../../../../hooks/useWishlist";
import { useBag } from "../../../../hooks/useBag";
import { formatPrice } from "../../../../utils/priceUtils";
import "./Wishlist.css";

export default function Wishlist() {
  const { items, totalCount, removeFromWishlist } = useWishlist();
  const { addToBag } = useBag();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const recommendations = useMemo(() => {
    if (!items.length) return [];
    const idsInWishlist = new Set(items.map((item) => item.id));
    return products.filter((p) => !idsInWishlist.has(p.id)).slice(0, 4);
  }, [items]);

  const hasItems = items.length > 0;

  const handleMoveToBag = (item) => {
    addToBag(item, { quantity: 1 });
    removeFromWishlist(item.id);
  };

  return (
    <>
      <Navbar />

      <main className="wl">
        <section className="wl__head">
          <div className="wl__wrap">
            <nav className="wl__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Wishlist</span>
            </nav>

            <div className="wl__head-row">
              <h1 className="wl__title">
                <span>Your</span>
                <em>Wishlist.</em>
              </h1>

              <span className="wl__count">
                <strong>{totalCount}</strong>{" "}
                <span>{totalCount === 1 ? "item" : "items"}</span>
              </span>
            </div>
          </div>
        </section>

        {hasItems ? (
          <section className="wl__body">
            <div className="wl__wrap">
              <div className="wl__grid">
                {items.map((item) => (
                  <article key={item.id} className="wl-item">
                    <div className="wl-item__media">
                      <Link
                        to={`/product/${item.id}`}
                        aria-label={item.name}
                        className="wl-item__link"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>

                      <button
                        type="button"
                        className="wl-item__remove"
                        onClick={() => removeFromWishlist(item.id)}
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <X size={15} strokeWidth={1.8} />
                      </button>
                    </div>

                    <div className="wl-item__info">
                      <span className="wl-item__cat">
                        {item.category || "Novus"}
                      </span>

                      <h3 className="wl-item__name">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>

                      {item.price !== undefined && item.price !== null && (
                        <span className="wl-item__price">
                          {typeof item.price === "number"
                            ? formatPrice(item.price)
                            : item.price}
                        </span>
                      )}

                      <button
                        type="button"
                        className="wl-item__move"
                        onClick={() => handleMoveToBag(item)}
                      >
                        <span>Move to Bag</span>
                        <span className="wl-item__move-icon" aria-hidden="true">
                          <ArrowRight size={13} strokeWidth={1.8} />
                        </span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="wl__empty">
            <div className="wl__wrap wl__empty-inner">
              <span className="wl__empty-icon" aria-hidden="true">
                <Heart size={22} strokeWidth={1.6} />
              </span>

              <span className="wl__empty-eyebrow">Nothing saved yet</span>

              <h2 className="wl__empty-title">
                <span>Your wishlist is</span>
                <em>empty.</em>
              </h2>

              <p className="wl__empty-copy">
                Tap the heart on any piece to save it here for later.
              </p>

              <Link to="/new" className="wl__empty-cta">
                <span>Explore New Arrivals</span>
                <span className="wl__empty-cta-icon" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {hasItems && recommendations.length > 0 && (
          <section className="wl__recs">
            <div className="wl__wrap">
              <header className="wl__recs-head">
                <span className="wl__recs-eyebrow">You may also like</span>

                <Link to="/new" className="wl__recs-link">
                  <span>View all</span>
                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              </header>

              <div className="wl__recs-grid">
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}