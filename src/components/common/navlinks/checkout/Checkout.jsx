import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import { formatPrice } from "../../../../utils/priceUtils";
import { useBag } from "../../../../hooks/useBag";

import "./Checkout.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  payment: "cod",
};

export default function Checkout() {
  const { items, subtotal, clearBag } = useBag();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!items.length && !orderId) {
      navigate("/bag", { replace: true });
    }
  }, [items.length, orderId, navigate]);

  const shipping = 0;
  const total = subtotal + shipping;

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Invalid email";
    if (!form.phone.trim()) next.phone = "Required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Enter 10 digits";
    if (!form.address.trim()) next.address = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.state.trim()) next.state = "Required";
    if (!form.pincode.trim()) next.pincode = "Required";
    else if (!/^\d{6}$/.test(form.pincode.replace(/\D/g, "")))
      next.pincode = "Enter 6 digits";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setPlacing(true);

    setTimeout(() => {
      const id = `NOVUS-${Date.now().toString().slice(-6)}`;
      setOrderId(id);
      setPlacing(false);
      clearBag();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  };

  if (orderId) {
    return (
      <>
        <Navbar />

        <main className="ck">
          <section className="ck__success">
            <div className="ck__wrap ck__success-inner">
              <span className="ck__success-icon" aria-hidden="true">
                <Check size={22} strokeWidth={2} />
              </span>

              <span className="ck__eyebrow">Order confirmed</span>

              <h1 className="ck__success-title">
                <span>Thank you for</span>
                <em>your order.</em>
              </h1>

              <p className="ck__success-copy">
                A confirmation has been sent to{" "}
                <strong>{form.email}</strong>. We&apos;ll notify you when your
                order ships.
              </p>

              <div className="ck__success-id">
                <span>Order ID</span>
                <strong>{orderId}</strong>
              </div>

              <div className="ck__success-actions">
                <Link to="/new" className="ck__cta">
                  <span>Continue Shopping</span>
                  <span className="ck__cta-icon" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </span>
                </Link>

                <Link to="/" className="ck__link">
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="ck">
        <section className="ck__head">
          <div className="ck__wrap">
            <nav className="ck__breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/bag">Bag</Link>
              <span aria-hidden="true">/</span>
              <span>Checkout</span>
            </nav>

            <div className="ck__head-row">
              <h1 className="ck__title">
                <span>Checkout.</span>
              </h1>

              <span className="ck__count">
                <strong>{itemCount}</strong>{" "}
                <span>{itemCount === 1 ? "item" : "items"}</span>
              </span>
            </div>
          </div>
        </section>

        <section className="ck__body">
          <div className="ck__wrap ck__grid">
            <form className="ck__form" onSubmit={handlePlaceOrder} noValidate>
              <fieldset className="ck__section">
                <legend className="ck__section-title">
                  <span className="ck__section-num">01</span>
                  <span>Contact</span>
                </legend>

                <div className="ck__fields">
                  <label className="ck__field ck__field--full">
                    <span className="ck__label">Full name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Astrid Holm"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && (
                      <span className="ck__error">{errors.name}</span>
                    )}
                  </label>

                  <label className="ck__field">
                    <span className="ck__label">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@email.com"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span className="ck__error">{errors.email}</span>
                    )}
                  </label>

                  <label className="ck__field">
                    <span className="ck__label">Phone</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="98765 43210"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && (
                      <span className="ck__error">{errors.phone}</span>
                    )}
                  </label>
                </div>
              </fieldset>

              <fieldset className="ck__section">
                <legend className="ck__section-title">
                  <span className="ck__section-num">02</span>
                  <span>Shipping Address</span>
                </legend>

                <div className="ck__fields">
                  <label className="ck__field ck__field--full">
                    <span className="ck__label">Address</span>
                    <input
                      type="text"
                      value={form.address}
                      onChange={update("address")}
                      placeholder="House / Flat / Street"
                      autoComplete="street-address"
                      aria-invalid={Boolean(errors.address)}
                    />
                    {errors.address && (
                      <span className="ck__error">{errors.address}</span>
                    )}
                  </label>

                  <label className="ck__field">
                    <span className="ck__label">City</span>
                    <input
                      type="text"
                      value={form.city}
                      onChange={update("city")}
                      placeholder="Mumbai"
                      autoComplete="address-level2"
                      aria-invalid={Boolean(errors.city)}
                    />
                    {errors.city && (
                      <span className="ck__error">{errors.city}</span>
                    )}
                  </label>

                  <label className="ck__field">
                    <span className="ck__label">State</span>
                    <input
                      type="text"
                      value={form.state}
                      onChange={update("state")}
                      placeholder="Maharashtra"
                      autoComplete="address-level1"
                      aria-invalid={Boolean(errors.state)}
                    />
                    {errors.state && (
                      <span className="ck__error">{errors.state}</span>
                    )}
                  </label>

                  <label className="ck__field">
                    <span className="ck__label">PIN code</span>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={update("pincode")}
                      placeholder="400001"
                      autoComplete="postal-code"
                      aria-invalid={Boolean(errors.pincode)}
                    />
                    {errors.pincode && (
                      <span className="ck__error">{errors.pincode}</span>
                    )}
                  </label>
                </div>
              </fieldset>

              <fieldset className="ck__section">
                <legend className="ck__section-title">
                  <span className="ck__section-num">03</span>
                  <span>Payment</span>
                </legend>

                <div className="ck__payments">
                  <label
                    className={`ck__payment ${
                      form.payment === "cod" ? "is-active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.payment === "cod"}
                      onChange={update("payment")}
                    />
                    <span className="ck__payment-body">
                      <span className="ck__payment-name">
                        Cash on Delivery
                      </span>
                      <span className="ck__payment-note">
                        Pay when your order arrives
                      </span>
                    </span>
                  </label>

                  <label
                    className={`ck__payment ${
                      form.payment === "card" ? "is-active" : ""
                    } ck__payment--disabled`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={form.payment === "card"}
                      onChange={update("payment")}
                      disabled
                    />
                    <span className="ck__payment-body">
                      <span className="ck__payment-name">Card</span>
                      <span className="ck__payment-note">
                        Coming soon
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
            </form>

            <aside className="ck__summary" aria-label="Order summary">
              <h2 className="ck__summary-title">Order Summary</h2>

              <ul className="ck__items">
                {items.map((item) => (
                  <li key={item.key} className="ck__item">
                    <div className="ck__item-media">
                      <img src={item.image} alt={item.name} loading="lazy" />
                      <span className="ck__item-qty">{item.quantity}</span>
                    </div>

                    <div className="ck__item-body">
                      <span className="ck__item-name">{item.name}</span>
                      <span className="ck__item-meta">
                        {[item.size, item.color]
                          .filter(Boolean)
                          .join(" · ") || item.category}
                      </span>
                    </div>

                    <span className="ck__item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="ck__totals">
                <div className="ck__totals-row">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>

                <div className="ck__totals-row">
                  <dt>Shipping</dt>
                  <dd className="ck__totals-muted">Free</dd>
                </div>

                <div className="ck__totals-row ck__totals-row--total">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="ck__place"
                onClick={handlePlaceOrder}
                disabled={placing}
              >
                <span>{placing ? "Placing Order…" : "Place Order"}</span>
                <span className="ck__place-icon" aria-hidden="true">
                  <ArrowRight size={15} strokeWidth={1.8} />
                </span>
              </button>

              <Link to="/bag" className="ck__back">
                <ArrowLeft size={14} strokeWidth={1.8} />
                <span>Back to Bag</span>
              </Link>

              <p className="ck__note">
                By placing this order you agree to our terms of service.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}