module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-unused-components": "warn",
    "vue/attribute-hyphenation": ["warn", "never"],
    "vue/v-on-event-hyphenation": ["warn", "never"],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
  },

  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
};
