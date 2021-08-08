'use strict';

const { Controller } = require('egg');
const moment = require('moment');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const { successMsg } = require('../help/result');

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    let file = ctx.request.files[0];
    let uploadDir = '';

    try {
      let f = fs.readFileSync(file.filepath);
      let day = moment(new Date())
        .format('YYYY-MM-DD');
      let dir = path.join(this.config.uploadDir, day);
      let date = Date.now();
      await mkdirp(dir);
      uploadDir = path.join(dir, date + path.extname(file.filename));
      fs.writeFileSync(uploadDir, f);
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = successMsg({ data: uploadDir.replace(/app/g, '') });
  }
}

module.exports = UploadController;
