const markdown_inline = require('../markdown/inline');

module.exports = render;

function render(list) {
	const buffer = ['<ul>'];

	for (const {
		lang,
		summary,
		title,
		url,
	} of list) {
		buffer.push(
			'<li>',
			`<a href="${url}" lang="${lang}">`,
			markdown_inline(title),
			'</a>',
			'<p>',
			summary ? markdown_inline(summary) : '',
			'</p>',
			'</li>',
		);
	}

	buffer.push('</ul>');

	return buffer.join('');
}
