import { Avatar } from "../../../../../components/ui";
import Dropdown from "../../../../../components/ui/dropdown/dropdown";
import { useProfile } from "./context/profile-context";
import PersonIcon from "/src/assets/icons/person.svg?react";
import SettingsIcon from "/src/assets/icons/settings.svg?react";
import styles from "./profile.module.scss";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { profile } = useProfile();

  const navigate = useNavigate();

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button className={styles.trigger}>
          <Avatar
            id={profile?.id || ""}
            fullName={profile?.fullName || ""}
            avatar={profile?.avatar}
            size="m"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item onClick={() => navigate("/my-profile")}>
          <PersonIcon className={styles.icon} />
          <span className={styles.label}>Profile</span>
        </Dropdown.Item>
        <Dropdown.Item>
          <SettingsIcon className={styles.icon} />
          <span className={styles.label}>Settings</span>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};
