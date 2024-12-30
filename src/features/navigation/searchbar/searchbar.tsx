import SearchIcon from "/src/assets/icons/search.svg?react";
import NotificationIcon from "/src/assets/icons/notification.svg?react";
import CleanIcon from "/src/assets/icons/clean.svg?react";
import styles from "./searchbar.module.scss";
import { Profile } from "./components";
import { useState, useEffect, useRef } from "react";

export const SearchBar = () => {
  const [showInput, setShowInput] = useState(false);
  const [animateInput, setAnimateInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onShowInput = () => {
    inputRef?.current?.focus();
    if (showInput) {
      setTimeout(() => setShowInput(false), 250);
    } else {
      setShowInput(true);
      setAnimateInput(true);
    }
  };

  useEffect(() => {
    if (!showInput) setAnimateInput(false);
  }, [showInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    inputRef?.current?.focus();
    setInputValue("");
  };

  return (
    <nav className={styles.container}>
      <div className="profileContainer">
        <Profile />
      </div>
      <form
        className={`${styles.inputContainer} ${
          animateInput ? styles.inputContainerShow : ""
        }`}
      >
        <div
          className={styles.searchIconContainer}
          onClick={() => onShowInput()}
        >
          <SearchIcon className={styles.icon} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className={`${styles.input} body-m-regular ${
            animateInput ? styles.inputShow : ""
          }`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div
          className={`${styles.cleanIconContainer} ${
            inputValue.length > 0 && showInput
              ? styles.cleanIconContainerShow
              : ""
          }`}
          onClick={() => clearInput()}
        >
          <CleanIcon className={styles.icon} />
        </div>
      </form>

      <div className={styles.notificationIconContainer}>
        <NotificationIcon className={styles.icon} />
      </div>
    </nav>
  );
};
