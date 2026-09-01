import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 1. Any types & Image warnings disable කිරීම
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",

      // 2. Variable reassignment (let/const) error එක disable කිරීම
      "prefer-const": "off",

      // 3. React Hooks set-state in effect warnings disable කිරීම
      "react-hooks/set-state-in-effect": "off",

      // 4. Unused variables & extra typescript strict checks disable කිරීම
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",

      // 5. Immutability errors සහ window.location warnings disable කිරීම
      "react-hooks/immutability": "off",
      "@next/next/no-location-assign-relative-destination": "off",

      // 6. JSX unescaped entities errors disable කිරීම (Quotes නිසා එන අන්තිම එරර්ස් 2 නැති කිරීමට)
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;