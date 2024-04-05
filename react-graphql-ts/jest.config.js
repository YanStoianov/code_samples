/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom'
};