import { PageTheme } from "../@types";
import { CONTAINER_CLASS } from "../constants";
import { showExtensionView } from "../components/extension";
import { getExtensionStorageValues } from "../utils";
import { showLoadingCards, showResults } from ".";

/**
 * * Immediately invoked function expression (IIFE) to modify search results.
 *
 * Initializes the extension functionality:
 * - Displays the extension view.
 * - Determines the page theme (light or dark).
 * - Injects additional search results into the search engine results page (SERP).
 * - Retrieves extension settings from storage.
 * - Shows loading UI based on the extension's active state.
 * - Modifies search results if found and the extension is active.
 */
(async () => {
    // Load Extension Storage data and manipulate Extension View on DOM
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
