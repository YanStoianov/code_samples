import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";
import { CookieValueTypes, getCookie } from "cookies-next";
import { userConstants } from "@/store/user/constants";
import cacheOptions from "./cacheOptions";

interface ApolloClientProps {
  token?: CookieValueTypes;
}

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_APOLLO_URI, includeExtensions: true });
const authToken = getCookie(userConstants.ACCESS_TOKEN);

const authMiddleware = ({ token }: ApolloClientProps) => {
  return new ApolloLink((operation, forward) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operation.setContext(({ headers }: Record<string, any>) => {
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "Bearer guest",
          ...headers,
        },
      };
    });
    return forward(operation).map((response) => {
      if (response.data) {
        response.data.extensions = response.extensions;
      }
      return response;
    });
  });
};

const client = new ApolloClient({
  ssrMode: true,
  link: concat(authMiddleware({ token: authToken }), httpLink),
  cache: new InMemoryCache(cacheOptions),
});

export const getApolloClient = ({ token }: ApolloClientProps) => {
  return new ApolloClient({
    ssrMode: true,
    link: concat(authMiddleware({ token }), httpLink),
    cache: new InMemoryCache(cacheOptions),
  });
};

export default client;
