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
      //   waitComment: '',
      // }
    ],

    classCatalog: {},
    courseTagList: [],

    selectedChild: {
    
    },
    classCatalogId: '',
    comment: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let classCatalogId = options.classCatalogId
    this.setData({ classCatalogId })
    this.getData(classCatalogId)
  },

  getData(classCatalogId) {
    const self = this
    AXIOS.POST('auth/organ/account/class/catalog/init', {
      classCatalogId
    }, res => {
      let result = res.result || {}
      let childList = result.childList || []
      self.setData({
        childList,
        selectedChild: childList[0] || {},
        classCatalog: result.classCatalog || {},
        courseTagList: result.courseTagList || [],
      })
    })
  },

  selectTag(e){
    let tagId = e.currentTarget.dataset.tagid
    this.data.courseTagList.map((item, index) => {
      if(item.tagId == tagId){
        item.isActive = !item.isActive
      }
    })

    this.setData({
      courseTagList: this.data.courseTagList
    })
  },

  changeComment(e){
    this.setData({
      comment: e.detail.value
    })
  },

  doComment(){
    const self = this
    let classCatalogId = self.data.classCatalogId || ''
    let childId = self.data.selectedChild.childId || ''
    let tagIds = []
    
    self.data.courseTagList.map((item, index) => {
      if(item.isActive){
        tagIds.push(item.tagId)
      }
    })
    let comment = self.data.comment || ''

    if (!tagIds.length && !comment){
      wx.showToast({
        icon: 'none',
        title: '请选择标签或填写评价',
      })
      return
    }

    AXIOS.POST('auth/organ/account/class/catalog/comment', {
      classCatalogId,
      childId,
      tagIds,
      comment
    }, res => {
      wx.showToast({
        title: '评价成功',
      })
      self.data.courseTagList.map((item, index) => {
        item.isActive = false
      })
      // TODO refresh?
      self.setData({
        comment: '',
        courseTagList: self.data.courseTagList
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