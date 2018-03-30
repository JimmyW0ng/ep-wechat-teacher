// pages/login/selectOgn/selectOgn.js
const CONFIG = require('../../../utils/config.js')
const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')
let loginInterval = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    captcha: '',
    verifyBtnText: "获取验证码",
    countDown: 60,
    beginCountDown: false,
    userInfo: {},
    hasUserInfo: false,
    ognList: [],
    selectedIndex: 0
  },
  
  bindCaptchaInput(e) {
    this.setData({
      captcha: e.detail.value
    })
  },

  doGetOgnList(phone) {
    const self = this
    phone = phone || self.data.phone
    AXIOS.POST('security/api/organs', {
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret,
      mobile: phone
    }, res => {
      if (res.result && res.result.length > 0) {
        self.setData({
          ognList: res.result
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '您还没有所属的机构',
        })
      }
    })
  },

  bindPickerChange(e) {
    this.setData({
      selectedIndex: Number(e.target.dataset.index)
    })
  },

  doGetCaptcha() {
    const self = this
    let phone = self.data.phone
    let ognList = self.data.ognList || []
    let selectedOgn = ognList[self.data.selectedIndex] || {}
    let ognId = selectedOgn.id || ''

    if (ognList.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请先选择所属机构',
      })
      return
    }
    if (!ognId) {
      wx.showToast({
        icon: 'none',
        title: '请先选择所属机构id',
      })
      return
    }

    if (phone.length == 11) {
      if (!self.data.beginCountDown) {
        AXIOS.POST('security/api/captcha', {
          mobile: phone,
          clientId: CONFIG.clientId,
          clientSecret: CONFIG.clientSecret,
          scene: 'organ_account_login'
        }, res => {
          self.setData({
            code: res.result || '',
            beginCountDown: true,
            verifyBtnText: self.data.countDown + "s"
          })

          loginInterval = setInterval(function () {
            console.log('fuck')
            if (self.data.countDown > 1) {
              self.setData({
                countDown: self.data.countDown - 1,
                verifyBtnText: (self.data.countDown - 1) + "s"
              })
            } else {
              clearInterval(loginInterval);
              self.setData({
                countDown: 60,
                beginCountDown: false,
                verifyBtnText: '重新发送'
              })
            }
          }, 1000);
        }, res => {
          self.setData({
            beginCountDown: true,
          })
        });
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
    }
  },

  doLogin() {
    const self = this
    let phone = this.data.phone
    let code = this.data.code
    let captcha = this.data.captcha
    let ognList = self.data.ognList || []
    let selectedOgn = ognList[self.data.selectedIndex] || {}
    let ognId = selectedOgn.id || ''

    if (phone.length == 11 && captcha && code) {
      AXIOS.POST('security/api/token', {
        mobile: phone,
        code,
        captcha,
        clientId: CONFIG.clientId,
        clientSecret: CONFIG.clientSecret,
        type: 'WECHAT_APP_ORGAN_CLIENT',
        ognId
      }, res => {
        let result = res.result || {}
        USER.setMemberType(result.memberType)
        USER.setToken(result.token)
        wx.reLaunch({
          url: '/pages/userCenter/userCenter',
        })
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号或验证码',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    let phone = options.phone || ''
    if(phone.length == 11){
      self.setData({
        phone
      })
      self.doGetOgnList(phone)
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号码',
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }, 1000)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(loginInterval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})