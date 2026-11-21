import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  const STORAGE_KEY = "novus-wishlist";
  
  const WishlistContext = createContext(null);
  
  const sanitizeItem = (raw) => {
    if (!raw || typeof raw !== "object") return null;
    if (raw.id === undefined || raw.name === undefined) return null;
  
    return {
      id: raw.id,
      name: raw.name,
      category: raw.category || "",
      image: raw.image || "",
      hoverImage: raw.hoverImage || null,
      price: raw.price,
    };
  };
  
  const readWishlist = () => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(sanitizeItem).filter(Boolean);
    } catch {
      return [];
    }
  };
  
  export const WishlistProvider = ({ children }) => {
    const [items, setItems] = useState(readWishlist);
  
    useEffect(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        void 0;
      }
    }, [items]);
  
    const addToWishlist = useCallback((product) => {
      if (!product) return;
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            category: product.category || "",
            image: product.image || "",
            hoverImage: product.hoverImage || null,
            price: product.price,
          },
        ];
      });
    }, []);
  
    const removeFromWishlist = useCallback((id) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);
  
    const toggleWishlist = useCallback((product) => {
      if (!product) return;
      setItems((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          return prev.filter((item) => item.id !== product.id);
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            category: product.category || "",
            image: product.image || "",
            hoverImage: product.hoverImage || null,
            price: product.price,
          },
        ];
      });
    }, []);
  
    const clearWishlist = useCallback(() => setItems([]), []);
  
    const isWishlisted = useCallback(
      (id) => items.some((item) => item.id === id),
      [items]
    );
  
    const totalCount = items.length;
  
    const value = useMemo(
      () => ({
        items,
        totalCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isWishlisted,
      }),
      [
        items,
        totalCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isWishlisted,
      ]
    );
  
    return (
      <WishlistContext.Provider value={value}>
        {children}
      </WishlistContext.Provider>
    );
  };
  
  export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) {
      throw new Error("useWishlist must be used inside a WishlistProvider");
    }
    return ctx;
  };