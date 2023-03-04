const test = require('node:test');
const {
	strictEqual: equal,
} = require('assert');
const {
	is_array,
	is_boolean,
	is_function,
	is_integer,
	is_integer_range,
	is_null,
	is_number,
	is_object,
	is_ordered_integer_pair,
	is_string,
	is_undefined,
} = require('./type');

test('boolean', () => {
	equal(is_boolean(true), true);
});

test('boolean empty string', () => {
	equal(is_boolean(''), false);
});

test('boolean zero', () => {
	equal(is_boolean(0), false);
});

test('string', () => {
	equal(is_string('hello'), true);
});

test('string empty', () => {
	equal(is_string(''), true);
});

test('number', () => {
	equal(is_number(42), true);
});

test('number numeric', () => {
	equal(is_number('42'), false);
});

test('number zero', () => {
	equal(is_number(0), true);
});

test('integer', () => {
	equal(is_integer(2), true);
});

test('integer float', () => {
	equal(is_integer(1.4), false);
});

test('ordered integer pair', () => {
	equal(is_ordered_integer_pair([1, 2]), true);
});

test('ordered integer pair range sub', () => {
	equal(is_ordered_integer_pair([1]), false);
});

test('ordered integer pair range sup', () => {
	equal(is_ordered_integer_pair([1, 2, 3]), false);
});

test('ordered integer pair numeric', () => {
	equal(is_ordered_integer_pair([1, '2']), false);
});

test('integer range', () => {
	equal(is_integer_range([1, 2]), true);
});

test('integer range reversed', () => {
	equal(is_integer_range([2, 1]), false);
});

test('integer range equal', () => {
	equal(is_integer_range([2, 2]), false);
});

test('function arrow', () => {
	equal(is_function(() => ''), true);
});

test('function is_function', () => {
	equal(is_function(is_function), true);
});

test('array initializer', () => {
	equal(is_array([]), true);
});

test('array constructed', () => {
	equal(is_array(new Array()), true);
});

test('object literal', () => {
	equal(is_object({}), true);
});

test('object constructed', () => {
	equal(is_object(new Object()), true);
});

test('object null', () => {
	equal(is_object(null), false);
});

test('null', () => {
	equal(is_null(null), true);
});

test('undefined', () => {
	equal(is_undefined(undefined), true);
});
