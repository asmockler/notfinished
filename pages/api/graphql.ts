import cors from "micro-cors";
import { PageConfig, NextApiHandler } from "next";
import { apolloServer } from "../../graphql";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

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
