import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const TaskCreateTypes = gql`
  input TaskCreateInput {
    userId: Int!
    name: String!
  }

  extend type Mutation {
    taskCreate(input: TaskCreateInput!): Task
  }
`;

export const TaskCreateResolver: MutationResolvers["taskCreate"] = async (
  _,
  { input },
  { db }
) => {
  const { name, userId } = input;

  return await db.task.create({
    data: {
      userId,
      name,
    },
  });
};
