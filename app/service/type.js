'use strict';

const { Service } = require('egg');
const { throws } = require('power-assert');

class TypeService extends Service {
  /**
   * 查询所有账单类型
   * @param {string} id 用户id
   */
  async get(id) {
    const { app } = this;
    try {
      const statement = "SELECT * from type WHERE 'default' = 0 OR user_id = ?";

      const result = await app.mysql.query(statement, [ id ]);

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

  /**
   *
   * @param {string} name 查询账单类型是否创建
   * @param {string} id 用户id
   */
  async isCreated(name, id) {
    const { app } = this;
    try {
      const result = await app.mysql.get('type', { name, user_id: id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TypeService;
