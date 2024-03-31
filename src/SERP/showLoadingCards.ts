import { ExtensionSettings } from "../@types";
import { loadingCard } from "../components/serp";

/**
 * Generates and displays loading cards within the specified container.
 *
 * @param {HTMLDivElement} container The container where loading cards will be displayed.
 * @param {ExtensionSettings["resultsPerPage"]} resultsPerPage The number of loading cards to display.
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
