import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Password reset requested for:", trimmedEmail);

    setSuccessMessage(
      `If an account exists for ${trimmedEmail}, a password reset link has been sent.`
    );

    // Add your password-reset API request here.
  };

  return (
    <main className="forgot-page">
      <section className="forgot-wrapper">
        {/* ---------------- Left: Brand panel (desktop only) ---------------- */}
        <div className="forgot-brand-panel">
          <div className="forgot-brand-logo">
            <div className="forgot-logo-symbol">
              <span>N</span>
            </div>
            <span className="forgot-brand-name">NOVUS</span>
          </div>

          <div className="forgot-brand-content">
            <p className="forgot-eyebrow">ACCOUNT RECOVERY</p>
            <h1>
              Your style,
              <br />
              still within reach.
            </h1>
            <p>
              Enter the email connected to your Novus account. We will send you
              a secure link to reset your password.
            </p>
          </div>

          <div className="forgot-brand-footer">
            <span>Secure access.</span>
            <span>Effortless style.</span>
          </div>
        </div>

        {/* ---------------- Right: Form panel ---------------- */}
        <div className="forgot-form-panel">
          {/* Mobile-only brand — top-left corner */}
          <div className="forgot-mobile-brand">
            <div className="forgot-brand-logo">
              <div className="forgot-logo-symbol">
                <span>N</span>
              </div>
              <span className="forgot-brand-name">NOVUS</span>
            </div>
          </div>

          <div className="forgot-form-content">
            <p className="forgot-form-eyebrow">RESET PASSWORD</p>
            <h2>Forgot password?</h2>
            <p className="forgot-form-description">
              No problem. Enter your email address and we will send you a link
              to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="forgot-input-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={error ? "forgot-input-error" : ""}
                />
                {error && (
                  <span className="forgot-error-message">{error}</span>
                )}
              </div>

              {successMessage && (
                <div className="forgot-success-box" role="status">
                  <span className="forgot-success-icon">✓</span>
                  <p>{successMessage}</p>
                </div>
              )}

              <button type="submit" className="forgot-submit-button">
                <span>Send reset link</span>
                <span className="forgot-button-arrow">→</span>
              </button>
            </form>

            <div className="forgot-help-box">
              <span className="forgot-help-icon">?</span>
              <p>
                Remember your password?{" "}
                <Link to="/login" className="forgot-login-link">
                  Back to sign in
                </Link>
              </p>
            </div>

            <p className="forgot-register-text">
              New to Novus?{" "}
              <Link to="/register" className="forgot-register-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;