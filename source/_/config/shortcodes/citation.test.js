const test = require('node:test');
const {
	strictEqual,
} = require('assert');
const citation = require('./citation');

const base = {
	title: ['Hello', 'https://example.org/'],
	year: 1999,
};

// 💡 The expected values are the HTML literals that are later sanitized by the minifier.

//#region Books

test('Book', () => {
	const data = {
		...base,
		author: 'Jane Doe',
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book lang', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		lang: 'es',
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="${data.lang}"><cite>${data.title[0]}</cite></a>`,
		`(${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book two authors', () => {
	const data = {
		...base,
		author: ['Simon', 'Garfunkel'],
	};
	const actual = citation(data);
	const expected = [
		`${data.author.join(' & ')},`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book three authors', () => {
	const data = {
		...base,
		author: ['Crosby', 'Stills', 'Nash'],
	};
	const actual = citation(data);
	const expected = [
		`${data.author[0]}, ${data.author[1]} & ${data.author[2]},`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book four authors', () => {
	const data = {
		...base,
		author: ['Crosby', 'Stills', 'Nash', 'Younf'],
	};
	const actual = citation(data);
	const expected = [
		`${data.author[0]}, ${data.author[1]}, ${data.author[2]} & ${data.author[3]},`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book page', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		page: 7,
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}), page ${data.page}. `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book page range', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		page: [7, 11],
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}), pages ${data.page.join('–')}. `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Book translator', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		translator: 'Hans Dampf',
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang=""><cite>${data.title[0]}</cite></a>`,
		`(${data.year}).`,
		`Translated by ${data.translator}. `,
	].join(' ');

	strictEqual(actual, expected);
});

//#endregion

//#region Anthologies

test('Chapter', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Female Scientists',
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>,`,
		`<cite lang="">${data.context}</cite> (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Chapter lang', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Female Scientists',
		lang: 'de',
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang="${data.lang}">${data.title[0]}</a>,`,
		`<cite lang="${data.lang}">${data.context}</cite> (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Chapter page', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Female Scientists',
		page: 27
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>.`,
		`<cite lang="">${data.context}</cite> (${data.year}), page ${data.page}. `,
	].join(' ');

	strictEqual(actual, expected);
});

//#endregion

//#region Articles

test('Periodical article', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Lego & Railroads',
		volume: 7,
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>.`,
		`<cite lang="">${data.context}</cite>,`,
		`volume ${data.volume} (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Periodical article period', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Lego & Railroads',
		volume: 7,
		period: 'Spring',
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>.`,
		`<cite lang="">${data.context}</cite>,`,
		`volume ${data.volume} (${data.period} ${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Periodical article issue', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Lego & Railroads',
		volume: 7,
		issue: 3,
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>.`,
		`<cite lang="">${data.context}</cite>,`,
		`volume ${data.volume} / issue ${data.issue} (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Periodical article issue period', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Lego & Railroads',
		volume: 7,
		issue: 3,
		period: 'Spring',
	};
	const actual = citation(data);
	const expected = [
		`${data.author},`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>.`,
		`<cite lang="">${data.context}</cite>,`,
		`volume ${data.volume} / issue ${data.issue} (${data.period} ${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Periodical article page', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		title: 'Hello',
		context: 'Lego & Railroads',
		volume: 7,
		page: 3,
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`${data.title},`,
		`<cite lang="">${data.context}</cite>.`,
		`Volume ${data.volume} (${data.year}), page ${data.page}. `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Periodical article page & lang', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		title: 'Hello',
		context: 'Lego & Railroads',
		lang: 'fr',
		volume: 7,
		page: 3,
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<span lang="${data.lang}">${data.title}</span>,`,
		`<cite lang="${data.lang}">${data.context}</cite>.`,
		`Volume ${data.volume} (${data.year}), page ${data.page}. `,
	].join(' ');

	strictEqual(actual, expected);
});

//#endregion

//#region TV shows

test('Episode', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Breaking Early',
		episode: 5,
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>,`,
		`<cite lang="">${data.context}</cite>.`,
		`Episode ${data.episode} (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

test('Episode series', () => {
	const data = {
		...base,
		author: 'Jane Doe',
		context: 'Breaking Early',
		episode: [2, 5],
	};
	const actual = citation(data);
	const expected = [
		`${data.author}.`,
		`<a href="${data.title[1]}" lang="">${data.title[0]}</a>,`,
		`<cite lang="">${data.context}</cite>.`,
		`Series ${data.episode[0]}, episode ${data.episode[1]} (${data.year}). `,
	].join(' ');

	strictEqual(actual, expected);
});

//#endregion
