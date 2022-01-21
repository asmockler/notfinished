import { gql } from "apollo-server-micro";

export const TaskTypes = gql`
  type Task {
    id: Int!
    name: String
    time: DateTime
    duration: Int!
    complete: Boolean!
  }
`;

export const TaskResolver = {};
