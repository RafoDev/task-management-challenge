import { useState } from "react";
import { Option, OptionType } from "./components/option/option";
import styles from "./sidebar.module.scss";
import DashboardIcon from "/src/assets/icons/dashboard.svg?react";
import TaskIcon from "/src/assets/icons/list.svg?react";
import RavnLogo from "/src/assets/images/ravn.png";

const options: OptionType[] = [
  { icon: DashboardIcon, label: "DASHBOARD", to: "/" },
  { icon: TaskIcon, label: "MY TASKS", to: "/list" },
];

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <aside
      className={`${styles.container} ${
        showSidebar ? styles.containerShow : ""
      }`}
    >
      <figure className={styles.logoContainer}>
        <img src={RavnLogo} alt={"Ravn Logo"} className={styles.logo} />
      </figure>
      <nav className={styles.optionList}>
        {options.map((option) => (
          <Option key={option.label} {...option} />
        ))}
      </nav>
      <button
        className={styles.toggleButton}
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
      >
        <span className={styles.toggleButtonContent}>+</span>
      </button>
    </aside>
  );
};
