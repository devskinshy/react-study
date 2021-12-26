// let postId = 1;
// const posts = [
//   {
//     id: 1,
//     title: 'title',
//     body: 'body',
//   },
// ];

// export const list = (ctx) => {
//   ctx.body = posts;
// };

// export const write = (ctx) => {
//   const { title, body } = ctx.request.body;
//   postId += 1;
//   const post = { id: postId, title, body };
//   posts.push(post);
//   ctx.body = post;
// };

// export const read = (ctx) => {
//   const { id } = ctx.params;
//   const post = posts.find((p) => p.id.toString() === id);

//   if (!post) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'not fount post',
//     };
//     return;
//   }

//   ctx.body = post;
// };

// export const remove = (ctx) => {
//   const { id } = ctx.params;
//   const index = posts.findIndex((p) => p.id.toString() === id);

//   if (!~index) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'not fount post',
//     };
//     return;
//   }

//   posts.splice(index, 1);
//   ctx.status = 204;
// };

// export const replace = (ctx) => {
//   const { id } = ctx.params;
//   const index = posts.findIndex((p) => p.id.toString() === id);

//   if (!~index) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'not fount post',
//     };
//     return;
//   }

//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   };

//   ctx.body = posts[index];
// };

// export const update = (ctx) => {
//   const { id } = ctx.params;
//   const index = posts.findIndex((p) => p.id.toString() === id);

//   if (!~index) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'not fount post',
//     };
//     return;
//   }

//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body,
//   };

//   ctx.body = posts[index];
// };

import Post from '../../modules/posts.js';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

const MAX_PAGE = 10;
const MAX_BODY = 30;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(MAX_PAGE)
      .skip((page - 1) * MAX_PAGE)
      .lean()
      .exec();

    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
      // .map((post) => post.toJSON())
      .map((post) => ({
        ...post,
        body:
          post.body.length < MAX_BODY
            ? post.body
            : `${post.body.slice(0, MAX_BODY)}...`,
      }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: 'not fount post',
      };
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일 때는 업데이트되기 전의 데이터를 반환합니다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: 'not fount post',
      };
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
