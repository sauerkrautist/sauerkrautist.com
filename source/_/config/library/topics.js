const sort_by_title = require('./sort_by_title');

module.exports = topics;

// FIXME duplicates the frontmatter pagination filter in topics.njk
const topic_exlusions = [
	'all',
	'articles',
	'Bike-shedding',
	'Scrapyard',
];

const is_url = value => (
	value.startsWith('/')
	&& value.endsWith('/')
);

const topic_filter = topic =>
	!topic_exlusions.includes(topic)
	&& !is_url(topic);

function topics(value) {
	return sort_by_title(value).filter(topic_filter);
}
