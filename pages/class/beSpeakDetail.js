// pages/class/beSpeakDetail.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    catalogList: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.setData({
      childId: options.childId,
      classId: options.classId
    });

    wx.setNavigationBarTitle({
      title: options.studentName + '的预约详情' || '预约详情'
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
    this.getBespeakList()
    
  },

  getBespeakList(){
    const self = this
    let childId = this.data.childId
    let classId = this.data.classId
    AXIOS.POST('auth/organ/account/class/child/bespeak', { childId, classId }, res => {
      self.setData({
        catalogList: res.result,
        loading: false
      })
    })
  },

  doCheckComment(e) {
    let classScheduleId = e.currentTarget.dataset.schedule
    wx.navigateTo({
      url: `/pages/comment/comment?classScheduleId=${classScheduleId}`,
    })
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