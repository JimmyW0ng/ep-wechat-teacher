// pages/comment/comment.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalElements: 0,

    childList: [
      // {
      //   avatar: '',
      //   childNickName: '',
      //   id: ''
      // }
    ],

    childTagAndCommentList: [],
    classCatalog: {},
    courseTagList: [],

    selectedChild: {
      id: 1,
      avatar: '',
      childNickName: '哈哈哈哈',
    },
    tags: [{
      tagName: 'fuck',
      num: 2
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let classCatalogId = options.classCatalogId
    this.getData(classCatalogId)
  },

  getData(classCatalogId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/catalog/init', {
      classCatalogId
    }, res => {
      let result = res.result || {}
      self.setData({
        childList: result.childList || [],
        childTagAndCommentList: result.childTagAndCommentList || [],
        classCatalog: result.classCatalog || {},
        courseTagList: result.courseTagList || [],
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