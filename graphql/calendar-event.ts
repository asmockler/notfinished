import { gql } from "apollo-server-micro";
import { CalendarEventResolvers } from "./types";

export const CalendarEventTypes = gql`
  type CalendarEvent {
    id: Int!
    name: String!
    time: DateTime!
    duration: Int!
  }
`;

export const CalendarEventResolver: CalendarEventResolvers = {};
