// pages/course/couseDetail.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedTab: 0,
    swiperHeight: 200,
    catalogList: [],
    childList: [],
    loadingCatalog: true,
    loadingChild: true
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
    })
  },

  changeSwiper(e) {
    let current = e.detail.current
    this.setData({
      selectedTab: current
    });
  },

  doCheckComment(e) {
    let classId = e.currentTarget.dataset.classid
    let time = e.currentTarget.dataset.time
    wx.navigateTo({
      url: `/pages/comment/comment?classId=${classId}&time=${time}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth;
        var calc = clientHeight - 50; // TODO 这里有点操蛋
        self.setData({
          swiperHeight: calc,
          classId: options.classId
        });
      }
    });

  },

  getNormalClassCatalog(classId) {
    const self = this
    AXIOS.POST('auth/organ/account/normal/class/catalog/all', { classId }, res => {
      self.setData({
        loadingCatalog: false,
        catalogList: res.result || []
      })
    })
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

  goChildDetail(e){
    let childId = e.currentTarget.dataset.id
    let classId = this.data.classId
    wx.navigateTo({
      url: `/pages/child/childDetail?childId=${childId}&classId=${classId}` 
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
    this.getNormalClassCatalog(classId)
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