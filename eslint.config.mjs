import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const customConfig = [
  // Global variables for a specific language (e.g., browser)
  { languageOptions: { globals: globals.browser } },
  // Merge recommended configuration from the eslint-plugin-js
  pluginJs.configs.recommended,
  // Use recommended configuration from eslint-plugin-react
  pluginReactConfig,
  // Add or modify rules as needed
  {
    rules: {
      // Example: Change severity level for no-unused-vars rule
      "no-unused-vars": "off", // Turn off the rule
      // Add more custom rules here
    },
  },
];

export default customConfig;
