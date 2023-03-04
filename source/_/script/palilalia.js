/* eslint-env browser */

const DELAY = 2000;
const INTERVAL = 3000;
const footer = document.querySelector('main > footer');
const fragment = footer.previousElementSibling;
const { id } = fragment.querySelector('h2');
let index = 0;

function append() {
	const clone = fragment.cloneNode(true);

	clone.querySelector('h2').id = `${id}-${++index}`;
	footer.before(clone);
}

function initialize() {
	window.setInterval(append, INTERVAL);
}

window.setTimeout(initialize, DELAY);
