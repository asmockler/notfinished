import { gql } from "apollo-server-micro";
import { QueryResolvers } from "./types";

export const QueryTypes = gql`
  type Query {
    users: [User!]!
  }
`;

export const QueryResolver: QueryResolvers = {
  users: async (_, __, { db }) => {
    const users = await db.user.findMany();

    return users;
  },
};
