import { useContext } from "react";
import { SelectContext } from "../context/select-context";

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select component");
  }
  return context;
};
