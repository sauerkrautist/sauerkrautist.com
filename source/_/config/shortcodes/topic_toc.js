const nav_section = require('./nav_section');
const normalize = require('../library/toc_data');
const tree = require('../html/nav-tree');

module.exports = topic_toc;

function section(collection, {
	heading,
	id,
	lang,
}) {
	const data = normalize(collection, lang);
	const list = tree(data);

	return nav_section(list, heading, id);
}

function process([articles, scrapyard], lang) {
	const buffer = [];

	if (articles.length) {
		const nav = section(articles, {
			heading: 'Articles',
			id: 'articles',
			lang,
		});

		buffer.push(nav);
	}

	if (scrapyard.length) {
		const nav = section(scrapyard, {
			heading: 'Scrapyard',
			id: 'scrapyard',
			lang,
		});

		buffer.push(nav);
	}

	return buffer.join('');
}

function topic_toc(collections, topic, lang) {
	const {
		articles,
		Scrapyard,
	} = collections;

	const is_topic = ({
		data: {
			tags,
		},
	}) => tags.includes(topic);

	const matches = [
		articles.filter(is_topic),
		Scrapyard.filter(is_topic),
	];

	return process(matches, lang);
}
