
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, X } from "lucide-react";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import ProductCard from "../../../product/ProductCard";
import products from "../../../../data/products";

import { useBag } from "../../../../hooks/useBag";
import { formatPrice } from "../../../../utils/priceUtils";

import "./Bag.css";

export default function Bag() {
  const {
    items,
    totalCount,
    subtotal,
    incrementQuantity,
    decrementQuantity,
    removeFromBag,
  } = useBag();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const recommendations = useMemo(() => {
    if (!items.length) return [];

    const idsInBag = new Set(items.map((item) => item.id));

    return products.filter((p) => !idsInBag.has(p.id)).slice(0, 4);
  }, [items]);

  const hasItems = items.length > 0;

  return (
    <>
      <Navbar />

      <main className="bag">
        <section className="bag__head">
          <div className="bag__wrap">
            <nav className="bag__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Bag</span>
            </nav>

            <div className="bag__head-row">
              <h1 className="bag__title">
                <span>Your</span>
                <em>Bag.</em>
              </h1>

              <span className="bag__count">
                <strong>{totalCount}</strong>{" "}
                <span>{totalCount === 1 ? "item" : "items"}</span>
              </span>
            </div>
          </div>
        </section>

        {hasItems ? (
          <section className="bag__body">
            <div className="bag__wrap bag__grid">
              <div className="bag__items">
                {items.map((item) => (
                  <article key={item.key} className="bag-item">
                    <Link
                      to={`/product/${item.id}`}
                      className="bag-item__media"
                      aria-label={item.name}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>

                    <div className="bag-item__info">
                      <div className="bag-item__head">
                        <div className="bag-item__title">
                          <span className="bag-item__cat">
                            {item.category || "Novus"}
                          </span>

                          <h3 className="bag-item__name">
                            <Link to={`/product/${item.id}`}>
                              {item.name}
                            </Link>
                          </h3>
                        </div>

                        <button
                          type="button"
                          className="bag-item__remove"
                          onClick={() => removeFromBag(item.key)}
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <X size={16} strokeWidth={1.8} />
                        </button>
                      </div>

                      <dl className="bag-item__meta">
                        {item.size && (
                          <div className="bag-item__meta-row">
                            <dt>Size</dt>
                            <dd>{item.size}</dd>
                          </div>
                        )}

                        {item.color && (
                          <div className="bag-item__meta-row">
                            <dt>Color</dt>
                            <dd>{item.color}</dd>
                          </div>
                        )}
                      </dl>

                      <div className="bag-item__foot">
                        <div
                          className="bag-item__qty"
                          role="group"
                          aria-label={`Quantity for ${item.name}`}
                        >
                          <button
                            type="button"
                            className="bag-item__qty-btn"
                            onClick={() => decrementQuantity(item.key)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus size={14} strokeWidth={1.8} />
                          </button>

                          <span className="bag-item__qty-value">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            className="bag-item__qty-btn"
                            onClick={() => incrementQuantity(item.key)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus size={14} strokeWidth={1.8} />
                          </button>
                        </div>

                        <span className="bag-item__price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}

                <Link to="/new" className="bag__continue">
                  <span className="bag__continue-arrow" aria-hidden="true">
                    ←
                  </span>
                  <span>Continue Shopping</span>
                </Link>
              </div>

              <aside className="bag__summary" aria-label="Order summary">
                <h2 className="bag__summary-title">Order Summary</h2>

                <dl className="bag__summary-list">
                  <div className="bag__summary-row">
                    <dt>Subtotal</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>

                  <div className="bag__summary-row">
                    <dt>Shipping</dt>
                    <dd className="bag__summary-muted">
                      Calculated at checkout
                    </dd>
                  </div>

                  <div className="bag__summary-row bag__summary-row--total">
                    <dt>Total</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                </dl>

                <Link to="/checkout" className="bag__checkout">
                  <span>Checkout</span>

                  <span className="bag__checkout-icon" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </Link>

                <p className="bag__summary-note">
                  Taxes and shipping calculated at checkout.
                </p>
              </aside>
            </div>
          </section>
        ) : (
          <section className="bag__empty">
            <div className="bag__wrap bag__empty-inner">
              <span className="bag__empty-eyebrow">
                Nothing here yet
              </span>

              <h2 className="bag__empty-title">
                <span>Your bag is</span>
                <em>empty.</em>
              </h2>

              <p className="bag__empty-copy">
                Looks like you haven&apos;t added anything yet. Explore the
                latest arrivals to begin.
              </p>

              <Link to="/new" className="bag__empty-cta">
                <span>Explore New Arrivals</span>

                <span className="bag__empty-cta-icon" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </section>
        )}

        {hasItems && recommendations.length > 0 && (
          <section className="bag__recs">
            <div className="bag__wrap">
              <header className="bag__recs-head">
                <span className="bag__recs-eyebrow">
                  You may also like
                </span>

                <Link to="/new" className="bag__recs-link">
                  <span>View all</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </header>

              <div className="bag__recs-grid">
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
