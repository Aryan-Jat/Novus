import React from "react";
import { X } from "lucide-react";
import "./ProductFilter.css";

const ProductFilter = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onClear,
  onApply,
}) => {
  const toggleArrayValue = (key, value) => {
    const currentValues = filters[key];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onChange({
      ...filters,
      [key]: updatedValues,
    });
  };

  const handleCategory = (category) => {
    onChange({
      ...filters,
      category,
    });
  };

  const handlePrice = (price) => {
    onChange({
      ...filters,
      price,
    });
  };

  return (
    <>
      <div
        className={`product-filter-overlay ${
          isOpen ? "product-filter-overlay--open" : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`product-filter ${
          isOpen ? "product-filter--open" : ""
        }`}
        aria-hidden={!isOpen}
      >
        <div className="product-filter__header">
          <h2>FILTERS</h2>

          <button
            type="button"
            className="product-filter__close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="product-filter__body">
          <section className="product-filter__group">
            <h3>CATEGORY</h3>

            {["DRESSES", "TOPS", "BOTTOMS", "ACCESSORIES"].map(
              (category) => (
                <label key={category}>
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category}
                    onChange={() => handleCategory(category)}
                  />
                  <span>
                    {category.charAt(0) +
                      category.slice(1).toLowerCase()}
                  </span>
                </label>
              )
            )}
          </section>

          <section className="product-filter__group">
            <h3>PRICE</h3>

            {[
              {
                value: "under-1500",
                label: "Under ₹1,500",
              },
              {
                value: "1500-2500",
                label: "₹1,500 – ₹2,500",
              },
              {
                value: "2500-4000",
                label: "₹2,500 – ₹4,000",
              },
              {
                value: "above-4000",
                label: "Above ₹4,000",
              },
            ].map((price) => (
              <label key={price.value}>
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === price.value}
                  onChange={() => handlePrice(price.value)}
                />
                <span>{price.label}</span>
              </label>
            ))}
          </section>

          <section className="product-filter__group">
            <h3>SIZE</h3>

            {["XS", "S", "M", "L", "XL"].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleArrayValue("sizes", size)}
                />
                <span>{size}</span>
              </label>
            ))}
          </section>

          <section className="product-filter__group">
            <h3>COLOR</h3>

            {["Black", "White", "Beige", "Rose"].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => toggleArrayValue("colors", color)}
                />
                <span>{color}</span>
              </label>
            ))}
          </section>
        </div>

        <div className="product-filter__footer">
          <button
            type="button"
            className="product-filter__clear"
            onClick={onClear}
          >
            CLEAR ALL
          </button>

          <button
            type="button"
            className="product-filter__apply"
            onClick={onApply}
          >
            APPLY
          </button>
        </div>
      </aside>
    </>
  );
};

export default ProductFilter;