'use strict';
const { Service } = require('egg');

class BackUserService extends Service {
  /**
   * 注册后台用户
   * @param {Objecet} params 用户参数
   */
  async register(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('back_user', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * 查询用户
   * @param {string} username 用户名
   * @param {number} is_delete 用户状态
   */
  async queryUser(username, is_delete) {
    const { app } = this;

    try {
      let result;
      if (username || is_delete) {
        result = await app.mysql.get('back_user', { username, is_delete });
      } else {
        result = await app.mysql.select('back_user');
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param {string|number} id 用户id
   */
  async delete(id) {
    try {
      const { app } = this;
      const result = await app.mysql.update('back_user', { is_delete: 1 }, { where: { id } });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BackUserService;
