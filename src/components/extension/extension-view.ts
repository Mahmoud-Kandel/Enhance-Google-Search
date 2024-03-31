import { StorageKeys } from "../../@types";
import {
    getExtensionStorageValues,
    setBrowserStorageValue,
} from "../../utils/";

/**
 * Displays the extension view with dynamic content and functionality.
 * - Listens for DOMContentLoaded event to initialize the view and retrieve extension storage values.
 * - Updates extension view dynamically based on stored values.
 * - Handles user interactions for range input and checkbox.
 * - Updates browser storage when range input value or checkbox state changes.
 *
 * @returns {Promise<void>} Promise resolving to void.
 */
export const showExtensionView = async (): Promise<void> => {
    document.addEventListener("DOMContentLoaded", async function () {
        const { active, resultsPerPage } = await getExtensionStorageValues();

        // get extension two inputs (range and checkbox) , counter and counter from DOM
        const rangeInput = document.getElementById(
                "rangeInput"
            ) as HTMLInputElement,
            toggleExtension = document.querySelector(
                "input[type=checkbox]"
            ) as HTMLInputElement,
            container = document.getElementById("extension") as HTMLDivElement,
            counter = document.querySelector(
                ".results-per-page span"
            ) as HTMLSpanElement;

        // Log Storage Values
        rangeInput.value = resultsPerPage.toString();
        counter.textContent = resultsPerPage.toString();
        toggleExtension.checked = active;
        toggleExtension.checked && container.classList.add("active");

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
            if (!toggleExtension.checked) checked = false;
            container.classList.toggle("active");
            await setBrowserStorageValue(
                StorageKeys.active,
                checked,
                StorageKeys.resultsPerPage
            );
        });
    });
};
