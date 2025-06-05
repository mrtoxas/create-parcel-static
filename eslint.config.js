import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from "typescript-eslint";

export default defineConfig([
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["dist", "build", "node_modules"],
	},
	{
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			"no-console": "off",
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		},
	},
	prettierConfig,
]);