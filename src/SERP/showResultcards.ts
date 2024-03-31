import { ExtensionSettings } from "../@types";
import { fetchMediaList } from "../api";
import { resultCard, notFound } from "../components/serp";

/**
 * Shows search results in the provided container based on the specified number of results per page.
 *
 * @param {HTMLDivElement} container - The container element where search results will be displayed.
 * @param {number} resultsPerPage - The number of search results to display per page.
 *
 * This function asynchronously fetches additional search/query results from the API based on the provided search query value.
 * If no results are found, it displays a "not found" message in the container.
 * Otherwise, it dynamically populates the container with result cards based on the fetched search results.
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
