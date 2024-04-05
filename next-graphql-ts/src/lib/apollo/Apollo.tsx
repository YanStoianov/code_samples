import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "./client";
import { getCookie } from "cookies-next";
import { userConstants } from "@/store/user/constants";

interface Props {
  children: ReactNode;
}

const Apollo = ({ children }: Props) => {
  const authToken = getCookie(userConstants.ACCESS_TOKEN);
  const apolloClient = getApolloClient({ token: authToken });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default Apollo;
