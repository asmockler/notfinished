import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const TaskDeleteTypes = gql`
  input TaskDeleteInput {
    taskId: Int!
  }

  extend type Mutation {
    taskDelete(input: TaskDeleteInput!): Boolean
  }
`;

export const TaskDeleteResolver: MutationResolvers["taskDelete"] = async (
  _,
  { input },
  { db }
) => {
  try {
    await db.task.delete({
      where: { id: input.taskId },
    });

    return true;
  } catch (error) {
    return false;
  }
};
