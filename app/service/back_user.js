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
   * @param {object} params 用户名
   */
  async queryUser(params) {
    const { app } = this;

    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        const value = params[key];
        if (!value) delete params[key];
      }
    }

    try {
      const result = await app.mysql.select('back_user', { where: { ...params, is_delete: 0 } });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 更新用户
   * @param {object} params 用户信息
   */
  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('back_user', params, { where: { id: params.id } });
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
   * 更改用户状态
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
