module.exports = {
    "env": {
        "es6": true
        // ,"browser": true
        // ,"node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "new-cap": 0,
        "strict": 0,
        "no-undef": 1,
        "no-console" : 1,
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "eol-last": 0,
        "quotes": [1, "double"],
        "react/jsx-boolean-value": 1,
        "react/jsx-quotes": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1
    }
};