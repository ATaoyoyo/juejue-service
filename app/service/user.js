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
   * @param {string} username 用户名
   * @param {string} offset 页数
   * @param {string} limit 条数
   */
  async getAllUser(username, offset = 1, limit = 10) {
    try {
      const { app } = this;
      const where = username ? { username } : {};
      const result = await app.mysql.select('user', {
        where,
        limit: Number(limit),
        offset: offset - 1 ? (Number(offset) - 1) * 10 : 10,
      });

      console.log(result, where, username, typeof offset, limit);
      return result;
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
