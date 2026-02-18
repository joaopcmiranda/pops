/**
 * Env context middleware — routes tRPC requests to the correct SQLite database.
 *
 * If a request includes `?env=NAME`, the middleware looks up the named environment,
 * opens its SQLite connection, and runs the rest of the request pipeline inside
 * an AsyncLocalStorage scope so that `getDb()` in any service returns the env DB.
 *
 * Unknown or expired environments return 410 Gone.
 * Missing `?env` or `?env=prod` falls through to the prod DB (default behaviour).
 */
import type { Request, Response, NextFunction } from "express";
import { getEnvRecord, getOrOpenEnvDb } from "../modules/envs/registry.js";
import { withEnvDb } from "../db.js";

export function envContextMiddleware(req: Request, res: Response, next: NextFunction): void {
  const envName = req.query["env"] as string | undefined;

  // No env param or explicitly prod → use default prod DB
  if (!envName || envName === "prod") {
    next();
    return;
  }

  const record = getEnvRecord(envName);
  if (!record) {
    res.status(410).json({ error: `Environment '${envName}' not found or expired` });
    return;
  }

  const db = getOrOpenEnvDb(record);

  // Run the rest of the middleware chain within the env DB context.
  // AsyncLocalStorage propagates this through all async continuations,
  // so every getDb() call in services will see the env DB.
  withEnvDb(db, () => next());
}
