const markdown_it = require('markdown-it');

module.exports = markdown_block;

const instance = new markdown_it({
	html: true,
	typographer: true,
});

function markdown_block(content) {
	return instance.render(content);
}
