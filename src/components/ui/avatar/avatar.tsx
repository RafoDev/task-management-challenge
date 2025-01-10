import { useState } from "react";
import styles from "./avatar.module.scss";
import User from "/src/assets/images/user-placeholder.png";

type Size = "s" | "m" | "l";

const styleMapping: Record<Size, string> = {
  s: styles["container-s"],
  m: styles["container-m"],
  l: styles["container-l"],
};

type AvatarProps = {
  avatar?: string;
  fullName: string;
  size?: Size;
};
export const Avatar = ({ avatar, fullName, size = "s" }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <figure className={`${styles.container} ${styleMapping[size]}`}>
      {!hasError && avatar ? (
        <img
          src={avatar}
          alt={fullName}
          className={styles.img}
          onError={handleImageError}
        />
      ) : (
        <img src={User} alt={fullName} className={styles.img} />
      )}
    </figure>
  );
};
