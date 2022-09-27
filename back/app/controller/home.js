'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getGood() {
    const { ctx } = this;
    console.log(ctx.request.body.link);
    ctx.body = ctx.request.body.link;
    ctx.status = 200;
  }
  async recommend() {
    const { ctx } = this;
    console.log(ctx.request.body);
    ctx.body = ctx.request.body.goods[0];
    ctx.status = 200;
  }
}

module.exports = HomeController;
