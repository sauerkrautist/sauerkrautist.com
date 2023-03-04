const { minify } = require('html-minifier-terser');

module.exports = async function minify_html(content) {
	const { outputPath } = this.page;

	if (outputPath && outputPath.endsWith('.html')) {
		const minified = await minify(content, {
			collapseWhitespace: true,
			// conservativeCollapse: true,
			minifyCSS: true,
			minifyJS: true,
			removeAttributeQuotes: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeOptionalTags: true,
			useShortDoctype: true,
		});

		return minified
			// FF sequential-focus-navigation-starting-point bug
			.replace(/><a /gm, '> <a ')
			// markdown/nunjucks bug
			.replace(/(>) (<a id=reference-)/gm, '$1$2')
			// weird markdown artefacts
			.replace(/<p><\/p>/gm, '');
	}

	return content;
};
