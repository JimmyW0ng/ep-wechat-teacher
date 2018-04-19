// pages/course/courseDetailPage/courseDetailPage.js
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
const LoginUrl = '/pages/login/LoginPage'
const WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCommentNum: 0,
    classes: [],
    comments: [],
    course: {},
    team: [],

    popupStatus: false,
    selectedClassIndex: '',
    selectedClass: {},

    selectedTab: 0,
    swiperHeight: '',

    courseId: '',
    courseCommentList: [],
    loading: true,
  },

  openAddress(e) {
    let dataset = e.currentTarget.dataset
    let name = dataset.name
    let address = dataset.address
    let addressLat = Number(dataset.lat)
    let addressLng = Number(dataset.lng)

    if (addressLat && addressLng) {
      wx.openLocation({
        latitude: addressLat,
        longitude: addressLng,
        name,
        address
      })
    }
  },

  chooseClass(e) {
    const index = e.currentTarget.dataset.index
    const selectedClass = this.data.classes[index]
    this.setData({
      selectedClassIndex: index,
      selectedClass
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(options.id)

    this.setData({
      courseId: options.id
    })

    var self = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth;
        var calc = clientHeight - 170; // TODO 这里有点操蛋
        self.setData({
          swiperHeight: calc
        });
      }
    });
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

  showPopup() {
    this.setData({
      popupStatus: true
    })
  },

  closePopup() {
    this.setData({
      popupStatus: false
    })
  },

  getCourseDetail(id) {
    const self = this
    AXIOS.POST('security/course/detail', {
      courseId: id,
      noToken: true
    }, (res) => {
      const result = res.result || {}
      WxParse.wxParse('courseContent', 'html', result.course.courseContent, self, 0);
      let course = result.course
      let courseStatus = course.courseStatus
      let now = new Date().valueOf()
      let enterTime = course.enterTimeStampStart

      course.isBegin = (now > enterTime) && (courseStatus != 'offline')

      self.setData({
        loading: false,
        classes: result.classes || [],
        selectedClass: result.classes[0],
        comments: result.comments || [],
        course: result.course || {},
        team: result.team || [],
        totalCommentNum: result.totalCommentNum || 0
      })
    })
  },

  goCourseCommentPage() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `/pages/course/courseCommentPage/courseCommentPage?courseId=${courseId}`,
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
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