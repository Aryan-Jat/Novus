import React from "react";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "./ProductCard";
import products from "../../data/products";
import "./BestSellers.css";

const BestSellers = () => {
  const bestSellerProducts = products.slice(0, 4);

  return (
    <section className="best-sellers" aria-labelledby="best-sellers-title">
      <div className="best-sellers__header">
        <p className="best-sellers__eyebrow">NOVUS COLLECTION</p>

        <h2 id="best-sellers-title">BEST SELLERS</h2>

        <p className="best-sellers__description">
          The pieces our customers love most.
        </p>
      </div>

      <div className="best-sellers__grid">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="best-sellers__footer">
        <a href="#" className="best-sellers__view-all">
          <span>View All</span>
          <ArrowUpRight size={16} strokeWidth={1.4} />
        </a>
      </div>
    </section>
  );
};

export default BestSellers;