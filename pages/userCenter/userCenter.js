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
    size: 5,
    last: false,

    selectedTab: 0,
    swiperHeight: 200
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
        dataSet: content,
        page: result.number || 0,
        last: result.last
      })
    })
  },

  goClassDetail(e){
    let classId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/class/classDetail?classId=' + classId,
    })
  },

  doCheckComment(e) {
    let classCatalogId = e.currentTarget.dataset.classcatelogid
    wx.navigateTo({
      url: `/pages/comment/comment?classCatalogId=${classCatalogId}`,
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