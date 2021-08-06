function successMsg({ code = 200, message = '成功', data = null }) {
  return { code, message, data };
}

function errorMsg({ code = 500, message = '失败', data = null }) {
  return { code, message, data };
}

module.exports = {
  successMsg,
  errorMsg
};
