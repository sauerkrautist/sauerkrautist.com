/* eslint-env browser */

const { parse } = JSON;

const { pathname } = location;
const details = document.querySelectorAll('details');
const global = [
	'pub-disclaimer',
];

for (const element of details) {
	initialize(element);
}

function get_key(element) {
	const { name } = element.dataset;
	const token = `details:${name}`;

	if (global.includes(name)) {
		return token;
	}

	return `${pathname}:${token}`;
}

function initialize(element) {
	const key = get_key(element);
	const state = parse(localStorage.getItem(key));

	if (state === false) {
		element.open = state;
	}
}

function on_toggle({ target }) {
	const { open } = target;
	const key = get_key(target);

	localStorage.setItem(key, open);
}

document.addEventListener('toggle', on_toggle, true);
