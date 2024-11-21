const abbreviations = require('./abbreviations');

const { entries } = Object;

//#region defaults
const layout = 'article.njk';
const lang_default = 'en';
const name = 'sauerkrautist';
const catchphrase = 'l’enfer, c’est les allistes';
const description = "The Elements of Autistic Style: neuroqueering the square roots of white Western culture.";
//#endregion

//#region the verbose & wordy bits
const AD = 'Asperger’s disorder';
const AS = 'Asperger syndrome';
const ASD = 'Autism Spectrum Disorder';
const ASPERGER_THESIS = 'Die „Autistischen Psychopathen“ im Kindesalter';
const APA = 'American Psychiatric Association';
const DSM = 'Diagnostic and Statistical Manual of Mental Disorders';
const WHO = 'World Health Organization';
//#endregion

// TODO organize citations as data (not here :)
const DEMENTIA_PRAECOX = {
	author: 'Eugen Bleuler',
	title: [
		'Dementia praecox oder Gruppe der Schizophrenien',
		'https://archive.org/details/b21296157',
	],
	lang: 'de',
	year: 1911,
};

const GIT_SOURCE_BRANCH = 'main';
const GITHUB_REPO = 'https://github.com/sauerkrautist/sauerkrautist.com';
const GITHUB_ISSUE = `${GITHUB_REPO}/issues`;

const lang = lang_default;
const year = new Date().getFullYear();

const favicon = [
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
	'<text y=".99em" font-size="90">🏳️‍🌈</text>',
	'</svg >',
]
	.join('')
	.replaceAll('"', '%22');

// FIXME eleventy actually calls data functions
function to_html(accumulator, [key, value]) {
	accumulator[`_${key}_`] = value();

	return accumulator
}

// we use these in shortcode parameters
const html = entries(abbreviations).reduce(to_html, {});

const global_data = {
	...html,
	AD,
	AS,
	ASD,
	APA,
	DSM,
	WHO,
	ASPERGER_THESIS,
	DEMENTIA_PRAECOX,
	GIT_SOURCE_BRANCH,
	GITHUB_ISSUE,
	GITHUB_REPO,
	catchphrase,
	description,
	favicon,
	lang,
	lang_default,
	layout,
	name,
	year,
};

module.exports = {
	global_data,
	use_global_data(configuration) {
		for (const item of entries(global_data)) {
			configuration.addGlobalData(...item);
		}
	},
};
