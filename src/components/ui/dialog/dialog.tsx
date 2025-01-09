import {
  cloneElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./dialog.module.scss";
import { DialogContext, useDialogContext } from "./dialog-context";

const modalRoot = document.getElementById("modal-root");

export const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  return { isDialogOpen, closeDialog, openDialog };
};

type DialogProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: ReactNode;
};

const Dialog = ({ open, onOpen, onClose, children }: DialogProps) => {
  return (
    <DialogContext.Provider
      value={{
        isOpen: open,
        onOpen,
        onClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

type DialogTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

const DialogTrigger = ({ children, asChild }: DialogTriggerProps) => {
  const { onOpen } = useDialogContext();

  if (asChild) {
    return cloneElement(children as ReactElement, {
      onClick: onOpen,
    });
  }

  return (
    <button type="button" onClick={onOpen}>
      {children}
    </button>
  );
};

type ContentProps = {
  children: ReactNode;
  className?: string;
};

const DialogContent = ({ children, className }: ContentProps) => {
  const { isOpen, onClose } = useDialogContext();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.dialog} ${className} animate__animated animate__zoomIn animate__faster`} ref={dialogRef}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Dialog.displayName = "Dialog";
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;

export default Dialog;
