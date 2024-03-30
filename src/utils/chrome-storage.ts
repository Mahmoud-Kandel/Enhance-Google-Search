import { StorageKeys } from "../@types";

async function getBrowserStorageValues() {
    return chrome.storage.sync.get(null).then(function (value) {
        return value;
    });
}

function setBrowserStorageValue(
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

export { setBrowserStorageValue, getBrowserStorageValues };
