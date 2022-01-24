import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const TaskUpdateTypes = gql`
  input TaskUpdateInput {
    taskId: Int!
    time: DateTime
    complete: Boolean
  }

  extend type Mutation {
    taskUpdate(input: TaskUpdateInput!): Task
  }
`;

export const TaskUpdateResolver: MutationResolvers["taskUpdate"] = async (
  _,
  { input },
  { db }
) => {
  const task = await db.task.update({
    where: { id: input.taskId },
    data: {
      time: input.time,
      complete:
        typeof input.complete === "boolean" ? input.complete : undefined,
    },
  });

  return task;
};
