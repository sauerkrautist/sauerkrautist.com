const markdown = require('../markdown');
const state = require('../library/state');
const log = require('../library/log');

module.exports = note;

function note(content, id) {
	const { url } = this.page;
	const data = state.refs[url][id];

	// TODO: investigate if we can make the build fail without killing the watch process
	if (!data) {
		log(`Missing citation: ${id}`);
		return '';
	}

	const { index } = data;
	const back_link = `<a href="#reference-${id}" aria-labelledby="aria-endnote-reference aria-${index}">↩</a>`;

	const _content = markdown.renderInline(content)

	// Assigning the id to the list item element yields inconsistent results
	// for the accessible name calculation regarding the marker inclusion.
	// TODO: the line break after the back link is important,
	// we need a generic solution to markdown shitnes.
	return `<li><div id="endnote-${id}">${_content} ${back_link}\n</div></li>`;
}
