import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiTimeLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiSendPlaneLine,
  RiCheckLine,
  RiAddLine,
  RiSubtractLine,
  RiInstagramLine,
  RiTwitterLine,
  RiFacebookLine,
} from "@remixicon/react";

import "./Contact.css";

/* =========================================================
   DATA
========================================================= */
const contactCards = [
  {
    icon: RiMailLine,
    label: "Email",
    value: "hello@novus.studio",
    href: "mailto:hello@novus.studio",
    note: "We reply within 24 hours",
  },
  {
    icon: RiPhoneLine,
    label: "Phone",
    value: "+45 32 12 88 40",
    href: "tel:+4532128840",
    note: "Mon–Fri · 9am–6pm CET",
  },
  {
    icon: RiMapPinLine,
    label: "Studio",
    value: "Bredgade 42, Copenhagen",
    href: "#map",
    note: "By appointment only",
  },
  {
    icon: RiTimeLine,
    label: "Hours",
    value: "Mon–Sat · 10am–7pm",
    href: "#hours",
    note: "Closed Sundays",
  },
];

const subjects = [
  "General enquiry",
  "Order support",
  "Returns & exchanges",
  "Wholesale",
  "Press & collaborations",
  "Careers",
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard delivery arrives within 3–5 business days across the EU and 5–8 days internationally. Express options are available at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "You have 30 days from delivery to return any unworn piece with original tags. Returns are free within the EU.",
  },
  {
    q: "Do you offer repairs?",
    a: "Yes. Our repair-and-renew programme extends the life of every NOVUS piece, free of charge for the first two years.",
  },
  {
    q: "How do I care for natural fabrics?",
    a: "Linen and cotton prefer a cool wash and air-drying. Merino and cashmere should be hand-washed or dry-cleaned and stored folded.",
  },
  {
    q: "Can I book a styling appointment?",
    a: "Absolutely. Our Copenhagen studio offers private appointments Tuesday through Saturday.",
  },
];

const stores = [
  { city: "Copenhagen", address: "Bredgade 42, 1260 København", role: "Flagship" },
  { city: "Porto", address: "Rua de Cedofeita 118, 4050-174", role: "Production" },
  { city: "Milan", address: "Via della Spiga 21, 20121", role: "Showroom" },
];

