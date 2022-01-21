import { gql } from "apollo-server-micro";
import prisma from "../prisma/runtime";

export const TaskUpdateTypes = gql`
  input TaskUpdateInput {
    taskId: Int!
    time: DateTime
  }

  extend type Mutation {
    taskUpdate(input: TaskUpdateInput!): Task
  }
`;

export const TaskUpdateResolver = async (_: any, { input }: any) => {
  const task = await prisma.task.update({
    where: { id: input.taskId },
    data: {
      time: input.time,
    },
  });

  return task;
};
