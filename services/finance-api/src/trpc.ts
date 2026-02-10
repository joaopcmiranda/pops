/**
 * tRPC initialization, context, and base procedures.
 * All tRPC routers extend from the procedures defined here.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { readFileSync } from "node:fs";

/** Lazy-loaded API key for authentication. */
let apiKey: string | null = null;

function getApiKey(): string {
  if (apiKey) return apiKey;

  const filePath = process.env["FINANCE_API_KEY_FILE"];
  if (filePath) {
    apiKey = readFileSync(filePath, "utf-8").trim();
    return apiKey;
  }

  const envKey = process.env["FINANCE_API_KEY"];
  if (envKey) {
    apiKey = envKey;
    return apiKey;
  }

  throw new Error("Missing FINANCE_API_KEY_FILE or FINANCE_API_KEY");
}

/** Extract and validate Bearer token from Authorization header. */
function validateAuth(authHeader: string | undefined): void {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.slice(7);
  if (token !== getApiKey()) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Invalid API key",
    });
  }
}

/**
 * Create tRPC context from Express request.
 * Auth validation happens in the `protectedProcedure` middleware.
 */
export function createContext({ req }: CreateExpressContextOptions): {
  authHeader: string | undefined;
} {
  return {
    authHeader: req.headers.authorization,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

/** Base router for composing routers. */
export const router = t.router;

/** Base procedure for merging middleware. */
export const publicProcedure = t.procedure;

/**
 * Protected procedure that requires valid Bearer token.
 * Use this for all authenticated endpoints.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  validateAuth(ctx.authHeader);
  return next();
});
