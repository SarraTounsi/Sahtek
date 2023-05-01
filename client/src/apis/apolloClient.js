import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
const httpLink = createHttpLink({
  uri: "https://sah-tek-serv.onrender.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const persistRoot = JSON.parse(localStorage.getItem("persist:main-root"));
  // const { token } = JSON.parse(persistRoot.token);
  const data = JSON.parse(persistRoot.user);
  const token = data.token;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: httpLink.concat(
    authLink.concat(
      createUploadLink({
        uri: "https://sah-tek-serv.onrender.com/graphql",
      })
    )
  ),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default client;
