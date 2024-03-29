import axios from "axios";
import { BaseURL } from "../api";
import { APIResponse, TMDBList } from "../@types";

/**
 * Modifies the search results on the search engine results page (SERP).
 * @param searchResults The NodeList containing search result elements.
 */
const modifySearchResults = async (searchResults: NodeList): Promise<void> => {
    const searchInput = document.getElementsByTagName(
        "textarea"
    )[0] as HTMLTextAreaElement;

    // Get the value of the search input
    const { value: searchQueryValue } = searchInput;

    // Create a new element to manipulate the search results
    const newSearchResult = document.createElement("div") as HTMLDivElement;
    newSearchResult.classList.add("search-results");
    // Modify the content of the new search result element
    newSearchResult.textContent = "Happy Hacking" + " " + searchQueryValue;

    // Fetch additional search/query results from the API
    const { data } = await axios.get<APIResponse<TMDBList>>(
        BaseURL(searchQueryValue)
    );
    console.log(data.results[0].name);

    // Insert the new search result element into the DOM
    searchResults[0].insertBefore(newSearchResult, searchResults[0].firstChild);
};

// Immediately invoked function expression (IIFE) to modify search results
(async () => {
    // Select all search result elements on the SERP
    const searchResults = document.querySelectorAll(".g") as NodeList;
    // If search results are found, modify them
    searchResults.length > 0 && (await modifySearchResults(searchResults));
})();
