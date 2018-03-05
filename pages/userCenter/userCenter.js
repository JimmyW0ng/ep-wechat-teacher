// pages/userCenter/userCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedTab: 0,
    swiperHeight: 200,
    ognCourseList: [{
      mainPicUrl: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      courseName: '非常非常好的课程',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300
    }, {
      mainPicUrl: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      courseName: 'fuck',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300
    }, {
      mainPicUrl: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      courseName: 'fuck',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300,
      disabled: true
    }, {
      mainPicUrl: 'http://res.xiaomaiketang.com/xiaomai/fatherDay_20170607.png',
      courseName: 'fuck',
      label: 'jacksom',
      courseIntroduce: '非常非常好的课程',
      prizeMin: 21,
      totalParticipate: 300
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
        var calc = clientHeight - 190; // TODO 这里有点操蛋
        self.setData({
          swiperHeight: calc
        });
      }
    });
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