import { StorageKeys } from "../../@types";
import {
    getExtensionStorageValues,
    setBrowserStorageValue,
} from "../../utils/";

export const showExtensionView = async () => {
    document.addEventListener("DOMContentLoaded", async function () {
        const container = document.getElementById(
            "extension"
        ) as HTMLDivElement;

        const { active, resultsPerPage } = await getExtensionStorageValues();

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
        rangeInput.addEventListener("input", () => {
            const { value } = rangeInput;
            counter.textContent = value;
            setBrowserStorageValue(
                StorageKeys.resultsPerPage,
                +value,
                StorageKeys.active
            );
        });

        // Update Enable and Disable Extension
        toggleExtension.addEventListener("change", () => {
            let checked = true;
            if (toggleExtension.checked) {
                container.classList.add("active");
            } else {
                container.classList.remove("active");
                checked = false;
            }
            setBrowserStorageValue(
                StorageKeys.active,
                checked,
                StorageKeys.resultsPerPage
            );
        });
    });
};
