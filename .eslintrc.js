module.exports = {
    'parser': '@typescript-eslint/parser',
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'react-app',
        'plugin:prettier/recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react',
    ],
    'rules': {
        'indent': 'off',
        '@typescript-eslint/indent': ['error', 2],

        'comma-dangle': ['error', 'always-multiline'],

        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],

        'prettier/prettier': {
            'singleQuote': true,
        },
        'sort-imports': ['warn', {
            'ignoreCase': false,
            'ignoreDeclarationSort': false,
            'ignoreMemberSort': false,
            'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
        }]
    }
};
