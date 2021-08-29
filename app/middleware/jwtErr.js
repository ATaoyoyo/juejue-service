'use strict';

const { errorMsg } = require('../help/result');

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const token = ctx.header.authorization;
    let decode;

    if (token !== 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, ctx.app.jwt.secret);
        ctx.userInfo = decode;
        await next();
      } catch (e) {
        console.log(e);
        ctx.status = 200;
        ctx.body = errorMsg({ code: 401, message: 'token已过期，请重新登陆' });

      }
    } else {
      ctx.status = 200;
      ctx.body = errorMsg({ code: 401, message: 'token不存在' });
    }
  };
};
