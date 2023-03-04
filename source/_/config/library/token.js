// TODO could be replaced by exposing the slugify filter

const kebabcase = require('lodash.kebabcase');
const unidecode = require('unidecode');

const token = value => kebabcase(unidecode(value));

module.exports = token;
