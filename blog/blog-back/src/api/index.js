import Router from 'koa-router';
import posts from './posts/index.js';
import auth from './auth/index.js';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

export default api;

// const Router = require('koa-router');
// const posts = require('./posts');

// api.get('/test', (ctx) => {
//   ctx.body = 'test success';
// });

// module.exports = api;
