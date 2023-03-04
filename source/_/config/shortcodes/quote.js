const markdown = require('../markdown');
const range = require('../library/range');

module.exports = quote;

const get_lang = language => (language ? ` lang="${language}"` : '');

function get_page_reference(page) {
	const reference = range(page);

	if (typeof page == 'number') {
		return `page ${reference}`;
	}

	return `pages ${reference}`;
}

// TODO clean this up
function get_attribution({
	author,
	page,
	ref,
	title,
	year,
}) {
	const infix = title ? `<cite>${title}</cite>` : year;
	const pageref = page ? ', ' + get_page_reference(page) : '';

	return `—<span href="#endnote-${ref}">${author}, ${infix}${pageref}</span>`;
}

function get_quote_properties(options = '') {
	if (typeof options == 'string') {
		return [true, get_lang(options)];
	}

	const {
		author,
		lang,
		title,
	} = options;

	return [!(author || title), get_lang(lang)];
}

function bare_quote(content, lang) {
	return `
		<blockquote ${lang}>${markdown.render(content)}</blockquote>
	`;
}

function full_quote(content, attribution, lang) {
	return `
		<figure>
			<blockquote ${lang}>${markdown.render(content)}</blockquote>
			<figcaption>${attribution}</figcaption>
		</figure>
	`.trim();
}

function quote(content, options) {
	const [is_bare, lang] = get_quote_properties(options);

	if (is_bare) {
		return bare_quote(content, lang);
	}

	const attribution = get_attribution(options);

	return full_quote(content, attribution, lang);
}
