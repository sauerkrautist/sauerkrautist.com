const markdown_it = require('markdown-it');
const markdown_it_named_headings = require('./mdwim');
const rules = require('./rules');

const markdown = markdown_it({
	html: true,
	typographer: true,
});

rules(markdown);
markdown.use(markdown_it_named_headings)

module.exports = markdown;
