import { getBrowserStorageValues, setBrowserStorageValues } from ".";
import { StorageKeys, ExtensionSettings } from "../@types";
import { EXTENSION_DEFAULT } from "../constants";

/**
 * Retrieves extension settings from storage, initializing default values if necessary.
 *
 * @returns {Promise<ExtensionSettings>} A promise resolving to the retrieved extension settings.
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
