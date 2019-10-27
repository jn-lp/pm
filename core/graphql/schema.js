const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
		name: String
	}
`);

module.exports = schema;
