const { isArray: is_array } = Array;
const { isInteger: is_integer } = Number;
const { create } = Object;

const snake = value => `is_${value}`;

function to_type_test(accumulator, type) {
	const name = snake(type);
	const test = type
		? value => typeof value === type
		: value => value === type;

	accumulator[name] = test;

	return accumulator;
}

const base = [
	'boolean',
	'function',
	'number',
	'string',
	null,
	undefined,
].reduce(to_type_test, create(null));

const is_object = value => (
	!base.is_null(value)
	&& typeof value == 'object'
);

const is_ordered_pair = array => array.length === 2;

const is_ordered_integer_pair = value => (
	is_array(value)
	&& is_ordered_pair(value)
	&& value.every(is_integer)
);

const is_integer_range = value => (
	is_ordered_integer_pair(value)
	&& value[0] < value[1]
);

module.exports = {
	is_array,
	is_integer,
	is_integer_range,
	is_object,
	is_ordered_pair,
	is_ordered_integer_pair,
	...base,
};
