import { GraphQLScalarType, Kind } from "graphql";

function isDate(value: any): value is Date {
  return value instanceof Date;
}

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "Date time, ISO-8601 (probably)",
  serialize(value) {
    if (!isDate(value)) {
      throw new Error(
        `Could not serialize value to GraphQL DateTime; expected Date object, received type ${typeof value} with value ${value}`
      );
    }

    return value.toISOString();
  },
  parseValue(value) {
    if (typeof value !== "string") {
      throw new Error(
        `Could not parse value to GraphQL Datetime; expected ISO-8601 date string, received type ${typeof value} with value ${value}`
      );
    }

    return new Date(value);
  },
  parseLiteral(node) {
    if (node.kind !== Kind.STRING) {
      return null;
    }

    return new Date(node.value);
  },
});
