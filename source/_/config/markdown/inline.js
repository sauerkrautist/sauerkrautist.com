const markdown_it = require('markdown-it');
const rules = require('./rules');

module.exports = markdown;

const instance = new markdown_it({
	html: true,
	typographer: true,
});

rules(instance);

function markdown(content) {
	return instance.renderInline(content);
}
