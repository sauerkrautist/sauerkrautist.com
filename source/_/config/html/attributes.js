module.exports = attributes_to_string;

const { entries } = Object;

function normalize_boolean_attribute(key, value) {
	if (value) {
		return key;
	}

	return '';
}

function normalize_data_attribute(data) {
	const buffer = [];

	for (const [key, value] of entries(data)) {
		buffer.push(`data-${key}="${value}"`)
	}

	return buffer.join(' ');
}

function normalize_attribute_value([key, value]) {
	if (typeof value === 'boolean') {
		return normalize_boolean_attribute(key, value);
	}

	if (typeof value === 'object') {
		return normalize_data_attribute(value);
	}

	return `${key}="${value}"`;
}

function attributes_to_string(map) {
	const buffer = [];

	for (const entry of entries(map)) {
		buffer.push(normalize_attribute_value(entry));
	}

	return buffer.join(' ');
}
