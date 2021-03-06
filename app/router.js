'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const _jwt = app.middleware.jwtErr(app.config.jwt.secret);

  // 用户
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo);
  router.post('/api/user/modify_pass', _jwt, controller.user.editUserPassword);
  router.get('/api/user/query', _jwt, controller.user.query);

  // 后台用户
  router.post('/api/backUser/register', controller.backUser.register);
  router.post('/api/backUser/login', controller.backUser.login);
  router.get('/api/backUser/queryUser', _jwt, controller.backUser.queryUser);
  router.put('/api/backUser/change', _jwt, controller.backUser.changeState);
  router.delete('/api/backUser/delete', _jwt, controller.backUser.delete);
  router.post('/api/backUser/update', _jwt, controller.backUser.update);

  // 上传
  router.post('/api/upload', controller.upload.upload);

  // 账单
  router.post('/api/bill/add', _jwt, controller.bill.add);
  router.get('/api/bill/list', _jwt, controller.bill.list);
  router.get('/api/bill/detail', _jwt, controller.bill.detail);
  router.post('/api/bill/update', _jwt, controller.bill.update);
  router.post('/api/bill/delete', _jwt, controller.bill.delete);
  router.get('/api/bill/data', _jwt, controller.bill.data);

  // 账单类型
  router.get('/api/type/list', _jwt, controller.type.get);
  router.post('/api/type/create', _jwt, controller.type.create);
};
