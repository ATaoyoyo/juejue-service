'use strict';
const { Controller } = require('egg');
const { successMsg } = require('../help/result');

class TypeController extends Controller {
  async get() {
    const { ctx, app } = this;
    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);

      if (!decode) return;
      const result = await ctx.service.type.get();
      ctx.body = successMsg({ data: result });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = TypeController;
