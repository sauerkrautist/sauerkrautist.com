module.exports = cn;

const { assign, create } = Object;

const cn_map = assign(create(null), {
	$satire: `<i lang="de">Achtung Satire!</i>`,
});

const resolve_cn = value =>
	cn_map[value]
	|| `<i>${value}</i>`;

function cn(input) {
	const triggers = (typeof input == 'string')
		? resolve_cn(input)
		: input
			.map(word => resolve_cn(word))
			.join(', ');

	return `<div>Content notice: ${triggers}</div>`;
}
