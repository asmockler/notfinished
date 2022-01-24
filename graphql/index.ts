import { ApolloServer, gql } from "apollo-server-micro";
import type { PrismaClient, User } from "@prisma/client";
import type { Session } from "next-auth";
import prisma from "../prisma/runtime";

import { QueryResolver, QueryTypes } from "./query";
import { TaskCreateResolver, TaskCreateTypes } from "./task-create";
import { TaskDeleteResolver, TaskDeleteTypes } from "./task-delete";
import { TaskUpdateResolver, TaskUpdateTypes } from "./task-update";
import { TaskResolver, TaskTypes } from "./task";
import { UserCreateResolver, UserCreateTypes } from "./user-create";
import { UserResolver, UserTypes } from "./user";
import { DateTime } from "./scalars/date-time";

export interface ApolloContext {
  db: PrismaClient;
  currentUser: User | null;
}

const Mutation = gql`
  # Mutations are all defined by extending this type.
  # This declaration is here only to declare a base type to be extended.
  type Mutation
`;

export const typeDefs = [
  DateTime.typeDef,
  Mutation,
  QueryTypes,
  TaskCreateTypes,
  TaskDeleteTypes,
  TaskUpdateTypes,
  TaskTypes,
  UserCreateTypes,
  UserTypes,
];

export const resolvers = {
  DateTime: DateTime.implementation,
  Mutation: {
    taskCreate: TaskCreateResolver,
    taskDelete: TaskDeleteResolver,
    taskUpdate: TaskUpdateResolver,
    userCreate: UserCreateResolver,
  },
  Query: QueryResolver,
  Task: TaskResolver,
  User: UserResolver,
};

export const createApolloServer = async (session: Session | null) => {
  const currentUser =
    session?.user == null
      ? null
      : await prisma.user.findUnique({
          where: { email: session.user.email },
        });

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return { db: prisma, currentUser };
    },
  });
};
