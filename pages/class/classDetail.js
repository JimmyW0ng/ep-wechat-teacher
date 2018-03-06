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

    ognCourseList: [{
      courseName: '第一节课',
      label: 'jacksom',
      date: '2017年7月7日 ',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300
    }, {
      courseName: 'fuck',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      date: '2017年7月7日 ',

      totalParticipate: 300
    }, {
      courseName: 'fuck',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      date: '2017年7月7日 ',
      totalParticipate: 300,
      disabled: true
    }, {
      courseName: 'fuck',
      label: 'jacksom',
      date: '2017年7月7日 ',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300
    }],

    studentList: [{
      avatar: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      name: 'Cc',
      count: 6
    }, {
      avatar: '',
      name: '你好好哈',
      count: 6
    }, {
      avatar: '',
      name: 'jack',
      count: 61
    }, {
      avatar: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      name: 'fuck',
      count: 336
    }]
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

    self.getClassCatalog(options.classId)
    self.getClassChild(options.classId)
  },

  getClassCatalog(classId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/catalog/all', { classId }, res => {
      self.setData({
        catalogList: res.result || []
      })
    })
  },

  getClassChild(classId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/child/all', { classId }, res => {
      self.setData({
        childList: res.result || []
      })
    })
  },

  goChildDetail(e){
    console.log('cu')
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