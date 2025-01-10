import { memo } from "react";
import styles from "./select-options.module.scss";

export const SelectOptions = memo(
  ({ children }: { children: React.ReactNode }) => (
    <div className={`${styles.options} animate__animated animate__fadeIn`}>
      {children}
    </div>
  )
);
