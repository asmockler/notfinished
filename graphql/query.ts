import { gql } from "apollo-server-micro";
import prisma from "../prisma/runtime";

export const QueryTypes = gql`
  type Query {
    users: [User!]!
  }
`;

export const QueryResolver = {
  users: async () => {
    const users = await prisma.user.findMany();

    return users;
  },
};
