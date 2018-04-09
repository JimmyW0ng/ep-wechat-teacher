// pages/userCenter/userCenter.js
const AXIOS = require('../../utils/axios')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountInfo: {
      avatar: '',
      id: '',
      nickName: '',
      ognName: '',
    },

    todayClass: [],
    dataSet: [],
    page: 0,
    size: 50,
    last: false,

    selectedTab: 0,
    swiperHeight: 200,

    loadingToday: true,
    loadingAll: true
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
    })
  },

  changeSwiper(e) {
    const self = this
    let tab = e.detail.current
    self.setData({
      selectedTab: tab
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          swiperHeight: res.windowHeight - 50
        });
      }
    });
  },

  getAccountInfo() {
    const self = this
    AXIOS.POST('auth/organ/account/info', {}, res => {
      self.setData({
          accountInfo: res.result || {}
      })
      self.getTodayClass()
      self.getAllClass()
    })
  },

  getTodayClass() {
    const self = this
    AXIOS.POST('auth/organ/account/class/today', {}, res => {
      self.setData({
        loadingToday: false,
        todayClass: res.result || []
      })
    })
  },

  // TODO 全部课程需要分页加载
  getAllClass(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10
    AXIOS.POST('auth/organ/account/class/all', {
      page,
      size,
    }, (res) => {
      const result = res.result || {}
      let content = result.content || []
      if (page > 0) {
        content = self.data.dataSet.concat(content)
      }
      self.setData({
        loadingAll: false,
        dataSet: content,
        page: result.number || 0,
        last: result.last
      })
    })
  },

  goClassDetail(e){
    let classId = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    if (type == 'bespeak') {
      wx.navigateTo({
        url: '/pages/class/beSpeakClassDetail?classId=' + classId,
      })
    } else {
      wx.navigateTo({
        url: '/pages/class/classDetail?classId=' + classId,
      })
    }
  },

  doCheckComment(e) {
    let classId = e.currentTarget.dataset.classid
    let time = e.currentTarget.dataset.time
    wx.navigateTo({
      url: `/pages/comment/comment?classId=${classId}&time=${time}`,
    })
  },

  doLogout(){
    wx.showModal({
      title: '提示',
      content: '确定要登出账户吗',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync() // 清空缓存

          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    var self = this;
    self.getAccountInfo()
    // self.getTodayClass()
    // self.getAllClass()
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