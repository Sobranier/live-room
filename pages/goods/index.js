var getlogininfo = require('../../components/GenerateAccountInfo.js');
var liveroom = require('../../components/mlvbliveroomcore.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isGetLoginInfo: false,
    roomList: [],

    showLiveRoom: false,
    roomID: 'room_user_4cd1976e_c201',
    role: 'audience', //'',
    roomname: '',
    pureAudio: false,
    debug: false,
    muted: false,
    beauty: 5
  },
  onRoomEvent: function(e) {
    console.log('触发事件', e);
  },
  onReady: function() {
    var self = this;

    wx.showLoading({
      title: '登录信息获取中',
    })

    // 获取登录信息
    getlogininfo.getLoginInfo({
      success: function (ret) {
        var loginInfo = {
          sdkAppID: ret.data.sdkAppID,
          userID: ret.data.userID,
          userSig: ret.data.userSig,
          userName: self.userName,
          userAvatar: ''
        }

        //MLVB 登录
        liveroom.login({
          data: loginInfo,
          success: function(ret) {
            //登录成功，拉取房间列表
            self.setData({
              isGetLoginInfo: true,
              showLiveRoom: true
            });
            console.log('房间相关信息成功', ret);
            // self.getRoomList();
            self.start();
            wx.hideLoading();
          },
          fail: function(ret) {
            //登录失败
            self.data.isGetLoginInfo = false;
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: ret.errMsg,
              showCancel: false,
              complete: function () {
                wx.navigateBack({});
              }
            });
          }
        });
      },
      fail: function (ret) {
        //获取IM信息失败
        self.data.isGetLoginInfo = false;
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: ret.errMsg,
          showCancel: false,
          complete: function () {
            wx.navigateBack({});
          }
        });
      }
    });
  },
	/**
	 * 拉取房间列表
	 * @return {[type]}            [description]
	 */
  getRoomList: function () {
    var self = this;
    if (!self.data.isGetLoginInfo) {
      wx.showModal({
        title: '提示',
        content: '登录信息初始化中，请稍后再试',
        showCancel: false
      })
      return;
    }
    liveroom.getRoomList({
      data: {
        index: 0,
        cnt: 20
      },
      success: function (ret) {
        self.setData({
          roomList: ret.rooms
        });
        console.log('获取房间列表成功');
      },
      fail: function (ret) {
        console.log(ret);
        wx.showModal({
          title: '获取房间列表失败',
          content: ret.errMsg,
          showCancel: false
        });
      }
    });
  },
  onLoad: function () {
  },
  start: function() {
    var self = this;
    self.component = self.selectComponent("#id_liveroom")
    console.log('self.component: ', self.component)
    console.log('self:', self);
    self.component.start();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
