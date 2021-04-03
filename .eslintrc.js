module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier-standard'
  ],
  env: {
    "browser": true
  },
  rules: {
    "no-console": "off"
  },
  plugins: []
}
