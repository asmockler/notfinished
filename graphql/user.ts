import { gql } from "apollo-server-micro";
import prisma from "../prisma/runtime";

export const UserTypes = gql`
  type User {
    id: Int!
    name: String
    tasks: [Task!]!
  }
`;

export const UserResolver = {
  tasks: async (parent: any) => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: parent.id,
      },
    });

    return tasks;
  },
};
