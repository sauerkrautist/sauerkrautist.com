const attributes_to_string = require('../html/attributes');
const markdown = require('../markdown');

module.exports = element;

function element(content, type, attribute_map) {
	const attributes = attribute_map
		? attributes_to_string(attribute_map)
		: '';

	return `<${type} ${attributes}>${markdown.render(content)}</${type}>`;
}
