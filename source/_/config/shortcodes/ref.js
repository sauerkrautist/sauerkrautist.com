const state = require('../library/state');

module.exports = ref;

const { create, keys } = Object;

function get_labels(index) {
	const labels = [
		'aria-endnote',
		`aria-${index}`,
	];

	return labels.join(' ');
}

function ref(key) {
	const { url } = this.page;
	const id = `endnote-${key}`;

	if (!state.refs[url]) {
		state.refs[url] = create(null);
	}

	const { length } = keys(state.refs[url]);
	const index = keys(state.refs[url]).length + 1;

	state.refs[url][key] = {
		index,
		length,
	};

	const labels = get_labels(index);

	return `<a id="reference-${key}" href="#${id}" aria-labelledby="${labels}">${index}</a>`;
}
