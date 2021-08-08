import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers";
import { schema } from "./schema/index";

import { addResolversToSchema } from "@graphql-tools/schema";

const runServer = () => {
  const prisma = new PrismaClient();

  const apolloConfig = {
    schema: addResolversToSchema({ schema, resolvers }),
    context: () => {
      return {
        prisma,
      };
    },
  };

  const server = new ApolloServer(apolloConfig);

  const port = 4000;
  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();
