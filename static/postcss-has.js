const postcss = require('postcss');
const postcssHasPseudo = require('css-has-pseudo');

postcss([
	postcssHasPseudo(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);