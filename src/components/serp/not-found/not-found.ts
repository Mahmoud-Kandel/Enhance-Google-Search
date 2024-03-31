import { notFoundSvg } from ".";

/**
 * Generates HTML content for displaying a "not found" message.
 *
 * @param {string} searchQueryValue The search query for which no results were found.
 * @returns {string} HTML content with the "not found" message and an SVG illustration.
 */
export const notFound = (searchQueryValue: string): string => {
    return `
    <div class="not-found">
        <p>Your search for ${searchQueryValue} did not return any IMDB results.</p>
        ${notFoundSvg}
        </div>
    `;
};
