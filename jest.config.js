module.exports = {
    transform: {
        "^.+\\.ts?$": [
            "ts-jest",
            {
                isolatedModules: true,
                useESM: true,
            },
        ],
    },
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    // resolver: "ts-jest-resolver",
};
