import { StorageKeys } from "../@types";

/**
 * Retrieves values from the browser's storage asynchronously.
 *
 * @returns {Promise<any>} A promise resolving to the stored values.
 */
async function getBrowserStorageValues() {
    return chrome.storage.sync.get(null).then(function (value) {
        return value;
    });
}

/**
 * Sets a value in the browser's storage asynchronously.
 *
 * @param {StorageKeys} key The key under which the value will be stored.
 * @param {boolean | number} value The value to be stored.
 * @param {StorageKeys} secondKey The key used to retrieve an existing value from storage.
 */
async function setBrowserStorageValue(
    key: StorageKeys,
    value: boolean | number,
    secondKey: StorageKeys
) {
    const { [secondKey]: secondValue } = await getBrowserStorageValues();
    chrome.storage.sync.set({
        [secondKey]: secondValue,
        [key]: value,
    });
}

/**
 * Sets values in browser storage for specified keys.
 *
 * @param {StorageKeys.active} key1 - The key for the first value.
 * @param {boolean} value1 - The value to set for the first key.
 * @param {StorageKeys.resultsPerPage} key2 - The key for the second value.
 * @param {number} value2 - The value to set for the second key.
 *
 * This function sets values in browser storage for specified keys.
 * It sets the provided boolean value for the key1 and the provided number value for the key2.
 */
function setBrowserStorageValues(
    key1: StorageKeys.active,
    value1: boolean,
    key2: StorageKeys.resultsPerPage,
    value2: number
) {
    chrome.storage.sync.set({
        [key1]: value1,
        [key2]: value2,
    });
}

export {
    setBrowserStorageValues,
    setBrowserStorageValue,
    getBrowserStorageValues,
};
