// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  files: ["src/**/*.{ts,tsx}"],
  plugins: {
    react,
    "react-hooks": reactHooks,
  },
  rules: {
    // No type assertions
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}, storybook.configs["flat/recommended"]);
