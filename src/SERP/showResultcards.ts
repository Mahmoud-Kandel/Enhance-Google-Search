import { ExtensionSettings } from "../@types";
import { fetchMediaList } from "../api";
import { resultCard, notFound } from "../components/serp";

/**
 * Retrieves and displays search/query results within the specified container.
 *
 * @param {HTMLDivElement} container The container where search results will be displayed.
 * @param {ExtensionSettings["resultsPerPage"]} resultsPerPage The number of search results to display per page.
 */
export const showResults = async (
    container: HTMLDivElement,
    resultsPerPage: ExtensionSettings["resultsPerPage"]
) => {
    // Search input Value
    const searchQueryValue: string = (
        document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement
    ).value;

    // Fetch additional search/query results from the API
    const mediaListData = await fetchMediaList(
        searchQueryValue,
        resultsPerPage
    );

    if (mediaListData.length === 0) {
        container.innerHTML = notFound(searchQueryValue);
    } else {
        // Present the search results on the SERP
        container.innerHTML = `
                ${mediaListData.map((media) => resultCard(media)).join("")}
                `;
    }
};
