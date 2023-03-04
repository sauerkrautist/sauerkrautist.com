const set_id = require('../library/set_id');
const to_token = require('../library/token');

module.exports = function plugin(md) {
	md.core.ruler.push(
		custom_attributes.name,
		custom_attributes.bind(null, md)
	);
};

const supported_types = [
	'heading',
	'paragraph',
	'em',
	'link',
	'strong',
].map(base => `${base}_close`);

const is_suported_type = type => supported_types.includes(type)

// TODO this also matches empty comments
const attributes_expression = /<!--(?: ([a-z]{2}))?(?: ([a-z][a-z\d-]+[a-z\d]))? -->/i;

function get_opener(token, index, queue) {
	const [base] = token.type.split('_');
	const opener = `${base}_open`;
	let decrementor = index - 1;
	let previous = queue[decrementor];

	while (previous.type !== opener) {
		previous = queue[--decrementor];
	}

	return [previous, decrementor];
}

function get_match(token) {
	const match = attributes_expression.exec(token.content);

	if (match) {
		const [, lang, id] = match;

		return {
			id,
			lang,
		}
	}

	return null;
}

// TODO skip trailing whitespace nodes
function get_last(queue, index) {
	let previous = queue[index];

	if (previous.type === 'html_inline') {
		return get_match(previous);
	}

	if (previous.type === 'inline') {
		const { children } = previous;
		const { length } = children;

		return get_last(children, length - 1);
	}

	return null;
}

function set_attribute(token, attribute, value, url) {
	const index = token.attrIndex(attribute);

	if (attribute === 'id') {
		set_id(value, url);
	}

	if (index === -1) {
		token.attrPush([attribute, value]);
	}
}

function set_custom_attributes(attributes, token) {
	const { id, lang } = attributes;

	if (lang) {
		set_attribute(token, 'lang', lang);
	}

	if (id) {
		set_attribute(token, 'id', id);
	}
}

function is_unanchored_heading(type, id) {
	if (type === 'heading_close') {
		return !id;
	}

	return false;
}

function custom_attributes(md, {
	tokens: token_list,
	env: {
		page,
	},
}) {
	const id_key = page ? page.url : null;

	function set_heading_anchor(token, index, url) {
		const filtered = token_list[index + 1].children.filter(token => token.type === 'text');
		const text = md.renderer.render(filtered, md.options);
		const id = to_token(text);

		set_attribute(token, 'id', id, url);
	}

	function backtrack(token, index, queue) {
		const decrementor = index - 1;
		const attributes = get_last(queue, decrementor);

		if (attributes) {
			const [start] = get_opener(token, decrementor, queue);

			set_custom_attributes(attributes, start);
		}

		if (is_unanchored_heading(token.type, attributes?.id)) {
			const [start, index] = get_opener(token, decrementor, queue);

			set_heading_anchor(start, index, id_key);
		}
	}

	function traverse(queue) {
		const entry_list = queue.entries();

		function use_type(token, index) {
			if (is_suported_type(token.type)) {
				backtrack(token, index, queue);
			} else if (token.type === 'inline') {
				traverse(token.children);
			}
		}

		for (const [index, token] of entry_list) {
			use_type(token, index);
		}
	}

	traverse(token_list);
}
