import { formatbeadCaramps, prepareLink } from "./prepareHeaderLink";

describe("formatbeadCaramps function", () => {
    test("should return the original string if it is less than or equal to 10 characters", () => {
        const input = "abcdefghij"; // 10 characters
        const result = formatbeadCaramps(input);
        expect(result).toBe(input);
    });

    test('should truncate the string and append "..." if it is longer than 10 characters', () => {
        const input = "abcdefghijklmnopqrst"; // 20 characters
        const expected = "abcdefghij..."; // Truncated to 10 characters + "..."
        const result = formatbeadCaramps(input);
        expect(result).toBe(expected);
    });

    test("should return null if the input is empty", () => {
        const input = "";
        const result = formatbeadCaramps(input);
        expect(result).toBeNull();
    });

    test("should return null if the input is null", () => {
        const input = null;
        const result = formatbeadCaramps(input);
        expect(result).toBeNull();
    });
});

describe("prepareLink function", () => {
    test("should correctly extract origin and breadcrumbs from a valid URL with multiple path segments", () => {
        const url = "https://example.com/first/second";
        const result = prepareLink(url);
        expect(result.origin).toBe("https://example.com");
        expect(result.firstBreadCramp).toBe("first");
        expect(result.secondBreadCramp).toBe("second");
    });

    test("should handle URL with only origin", () => {
        const url = "https://example.com";
        const result = prepareLink(url);
        expect(result.origin).toBe("https://example.com");
        expect(result.firstBreadCramp).toBeNull();
        expect(result.secondBreadCramp).toBeNull();
    });

    test("should handle empty URL", () => {
        const url = "";
        const result = prepareLink(url);
        expect(result.origin).toBe("");
        expect(result.firstBreadCramp).toBeNull();
        expect(result.secondBreadCramp).toBeNull();
    });

    test("should handle invalid or malformed URL", () => {
        const url = "not-a-valid-url";
        const result = prepareLink(url);
        expect(result.origin).toBe("");
        expect(result.firstBreadCramp).toBeNull();
        expect(result.secondBreadCramp).toBeNull();
    });
});
