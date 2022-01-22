import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const UserCreateTypes = gql`
  input UserCreateInput {
    email: String!
    name: String
  }

  extend type Mutation {
    userCreate(input: UserCreateInput!): User
  }
`;

export const UserCreateResolver: MutationResolvers["userCreate"] = async (
  _,
  { input },
  { db }
) => {
  const { email, name } = input;
  const user = await db.user.create({
    data: {
      email,
      name,
    },
  });

  return user;
};
