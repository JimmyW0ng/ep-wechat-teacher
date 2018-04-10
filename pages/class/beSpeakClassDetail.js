// pages/course/couseDetail.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    childList: [],
    loadingChild: true
  },

  doCheckComment(e) {
    let classCatalogId = e.currentTarget.dataset.classcatelogid
    wx.navigateTo({
      url: `/pages/comment/comment?classCatalogId=${classCatalogId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classId: options.classId
    });
  },

  getClassChild(classId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/child/all', { classId }, res => {
      self.setData({
        loadingChild: false,
        childList: res.result || []
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

  getBespeakList(e){
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
    let classId = this.data.classId
    this.getClassChild(classId)
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