/* =========================================================
   COMPONENT
========================================================= */
const Contact = () => {
  const rootRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0);

  /* -------- reveal on scroll -------- */
  useEffect(() => {
    setMounted(true);

    const nodes = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  /* -------- form helpers -------- */
  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "That email doesn't look right";
    if (!form.message.trim()) next.message = "Please write a message";
    else if (form.message.trim().length < 10)
      next.message = "At least 10 characters, please";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <main ref={rootRef} className={`contact ${mounted ? "is-mounted" : ""}`}>
      {/* =================================================
          HERO
      ================================================= */}
      <section className="contact__hero">
        <div className="contact__container">
          <p className="contact__eyebrow" data-reveal>
            Say Hello
          </p>
          <h1 className="contact__title" data-reveal style={{ "--i": 1 }}>
            Let's <em>talk</em>
          </h1>
          <p
            className="contact__intro"
            data-reveal
            style={{ "--i": 2 }}
          >
            Questions about a piece, an order, or a collaboration? Write to us
            — a real person reads every message, and we aim to reply within
            one working day.
          </p>
        </div>
      </section>

      {/* =================================================
          CONTACT CARDS
      ================================================= */}
      <section className="contact__cards">
        <div className="contact__container">
          <div className="contact__cards-grid">
            {contactCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  className="contact-card"
                  data-reveal
                  style={{ "--i": i }}
                >
                  <span className="contact-card__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span className="contact-card__label">{c.label}</span>
                  <span className="contact-card__value">{c.value}</span>
                  <span className="contact-card__note">{c.note}</span>
                  <RiArrowRightUpLine
                    size={15}
                    className="contact-card__arrow"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================
          FORM + SIDEBAR
      ================================================= */}
      <section className="contact__main">
        <div className="contact__container">
          <div className="contact__main-grid">
            {/* -------- Form -------- */}
            <div className="contact__form-wrap" data-reveal>
              <header className="contact__form-head">
                <h2 className="contact__section-title">
                  Send us a <em>message</em>
                </h2>
                <p className="contact__section-sub">
                  Fill in the form and we'll get back to you shortly.
                </p>
              </header>

              <form
                className={`contact-form ${status === "sent" ? "is-sent" : ""}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="form-row form-row--two">
                  <div
                    className={`form-field ${errors.name ? "has-error" : ""}`}
                  >
                    <label htmlFor="c-name">Name</label>
                    <input
                      id="c-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={update("name")}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span className="form-error">{errors.name}</span>
                    )}
                  </div>

                  <div
                    className={`form-field ${errors.email ? "has-error" : ""}`}
                  >
                    <label htmlFor="c-email">Email</label>
                    <input
                      id="c-email"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={update("email")}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span className="form-error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="c-subject">Subject</label>
                  <select
                    id="c-subject"
                    value={form.subject}
                    onChange={update("subject")}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className={`form-field ${errors.message ? "has-error" : ""}`}
                >
                  <label htmlFor="c-message">Message</label>
                  <textarea
                    id="c-message"
                    rows={6}
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={update("message")}
                  />
                  {errors.message && (
                    <span className="form-error">{errors.message}</span>
                  )}
                </div>

                <div className="contact-form__foot">
                  <p className="contact-form__privacy">
                    By submitting, you agree to our{" "}
                    <Link to="/privacy">privacy policy</Link>.
                  </p>

                  <button
                    type="submit"
                    className={`contact-form__submit ${
                      status === "sending" ? "is-sending" : ""
                    } ${status === "sent" ? "is-sent" : ""}`}
                    disabled={status !== "idle"}
                  >
                    {status === "idle" && (
                      <>
                        <span>Send message</span>
                        <RiSendPlaneLine size={16} />
                      </>
                    )}
                    {status === "sending" && (
                      <>
                        <span>Sending…</span>
                        <span
                          className="contact-form__spinner"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        <span>Message sent</span>
                        <RiCheckLine size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* -------- Sidebar -------- */}
            <aside className="contact__sidebar">
              <div className="sidebar-block" data-reveal>
                <h3 className="sidebar-title">Our studios</h3>
                <ul className="store-list">
                  {stores.map((s) => (
                    <li key={s.city} className="store-item">
                      <div className="store-item__head">
                        <span className="store-item__city">{s.city}</span>
                        <span className="store-item__role">{s.role}</span>
                      </div>
                      <span className="store-item__address">{s.address}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-block" data-reveal>
                <h3 className="sidebar-title">Follow along</h3>
                <div className="social-row">
                  <a
                    href="https://instagram.com"
                    className="social-btn"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RiInstagramLine size={18} />
                  </a>
                  <a
                    href="https://twitter.com"
                    className="social-btn"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RiTwitterLine size={18} />
                  </a>
                  <a
                    href="https://facebook.com"
                    className="social-btn"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RiFacebookLine size={18} />
                  </a>
                </div>
              </div>

              <div className="sidebar-cta" id="map" data-reveal>
                <span className="sidebar-cta__eyebrow">Visit us</span>
                <strong>Bredgade 42, Copenhagen</strong>
                <Link to="/about" className="sidebar-cta__link">
                  <span>Get directions</span>
                  <RiArrowRightLine size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =================================================
          FAQ
      ================================================= */}
      <section className="contact__faq">
        <div className="contact__container">
          <header className="contact__faq-head" data-reveal>
            <h2 className="contact__section-title contact__section-title--center">
              Frequently <em>asked</em>
            </h2>
            <p className="contact__section-sub">
              A few questions we hear most.
            </p>
          </header>

          <ul className="faq-list">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <li
                  key={f.q}
                  className={`faq-item ${isOpen ? "is-open" : ""}`}
                  data-reveal
                  style={{ "--i": i }}
                >
                  <button
                    type="button"
                    className="faq-item__head"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span className="faq-item__q">{f.q}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      {isOpen ? (
                        <RiSubtractLine size={16} />
                      ) : (
                        <RiAddLine size={16} />
                      )}
                    </span>
                  </button>

                  <div className="faq-item__body" aria-hidden={!isOpen}>
                    <p>{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* =================================================
          CLOSING
      ================================================= */}
      <section className="contact__closing">
        <div className="contact__container">
          <div className="contact__closing-inner" data-reveal>
            <h2 className="contact__closing-title">
              Discover the <em>collection.</em>
            </h2>
            <div className="contact__closing-actions">
              <Link to="/collections" className="contact__button">
                <span>Shop collections</span>
                <RiArrowRightLine size={16} />
              </Link>
              <Link to="/about" className="contact__link">
                <span>Read our story</span>
                <RiArrowRightUpLine size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;