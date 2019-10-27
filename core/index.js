const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')();
const mount = require('koa-mount');
const convert = require('koa-convert')
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema')

const Users = require('./db/models/users')

const app = new Koa();
const router = new Router();

app.use(router.routes())
app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

router.post('/api/v1/users', koaBody, async ctx => {
	ctx.status = 201;
	ctx.body = await Users.create(JSON.parse(ctx.request.body))
});

router.get('/api/v1/users', async ctx => {
	ctx.body = await Users.getAll()
});

router.get('/api/v1/users/:id', async ctx => {
	ctx.body = await Users.getOne(ctx.params.id)
});

router.put('/api/v1/users/:id', koaBody, async ctx => {
	ctx.body = await Users.update(ctx.params.id, JSON.parse(ctx.request.body))
});

router.delete('/api/v1/users/:id', async ctx => {
	ctx.body = await Users.delete(ctx.params.id)
});

app.on('error', err => {
  console.error('server error', err)
});

app.listen(3000);
