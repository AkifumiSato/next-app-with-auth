module.exports = {
  extends: ["custom/next"],
  rules: {
    // server actions are async
    "@typescript-eslint/no-misused-promises": "off",
  },
};
