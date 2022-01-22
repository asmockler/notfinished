import { gql } from "apollo-server-micro";
import { TaskResolvers } from "./types";

export const TaskTypes = gql`
  type Task {
    id: Int!
    name: String
    time: DateTime
    duration: Int!
    complete: Boolean!
  }
`;

export const TaskResolver: TaskResolvers = {};
