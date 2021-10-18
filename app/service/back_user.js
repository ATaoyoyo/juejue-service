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
   */
  async queryUser(username) {
    const { app } = this;

    try {
      let result;
      if (username) {
        result = await app.mysql.get('back_user', { username });
      } else {
        result = await app.mysql.select('back_user', { where: { is_delete: 0 } });
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BackUserService;
