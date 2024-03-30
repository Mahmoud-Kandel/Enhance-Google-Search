import { notFoundSvg } from ".";
export const notFound = (searchQueryValue: string) => {
    return `
    <div class="not-found">
        <p>Your search for ${searchQueryValue} did not return any IMDB results.</p>
        ${notFoundSvg}
        </div>
    `;
};
