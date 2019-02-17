module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "enforce-react-hooks"
    ],
    "rules": {
        "indent": [
            "error",
            2,
        ],
        "enforce-react-hooks/enforce-react-hooks": 2,
        "no-unused-vars": 0,
        "react/jsx-uses-vars": 2,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": 0,
        "react-hooks/rules-of-hooks": "error",
        "react/jsx-no-bind": 0,
    }
};
