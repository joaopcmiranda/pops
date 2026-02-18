/**
 * TTL watcher — periodically purges expired environments.
 * Uses setInterval rather than per-env timers so it survives process restarts.
 */
import { deleteExpiredEnvs } from "./registry.js";

const INTERVAL_MS = 30_000; // 30 seconds

/**
 * Start the TTL watcher.
 * Returns the interval handle so callers can clear it on shutdown.
 */
export function startTtlWatcher(): ReturnType<typeof setInterval> {
  return setInterval(() => {
    try {
      const deleted = deleteExpiredEnvs();
      if (deleted.length > 0) {
        console.log(`[env-watcher] Purged expired environments: ${deleted.join(", ")}`);
      }
    } catch (err) {
      console.error("[env-watcher] Error purging expired environments:", err);
    }
  }, INTERVAL_MS);
}
