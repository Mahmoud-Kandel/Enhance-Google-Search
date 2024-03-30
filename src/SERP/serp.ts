import { PageTheme, ExtensionSettings } from "../@types";
import { fetchMediaList } from "../api";
import { CONTAINER_CLASS } from "../constants";
import { loadingCard, resultCard, notFound } from "../components/serp";
import { showExtensionView } from "../components/extension";
import { getExtensionStorageValues } from "../utils";

const showLoadingCards = (
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
        setTimeout(() => {
            container.innerHTML = `
                ${mediaListData.map((media) => resultCard(media)).join("")}
                `;
        }, 1000);
    }
};

// Immediately invoked function expression (IIFE) to modify search results
(async () => {
    // Show extension view
    await showExtensionView();

    // theme Config
    const theme: PageTheme = window
        .getComputedStyle(document.body)
        .background.includes("rgb(255, 255, 255)")
        ? PageTheme.LIGHT
        : PageTheme.DARK;
    document.body.setAttribute("color-scheme", theme);

    // Create a new element and inject additional search results to view on SERP
    const injectedResultsContainer = document.createElement(
        "div"
    ) as HTMLDivElement;
    injectedResultsContainer.classList.add(CONTAINER_CLASS);

    // Select all search result elements on the SERP
    const searchResults = document.querySelectorAll(".g") as NodeList;

    // Insert the new search result element into the DOM
    searchResults[0].insertBefore(
        injectedResultsContainer,
        searchResults[0].firstChild
    );

    // Get Extension Settings from Storage
    const { resultsPerPage, active } = await getExtensionStorageValues();

    // Show loading Ui
    if (active) {
        showLoadingCards(injectedResultsContainer, resultsPerPage);
    } else {
        injectedResultsContainer.innerHTML = "";
        return;
    }

    // If search results are found, modify them
    (searchResults.length > 0 || !active) &&
        (await showResults(injectedResultsContainer, resultsPerPage));
})();
