import rateLimit from "express-rate-limit";

/** Rate limiter: 100 requests per 15-minute window per IP. */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, try again later" },
});
