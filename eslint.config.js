import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  {
    ignores: ["dist/", "node_modules/"],

    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        structuredClone: "readonly", // Добавляем structuredClone, если вдруг понадобится
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      js,
      react,
    },
    rules: {
      "no-prototype-builtins": "off",
      "no-cond-assign": ["error", "except-parens"],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "valid-typeof": "error",
      "no-undef": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/display-name": "off",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "no-constant-condition": "warn",
    },
  },
];
