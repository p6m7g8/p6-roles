import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.github/',
    '.pnpm-store/',
    '.vscode/',
    '*.md',
    'cdk.json',
    '.mergify.yml',
    'package.json',
    'tsconfig.json',
  ],
  plugins: {
  },
  languageOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-new': 'off',
  },
  settings: {
  },
})
