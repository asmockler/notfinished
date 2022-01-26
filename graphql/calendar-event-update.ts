import { gql } from "apollo-server-micro";
import { MutationResolvers } from "./types";

export const CalendarEventUpdateTypes = gql`
  input CalendarEventUpdateInput {
    calendarEventId: Int!
    time: DateTime
    name: String
    duration: Int
  }

  extend type Mutation {
    calendarEventUpdate(input: CalendarEventUpdateInput!): CalendarEvent
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
    if (obj[key] !== null) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
}

export const CalendarEventUpdateResolver: MutationResolvers["calendarEventUpdate"] =
  async (_, { input }, { db }) => {
    const calendarEvent = await db.calendarEvent.update({
      where: { id: input.calendarEventId },
      data: {
        time: input.time,
        ...filterNulls({
          name: input.name,
          duration: input.duration,
        }),
      },
    });

    return calendarEvent;
  };
