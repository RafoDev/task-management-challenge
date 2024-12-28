import { NavLink } from "react-router-dom";
import styles from "./option.module.scss";

export type OptionType = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  to: string;
};

export const Option = (props: OptionType) => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        isActive
          ? `${styles.container} ${styles.containerActive}`
          : `${styles.container}`
      }
    >
      <figure className={styles.iconContainer}>
        <props.icon className={styles.icon} />
      </figure>
      <span className={`body-m-bold ${styles.label}`}>{props.label}</span>
    </NavLink>
  );
};
