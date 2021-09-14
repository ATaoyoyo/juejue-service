'use strict';
const { Service } = require('egg');

class UserService extends Service {
  /**
   * 查询用户信息
   * @param username {string}
   * @return {Promise<*|null>}
   */
  async getUserByName(username) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 注册用户
   * @param params
   * @return {Promise<*|null>}
   */
  async register(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('user', params);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 编辑用户
   * @param params
   * @return {Promise<*|null>}
   */
  async editUserInfo(params) {
    console.log('params:', params);
    const { app, ctx } = this;
    try {
      const result = await app.mysql.update('user', { ...params }, { where: { id: params.id } });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 编辑用户密码
   * @param {*} params
   * @return
   */
  async editUserPassword(params) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.update(
        'user',
        { password: params.newPass },
        { where: { id: params.id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = UserService;
