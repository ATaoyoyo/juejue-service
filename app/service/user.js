const { Service } = require('egg');

class UserService extends Service {
  /**
   * 查询用户信息
   * @param username {string}
   * @returns {Promise<*|null>}
   */
  async getUserByName(username) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * 注册用户
   * @param params
   * @returns {Promise<*|null>}
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
   * @param params
   * @returns {Promise<*|null>}
   */
  async editUserInfo(params) {
    const { app, ctx } = this;
    try {
      const result = await app.mysql.update({ ...params }, { id: params.id });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = UserService;
