'use strict';
const { Service } = require('egg');

class UserService extends Service {
  /**
   * 查询用户信息
   * @param {string} username  用户名
   * @param {string} table 表名
   */
  async getUserByName(username, table = 'user') {
    const { app } = this;

    try {
      const result = await app.mysql.get(table, { username });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 查询符合条件的所有用户
   * @param {object}} param 用户名
   */
  async getAllUser({ username, page, size } = { username: null, page: 1, size: 10 }) {
    try {
      const { app } = this;
      const where = username ? { username } : {};
      const result = await app.mysql.select('user', {
        where,
        limit: Number(size),
        offset: page - 1 ? (Number(page) - 1) * 10 : 0,
      });
      const count = await app.mysql.count('user');

      console.log(count);
      return { result, count };
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 注册用户
   * @param {object} params 用户信息
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
   * @param {object} params 用户信息
   */
  async editUserInfo(params) {
    console.log('params:', params);
    const { app } = this;
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
   * @param {*} params 用户密码及id
   */
  async editUserPassword(params) {
    const { app } = this;
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
