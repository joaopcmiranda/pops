import express from "express";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import { errorHandler } from "./middleware/error-handler.js";
import healthRouter from "./routes/health.js";
import transactionsRouter from "./routes/transactions.js";
import entitiesRouter from "./routes/entities.js";
import budgetsRouter from "./routes/budgets.js";
import wishlistRouter from "./routes/wishlist.js";
import upBankRouter from "./routes/webhooks/up-bank.js";

/**
 * Create and configure the Express application.
 * Exported separately from the server for testing.
 */
export function createApp(): express.Express {
  const app = express();

  // Webhook route needs raw body for signature verification
  app.use("/webhooks/up", express.raw({ type: "application/json" }));

  // Standard middleware for all other routes
  app.use(express.json());
  app.use(helmet());
  app.use(rateLimiter);
  app.use(authMiddleware);

  // Routes
  app.use(healthRouter);
  app.use(transactionsRouter);
  app.use(entitiesRouter);
  app.use(budgetsRouter);
  app.use(wishlistRouter);
  app.use(upBankRouter);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
