'use strict';
const { Service } = require('egg');

class BackUserService extends Service {
  /**
   * 注册后台用户
   * @param {Objecet} params 用户参数
   */
  async register(params) {
    const { app } = this;
    const { username, password, phone, used, nickname } = params;
    try {
      const result = await app.mysql.insert('back_user', {
        username,
        password,
        phone,
        used,
        nickname,
        is_delete: 0,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * 查询用户
   * @param {string} username 用户名
   * @param {number} used 用户状态
   */
  async queryUser(username, used) {
    const { app } = this;

    try {
      let result;
      if (username || used) {
        result = await app.mysql.get('back_user', { username, used, is_delete: 9 });
      } else {
        result = await app.mysql.select('back_user');
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 删除用户
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
  /**
   *
   * @param {string} id 用户ID
   * @param {number} used 用户状态
   */
  async changeState(id, used) {
    try {
      const { app } = this;
      const result = await app.mysql.update('back_user', { id, used });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BackUserService;
