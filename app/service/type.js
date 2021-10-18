'use strict';

const { Service } = require('egg');

class TypeService extends Service {
  /**
   * 查询所有账单类型
   * @param {string} id 用户id
   */
  async get(id) {
    const { app } = this;
    try {
      const result = await app.mysql.select('type', { default: 0 }, {
        where: { user_id: id },
      });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 创建账单类型
   * @param {Objecet} params 创建账单类型参数
   */
  async create(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('type', params);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TypeService;
