import { getBrowserStorageValues } from ".";
import { StorageKeys, ExtensionSettings } from "../@types";
import { EXTENSION_DEFAULT } from "../constants";

export const getExtensionStorageValues =
    async (): Promise<ExtensionSettings> => {
        const {
            active: extensionActive,
            resultsPerPage: extensionResultsPerPage,
        } = EXTENSION_DEFAULT;

        let {
            [StorageKeys.active]: active,
            [StorageKeys.resultsPerPage]: resultsPerPage,
        } = await getBrowserStorageValues();

        active ? active : extensionActive;
        resultsPerPage ? resultsPerPage : extensionResultsPerPage;

        return { active, resultsPerPage };
    };
