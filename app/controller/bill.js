'use strict';

const { Controller } = require('egg');
const moment = require('moment');
const { errorMsg, successMsg } = require('../help/result');


class BillController extends Controller {
  /**
   * 添加账单
   * @returns {Promise<void>}
   */
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

  /**
   * 账单列表
   * @returns {Promise<void>}
   */
  async list() {
    const { ctx, app } = this;
    let { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;

      const list = await ctx.service.bill.list(decode.id);
      // 筛选数据
      const _list = list.filter(item => {
        const momentDate = moment(Number(item.date))
          .format('YYYY-MM');
        if (type_id !== 'all') return momentDate === date && type_id === item.type_id;
        return momentDate === date;
      });
      // 组装数据
      const listMap = _list.reduce((cur, item) => {
        const date = moment(Number(item.date))
          .format('YYYY-MM-DD');
        // 如果能在累加的数组中找到当前项日期 date，那么在数组中的加入当前项到 bills 数组。
        if (cur && cur.length && cur.findIndex(item => item.date === date) > -1) {
          const index = cur.findIndex(item => item.date === date);
          cur[index].bills.push(item);
        }
        // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
        if (cur && cur.length && cur.findIndex(item => item.date === date) === -1) {
          cur.push({ date, bills: [ item ] });
        }
        // 如果 cur 为空数组，则默认添加第一个账单项 item ，格式化为下列模式
        if (!cur.length) {
          cur.push({ date, bills: [ item ] });
        }
        return cur;
      }, []);
      listMap.sort((a, b) => moment(b.date) - moment(a.date));

      // 分页处理，listMap 为我们格式化后的全部数据，还未分页。
      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size);

      // 计算当月总收入和支出
      // 首先获取当月所有账单列表
      const __list = list.filter(item => moment(Number(item.date))
        .format('YYYY-MM') === date);
      // 累加计算支出
      let totalExpense = __list.reduce((curr, item) => {
        if (item.pay_type === '1') {
          curr += Number(item.amount);
          return curr;
        }
        return curr;
      }, 0);
      // 累加计算收入
      let totalIncome = __list.reduce((curr, item) => {
        if (item.pay_type === '2') {
          curr += Number(item.amount);
          return curr;
        }
        return curr;
      }, 0);

      ctx.body = successMsg({
        data: {
          totalExpense, // 当月支出
          totalIncome, // 当月收入
          totalPage: Math.ceil(listMap.length / page_size), // 总分页
          list: filterListMap || [] // 格式化后，并且经过分页处理的数据
        }
      });
    } catch (e) {
      console.log(e);
      ctx.body = errorMsg({ message: '系统错误' });
    }
  }
}

module.exports = BillController;
