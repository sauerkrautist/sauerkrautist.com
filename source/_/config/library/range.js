const log = require('./log');
const {
	is_integer,
	is_integer_range,
} = require('./type');

module.exports = range;

const EN_DASH = '–';

/**
 * @param {number|number[]} value
 * @returns {string}
 */
function range(value) {
	if (is_integer(value)) {
		return String(value);
	}

	if (is_integer_range(value)) {
		return value.join(EN_DASH);
	}

	log(`range(value): value must be an integer or a tuple of two incrementing integers`);
}
