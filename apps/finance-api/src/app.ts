import express from "express";
import helmet from "helmet";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { rateLimiter } from "./middleware/rate-limit.js";
import { envContextMiddleware } from "./middleware/env-context.js";
import healthRouter from "./routes/health.js";
import upBankRouter from "./routes/webhooks/up-bank.js";
import { envRouter } from "./modules/envs/router.js";
import { appRouter } from "./router.js";
import { createContext } from "./trpc.js";

/**
 * Create and configure the Express application.
 * Exported separately from the server for testing.
 */
export function createApp(): express.Express {
  const app = express();

  // Security headers
  app.use(helmet());

  // Rate limiting
  app.use(rateLimiter);

  // Webhook route needs raw body for signature verification (must be before express.json())
  app.use("/webhooks/up", express.raw({ type: "application/json" }));

  // Body parsing for JSON routes (env router needs this)
  app.use(express.json());

  // Health check (public, no auth)
  app.use(healthRouter);

  // Up Bank webhook (handles its own signature verification)
  app.use(upBankRouter);

  // Env CRUD routes — mounted before env context middleware so these always
  // use the prod DB regardless of any ?env= query param on the request.
  app.use(envRouter);

  // Env context middleware — reads ?env=NAME, validates the env, and scopes
  // the DB connection for all downstream handlers (tRPC, webhooks, etc.).
  app.use(envContextMiddleware);

  // tRPC handler (auth via context/procedures)
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
