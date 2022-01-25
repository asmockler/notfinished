import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const TaskUpdateTypes = gql`
  input TaskUpdateInput {
    taskId: Int!
    time: DateTime
    complete: Boolean
    duration: Int
  }

  extend type Mutation {
    taskUpdate(input: TaskUpdateInput!): Task
  }
`;

type ObjectWithNulls<T> = {
  [K in keyof T]: T[K];
};

type ObjectWithoutNulls<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

function filterNulls<T>(obj: ObjectWithNulls<T>): ObjectWithoutNulls<T> {
  const filteredObject: any = {};

  for (const key in obj) {
    if (obj[key] != null) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
}

export const TaskUpdateResolver: MutationResolvers["taskUpdate"] = async (
  _,
  { input },
  { db }
) => {
  const task = await db.task.update({
    where: { id: input.taskId },
    data: filterNulls({
      time: input.time,
      complete: input.complete,
      duration: input.duration,
    }),
  });

  return task;
};
