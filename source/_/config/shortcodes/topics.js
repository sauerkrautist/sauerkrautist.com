const get_topics = require('../library/topics');
const to_token = require('../library/token');

module.exports = topics;

const { keys } = Object;

function to_list_item(topic) {
	return [
		'<li>',
		`<a href="/@${to_token(topic)}/#main">`,
		topic,
		'</a>',
		'</li>',
	].join('');
}

function topics(exclusion) {
	const { collections } = this.ctx;
	const topics = keys(collections).filter(name => (name !== exclusion));

	return [
		'<ul>',
		...get_topics(topics).map(to_list_item),
		'</ul>',
	].join('');
}
