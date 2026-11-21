import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setEmail("");
  };

  return (
    <section className="nl">
      <div className="nl__wrap">
        <header className="nl__head">
          <span className="nl__label">
            <span className="nl__dot" aria-hidden="true" />
            Stay in the Novus circle
          </span>
          <span className="nl__meta">— Once a month</span>
        </header>

        <div className="nl__body">
          <div className="nl__lead">
            <h2 className="nl__title">
              <span>Discover what's</span>
              <em>next.</em>
            </h2>

            <p className="nl__copy">
              New arrivals, curated collections, and quiet updates — sent
              once a month. No noise.
            </p>
          </div>

          <form className="nl__form" onSubmit={handleSubmit}>
            <label className="nl__field">
              <span className="nl__field-label">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                required
              />
            </label>

            <button type="submit" className="nl__submit">
              <span>Subscribe</span>
              <span className="nl__submit-icon" aria-hidden="true">
                <ArrowRight size={14} strokeWidth={1.8} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;