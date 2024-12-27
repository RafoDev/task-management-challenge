import { User } from "../../../types";
import styles from "./avatar.module.scss";

type AvatarType = Pick<User, "id" | "fullName" | "avatar">;

const placeholder = "/src/assets/images/user-placeholder.png";

export const Avatar = ({ avatar, fullName }: AvatarType) => {
  
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = placeholder;
  };

  return (
    <figure className={styles.container}>
      <img
        src={avatar || placeholder}
        alt={fullName}
        className={styles.img}
        onError={handleImageError}
      />
    </figure>
  );
};
