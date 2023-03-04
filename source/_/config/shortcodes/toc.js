const normalize = require('../library/toc_data');
const tree = require('../html/nav-tree');

module.exports = toc;

function filter_group(collection, group_name) {
	const is_group = ({
		data: {
			group
		},
	}) => (group === group_name);

	return collection.filter(is_group);
}

function get_collection(collection, group) {
	if (group) {
		return filter_group(collection, group)
	}

	return collection;
}

// TODO
// Find out if it is safe to use the instance ctx property
// insteadof arguments.
// Update 1: probably not, but forgot use case)
// Update 2: it's not a good idea anyway, make the opaque
// group argument an options object
function toc(name, group) {
	const { collections, lang } = this.ctx;
	const collection = get_collection(collections[name], group);
	const list = normalize(collection, lang);

	return tree(list);
}
