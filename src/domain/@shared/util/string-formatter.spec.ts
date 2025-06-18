import StringFormatter from "./string-formatter";

describe("StringFormatter unit tests", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter of each word", () => {
      // Arrange
      const input = "hello world";
      const expected = "Hello World";
      
      // Act
      const result = StringFormatter.capitalize(input);
      
      // Assert
      expect(result).toBe(expected);
    });
    
    it("should handle empty string", () => {
      expect(StringFormatter.capitalize("")).toBe("");
    });
    
    it("should handle null or undefined", () => {
      expect(StringFormatter.capitalize(null)).toBe(null);
      expect(StringFormatter.capitalize(undefined)).toBe(undefined);
    });
    
    it("should convert uppercase letters to lowercase except first letter", () => {
      expect(StringFormatter.capitalize("HELLO WORLD")).toBe("Hello World");
    });
    
    it("should handle single word", () => {
      expect(StringFormatter.capitalize("hello")).toBe("Hello");
    });
  });
});