import React from "react";
import { ChevronDown } from "lucide-react";
import "./ProductSort.css";

const ProductSort = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const options = [
    {
      value: "recommended",
      label: "Recommended",
    },
    {
      value: "newest",
      label: "Newest",
    },
    {
      value: "price-low",
      label: "Price: Low to High",
    },
    {
      value: "price-high",
      label: "Price: High to Low",
    },
    {
      value: "best-selling",
      label: "Best Selling",
    },
  ];

  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="product-sort">
      <button
        type="button"
        className="product-sort__trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span>SORT BY</span>

        <ChevronDown
          size={15}
          strokeWidth={1.4}
          className={isOpen ? "is-open" : ""}
        />
      </button>

      {isOpen && (
        <div className="product-sort__menu">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`product-sort__option ${
                selectedOption.value === option.value ? "is-active" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              <span className="product-sort__radio" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSort;