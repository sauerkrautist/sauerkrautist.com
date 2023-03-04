const markdown = require('./markdown/inline');
const markdown_block = require('./markdown/block');
const sort_by_title = require('./library/sort_by_title');
const topics = require('./library/topics');
const untag = require('./library/untag');

module.exports = filters;

/**
 * Title element value:
 * 1. Parse markdown
 * 2. Strip HTML
 * 3. Replace entity references // TODO do this properly
 * @param {string} value
 * @returns {string}
 */
function text(value) {
	return untag(value).replace('&amp;', '&');
}

function filters(configuration) {
	for (const callback of [
		markdown,
		markdown_block,
		sort_by_title,
		text,
		topics,
	]) {
		configuration.addFilter(callback.name, callback);
	}
}
