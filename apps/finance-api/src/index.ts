import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Load .env from repo root (2 levels up from src/)
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../..", ".env") });

import { createApp } from "./app.js";
import { closeDb } from "./db.js";
import { startTtlWatcher } from "./modules/envs/ttl-watcher.js";

const port = Number(process.env["PORT"] ?? 3000);
const app = createApp();

const server = app.listen(port, () => {
  console.log(`[finance-api] Listening on port ${port}`);
});

// Periodically purge expired named environments
const ttlWatcher = startTtlWatcher();

function shutdown(): void {
  console.log("[finance-api] Shutting down...");
  clearInterval(ttlWatcher);
  server.close(() => {
    closeDb();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
