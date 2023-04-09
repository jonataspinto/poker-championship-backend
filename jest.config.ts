import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@Services(.*)": "<rootDir>/src/services/$1",
    "@Routes(.*)": "<rootDir>/src/routes/$1",
    "@Controllers(.*)": "<rootDir>/src/controllers/$1",
    "@Domains(.*)": "<rootDir>/src/domain/$1",
    "@Adapters(.*)": "<rootDir>/src/adapters/$1",
  },
  collectCoverageFrom: [
    "src/controllers/*.ts",
    "src/domain/*",
    "!**/node_modules/**",
  ],
};

export default config;
