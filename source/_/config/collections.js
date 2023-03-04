// TODO currently unused, archive the idea next spring cleaning

module.exports = collections;

const { entries } = Object;

const collectors = {
	articles(api) {
		return api.getFilteredByGlob('*/articles/*.md');
	},
};

function collections(configuration) {
	for (const entry of entries(collectors)) {
		configuration.addCollection(...entry);
	}
}
