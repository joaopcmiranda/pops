import express from "express";
import helmet from "helmet";
import { authMiddleware } from "./middleware/auth.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import { errorHandler } from "./middleware/error-handler.js";
import healthRouter from "./routes/health.js";
import upBankRouter from "./routes/webhooks/up-bank.js";
import { entitiesRouter } from "./modules/entities/index.js";
import { transactionsRouter } from "./modules/transactions/index.js";
import { inventoryRouter } from "./modules/inventory/index.js";
import { budgetsRouter } from "./modules/budgets/index.js";
import { wishlistRouter } from "./modules/wishlist/index.js";

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

  // Module routes (CRUD)
  app.use(entitiesRouter);
  app.use(transactionsRouter);
  app.use(inventoryRouter);
  app.use(budgetsRouter);
  app.use(wishlistRouter);

  // Legacy routes (to be migrated to modules)
  app.use(healthRouter);
  app.use(upBankRouter);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
}
