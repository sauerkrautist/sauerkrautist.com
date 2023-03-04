const state = require('../library/state');

module.exports = ref_targets;

const { values } = Object;

function ref_targets() {
	const { url } = this.page;

	if (state.refs[url]) {
		const buffer = ['<p id="aria-endnote">Endnote </p>'];

		for (const { index } of values(state.refs[url])) {
			buffer.push(
				`<p id="aria-${index}">${index}</p>`,
			);
		}

		return buffer.join('');
	}

	return '';
}
