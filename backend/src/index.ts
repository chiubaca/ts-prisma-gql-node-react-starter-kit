import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers";
import { schema } from "./schema/index";

const runServer = () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer({
    resolvers,
    schema,
    context: () => {
      return {
        prisma,
      };
    },
  });

  const port = 4000;
  server.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

runServer();
