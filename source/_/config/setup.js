const { https } = require('./server');
const { use_global_data } = require('./data');
const collections = require('./collections');
const filters = require('./filters');
const markdown = require('./markdown');
const minify_html = require('./minifier');
const state = require('./library/state');

const { assign, create, entries } = Object;

const shortcodes = {
	addShortcode: assign(
		{},
		require('./shortcodes'),
		require('./abbreviations'),
	),
	addPairedShortcode: require('./paired-shortcodes'),
};

module.exports = {
	collections,
	filters,
	https,
	markdown,
	minify_html,
	use_global_data,

	configure(configuration, options) {
		for (const [method, argument_list] of entries(options)) {
			configuration[method](...argument_list);
		}
	},

	on_before_watch() {
		state.ids = create(null);
		state.refs = create(null);
	},

	use_shortcodes(configuration) {
		function add([method, collection]) {
			for (const [name, callback] of entries(collection)) {
				configuration[method](name, callback);
			}
		}

		for (const item of entries(shortcodes)) {
			add(item);
		}
	},
};
