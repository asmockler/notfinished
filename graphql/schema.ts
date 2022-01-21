import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    users: [User!]!
  }

  type User {
    id: Int!
    name: String
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    name: String
    time: DateTime
    duration: Int!
    complete: Boolean!
  }

  input UserCreateInput {
    email: String!
    name: String
  }

  input TaskCreateInput {
    userId: Int!
    name: String!
  }

  input TaskUpdateInput {
    taskId: Int!
    time: DateTime
  }

  type Mutation {
    taskCreate(input: TaskCreateInput!): Task
    taskUpdate(input: TaskUpdateInput!): Task
    userCreate(input: UserCreateInput!): User
  }
`;
