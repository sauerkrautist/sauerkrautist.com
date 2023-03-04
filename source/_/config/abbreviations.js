const caps = require('./html/caps');

const DSM = () => caps('DSM');
const DSM4 = () => [DSM(), caps('IV')].join('-');
const DSM5 = () => [DSM(), 5].join('-');

// We expose abbreviations as shortcodes because they contain HTML
// and it is cumbersome to always use the `safe` filter.
// We also expose them as global data, however, because we sometimes
// need them in shortcode parameter objects or arrays.
module.exports = {
	ADHD: () => caps('ADHD'),
	APA: () => caps('APA'),
	ARIA: () => caps('ARIA'),
	AD: () => caps('AD'),
	AS: () => caps('AS'),
	ASD: () => caps('ASD'),
	COVID19: () => `${caps('COVID')}-19`,
	DSM,
	DSM4,
	DSM4TR: () => [DSM4(), caps('TR')].join('-'),
	DSM5,
	DSM5TR: () => [DSM5(), caps('TR')].join('-'),
	ICD: () => caps('ICD'),
	NPD: () => caps('NPD'),
	OCD: () => caps('OCD'),
	ToM: () => [caps('T'), caps('M')].join('o'),
	WCAG: () => caps('WCAG'),
	WHO: () => caps('WHO'),

	US: () => [caps('U'), '.', caps('S'), '.'].join(''),

	CSS: () => caps('CSS'),
	HTML: () => caps('HTML'),
	HTTP: () => caps('HTTP'),
	SGML: () => caps('SGML'),
};
