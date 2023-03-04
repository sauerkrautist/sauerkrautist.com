module.exports = rules;

const { entries } = Object;

function rules(markdown) {
	const map = {
		em: 'i',
		strong: 'em',
	};

	const { rules } = markdown.renderer;

	for (const [key, value] of entries(map)) {
		rules[`${key}_open`] = (tokens, index, options, env, self) => `<${value} ${self.renderAttrs(tokens[index])}>`;
		rules[`${key}_close`] = () => `</${value}>`;
	}
}
