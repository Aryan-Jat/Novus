import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "./NewProductCard.css";

const NewProductCard = ({ product, index = 0 }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article
      className="ncard"
      data-reveal
      style={{ "--i": index % 4 }}
    >
      <div className="ncard__media">
        <Link
          to={`/product/${product.id}`}
          className="ncard__link"
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={product.name}
            className="ncard__img ncard__img--primary"
            loading="lazy"
            decoding="async"
          />

          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden="true"
              className="ncard__img ncard__img--hover"
              loading="lazy"
              decoding="async"
            />
          )}
        </Link>

        {product.badge && (
          <span className="ncard__badge">{product.badge}</span>
        )}

        <button
          type="button"
          className={`ncard__wish ${wishlisted ? "is-active" : ""}`}
          onClick={() => setWishlisted((v) => !v)}
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
      </div>

      <div className="ncard__info">
        <span className="ncard__cat">{product.category}</span>

        <h3 className="ncard__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <span className="ncard__price">{product.price}</span>
      </div>
    </article>
  );
};

export default NewProductCard;