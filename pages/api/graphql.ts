import cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig, NextApiHandler } from "next";
import prisma from "../../prisma/runtime";
import { typeDefs } from "../../graphql/schema";
import { DateTime } from "../../graphql/scalars";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    DateTime,
    Query: {
      users: async () => {
        const users = await prisma.user.findMany();

        return users;
      },
    },
    Mutation: {
      taskCreate: async (_, { input }) => {
        const { name, userId } = input;

        return await prisma.task.create({
          data: {
            userId,
            name,
          },
        });
      },
      taskUpdate: async (_, { input }) => {
        const task = await prisma.task.update({
          where: { id: input.taskId },
          data: {
            time: input.time,
          },
        });

        return task;
      },
      userCreate: async (_, { input }) => {
        const { email, name } = input;
        const user = await prisma.user.create({
          data: {
            email,
            name,
          },
        });

        return user;
      },
    },
    User: {
      tasks: async (parent) => {
        const tasks = await prisma.task.findMany({
          where: {
            userId: parent.id,
          },
        });

        return tasks;
      },
    },
  },
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
