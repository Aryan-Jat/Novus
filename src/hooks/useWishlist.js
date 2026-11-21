import { useContext } from "react";
import WishlistContext from "../context/WishlistContextValue";

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }

  return ctx;
};      