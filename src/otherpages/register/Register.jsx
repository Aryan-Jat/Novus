import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please create a password.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Please accept the terms to continue.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("New account data:", {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    setSuccessMessage("Your Novus account has been created successfully.");

    // Replace this with your registration API call.
    setTimeout(() => {
      navigate("/login");
    }, 1600);
  };

  return (
    <main className="register-page">
      <section className="register-wrapper">
        <div className="register-brand-panel">
          <div className="register-brand-logo">
            <div className="register-logo-symbol">
              <span>N</span>
            </div>

            <span className="register-brand-name">NOVUS</span>
          </div>

          <div className="register-brand-content">
            <p className="register-eyebrow">JOIN NOVUS</p>

            <h1>
              A wardrobe
              <br />
              made for you.
            </h1>

            <p>
              Create your account to save your favorite pieces, manage orders,
              and enjoy a more personal Novus shopping experience.
            </p>
          </div>

          <div className="register-brand-footer">
            <span>Modern classics.</span>
            <span>Made to last.</span>
          </div>
        </div>

        <div className="register-form-panel">
          <div className="register-mobile-brand">
            <div className="register-brand-logo">
              <div className="register-logo-symbol">
                <span>N</span>
              </div>

              <span className="register-brand-name">NOVUS</span>
            </div>
          </div>

          <div className="register-form-content">
            <p className="register-form-eyebrow">CREATE ACCOUNT</p>

            <h2>Join Novus</h2>

            <p className="register-form-description">
              Enter your details to begin your Novus experience.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="register-input-group">
                <label htmlFor="fullName">Full name</label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  className={errors.fullName ? "register-input-error" : ""}
                />

                {errors.fullName && (
                  <span className="register-error-message">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={errors.email ? "register-input-error" : ""}
                />

                {errors.email && (
                  <span className="register-error-message">{errors.email}</span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="password">Create password</label>

                <div className="register-password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={errors.password ? "register-input-error" : ""}
                  />

                  <button
                    type="button"
                    className="register-show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.password && (
                  <span className="register-error-message">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="confirmPassword">Confirm password</label>

                <div className="register-password-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className={
                      errors.confirmPassword ? "register-input-error" : ""
                    }
                  />

                  <button
                    type="button"
                    className="register-show-password"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <span className="register-error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <label className="register-terms-row">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />

                <span className="register-custom-checkbox"></span>

                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="register-terms-link">
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              {errors.termsAccepted && (
                <span className="register-error-message register-terms-error">
                  {errors.termsAccepted}
                </span>
              )}

              {successMessage && (
                <p className="register-success-message">{successMessage}</p>
              )}

              <button type="submit" className="register-submit-button">
                <span>Create account</span>
                <span className="register-button-arrow">→</span>
              </button>
            </form>

            <div className="register-divider">
              <span>or sign up with</span>
            </div>

            <div className="register-social-login">
              <button type="button" className="register-social-button">
                <span className="register-google-icon">G</span>
                Google
              </button>

              <button type="button" className="register-social-button">
                <span className="register-apple-icon">●</span>
                Apple
              </button>
            </div>

            <p className="register-login-text">
              Already have an account?{" "}
              <Link to="/login" className="register-login-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;