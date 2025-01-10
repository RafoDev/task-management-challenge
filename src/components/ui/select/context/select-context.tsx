import { createContext } from "react";
import { SelectContextType } from "../types";

export const SelectContext = createContext<SelectContextType | undefined>(
  undefined
);
