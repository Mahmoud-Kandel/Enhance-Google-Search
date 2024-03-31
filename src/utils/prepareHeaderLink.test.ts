import { prepareLink } from "./prepareHeaderLink";

describe("prepareLink", () => {
    test('returns link with "main" type', () => {
        const result = prepareLink(
            "https://www.hbomax.com/series/the-last-movie-stars",
            3,
            4,
            "secondary"
        );
        expect(result).toBe("series");
    });
});
