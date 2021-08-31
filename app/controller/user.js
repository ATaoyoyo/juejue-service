'use strict';

const { Controller } = require('egg');
const { successMsg, errorMsg } = require('../help/result');

// 默认头像
const defaultAvatar =
  'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  /**
   *  注册
   * @return {Promise<void>}
   */
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);

    if (!username || !password) {
      ctx.body = errorMsg({ message: '账号密码不能为空' });

      return;
    }

    if (userInfo && userInfo.id) {
      ctx.body = errorMsg({ message: '用户已被注册，请重新输入！' });

      return;
    }

    const params = { username, password, signature: '世界和平。', avatar: defaultAvatar };
    const result = await ctx.service.user.register(params);
    if (result) {
      ctx.body = successMsg({ message: '注册成功' });
    } else {
      ctx.body = errorMsg({ message: '注册失败' });
    }
  }

  /**
   * 登陆
   * @return {Promise<void>}
   */
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const userInfo = await ctx.service.user.getUserByName(username);

    if (!userInfo || !userInfo.id) {
      ctx.body = errorMsg({ message: '用户不存在' });
      return;
    }

    if (password !== userInfo.password) {
      ctx.body = errorMsg({ message: '密码错误' });
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
  }

  /**
   * 获取用户信息
   * @return {Promise<void>}
   */
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    ctx.body = successMsg({
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature,
        avatar: userInfo.avatar || defaultAvatar,
      },
    });
  }

  /**
   * 编辑用户信息
   * @return {Promise<void>}
   */
  async editUserInfo() {
    const { ctx, app } = this;
    const { signature = '', avatar = '' } = ctx.request.body;
    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      await ctx.service.user.editUserInfo({ ...userInfo, signature, avatar });

      ctx.body = successMsg({
        data: {
          id: decode.id,
          username: userInfo.username,
          signature,
          avatar,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async test() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = successMsg({ data: decode });
  }
}

module.exports = UserController;
