import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [shakeKey, setShakeKey] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShakeKey((k) => k + 1);
      return;
    }

    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
      setMessage("Login successful!");
    }, 1200);
  };

  return (
    <main className="login-page">
      <section className="login-wrapper">
        <div className="login-brand-panel">
          <svg
            className="brand-svg"
            viewBox="0 0 500 800"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="bgGlow" cx="20%" cy="25%" r="80%">
                <stop offset="0%" stopColor="#2a3a7a" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#111d51" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#111d51" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <rect width="500" height="800" fill="url(#bgGlow)" />

            <g
              className="brand-svg__rings"
              transform="translate(370 620)"
              fill="none"
              stroke="url(#ringGrad)"
            >
              <circle r="220" strokeWidth="1" />
              <circle r="170" strokeWidth="1" />
              <circle r="120" strokeWidth="1" />
              <circle r="70" strokeWidth="1" />
            </g>

            <g className="brand-svg__waves" fill="none">
              <path
                d="M -40 260 C 120 200, 260 320, 420 240 S 620 160, 720 240"
                stroke="url(#waveGrad)"
                strokeWidth="1.4"
              />
              <path
                d="M -40 320 C 140 260, 280 380, 440 300 S 640 220, 740 300"
                stroke="url(#waveGrad)"
                strokeWidth="1"
              />
              <path
                d="M -40 380 C 160 320, 300 440, 460 360 S 660 280, 760 360"
                stroke="url(#waveGrad)"
                strokeWidth="0.8"
              />
            </g>

            <g className="brand-svg__dots" fill="#ffffff">
              <circle cx="120" cy="140" r="2.2" opacity="0.55" />
              <circle cx="240" cy="90" r="1.8" opacity="0.4" />
              <circle cx="420" cy="180" r="2.6" opacity="0.6" />
              <circle cx="360" cy="320" r="1.6" opacity="0.35" />
              <circle cx="180" cy="420" r="2" opacity="0.5" />
              <circle cx="80" cy="560" r="2.4" opacity="0.55" />
              <circle cx="440" cy="500" r="1.8" opacity="0.4" />
            </g>
          </svg>

          <div className="brand-logo">
            <div className="brand-logo-symbol">
              <svg viewBox="0 0 46 46" aria-hidden="true">
                <circle
                  cx="23"
                  cy="23"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="brand-logo-ring"
                />
                <path
                  d="M23 4 C 30 8, 34 14, 34 23 C 34 32, 30 38, 23 42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="brand-logo-arc"
                />
                <text
                  x="23"
                  y="30"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize="20"
                  fontWeight="600"
                  fill="currentColor"
                  className="brand-logo-letter"
                >
                  N
                </text>
              </svg>
            </div>
            <span className="brand-name">NOVUS</span>
          </div>

          <div className="brand-content">
            <p className="brand-eyebrow">WELCOME BACK</p>
            <h1 className="brand-headline">
              <span className="brand-headline__line">
                <span>Timeless style</span>
              </span>
              <span className="brand-headline__line">
                <span>starts here.</span>
              </span>
            </h1>
            <p className="brand-paragraph">
              Sign in to continue your Novus experience and discover refined
              pieces made for everyday elegance.
            </p>
          </div>

          <div className="brand-footer">
            <span>Refined essentials.</span>
            <span>Effortless style.</span>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="mobile-brand">
            <div className="brand-logo">
              <div className="brand-logo-symbol">
                <svg viewBox="0 0 46 46" aria-hidden="true">
                  <circle
                    cx="23"
                    cy="23"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="brand-logo-ring"
                  />
                  <path
                    d="M23 4 C 30 8, 34 14, 34 23 C 34 32, 30 38, 23 42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="brand-logo-arc"
                  />
                  <text
                    x="23"
                    y="30"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontSize="20"
                    fontWeight="600"
                    fill="currentColor"
                    className="brand-logo-letter"
                  >
                    N
                  </text>
                </svg>
              </div>
              <span className="brand-name">NOVUS</span>
            </div>
          </div>

          <div className="login-form-content">
            <p className="form-eyebrow">ACCOUNT LOGIN</p>
            <h2>Welcome back</h2>
            <p className="form-description">
              Enter your details to access your account.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              key={shakeKey}
              className={shakeKey > 0 ? "form--shake" : ""}
            >
              <div className="input-group input-group--1">
                <label htmlFor="email">Email address</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className={errors.email ? "input-error" : ""}
                  />
                  <span className="input-underline" aria-hidden="true" />
                </div>
                {errors.email && (
                  <span className="error-message">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M8 4 V9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="11.5" r="0.9" fill="currentColor" />
                    </svg>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="input-group input-group--2">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot_password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>

                <div className="input-wrapper">
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      className={errors.password ? "input-error" : ""}
                    />
                    <button
                      type="button"
                      className="show-password-button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <span className="input-underline" aria-hidden="true" />
                </div>

                {errors.password && (
                  <span className="error-message">
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M8 4 V9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="11.5" r="0.9" fill="currentColor" />
                    </svg>
                    {errors.password}
                  </span>
                )}
              </div>

              <label className="remember-row input-group--3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span className="custom-checkbox" />
                <span>Remember me</span>
              </label>

              {status === "success" && message && (
                <p className="success-message">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="success-check"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="success-check__ring"
                    />
                    <path
                      d="M7 12.5 L10.5 16 L17 8.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="success-check__tick"
                    />
                  </svg>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className={`login-button login-button--${status}`}
                disabled={status === "loading"}
              >
                <span className="login-button__label">
                  {status === "loading" ? "Signing in" : "Sign in"}
                </span>

                {status === "loading" ? (
                  <span className="login-button__spinner" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        opacity="0.25"
                      />
                      <path
                        d="M21 12 A 9 9 0 0 0 12 3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : status === "success" ? (
                  <span className="login-button__check" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M5 12.5 L10 17.5 L19 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="button-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M4 12 H20"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 6 L20 12 L14 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </form>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button">
                <span className="google-icon">G</span>
                Google
              </button>
              <button type="button" className="social-button">
                <span className="apple-icon">●</span>
                Apple
              </button>
            </div>

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="signup-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;