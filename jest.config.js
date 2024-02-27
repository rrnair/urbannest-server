/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFiles: ['./jest.env.js'],
  reporters: [
    "default", 
    [ 
      "jest-junit", {
        outputName: "junit.xml",
        ancestorSeparator: " › " ,
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
        suiteNameTemplate: "{filename}"
      }
    ]
  ],
  testResultsProcessor: "./node_modules/jest-html-reporter",
};
