import { createContext, ReactNode, useContext } from "react";
import { GetProfileQuery, useGetProfileQuery } from "../getProfile.generated";

interface ProfileContextType {
  profile: GetProfileQuery["profile"] | null;
  isLoading: boolean;
  error?: Error;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data, loading: isLoading, error } = useGetProfileQuery();

  const value = {
    profile: data?.profile || null,
    isLoading,
    error: error as Error | undefined,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
