const log = require('../library/log');
const range = require('../library/range');

module.exports = citation;

const { assign, create, entries } = Object;

const identity = value => value;

const join = value => value.join('');

//#region types

const { isArray: is_array } = Array;
const { isInteger: is_integer } = Number;

const is_defined = value => value !== undefined;

const is_positive_integer = value => (
	typeof value == 'number'
	&& is_integer(value)
	&& value > 0
);

function is_increment_range(value) {
	const [from, to, ...rest] = value;

	return (
		!rest.length
		&& (from < to)
	);
}

const is_positive_integer_array = value => (
	is_array(value)
	&& value.every(is_positive_integer)
	&& is_increment_range(value)
);

//#endregion

//#region edition

const ordinals = [
	'st',
	'nd',
	'rd',
	'th',
];

/**
 *
 * @param {number} index
 * @returns {string}
 */
function get_edition(index) {
	const max = 4;

	const ordinal = (index < max)
		? index - 1
		: max - 1;


	return `${index}${ordinals[ordinal]} edition`;
}

//#endregion

function parenthetical(year, { edition, period }) {
	if (edition) {
		return [get_edition(edition), year].join(', ');
	}

	if (period) {
		return [period, year].join(' ');
	}

	return year;
}

//#region generic name
/*
Applies to the fields
- author
- TODO (maybe) publisher
- translator
*/

/**
 * @param {Array} list
 * @returns
 */

function author_list(list) {
	const glue = ', ';
	const ampersand = ' & ';
	const offset = (list.length - 1);
	const last = list[offset];
	const rest = list.slice(0, offset);

	return [
		rest.join(glue),
		last,
	].join(ampersand);
}

function collaborators(value) {
	if (is_array(value)) {
		return author_list(value)
	}

	return value;
}

/**
 * @param {string|Array} value
 * @returns {string}
 */
function $name(value) {
	if (typeof value == 'string') {
		return value;
	}

	return collaborators(value);
}

//#endregion

//#region links

const cite = (text, lang = '') => `<cite lang="${lang}">${text}</cite>`;

const link = (content, url, lang = '') =>
	`<a href="${url}" lang="${lang}">${content}</a>`;

function $cite(value, lang) {
	if (is_array(value)) {
		const [title, url] = value;

		return link(`<cite>${title}</cite>`, url, lang);
	}

	return cite(value, lang);
}

function $title(value, lang) {
	if (is_array(value)) {
		const [title, url] = value;

		return link(title, url, lang);
	}

	return lang ? `<span lang="${lang}">${value}</span>` : value;
}

//#endregion

//#region linter

const is_rangeable = value => (
	is_positive_integer(value)
	|| is_positive_integer_array(value)
);

const rules = [
	function ({ episode, volume }) {
		if (episode && volume) {
			log('Citation: episode and volume are mutually exclusive');
		}
	},
	function ({ edition }) {
		if (is_defined(edition) && !is_positive_integer(edition)) {
			log('Citation: edition must be a positive integer');
		}
	},
	function ({ page }) {
		if (is_defined(page) && !is_rangeable(page)) {
			log('Citation: page must be either of');
			log(' - a positive integer');
			log(' - an array of two incrementing positive integers');
		}
	},
	function ({ volume }) {
		if (is_defined(volume) && !is_positive_integer(volume)) {
			log('Citation: volume must be a positive integer');
		}
	},
	function ({ year }) {
		if (is_defined(year) && !is_rangeable(year)) {
			log('Citation: year must be a positive integer');
		}
	},
];

function lint(options) {
	for (const rule of rules) {
		rule(options);
	}
}

//#endregion

//#region parser

const PERIOD = '. ';
const COMMA = ', ';
const SPACE = ' ';
const EMPTY = '';

const none = (...argument_list) =>
	argument_list.every(value => !value);

const title_comma = [
	({ page, volume }) => (volume && !page),
	({ context, episode, page, volume }) => (
		context
		&& page
		&& none(episode, volume)
	),
	({
		context,
		episode,
		page,
		volume,
	}) => none(context, episode, page, volume),
];

const has_title_comma = options =>
	is_array(options.title) && some(title_comma, options)

const context_comma = [
	({ episode }) => Boolean(episode),
	({ page, volume }) => (page && volume),
	({ page, volume }) => none(page, volume),
];

function some(rules, options) {
	const callback = value => value(options);

	return rules.some(callback);
}

function title_interpunction(value, options) {
	if (!options.author) {
		return EMPTY;
	}

	if (has_title_comma(options)) {
		return COMMA;
	}

	return PERIOD;
}

function context_interpunction(options) {
	if (some(context_comma, options)) {
		return COMMA;
	}

	return PERIOD;
}

const parser = assign(create(null), {
	author(value) {
		return [EMPTY, $name(value)];
	},
	context(value, { lang, ...rest }) {
		const interpunction = context_interpunction(rest);

		return [interpunction, $cite(value, lang)];
	},
	episode(value) {
		if (is_array(value)) {
			const [series, episode] = value;

			return [PERIOD, `Series ${series}, episode ${episode}`];
		}

		return [PERIOD, `Episode ${value}`];
	},
	issue(value) {
		return [' / ', `issue ${value}`];
	},
	page(value) {
		const result = [COMMA];

		if (is_positive_integer(value)) {
			result.push(`page ${value}`);
		}

		if (is_positive_integer_array(value)) {
			result.push(`pages ${range(value)}`);
		}

		return result;
	},
	title(value, {
		context,
		lang,
		...rest
	}) {
		const interpunction = title_interpunction(value, { context, ...rest });
		const result = [interpunction];

		if (context) {
			result.push($title(value, lang));
		} else {
			result.push($cite(value, lang));
		}

		return result;
	},
	translator(value) {
		return [PERIOD, `Translated by ${value}`];
	},
	volume(value, { page }) {
		const interpunction = page ? PERIOD : COMMA;
		const initial = interpunction === PERIOD ? 'V' : 'v';

		return [interpunction, `${initial}olume ${value}`];
	},
	year(...argument_list) {
		const result = parenthetical(...argument_list);

		return [SPACE, `(${result})`];
	},
});

function parse_options(options) {
	function to_parsed_values(accumulator, [key, value]) {
		if (parser[key]) {
			accumulator[key] = parser[key](value, options)
		}

		return accumulator;
	}

	lint(options);

	return entries(options).reduce(to_parsed_values, create(null));
}

/**
 * 💡 `edition`, `lang` & `period` are only used by the parser
 * @param {object} options
 * @returns {Array} Sorted parsed values
 */
const order = ({
	author,
	context,
	episode,
	issue,
	page,
	title,
	translator,
	volume,
	year,
}) => [
	author,
	title,
	context,
	episode,
	volume,
	issue,
	year,
	page,
	translator,
].filter(identity);

//#endregion

/**
 * @param {object}          options
 * @param {string|string[]} options.author
 * @param {string}          options.context
 * @param {number}          options.edition
 * @param {number|number[]} options.episode
 * @param {string}          options.issue
 * @param {string}          options.lang
 * @param {number|number[]} options.page
 * @param {string}          options.period
 * @param {string}          options.title
 * @param {string|string[]} options.translator
 * @param {number}          options.volume
 * @param {number}          options.year
 * @returns {string} HTML fragment
 */
function citation(options) {
	const tokens = parse_options(options);

	return join(order(tokens).map(join)) + PERIOD;
}
