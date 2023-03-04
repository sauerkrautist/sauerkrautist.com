const untag = require('../library/untag');

module.exports = sort_by_title;

function resolve(value) {
	if (typeof value === 'string') {
		return value;
	}

	return value.data.title;
}

const to_string = value => untag(resolve(value));

function sort_by_title(collection, language = 'en') {
	function sort(...argument_list) {
		const collator = new Intl.Collator(language);
		const args = argument_list.map(to_string);

		return collator.compare(...args);
	}

	return [...collection].sort(sort);
}
