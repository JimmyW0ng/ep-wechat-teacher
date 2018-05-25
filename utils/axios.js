const app = getApp();
const CONFIG = require('./config.js');
const User = require('./user.js');

const LoginUrl = '/pages/login/login'
const LoadingDuration = 300

function POST(apiPath, param, success, fail, complete) {
  request(apiPath, 'POST', param, success, fail, complete);
}

function GET(apiPath, success, fail, complete) {
  request(apiPath, 'GET', param, success, fail, complete);
}

function request(apiPath, method, param, success, fail, complete) {
  const url = CONFIG.apiUrl + apiPath;
  const data = param;

  let token = User.getToken() ? (User.getToken() + '') : ''

  wx.showNavigationBarLoading()

  let header = {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
  }

  // token = 'aM1rJngVl4RLkkL07QWBxwmO'

  if (token && (token.trim().length > 0)) {
    header.Authorization = 'Bearer ' + token
  }
  wx.request({
    url,
    data,
    header,
    method,
    success: function (res) {
      const result = res.data;
      if (result.error) {
        if (param.isCover){
          processLoginError(result)
        } else {
          processRequestError(result)
        }
        if(fail) {
          fail()
        }
      } else {
        success(result);
      }
    },
    fail: function (res) {
      const result = res.data;
      processHttpError(result)

      if (typeof fail == "function") {
        fail();
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()

      if (typeof complete == "function") {
        complete();
      }
    }
  });
}

function processLoginError(result){
  wx.redirectTo({
    url: LoginUrl
  })
}

function processRequestError(result) {
  if (result.error == "ERROR_ACCESS_NEED_AUTH") {
    wx.showModal({
      title: '提示',
      content: result.errorDescription || '',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: LoginUrl
          })
        }
      }
    })
  } else {
    wx.showToast({
      icon: 'none',
      title: result.errorDescription || '',
    })
  }
}

function processHttpError(xhr, errorType, error) {
  //TODO Process HTTP error for 404, 503, 403, 500
  wx.showToast({
    icon: 'none',
    title: '网络出错',
  })
}

const UPLOAD = (filePath, callback, uploadCallback) => {
  let uploadTask = wx.uploadFile({
    url: CONFIG.apiUrl + 'auth/file/child/avatar',
    filePath,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + CONFIG.token
    },
    success: (res) => {
      if (callback) {
        callback(JSON.parse(res.data))
      }
    },
    fail: (res) => {
      // debugger
    },
    complete(res) {
      // debugger
    }
  })
}

module.exports = {
  POST: POST,
  GET: GET,
  UPLOAD
}