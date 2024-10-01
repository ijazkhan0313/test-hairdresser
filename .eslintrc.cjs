module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:jsonc/recommended-with-jsonc'
  ],
  ignorePatterns: ['assets/', '**/*.svg', '**/*.png', '**/*.md', 'i'],
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-whitespace': 'off',
  }
}
