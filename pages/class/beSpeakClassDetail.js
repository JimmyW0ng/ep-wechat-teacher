// pages/course/couseDetail.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 10,
    last: false,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId: options.classId
    });

    this.getListData()
  },

  getListData(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10
    let classId = self.data.classId || ''
    AXIOS.POST('auth/organ/account/class/child/all', {
      page, size, classId
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

  goChildDetail(e) {
    let childId = e.currentTarget.dataset.id
    let classId = this.data.classId
    wx.navigateTo({
      url: `/pages/child/childDetail?childId=${childId}&classId=${classId}`
    })
  },

  goBespeakList(e){
    const self = this
    let childId = e.currentTarget.dataset.id
    let classId = self.data.classId
    let name = e.currentTarget.dataset.name || ''
    wx.navigateTo({
      url: `/pages/class/beSpeakDetail?childId=${childId}&classId=${classId}&studentName=${name}`
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