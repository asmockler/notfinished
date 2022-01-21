import { gql } from "apollo-server-micro";
import prisma from "../prisma/runtime";

export const UserCreateTypes = gql`
  input UserCreateInput {
    email: String!
    name: String
  }

  extend type Mutation {
    userCreate(input: UserCreateInput!): User
  }
`;

export const UserCreateResolver = async (_: any, { input }: any) => {
  const { email, name } = input;
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return user;
};
