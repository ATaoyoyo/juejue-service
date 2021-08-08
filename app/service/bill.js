const { Service } = require('egg');

class BillService extends Service {
  /**
   * 添加账单
   * @param params
   * @returns {Promise<*|null>}
   */
  async add(params) {
    const { app } = this;
    try {
      return await app.mysql.insert('bill', params);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 查询账单
   * @param id
   * @returns {Promise<*>}
   */
  async list(id) {
    const { app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    let sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      return await app.mysql.query(sql);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 查询账单详情
   * @param id
   * @param user_id
   * @returns {Promise<*|null>}
   */
  async detail(id, user_id) {
    const { app } = this;
    try {
      return await app.mysql.get('bill', { id, user_id });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 更新账单
   * @param params
   * @returns {Promise<void>}
   */
  async update(params) {
    const { app } = this;
    try {
      const value = { id: params.id, user_id: params.user_id };
      return await app.mysql.update('bill', { ...params }, value);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 删除账单
   * @param id
   * @param user_id
   * @returns {Promise<*|null>}
   */
  async delete(id, user_id) {
    const { app } = this;
    try {
      return await app.mysql.delete('bill', { id, user_id });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = BillService;
