const notProvided = Symbol('not-provided');

/**
 * Get an environment variable, optionally with a default.
 *
 * - If a default is provided and the env var is missing, return the default.
 * - If no default is provided and the env var is missing:
 *    - In production: throw and exit.
 *    - Otherwise: log a warning and return undefined.
 *
 * @param {string} name - Environment variable name
 * @param {any} [defaultValue] - Default value if missing
 * @returns {string|any|undefined}
 */
export default function env(name, defaultValue = notProvided) {
  const value = process.env[name];

  if (value !== undefined && value !== '') {
    return value;
  }

  if (defaultValue !== notProvided) {
    return defaultValue;
  }

  const message = `Missing required environment variable: ${name}`;

  if (process.env.NODE_ENV === 'production') {
    console.error(message);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  } else {
    console.warn(`Warning: ${message}. Returning undefined in non-production.`);
    return undefined;
  }
}
