import { memo } from "react";
import { LabelProps } from "../../types";
import styles from "./label.module.scss";

export const Label = memo<LabelProps>(({ children }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} body-xl-bold`}>{children}</div>
    </div>
  );
});

Label.displayName = "Label";
