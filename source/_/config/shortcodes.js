const breadcrumbs = require('./shortcodes/breadcrumbs');
const caps = require('./html/caps');
const citation = require('./shortcodes/citation');
const cn = require('./shortcodes/cn');
const range = require('./library/range');
const ref = require('./shortcodes/ref');
const ref_targets = require('./shortcodes/ref_targets');
const table = require('./shortcodes/table');
const toc = require('./shortcodes/toc');
const topics = require('./shortcodes/topics');
const topic_toc = require('./shortcodes/topic_toc');
const {
	global_data: {
		GIT_SOURCE_BRANCH,
		GITHUB_REPO,
	},
} = require('./data');

function git_url(view, file) {
	const raw = `${GITHUB_REPO}/${view}/${GIT_SOURCE_BRANCH}/${file}`;
	const url = new URL(raw);

	return url.href;
}

function site_link(name, url) {
	if (url === this.page.url) {
		return `<a href="${url}#main" aria-current="page">${name}</a>`;
	}

	return `<a href="${url}">${name}</a>`;
}


module.exports = {
	breadcrumbs,
	caps,
	citation,
	cn,
	range,
	ref,
	ref_targets,
	site_link,
	table,
	toc,
	topics,
	topic_toc,

	cite(content, lang = '') {
		return `<cite lang="${lang}">${content}</cite>`;
	},

	git_history(file) {
		return git_url('commits', file);
	},

	git_source(file) {
		return git_url('blobs', file);
	},

	nav() {
		const bound_link = site_link.bind(this);

		return [
			bound_link('about', '/about/'),
			bound_link('sitemap', '/*/'),
		].join(' | ');
	},

	pyramid(scheme, lang) {
		let buffer = '';

		while (scheme.length) {
			const tail = scheme.pop();
			const attributes = scheme.length
				? '' :
				` class="pyramid" lang="${lang}"`;

			buffer = `<ul${attributes}><li>${tail}${buffer}</li></ul>`;
		}

		return buffer;
	},

	var(content) {
		return `<var>${content}</var>`;
	},
};
