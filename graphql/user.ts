import { gql } from "apollo-server-micro";
import { UserResolvers } from "./types";

export const UserTypes = gql`
  type User {
    id: Int!
    name: String
    email: String!
    tasks: [Task!]!
  }
`;

export const UserResolver: UserResolvers = {
  tasks: async (user, _, { db }) => {
    const tasks = await db.task.findMany({
      where: {
        userId: user.id,
      },
    });

    return tasks;
  },
};
