module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier", "react", "jest"],
  rules: {
    "no-console": 0,
  },
};
