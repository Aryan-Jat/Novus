import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./BrandStatement.css";

const BrandStatement = () => {
  return (
    <section className="brand">
      <div className="brand__wrap">
        <header className="brand__head">
          <span className="brand__label">
            <span className="brand__dot" aria-hidden="true" />
            The Novus Philosophy
          </span>
          <span className="brand__meta">— Vol. 04</span>
        </header>

        <div className="brand__body">
          <h2 className="brand__heading">
            <span>Modern silhouettes,</span>
            <em>timeless confidence.</em>
          </h2>

          <div className="brand__aside">
            <p className="brand__copy">
              Designed with intention — created for the way you live.
            </p>

            <a href="#" className="brand__cta">
              <span>Discover Novus</span>
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;