// const Router = require('koa-router');
// const posts = require('./posts');

import Router from 'koa-router';
import posts from './posts/index.js';

const api = new Router();

// api.get('/test', (ctx) => {
//   ctx.body = 'test success';
// });

api.use('/posts', posts.routes());

// module.exports = api;
export default api;
