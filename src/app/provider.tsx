import { ReactNode} from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./apollo/client";

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ApolloProvider client={client}>{children}</ApolloProvider>
  </BrowserRouter>
);
