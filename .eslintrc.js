module.exports = {
  root: true,
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],

  plugins: [
    "react"
  ],
  // add your custom rules here
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}