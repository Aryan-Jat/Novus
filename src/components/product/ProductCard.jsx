import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlist";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!product) {
    return null;
  }

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <Link
          to={`/product/${product.id}`}
          className="product-card__link"
          aria-label={product.name}
        >
          <img
            className="product-card__image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </Link>

        <div className="product-card__top">
          <span className="product-card__category-label">
            {product.category || "NOVUS"}
          </span>

          <button
            type="button"
            className={`product-card__wishlist ${
              wishlisted ? "is-active" : ""
            }`}
            onClick={handleWishlist}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={wishlisted}
          >
            <Heart
              size={18}
              strokeWidth={1.35}
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-card__view"
          aria-label={`View ${product.name}`}
        >
          <span>View Product</span>
          <ArrowUpRight size={16} strokeWidth={1.3} />
        </Link>
      </div>

      <div className="product-card__info">
        <div>
          <h3 className="product-card__name">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <p className="product-card__category">
            {product.category || "Essential Collection"}
          </p>
        </div>

        <p className="product-card__price">{product.price}</p>
      </div>
    </article>
  );
}