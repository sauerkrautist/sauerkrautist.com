const {
	configure,
	filters,
	https,
	markdown,
	minify_html,
	on_before_watch,
	use_global_data,
	use_shortcodes,
} = require('./config/setup');

module.exports = function (configuration) {
	const includes = '_';

	filters(configuration);
	use_shortcodes(configuration);
	use_global_data(configuration);
	configure(configuration, {
		addPassthroughCopy: [{
			[`source/${includes}/root`]: '/',
		}],
		addTransform: ['minify_html', minify_html],
		on: ['eleventy.beforeWatch', on_before_watch],
		setLibrary: ['md', markdown],
		setServerOptions: [{ https }],
	});

	return {
		dir: {
			input: 'source',
			output: 'docs',
			data: '_/data',
			layouts: '_/layouts',
			includes,
		},
		markdownTemplateEngine: 'njk',
	};
};
