'use strict';
const { Controller } = require('egg');
const { successMsg, errorMsg } = require('../help/result');

class TypeController extends Controller {
  /**
   * 获取账单所有类型
   */
  async get() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const result = await ctx.service.type.get(id);
      ctx.body = successMsg({ data: result });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 创建账单类型
   */
  async create() {
    const { ctx } = this;
    const { id, name, type, createType } = ctx.request.body;
    try {
      if (!id || !name || !type) {
        ctx.body = errorMsg({ message: '缺少必要参数' });
        return;
      }

      const isCreate = await ctx.service.type.isCreated(name, id);

      if (isCreate) {
        ctx.body = errorMsg({ message: '类型已存在' });
        return;
      }

      const result = await ctx.service.type.create({
        user_id: id,
        be_create: createType,
        name,
        type,
      });

      if (result.affectedRows === 1) {
        ctx.body = successMsg({ message: '创建成功' });
      } else {
        ctx.body = errorMsg({ message: '创建失败' });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TypeController;
