import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./apollo/client";
import { Toaster } from "sonner";
import { ProfileProvider } from "../features/navigation/searchbar/components/profile/context/profile-context";

export const AppProvider = ({ children }: { children: ReactNode }) => (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ProfileProvider>{children}</ProfileProvider>
        <Toaster />
      </ApolloProvider>
    </BrowserRouter>
);
