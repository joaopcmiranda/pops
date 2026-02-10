import express from "express";
import helmet from "helmet";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { rateLimiter } from "./middleware/rate-limit.js";
import healthRouter from "./routes/health.js";
import upBankRouter from "./routes/webhooks/up-bank.js";
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

  // Health check (public, no auth)
  app.use(healthRouter);

  // Up Bank webhook (handles its own signature verification)
  app.use(upBankRouter);

  // tRPC handler (includes auth in context/procedures)
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
