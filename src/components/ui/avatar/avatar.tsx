import { User } from "../../../types";
import styles from "./avatar.module.scss";

type Size = "s" | "m";
type AvatarType = Pick<User, "id" | "fullName" | "avatar"> & {
  size?: Size;
};

const styleMapping: Record<Size, string> = {
  s: styles["container-s"],
  m: styles["container-m"],
};

const placeholder = "/src/assets/images/user-placeholder.png";

export const Avatar = ({ avatar, fullName, size = "s" }: AvatarType) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholder;
  };

  return (
    <figure className={`${styles.container} ${styleMapping[size]}`}>
      <img
        src={avatar || placeholder}
        alt={fullName}
        className={styles.img}
        onError={handleImageError}
      />
    </figure>
  );
};
