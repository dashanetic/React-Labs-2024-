import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import babelParser from "@babel/eslint-parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist/", "node_modules/"],
  },

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

  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: "script",
      },
    },
    plugins: {
      js,
    },
    rules: {
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

  {
    files: ["src/__tests__/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        structuredClone: "readonly",
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
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

      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/display-name": "off",

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

  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/__tests__/**"],
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

      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/display-name": "off",

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
