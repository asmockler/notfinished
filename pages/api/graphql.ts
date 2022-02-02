import cors from "micro-cors";
import { getSession } from "next-auth/react";
import { PageConfig, NextApiHandler } from "next";
import { createApolloServer } from "../../graphql";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  const session = await getSession({ req });
  const apolloServer = await createApolloServer(session);

  await apolloServer.start();
  const apolloServerHandler = await apolloServer.createHandler({
    path: "/api/graphql",
  });

  await apolloServerHandler(req, res);
};

export default cors()(handler as any);
