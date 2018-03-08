// pages/child/childDetail.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    childInfo: {
      avatar: '',
      childNickName: '',
      id: '',
      sign: '',
      comments: [],
      tags: []
    },
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.childId, options.classId)
  },
  
  getDetail(childId, classId){
    const self = this
    AXIOS.POST('auth/organ/account/class/child/abstract', { childId, classId }, res => {
      self.setData({
        loading:false,
        childInfo: res.result || {}
      })
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