enum StorageKeys {
    active = "active",
    resultsPerPage = "resultsPerPage",
}

interface ExtensionSettings {
    active: boolean;
    resultsPerPage: number;
}

export { StorageKeys };
export type { ExtensionSettings };
