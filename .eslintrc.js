module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    plugins: [
        'vue',
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': 'off',
        'vue/html-indent':  'off',
        'vue/max-attributes-per-line': 'off',
        'vue/attributes-order': 'off',
    },
};