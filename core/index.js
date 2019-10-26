const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema')

const Users = require('./db/models/users')

const app = new Koa();

// app.use(mount('/api/v1/users', Users.getAll()));

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

app.listen(3001);

app.on('error', err => {
  console.error('server error', err)
});
