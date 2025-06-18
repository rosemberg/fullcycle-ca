/**
 * Utility functions for string formatting
 */
export default class StringFormatter {
  /**
   * Capitalizes the first letter of each word in a string
   * @param str The string to capitalize
   * @returns The capitalized string
   */
  public static capitalize(str: string): string {
    if (!str) return str;
    
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}