import { ApolloServerPlugin } from "apollo-server-plugin-base";

export function logOperationName(): ApolloServerPlugin {
  return {
    async requestDidStart() {
      return {
        async didResolveOperation(context) {
          console.log(`📨 Executing query: ${context.operationName}`);
        },
      };
    },
  };
}
