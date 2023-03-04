const set_id = require('../library/set_id');
const token = require('../library/token');

module.exports = nav_section;

function nav_section(content, heading, id) {
	const _id = id || set_id(
		token(heading).replace(/^the-/, ''),
		this.page.url
	);

	return `
			<h2 id="${_id}">${heading}</h2>
			<nav aria-labelledby="${_id}">
				${content}
			</nav>
		`;
}
