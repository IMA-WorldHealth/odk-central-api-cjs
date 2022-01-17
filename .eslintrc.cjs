module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:ava/recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
  },
};
