/**
 * Main tRPC app router — combines all module routers.
 */
import { router } from "./trpc.js";
import { aiUsageRouter } from "./modules/ai-usage/router.js";
import { budgetsRouter } from "./modules/budgets/router.js";
import { correctionsRouter } from "./modules/corrections/router.js";
import { entitiesRouter } from "./modules/entities/router.js";
import { importsRouter } from "./modules/imports/router.js";
import { inventoryRouter } from "./modules/inventory/router.js";
import { transactionsRouter } from "./modules/transactions/router.js";
import { wishlistRouter } from "./modules/wishlist/router.js";

/**
 * Root application router.
 * All tRPC procedures are nested under their respective module names.
 */
export const appRouter = router({
  aiUsage: aiUsageRouter,
  budgets: budgetsRouter,
  corrections: correctionsRouter,
  entities: entitiesRouter,
  imports: importsRouter,
  inventory: inventoryRouter,
  transactions: transactionsRouter,
  wishlist: wishlistRouter,
});

/** Export the router type for use by tRPC clients. */
export type AppRouter = typeof appRouter;
