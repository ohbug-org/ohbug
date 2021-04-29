module.exports = {
  extends: [require.resolve('@chenyueban/lint/src/eslint')],
  rules: {
    // 限制使用下划线命名
    'no-underscore-dangle': 'off',
    // 导入外部依赖
    'import/no-extraneous-dependencies': 'off',
  },
}
