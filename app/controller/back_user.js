'use strict';

const { Controller } = require('egg');
const { successMsg, errorMsg } = require('../help/result');

class BackUserController extends Controller {
  /**
   * 创建后台用户
   */
  async register() {
    try {
      const { ctx } = this;
      const { username, password } = ctx.request.body;
      const userInfo = await ctx.service.user.getUserByName(username, 'back_user');

      if (!username || !password) {
        ctx.body = errorMsg({ message: '账号密码不能为空' });
        return;
      }

      if (userInfo && userInfo.id) {
        ctx.body = errorMsg({ message: '用户已被注册' });

        return;
      }

      const params = Object.assign(ctx.request.body, { is_delete: 0 });
      const result = await ctx.service.backUser.register(params);
      if (result.affectedRows === 1) {
        ctx.body = successMsg({ message: '注册成功' });
      } else {
        ctx.body = successMsg({ message: '注册失败' });
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  /**
   * 用户登录
   */
  async login() {
    try {
      const { ctx, app } = this;
      const { username, password } = ctx.request.body;
      const userInfo = await ctx.service.user.getUserByName(username, 'back_user');
      if (!userInfo) {
        ctx.body = errorMsg({ message: '用户不存在' });
        return;
      }

      if (password !== userInfo.password) {
        ctx.body = errorMsg({ message: '密码错误！' });
        return;
      }

      const token = app.jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        },
        app.config.jwt.secret
      );

      ctx.body = successMsg({ data: token });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询用户
   */
  async queryUser() {
    try {
      const { ctx } = this;

      ctx.body = ctx.params;

      const result = await ctx.service.backUser.queryUser(ctx.query);

      console.log(result);

      if (result) {
        ctx.body = successMsg({ data: result });
        return;
      }
      ctx.body = successMsg({ data: [] });
    } catch (error) {
      console.log(error);
    }
  }

  async update() {
    try {
      const { ctx } = this;
      if (!ctx.request.body.id) {
        ctx.body = errorMsg({ message: '更新失败，缺少用户Id' });
        return;
      }

      const result = await ctx.service.backUser.update(ctx.request.body);
      if (result.affectedRows === 1) {
        ctx.body = successMsg({ message: '更新成功' });
        return;
      }
      ctx.body = errorMsg({ message: '更新失败' });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 删除用户
   */
  async delete() {
    try {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!id) {
        return (ctx.body = errorMsg({ message: '缺少用户Id' }));
      }
      const result = await ctx.service.backUser.delete(id);
      if (result.affectedRows === 1) {
        return (ctx.body = successMsg({ message: '删除成功' }));
      }
      ctx.body = errorMsg({ message: '删除失败' });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 改变用户状态
   */
  async changeState() {
    try {
      const { ctx } = this;
      const { id, used } = ctx.request.body;
      if (!id) {
        return (ctx.body = errorMsg({ message: '缺少用户Id' }));
      }
      const result = await ctx.service.backUser.changeState(id, used);
      if (result.affectedRows === 1) {
        return (ctx.body = successMsg({ message: '改变成功' }));
      }
      ctx.body = errorMsg({ message: '删除失败' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BackUserController;
