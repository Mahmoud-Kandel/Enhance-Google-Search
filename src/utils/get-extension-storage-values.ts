import { getBrowserStorageValues, setBrowserStorageValues } from ".";
import { StorageKeys, ExtensionSettings } from "../@types";
import { EXTENSION_DEFAULT } from "../constants";

/**
 * Retrieves extension storage values asynchronously.
 *
 * @returns {Promise<ExtensionSettings>} A Promise resolving to an object containing extension storage values.
 *
 * This function retrieves extension storage values asynchronously.
 * It first initializes variables for the active state and results per page.
 * Then, it extracts default values for active state and results per page from EXTENSION_DEFAULT constant.
 * Next, it retrieves values for active state and results per page from browser storage using getBrowserStorageValues function.
 * If no values are found in storage, it sets default values and stores them in browser storage.
 * Otherwise, it assigns retrieved values to active and resultsPerPage variables.
 * Finally, it returns an object containing active state and results per page.
 */
export const getExtensionStorageValues =
    async (): Promise<ExtensionSettings> => {
        let active, resultsPerPage;

        const {
            active: extensionActive,
            resultsPerPage: extensionResultsPerPage,
        } = EXTENSION_DEFAULT;

        let {
            [StorageKeys.active]: StorageActive,
            [StorageKeys.resultsPerPage]: StorageResultsPerPage,
        } = await getBrowserStorageValues();

        // in first Render
        if (!StorageActive && !StorageResultsPerPage) {
            active = extensionActive;
            resultsPerPage = extensionResultsPerPage;

            setBrowserStorageValues(
                StorageKeys.active,
                active,
                StorageKeys.resultsPerPage,
                resultsPerPage
            );
        } else {
            active = StorageActive;
            resultsPerPage = StorageResultsPerPage;
        }

        return { active, resultsPerPage };
    };
