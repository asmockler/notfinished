import cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig, NextApiHandler } from "next";
import { typeDefs, resolvers } from "../../graphql";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

let apolloServerHandler: NextApiHandler;
async function getApolloServerHandler() {
  if (apolloServerHandler == null) {
    await apolloServer.start();
    apolloServerHandler = await apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const apolloHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await apolloHandler(req, res);
};

export default cors()(handler as any);
