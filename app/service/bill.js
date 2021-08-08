const { Service } = require('egg');

class BillService extends Service {
  /**
   * 添加账单
   * @param params
   * @returns {Promise<*|null>}
   */
  async add(params) {
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
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
    const { ctx, app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    let sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BillService;
