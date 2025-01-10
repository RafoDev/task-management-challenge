import {
  cloneElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
  useEffect,
} from "react";
import styles from "./dropdown.module.scss";
import { DropdownContext, useDropdownContext } from "./dropdown-context";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);
  const openDropdown = () => setIsOpen(true);

  return { isOpen, closeDropdown, openDropdown, setIsOpen };
};

type DropdownProps = {
  children: ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={styles.container} ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

type TriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

const DropdownTrigger = ({ children, asChild }: TriggerProps) => {
  const { isOpen, setIsOpen } = useDropdownContext();

  if (asChild) {
    return cloneElement(children as ReactElement, {
      onClick: () => setIsOpen(!isOpen),
    });
  }

  return (
    <button
      className={styles.trigger}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {children}
    </button>
  );
};

type ContentProps = {
  children: ReactNode;
  className?: string;
};

const DropdownContent = ({ children, className }: ContentProps) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) return null;

  return <ul className={`${styles.options} ${className || ""}`}>{children}</ul>;
};

type ItemProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const DropdownItem = ({ children, onClick, className }: ItemProps) => {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  return (
    <li className={`${styles.option} ${className || ""}`} onClick={handleClick}>
      {children}
    </li>
  );
};

Dropdown.displayName = "Dropdown";
Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;

export default Dropdown;
