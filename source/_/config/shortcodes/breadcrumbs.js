module.exports = breadcrumbs;

const link = ({ label, url }) => `<a href="${url}">${label}</a>`;

function to_crumb(crumb) {
	if (typeof crumb == 'string') {
		return crumb;
	}

	return link(crumb);
}

function breadcrumbs(trail) {
	return trail.map(to_crumb).join('');
}
