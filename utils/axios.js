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

function request(apiPath, method, param, success, axios) {
  const url = CONFIG.apiUrl + apiPath;
  const data = param;

  let token = User.getToken() || ''

  wx.showNavigationBarLoading()
  let header = {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
  }
  if (token) {
    header.Authorization = 'Bearer ' + token
  }
  wx.request({
    url,
    data,
    header,
    method: method,
    success: function (res) {
      const result = res.data;
      if (result.error) {
        if (param.isCover){
          processLoginError(result)
        } else {
          processRequestError(result)
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
  if (result.errorDescription == "请重新登录") {
    wx.showModal({
      title: '提示',
      content: result.errorDescription || '',
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: LoginUrl
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
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

  // let uploadTask = wx.request({
  //   url: 'https://rc-api-upload.xiaomai5.com/xm/oss/web/token?bucket=res', //oss token
  //   method: "GET",
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: (res) => {
  //     const signInfo = res.data;
  //     console.log(signInfo)
  //     const uploadTask = wx.uploadFile({
  //       url: 'https://res.xiaomai5.com',
  //       filePath,
  //       name: 'file',
  //       header: {
  //         'content-type': 'multipart/form-data'
  //       },
  //       formData: {
  //         'key': signInfo.dir + name,
  //         OSSAccessKeyId: signInfo.accessid,
  //         signature: signInfo.signature,
  //         policy: signInfo.policy,
  //         expire: signInfo.expire,
  //         success_action_status: '200',
  //         callback: signInfo.callback,
  //       },
  //       success: (res) => {
  //         if (callback) {
  //           callback(JSON.parse(res.data), name)
  //         }
  //       }
  //     })
  //     uploadTask.onProgressUpdate((res) => {
  //       if (uploadCallback) {
  //         uploadCallback(res, name)
  //       }
  //       // console.log('上传进度', res.progress)
  //       // console.log('已经上传的数据长度', res.totalBytesSent)
  //       // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  //     })
  //   }
  // })
}

module.exports = {
  POST: POST,
  GET: GET,
  UPLOAD
}