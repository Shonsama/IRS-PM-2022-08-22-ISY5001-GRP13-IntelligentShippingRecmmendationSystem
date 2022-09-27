'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/getGood', controller.home.getGood);
  router.post('/recommend', controller.home.recommend);
};
