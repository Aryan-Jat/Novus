
export const parsePrice = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
  
    const cleaned = String(value ?? "").replace(/[^\d.]/g, "");
    const n = Number(cleaned);
  
    return Number.isFinite(n) ? n : 0;
  };
  
  export const formatPrice = (value) =>
    `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;
  