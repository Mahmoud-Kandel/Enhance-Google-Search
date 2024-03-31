import { ExtensionSettings } from "../@types";
import { loadingCard } from "../components/serp";

/**
 * Shows loading cards in the provided container based on the specified number of results per page.
 *
 * @param {HTMLDivElement} container - The container element where loading cards will be displayed.
 * @param {number} resultsPerPage - The number of loading cards to display.
 *
 * This function dynamically populates the provided container with loading cards based on the specified number of results per page.
 * It generates loading cards using the loadingCard template and fills the container with them.
 */
export const showLoadingCards = (
    container: HTMLDivElement,
    resultsPerPage: ExtensionSettings["resultsPerPage"]
) => {
    container.innerHTML = `
    ${new Array(resultsPerPage)
        .fill("")
        .map(() => loadingCard)
        .join("")}
    `;
};
