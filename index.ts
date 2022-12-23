import { ApolloServer } from "apollo-server";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

import { resolvers, typeDefs } from "./src/graphql";
import { Context, context } from "./src/graphql/modules/context";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  formatError: (error) => {
    // if (error.message.startsWith("usuario existente")) {
    //   return new Error(error.message);
    // }
    return error;
  },
  context
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at: http://localhost:4000`)
);