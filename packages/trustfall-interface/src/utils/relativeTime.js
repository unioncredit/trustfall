function parseMs(milliseconds) {
  if (typeof milliseconds !== "number") {
    throw new TypeError("Expected a number");
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
  };
}

/**
 * @name formatDueDate
 * @param {Number} secondsUntilDue
 */
export default function relativeTime(secondsUntilDue) {
  /**
   * Convert seconds to Milliseconds
   */
  const ms = Number(secondsUntilDue.toString()) * 1000;

  const { days, hours, minutes } = parseMs(ms);

  return `${days}d ${hours}h ${minutes}m`;
}
