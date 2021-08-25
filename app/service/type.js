'use strict';

const { Service } = require('egg');

class TypeService extends Service {
  async get() {
    const { app } = this;
    try {
      const result = await app.mysql.select('type');
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = TypeService;
