// Based on https://github.com/prisma/prisma-examples/blob/b4eecec5ba0f42d634c333d4adebee9872f13131/typescript/rest-nextjs-api-routes-auth/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

function createClient() {
  return new PrismaClient(/*{ log: ["query", "info", "warn", "error"] }*/);
}

if (process.env.NODE_ENV === "production") {
  prisma = createClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = createClient();
  }
  prisma = (global as any).prisma;
}
export default prisma;
