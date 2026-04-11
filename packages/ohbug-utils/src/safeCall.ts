/**
 * Prevents recursive exceptions in error-handling paths where system
 * APIs (e.g. `os.hostname()`) might throw inside an uncaughtException handler.
 */
export function safeCall<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}
