import { Option, OptionType } from "./components/option/option";
import styles from "./sidebar.module.scss";
import DashboardIcon from "/src/assets/icons/dashboard.svg?react";
import TaskIcon from "/src/assets/icons/list.svg?react";
import RavnLogo from "/src/assets/images/ravn.png";

const options: OptionType[] = [
  { icon: DashboardIcon, label: "DASHBOARD", to: "" },
  { icon: TaskIcon, label: "MY TASKS", to: "" },
];

export const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <figure className={styles.logoContainer}>
        <img src={RavnLogo} alt={"Ravn Logo"} className={styles.logo} />
      </figure>
      <nav>
        <ul className={styles.optionList}>
          {options.map((option) => (
            <Option key={option.label} {...option} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};
