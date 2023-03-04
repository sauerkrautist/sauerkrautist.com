const sort_by_title = require('../library/sort_by_title');

module.exports = normalize;

const get_lang = (lang_child, lang) => {
	if (lang_child === lang) {
		return '';
	}

	return lang_child;
}

function normalize(collection, lang) {
	const sorted = sort_by_title(collection, lang);

	const to_properties = ({
		data: {
			lang: lang_page,
			summary,
			title,
		},
		url,
	}) => ({
		lang: get_lang(lang_page, lang),
		summary,
		title,
		url,
	});

	return sorted.map(to_properties);
}
