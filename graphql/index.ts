import { ApolloServer, gql } from "apollo-server-micro";
import type { PrismaClient } from "@prisma/client";
import prisma from "../prisma/runtime";

import { QueryResolver, QueryTypes } from "./query";
import { TaskCreateResolver, TaskCreateTypes } from "./task-create";
import { TaskUpdateResolver, TaskUpdateTypes } from "./task-update";
import { TaskResolver, TaskTypes } from "./task";
import { UserCreateResolver, UserCreateTypes } from "./user-create";
import { UserResolver, UserTypes } from "./user";
import { DateTime } from "./scalars/date-time";

export interface ApolloContext {
  db: PrismaClient;
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
  TaskUpdateTypes,
  TaskTypes,
  UserCreateTypes,
  UserTypes,
];

export const resolvers = {
  DateTime: DateTime.implementation,
  Mutation: {
    taskCreate: TaskCreateResolver,
    taskUpdate: TaskUpdateResolver,
    userCreate: UserCreateResolver,
  },
  Query: QueryResolver,
  Task: TaskResolver,
  User: UserResolver,
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { db: prisma };
  },
});
