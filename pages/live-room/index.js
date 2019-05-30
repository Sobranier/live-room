var getlogininfo = require('../../components/GenerateAccountInfo.js');
var liveroom = require('../../components/mlvbliveroomcore.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
              // showLiveRoom: true
            });
            wx.hideLoading();

            self.openLive();
          },
          fail: function(ret) {
            //登录失败
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
  onLoad: function () {},
  start: function() {
    var self = this;
    self.component = self.selectComponent("#id_liveroom")
    console.log('self.component: ', self.component)
    console.log('self:', self);
    self.component.start();
  },
  openLive: function() {
    this.setData({
      showLiveRoom: true
    });
    this.start();
  },
  showGoods: function() {
    wx.navigateTo({
      url: '../goods/index'
    })
  }
})
