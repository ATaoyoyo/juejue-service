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
}

module.exports = BillService
