'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const _jwt = app.middleware.jwtErr(app.config.jwt.secret);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  router.post('/api/user/test', _jwt, controller.user.test);
};
