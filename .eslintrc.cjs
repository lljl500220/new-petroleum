module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"@vue/prettier",
		"@vue/eslint-config-typescript"
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module",
		jsxPragma: "React",
		ecmaFeatures: {
			jsx: true,
			tsx: true
		}
	},
	rules: {
		// TS off交给ts编译器做判断
		"@typescript-eslint/no-explicit-any": "off",
		"no-debugger": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_"
			}
		],
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_"
			}
		],
		// Vue
		"vue/no-v-html": "off",
		"vue/require-default-prop": "off",
		"vue/require-explicit-emits": "off",
		"vue/multi-word-component-names": "off",
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "always",
					normal: "always",
					component: "always"
				},
				svg: "always",
				math: "always"
			}
		],
		// Prettier
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				semi: false, // 去掉结尾的分号
				singleQuote: true,// 单引号替代双引号
				trailingComma: "none"// 末尾禁止添加逗号
			}
		]
	}
}
