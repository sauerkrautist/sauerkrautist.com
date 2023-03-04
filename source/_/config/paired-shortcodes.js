const _ = require('./shortcodes/element');
const details = require('./shortcodes/details');
const nav_section = require('./shortcodes/nav_section');
const quote = require('./shortcodes/quote');
const note = require('./shortcodes/note');

module.exports = {
	_,
	details,
	nav_section,
	note,
	quote,

	lang(content, code) {
		return `<span lang="${code}">${content.trim()}</span>`;
	},

	endnotes(content, heading) {
		const title = heading ? `<h2 id="endnotes">${heading}</h2>` : '';

		return `<footer>${title}<ol>${content}</ol></footer>`;
	},
};
