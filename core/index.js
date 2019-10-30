const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const koaBody = require('koa-body')();
const { errorHandler, authenticated } = require('./middleware/');

const { authController } = require('./controllers/')

const app = new Koa();
const router = new Router();

app.use(errorHandler)
app.use(cors())

router.post('/signup', koaBody, authController.signup);
router.post('/login', koaBody, authController.login);

router.get('/test', authenticated, async ctx => {ctx.body = 'protected data test'})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT || 5000);
