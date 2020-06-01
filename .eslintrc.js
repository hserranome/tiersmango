module.exports = {
	root: true,
	env: {
		node: true,
		jest: true
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:vue/recommended',
		'@vue/prettier'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/require-default-prop': 'off',
		'import/no-unresolved': 'off',
		'no-param-reassign': 'off',
		'no-return-assign': 'off',
		'no-var': 2,
		'prefer-const': 2,
		indent: ['error', 'tab'],
		'vue/script-indent': ['error', 'tab', { baseIndent: 1 }]
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: {
				indent: 'off'
			}
		}
	],
	parserOptions: {
		parser: 'babel-eslint'
	}
}
