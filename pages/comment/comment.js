// pages/comment/comment.js
const AXIOS = require('../../utils/axios')
const _ = require('../../utils/underscore.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseTagList: [],
    child: {},
    classId: '',
    startTimeStamp: '',
    comment: '',
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let classScheduleId = options.classScheduleId
    this.getData(classScheduleId)
  },

  getData(classScheduleId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/catalog/view', {
      classScheduleId
    }, res => {
      let result = res.result || {}
      // TODO
      self.setData({
        loading: false,
        child: result.child || {},
        courseTagList: result.courseTagList || [],
      })
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
    let child = self.data.child || {}
    let classScheduleId = child.classScheduleId || ''

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
            child.evaluateFlag = false
            child.tags = []
            child.comment = ''

            self.setData({
              comment: '',
              courseTagList: self.data.courseTagList,
              child
            })
          })
        }
      }
    })
  },

  doComment() {
    const self = this
    let child = this.data.child || {}
    let classScheduleId = child.classScheduleId || ''
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
      child.evaluateFlag = true
      child.tags = tempTags
      child.comment = comment || ''

      self.setData({
        comment: '',
        courseTagList: self.data.courseTagList,
        child
      })
    })
  },
})