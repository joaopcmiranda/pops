import type { Request, Response, NextFunction } from "express";

/**
 * Global error handler. Returns generic messages in production —
 * no stack traces, no SQL errors, no file paths.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[finance-api] Unhandled error:", err.message);

  const isDev = process.env["NODE_ENV"] !== "production";

  res.status(500).json({
    error: "Internal server error",
    ...(isDev ? { message: err.message } : {}),
  });
}
