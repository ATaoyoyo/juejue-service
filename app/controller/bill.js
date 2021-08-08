'use strict';

const { Controller } = require('egg');
const moment = require('moment');
const { errorMsg, successMsg } = require('../help/result');


class BillController extends Controller {
  async add() {
    const { ctx, app } = this;
    // 获取请求中携带的参数
    const { user_id, amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body;

    if (!user_id || !amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = errorMsg({ message: '参数错误' });

      return;
    }

    try {
      const token = ctx.request.header.authorization;
      const decode = app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;

      const params = { user_id, amount, type_id, type_name, date, pay_type, remark };
      const result = await ctx.service.bill.add(params);
      ctx.body = successMsg({ message: '插入成功' });
    } catch (e) {
      console.log(e);
      ctx.body = errorMsg({ message: '系统错误' });
    }
  }
}

module.exports = BillController;
