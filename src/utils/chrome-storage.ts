import { StorageKeys } from "../@types";

/**
 * Retrieves all stored data from Chrome storage synchronously.
 *
 * @returns {Promise<[Object]>} A Promise resolving to an object containing all stored data.
 *
 * This function retrieves all stored data from Chrome storage synchronously.
 * It returns a Promise that resolves to an object containing all stored data.
 */
async function getBrowserStorageValues() {
    return chrome.storage.sync.get(null).then(function (value) {
        return value;
    });
}

/**
 * Sets a value in browser storage for a specified key.
 *
 * @param {StorageKeys} key - The key to set the value for.
 * @param {boolean | number} value - The value to set.
 * @param {StorageKeys} secondKey - The second key to retrieve a value for.
 *
 * This function sets a value in browser storage for a specified key.
 * It first retrieves the current value associated with the second key from browser storage.
 * Then, it sets the provided value for the specified key along with the retrieved value for the second key.
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
