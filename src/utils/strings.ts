/**
 * Truncates a given string to a specified length.
 *
 * @param {string} str - The string to be truncated.
 * @param {number} n - The maximum length of the truncated string.
 * @returns {string} The truncated string.
 */
export function truncate(str: string, n: number) {
  // Check if the string length is greater than the specified length
  if (str.length > n) {
    // If it is, truncate the string and append "..."
    return str.slice(0, n - 1) + '...';
  } else {
    // Otherwise, return the original string
    return str;
  }
}