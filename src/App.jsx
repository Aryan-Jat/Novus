
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Home Components
import Hero from "./components/common/hero/Hero";
import FeaturedCategories from "./components/common/categories/FeaturedCategories";
import NewArrivals from "./components/product/NewArrivals";
import EditorialSection from "./components/common/editorial/EditorialSection";
import BestSellers from "./components/product/BestSellers";
import PromotionBanner from "./components/common/promotion/PromotionBanner";
import Newsletter from "./components/common/newsletter/Newsletter";
import BrandStatement from "./components/common/brand/BrandStatement";

// Pages
import Shop from "./pages/Shop/Shop";
import Category from "./pages/Category/Category";

// Navigation Pages
import NewArrivalPage from "./components/common/navlinks/newarrivalpage/NewArrivalPage";
import ClothingPage from "./components/common/navlinks/clothing/ClothingPage";
import Collections from "./components/common/navlinks/collection/Collection";
import Bag from "./components/common/navlinks/bag/Bag";
import Wishlist from "./components/common/navlinks/wishlist/Wishlist";
import Checkout from "./components/common/navlinks/checkout/Checkout";

// Authentication
import Login from "./otherpages/login/Login";
import Register from "./otherpages/register/Register";
import ForgotPassword from "./otherpages/forgot_password/ForgotPassword";

// Other Pages
import About from "./components/common/about/About";
import Contact from "./components/common/contact/Contact";

// Context
import { BagProvider } from "./context/BagContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./App.css";

// HOME PAGE
const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />
      <FeaturedCategories />
      <NewArrivals />
      <EditorialSection />
      <BestSellers />
      <PromotionBanner />

      <div className="brand-newsletter">
        <BrandStatement />
        <Newsletter />
      </div>

      <Footer />
    </>
  );
};

// COMMON PAGE LAYOUT
const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

// APP
const App = () => {
  return (
    <WishlistProvider>
      <BagProvider>
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* SHOP */}
          <Route
            path="/shop"
            element={
              <PageLayout>
                <Shop />
              </PageLayout>
            }
          />

          {/* NEW ARRIVALS */}
          <Route
            path="/new"
            element={
              <PageLayout>
                <NewArrivalPage />
              </PageLayout>
            }
          />

          {/* ALL COLLECTIONS */}
          <Route
            path="/collection"
            element={
              <PageLayout>
                <Collections />
              </PageLayout>
            }
          />

          {/* CATEGORY COLLECTIONS */}
          <Route
            path="/collections/:category"
            element={
              <PageLayout>
                <Category />
              </PageLayout>
            }
          />

          {/* CLOTHING */}
          <Route
            path="/clothing"
            element={
              <PageLayout>
                <ClothingPage />
              </PageLayout>
            }
          />

          {/* AUTHENTICATION */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />

          {/* BAG & WISHLIST */}
          <Route path="/bag" element={<Bag />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* ABOUT & CONTACT */}
          <Route
            path="/about"
            element={
              <PageLayout>
                <About />
              </PageLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <PageLayout>
                <Contact />
              </PageLayout>
            }
          />

          {/* CHECKOUT */}
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </BagProvider>
    </WishlistProvider>
  );
};

export default App;
