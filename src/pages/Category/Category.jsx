import React from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import products from "../../data/products";
import "./Category.css";

const categoryData = {
  dresses: {
    name: "DRESSES",
    description:
      "Effortless silhouettes designed for every occasion.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1800&q=90",
  },
  tops: {
    name: "TOPS",
    description:
      "Refined essentials for everyday dressing.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1800&q=90",
  },
  bottoms: {
    name: "BOTTOMS",
    description:
      "Tailored pieces designed for effortless styling.",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1800&q=90",
  },
  accessories: {
    name: "ACCESSORIES",
    description:
      "Finishing touches that complete the Novus look.",
    image:
      "https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1800&q=90",
  },
};

const categories = [
  {
    label: "ALL",
    path: "/shop",
  },
  {
    label: "DRESSES",
    path: "/category/dresses",
  },
  {
    label: "TOPS",
    path: "/category/tops",
  },
  {
    label: "BOTTOMS",
    path: "/category/bottoms",
  },
  {
    label: "ACCESSORIES",
    path: "/category/accessories",
  },
];

export default function Category() {
  const { category } = useParams();

  const currentCategory = categoryData[category?.toLowerCase()];

  if (!currentCategory) {
    return (
      <main className="category-page">
        <div className="category-page__not-found">
          <p>COLLECTION</p>
          <h1>COLLECTION NOT FOUND</h1>
          <Link to="/shop">BACK TO SHOP</Link>
        </div>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() ===
      currentCategory.name.toLowerCase()
  );

  return (
    <main className="category-page">
      <div className="category-page__container">
        <nav
          className="category-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{currentCategory.name}</span>
        </nav>

        <header className="category-header">
          <p className="category-header__eyebrow">
            NOVUS COLLECTION
          </p>

          <h1 className="category-header__title">
            {currentCategory.name}
          </h1>

          <p className="category-header__description">
            {currentCategory.description}
          </p>
        </header>

        <section className="category-hero">
          <img
            src={currentCategory.image}
            alt={`${currentCategory.name.toLowerCase()} collection`}
          />

          <div className="category-hero__overlay" />

          <div className="category-hero__content">
            <p>THE NOVUS EDIT</p>
            <h2>{currentCategory.name}</h2>
          </div>
        </section>

        <nav
          className="category-navigation"
          aria-label="Collection navigation"
        >
          {categories.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={
                item.label === currentCategory.name
                  ? "is-active"
                  : ""
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="category-products-header">
          <p>
            {categoryProducts.length} PRODUCTS
          </p>
        </div>

        <section
          className="category-products"
          aria-label={`${currentCategory.name} products`}
        >
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="category-empty">
              <h2>NO PRODUCTS FOUND</h2>
              <p>
                There are currently no products in this
                collection.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}