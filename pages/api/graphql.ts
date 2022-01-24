import { ApolloServer } from "apollo-server-micro";
import cors from "micro-cors";
import { getSession } from "next-auth/react";
import { PageConfig, NextApiHandler } from "next";
import { createApolloServer } from "../../graphql";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

let apolloServerHandler: NextApiHandler;
async function getApolloServerHandler(apolloServer: ApolloServer) {
  if (apolloServerHandler == null) {
    await apolloServer.start();
    apolloServerHandler = await apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const apolloServer = await createApolloServer(session);

  const apolloHandler = await getApolloServerHandler(apolloServer);

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await apolloHandler(req, res);
};

export default cors()(handler as any);
