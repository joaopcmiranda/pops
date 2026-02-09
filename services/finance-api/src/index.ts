import { createApp } from "./app.js";
import { closeDb } from "./db.js";

const port = Number(process.env["PORT"] ?? 3000);
const app = createApp();

const server = app.listen(port, () => {
  console.log(`[finance-api] Listening on port ${port}`);
});

function shutdown(): void {
  console.log("[finance-api] Shutting down...");
  server.close(() => {
    closeDb();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
