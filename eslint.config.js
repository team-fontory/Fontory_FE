import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.vite,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,

  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "jsx-a11y": eslintPluginJsxA11y,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: { extensions: [".js", ".ts", ".tsx"] },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".ts", ".tsx"],
        },
      },
      "import/extensions": [".js", ".ts", ".tsx"],
    },

    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      "import/no-unresolved": ["error", { commonjs: true }],
      "import/no-cycle": "error",
      "import/no-duplicates": "warn",
      "import/newline-after-import": "warn",
      "import/no-named-as-default": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        { js: "never", jsx: "never", ts: "never", tsx: "never" },
      ],

      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react$", "^@?\\w"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "react/prop-types": "off",
    },
  },
]);
