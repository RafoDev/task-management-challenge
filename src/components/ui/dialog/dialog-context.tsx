import { createContext, useContext } from "react";

type DialogContextValue = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const DialogContext = createContext<DialogContextValue | undefined>(
  undefined
);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};
