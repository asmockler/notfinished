import { gql } from "apollo-server-micro";
import prisma from "../prisma/runtime";

export const TaskCreateTypes = gql`
  input TaskCreateInput {
    userId: Int!
    name: String!
  }

  extend type Mutation {
    taskCreate(input: TaskCreateInput!): Task
  }
`;

export const TaskCreateResolver = async (_: any, { input }: any) => {
  const { name, userId } = input;

  return await prisma.task.create({
    data: {
      userId,
      name,
    },
  });
};
