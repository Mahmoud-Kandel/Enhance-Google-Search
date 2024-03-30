import { StorageKeys } from "../@types";

async function getBrowserStorageValues() {
    return chrome.storage.sync.get(null).then(function (value) {
        return value;
    });
}

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
