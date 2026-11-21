import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  const STORAGE_KEY = "novus-bag";
  
  const BagContext = createContext(null);
  
  export const parsePrice = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const cleaned = String(value ?? "").replace(/[^\d.]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };
  
  export const formatPrice = (value) =>
    `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;
  
  const buildKey = (product, size, color) =>
    [product?.id ?? "", size || "", color || ""].join("::");
  
  const sanitizeItem = (raw) => {
    if (!raw || typeof raw !== "object") return null;
    if (raw.id === undefined || raw.name === undefined) return null;
  
    const price = parsePrice(raw.price);
    const quantity = Math.max(1, Math.floor(Number(raw.quantity) || 1));
  
    return {
      key: raw.key || buildKey(raw, raw.size, raw.color),
      id: raw.id,
      name: raw.name,
      category: raw.category || "",
      image: raw.image || "",
      hoverImage: raw.hoverImage || null,
      price,
      size: raw.size || null,
      color: raw.color || null,
      quantity,
    };
  };
  
  const readBag = () => {
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
  
  export const BagProvider = ({ children }) => {
    const [items, setItems] = useState(readBag);
  
    useEffect(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        void 0;
      }
    }, [items]);
  
    const addToBag = useCallback((product, options = {}) => {
      if (!product) return;
  
      const size = options.size || null;
      const color = options.color || null;
      const quantity = Math.max(1, Math.floor(Number(options.quantity) || 1));
      const key = buildKey(product, size, color);
  
      setItems((prev) => {
        const index = prev.findIndex((item) => item.key === key);
  
        if (index !== -1) {
          const next = prev.slice();
          next[index] = {
            ...next[index],
            quantity: next[index].quantity + quantity,
          };
          return next;
        }
  
        return [
          ...prev,
          {
            key,
            id: product.id,
            name: product.name,
            category: product.category || "",
            image: product.image || "",
            hoverImage: product.hoverImage || null,
            price: parsePrice(product.price),
            size,
            color,
            quantity,
          },
        ];
      });
    }, []);
  
    const removeFromBag = useCallback((key) => {
      setItems((prev) => prev.filter((item) => item.key !== key));
    }, []);
  
    const updateQuantity = useCallback((key, quantity) => {
      const q = Math.max(1, Math.floor(Number(quantity) || 1));
      setItems((prev) =>
        prev.map((item) => (item.key === key ? { ...item, quantity: q } : item))
      );
    }, []);
  
    const incrementQuantity = useCallback((key) => {
      setItems((prev) =>
        prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }, []);
  
    const decrementQuantity = useCallback((key) => {
      setItems((prev) =>
        prev.map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
      );
    }, []);
  
    const clearBag = useCallback(() => setItems([]), []);
  
    const totalCount = useMemo(
      () => items.reduce((sum, item) => sum + item.quantity, 0),
      [items]
    );
  
    const subtotal = useMemo(
      () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      [items]
    );
  
    const value = useMemo(
      () => ({
        items,
        totalCount,
        subtotal,
        addToBag,
        removeFromBag,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearBag,
      }),
      [
        items,
        totalCount,
        subtotal,
        addToBag,
        removeFromBag,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearBag,
      ]
    );
  
    return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
  };
  
  export const useBag = () => {
    const ctx = useContext(BagContext);
    if (!ctx) {
      throw new Error("useBag must be used inside a BagProvider");
    }
    return ctx;
  };