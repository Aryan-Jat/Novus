import React, { useState } from "react";
import { Heart } from "lucide-react";
import "./NewArrivals.css";
import { Link } from "react-router-dom";


const products = [
    {
        id: 1,
        name: "Satin Midi Dress",
        price: "₹2,499",
        image:
          "https://images.unsplash.com/photo-1731911656286-92bf1ebc87f3?q=80&w=774&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Silk Draped Blouse",
        price: "₹1,899",
        image:
          "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 3,
        name: "Tailored Midi Skirt",
        price: "₹2,199",
        image:
          "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 4,
        name: "Structured Blazer",
        price: "₹3,499",
        image:
          "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 5,
        name: "Linen Wrap Dress",
        price: "₹2,799",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 6,
        name: "Classic Knit Top",
        price: "₹1,499",
        image:
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 7,
        name: "Pleated Wide Leg Pants",
        price: "₹2,299",
        image:
          "https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 8,
        name: "Soft Cotton Shirt",
        price: "₹1,699",
        image:
          "https://images.unsplash.com/photo-1760551600788-46c6366557b8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 9,
        name: "Elegant Evening Dress",
        price: "₹3,299",
        image:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
      },
      {
        id: 10,
        name: "Relaxed Linen Trousers",
        price: "₹2,099",
        image:
          "https://plus.unsplash.com/premium_photo-1675034366383-1e48cce12b8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 11,
        name: "Minimal Slip Dress",
        price: "₹2,599",
        image:
          "https://images.unsplash.com/photo-1762154057377-cc9d3dd6900c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 12,
        name: "Cropped Wool Jacket",
        price: "₹3,799",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85",
      },
    ];

const NewArrivals = () => {
  return (
    <section className="new-arrivals">
      <div className="new-arrivals__header">
        <div>
          <p className="new-arrivals__eyebrow">
            NOVUS COLLECTION
          </p>

          <h2 className="new-arrivals__title">
            New Arrivals
          </h2>
        </div>

        <Link to="/new" className="new-arrivals__view-all">
  View All
</Link>
      </div>

      <div className="new-arrivals__grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const ProductItem = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <article className="new-product">
      <div className="new-product__image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />

        <button
          type="button"
          className={`new-product__wishlist ${
            isWishlisted ? "is-active" : ""
          }`}
          onClick={() => setIsWishlisted((current) => !current)}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
        >
          <Heart
            size={18}
            strokeWidth={1.4}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="new-product__info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </article>
  );
};

export default NewArrivals;