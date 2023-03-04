module.exports = table;

const to_col_header = header => `<th scope="col">${header}</th>`;

const to_data_cell = data => `<td>${data}</td>`;

function to_row(row) {
	const [header, ...data] = row;

	return [
		'<tr>',
		'<th>',
		header,
		'</th>',
		...data.map(to_data_cell),
		'</tr>',
	].join('');
}

function table({
	name,
	cols,
	rows,
}) {
	const buffer = ['<table>'];

	if (name) {
		buffer.push(
			'<caption>',
			name,
			'</caption>',
		);
	}

	if (cols) {
		buffer.push(
			'<thead>',
			'<tr>',
			...cols.map(to_col_header),
			'</tr>',
			'</thead>',
		);
	}

	buffer.push(
		'<tbody>',
		...rows.map(to_row),
		'</tbody>',
		'</table>',
	);

	return buffer.join('');
}
