import { StorageKeys } from "../../@types";
import {
    getExtensionStorageValues,
    setBrowserStorageValue,
} from "../../utils/";

/**
 * Shows the extension view with dynamic content and functionality.
 *
 * @returns {void} This function doesn't return anything directly.
 *
 * This function attaches an event listener for when the DOM content is fully loaded.
 * Upon DOMContentLoaded event, it retrieves extension storage values asynchronously.
 * It initializes the extension view dynamically by updating the container's inner HTML.
 * It sets up event listeners for the range input and checkbox to handle user interactions.
 * When the range input value changes, it updates the display and stores the new value in browser storage.
 * When the checkbox state changes, it toggles the extension's active state and updates browser storage accordingly.
 */
export const showExtensionView = async (): Promise<void> => {
    document.addEventListener("DOMContentLoaded", async function () {
        // get extension element from DOM by id
        const container = document.getElementById(
            "extension"
        ) as HTMLDivElement;

        const { active, resultsPerPage } = await getExtensionStorageValues();

        // initialize extension view
        container.innerHTML = `
        <h1>IMDB</h1>
        <p>
            IMDB is your go-to browser extension for enhancing search engine
            results. Instantly access comprehensive information on movies
            and series without leaving your search page.
        </p>
        <div class="results-per-page-container">
            <span class="results-per-page">Results Per Page: <span>${resultsPerPage}</span></span>
            <input id="rangeInput" type="range" min="1" max="20" value="${resultsPerPage}" />
        </div>
        <label class="switch">
        ${
            active
                ? `<input type="checkbox" checked />`
                : `<input type="checkbox" />`
        }
            <span class="slider round"></span>
        </label>
        `;

        // get extension two inputs (range and checkbox)from DOM
        const rangeInput = document.getElementById(
                "rangeInput"
            ) as HTMLInputElement,
            counter = document.querySelector(
                ".results-per-page span"
            ) as HTMLSpanElement,
            toggleExtension = document.querySelector(
                "input[type=checkbox]"
            ) as HTMLInputElement;

        // Update the display of results per page
        rangeInput.addEventListener("input", async () => {
            const { value } = rangeInput;
            counter.textContent = value;
            await setBrowserStorageValue(
                StorageKeys.resultsPerPage,
                +value,
                StorageKeys.active
            );
        });

        // Update Enable and Disable Extension
        toggleExtension.addEventListener("change", async () => {
            let checked = true;
            if (toggleExtension.checked) {
                container.classList.add("active");
            } else {
                container.classList.remove("active");
                checked = false;
            }
            await setBrowserStorageValue(
                StorageKeys.active,
                checked,
                StorageKeys.resultsPerPage
            );
        });
    });
};
