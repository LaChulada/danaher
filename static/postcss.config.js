module.exports = {
    plugins: [
      require('postcss'),
      require('autoprefixer'),
      require('postcss-import'),
      require('css-has-pseudo'),
      require('postcss-preset-env'),
      require('cssnano')
    ]
  }

  postcss([
    postcssHasPseudo(/* pluginOptions */)
  ]).process("../web/themes/custom/toucan/css/hero-new.css" /*, processOptions */);