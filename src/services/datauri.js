const DatauriParser = require('datauri/parser')
const parser = new DatauriParser()

exports.dateUri = (file) => parser.format('jpeg', file.buffer)
