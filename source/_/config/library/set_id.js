// TODO use this for *all* IDs (currently just headings)

const state = require('./state');
const log = require('./log');

module.exports = set_id;

function set_id(id, url) {
	if (!state.ids[url]) {
		state.ids[url] = [];
	}

	if (state.ids[url].includes(id)) {
		log(`Duplicate id: ${id}`);
	} else {
		state.ids[url].push(id);
	}

	return id;
}
