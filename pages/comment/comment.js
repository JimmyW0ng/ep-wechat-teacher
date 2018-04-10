// pages/comment/comment.js
const AXIOS = require('../../utils/axios')
const _ = require('../../utils/underscore.js')

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
      //   id: '',
      //   tags: '',
      //   evaluateFlag: '',
      // }
    ],

    classCatalog: {},
    courseTagList: [],

    selectedChild: {

    },
    classId: '',
    startTimeStamp: '',
    comment: '',
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let classId = options.classId
    let startTimeStamp = options.time

    this.setData({ classId, startTimeStamp })
    this.getData(classId, startTimeStamp)
  },

  getData(classId, startTimeStamp) {
    const self = this
    AXIOS.POST('auth/organ/account/class/catalog/init', {
      classId, startTimeStamp
    }, res => {
      let result = res.result || {}
      let childList = result.childList || []

      self.setData({
        loading: false,
        childList,
        selectedChild: childList[0] || {},
        classCatalog: result.classCatalog || {},
        courseTagList: result.courseTagList || [],
      })
    })
  },

  selectChild(e) {
    let index = e.currentTarget.dataset.index
    let selectedChild = this.data.childList[index]
    this.setData({
      selectedChild
    })
  },

  selectTag(e) {
    let tagId = e.currentTarget.dataset.tagid
    this.data.courseTagList.map((item, index) => {
      if (item.tagId == tagId) {
        item.isActive = !item.isActive
      }
    })

    this.setData({
      courseTagList: this.data.courseTagList
    })
  },

  changeComment(e) {
    this.setData({
      comment: e.detail.value
    })
  },

  cancelComment() {
    let self = this
    let selectedChild = self.data.selectedChild || {}
    let childId = selectedChild.childId || ''
    let classScheduleId = selectedChild.classScheduleId || ''

    wx.showModal({
      title: '提示',
      content: '确定要撤销评价么？',
      success: function (res) {
        if (res.confirm) {

          AXIOS.POST('auth/organ/account/class/catalog/comment/cancel', {
            classScheduleId
          }, res => {
            wx.showToast({
              title: '撤销评价成功',
            })
            self.data.courseTagList.map((item, index) => {
              item.isActive = false
            })
            let childList = self.data.childList
            let tempChild = {}
            childList.map((item, index) => {
              if (item.childId == childId) {
                item.evaluateFlag = false
                item.tags = []
                item.comment = ''
                tempChild = item
              }
            })

            self.setData({
              childList,
              comment: '',
              courseTagList: self.data.courseTagList,
              selectedChild: tempChild
            })
          })
        }
      }
    })
  },

  doComment() {
    const self = this
    let selectedChild = self.data.selectedChild || {}
    let classScheduleId = selectedChild.classScheduleId || ''
    let childId = selectedChild.childId || ''
    let tagIds = []
    let tempTags = []

    self.data.courseTagList.map((item, index) => {
      if (item.isActive) {
        tempTags.push(item)
        tagIds.push(item.tagId)
      }
    })
    let comment = self.data.comment || ''

    if (!tagIds.length && !comment) {
      wx.showToast({
        icon: 'none',
        title: '请选择标签或填写评价',
      })
      return
    }

    AXIOS.POST('auth/organ/account/class/catalog/comment', {
      classScheduleId,
      tagIds,
      comment
    }, res => {
      wx.showToast({
        title: '评价成功',
      })
      self.data.courseTagList.map((item, index) => {
        item.isActive = false
      })
      let childList = self.data.childList
      let tempChild = {}
      childList.map((item, index) => {
        if (item.childId == childId) {
          item.evaluateFlag = true
          item.tags = tempTags
          item.comment = comment || ''
          tempChild = item
        }
      })

      self.setData({
        childList,
        comment: '',
        courseTagList: self.data.courseTagList,
        selectedChild: tempChild
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