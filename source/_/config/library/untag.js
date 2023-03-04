const markdown_inline = require('../markdown/inline')

// TODO do this properly
const tag_expression = /<[^>]+>/gm;

const untag = value =>
	markdown_inline(value)
		.replace(tag_expression, '');

module.exports = untag;
