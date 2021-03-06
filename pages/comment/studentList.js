// pages/orgnization/OrgnizationPage.js
const AXIOS = require('../../utils/axios')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 10,
    classId: '',
    startTimeStamp: '',
    last: false,
    loading: true
  },

  goComment(e) {
    const dataset = e.currentTarget.dataset
    const classScheduleId = dataset.schedule || ''
    wx.navigateTo({
      url: './comment?classScheduleId=' + classScheduleId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startTimeStamp: options.time,
      classId: options.classId
    })
    this.getListData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getListData(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10
    let startTimeStamp = self.data.startTimeStamp || ''
    let classId = self.data.classId || ''
    AXIOS.POST('auth/organ/account/class/catalog/children', {
      page, size, startTimeStamp, classId
    }, (res) => {
      const result = res.result || {}
      let content = result.content || []
      if (page > 0) {
        content = self.data.dataSet.concat(content)
      }
      self.setData({
        loading: false,
        dataSet: content,
        page: result.number || 0,
        last: result.last
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getListData()
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
    this.getListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.last) {
      this.getListData(true)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})