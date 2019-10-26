const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {}
`);

module.exports = schema;
