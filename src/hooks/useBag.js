import { useContext } from "react";
import BagContext from "../context/BagContextValue";

export const useBag = () => {
  const ctx = useContext(BagContext);

  if (!ctx) {
    throw new Error("useBag must be used inside a BagProvider");
  }

  return ctx;
};