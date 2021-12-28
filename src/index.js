import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';
// import createFakeData from './createFakeData.js';

const app = new Koa();
const router = new Router();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    user: 'root',
    pass: 'root',
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// require('dotenv').config();
// const Koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose');
// const api = require('./api');

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
