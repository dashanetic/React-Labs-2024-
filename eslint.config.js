import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import babelParser from "@babel/eslint-parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  // Общие правила для всех файлов
  {
    ignores: ["dist/", "node_modules/"],
  },

  // Правила для JavaScript файлов
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        structuredClone: "readonly",
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
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
      "react-hooks": reactHooks,
    },
    rules: {
      "no-prototype-builtins": "off",
      "no-cond-assign": ["error", "except-parens"],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "valid-typeof": "error",
      "no-undef": "off",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^React$",
        },
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/display-name": "off",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "no-constant-condition": "warn",
    },
  },

  // Правила для корневых TypeScript файлов конфигурации
  {
    files: ["*.ts"],
    ignores: ["src/**"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Не используем project для корневых файлов
      },
    },
    plugins: {
      js,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // TypeScript правила для конфигурационных файлов
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],

      // Общие правила
      "no-prototype-builtins": "off",
      "no-cond-assign": ["error", "except-parens"],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "valid-typeof": "error",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "no-constant-condition": "warn",
    },
  },

  // Правила для TypeScript файлов в папке src
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        structuredClone: "readonly",
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
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
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // TypeScript правила
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^React$",
        },
      ],

      // React правила
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/display-name": "off",

      // Общие правила
      "no-prototype-builtins": "off",
      "no-cond-assign": ["error", "except-parens"],
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-fallthrough": "error",
      "valid-typeof": "error",
      "no-control-regex": "off",
      "no-useless-escape": "off",
      "no-constant-condition": "warn",
    },
  },
];
