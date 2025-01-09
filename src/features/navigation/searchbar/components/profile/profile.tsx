import { Avatar } from "../../../../../components/ui";
import { useProfile } from "./context/profile-context";

export const Profile = () => {
  const { profile, isLoading } = useProfile();

  return (
    <Avatar
      id={profile?.id || ""}
      fullName={profile?.fullName || ""}
      avatar={profile?.avatar}
      size="m"
    />
  );
};
