import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const CalendarEventCreateTypes = gql`
  input CalendarEventCreateInput {
    userId: Int!
    name: String!
    time: DateTime!
    duration: Int!
  }

  extend type Mutation {
    calendarEventCreate(input: CalendarEventCreateInput!): CalendarEvent
  }
`;

export const CalendarEventCreateResolver: MutationResolvers["calendarEventCreate"] =
  async (_, { input }, { db }) => {
    const { duration, name, time, userId } = input;

    return await db.calendarEvent.create({
      data: {
        duration,
        name,
        time,
        userId,
      },
    });
  };
