import { createContext, useContext } from "react";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "Dropdown components must be used within a Dropdown provider"
    );
  }
  return context;
};
