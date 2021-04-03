module.exports = function(api) {
  api.cache(false)

  const config = {
    sourceType: 'unambiguous',
    presets: [
      [
        '@babel/env',
        {
          modules: 'commonjs',
          useBuiltIns: 'usage',
          corejs: { version: 3, proposals: true },
          debug: true,
          targets: {
            ie: '11'
          }
        }
      ]
    ],
    plugins: []
  }

  return config
}
