const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);
//   // next();

//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401;
//     return;
//   }

//   // next().then(() => {
//   //   console.log('END');
//   // });

//   await next();

//   console.log('END');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use((ctx) => {
//   console.log(3);
//   ctx.body = 'hello world';
// });

// router.get('/', (ctx) => {
//   ctx.body = 'home';
// });
// router.get('/about/:name?', (ctx) => {
//   const { name } = ctx.params;
//   ctx.body = name ? `${name}'s about` : 'about';
// });
// router.get('/posts', (ctx) => {
//   const { id } = ctx.query;
//   ctx.body = id ? `post #${id}` : 'not fount post';
// });

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
