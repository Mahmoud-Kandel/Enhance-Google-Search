import { PageTheme } from "../@types";
import { CONTAINER_CLASS } from "../constants";
import { showExtensionView } from "../components/extension";
import { getExtensionStorageValues } from "../utils";
import { showLoadingCards, showResults } from ".";

/**
 * Immediately invoked function expression (IIFE) to modify search results.
 *
 * This function executes immediately to modify search results on the current page.
 * It first shows the extension view, sets the theme configuration based on the page's background color,
 * creates a container for injected search results, and inserts it into the DOM.
 * Then, it retrieves extension settings from storage, shows loading UI if the extension is active,
 * and modifies search results if they are found.
 */
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
