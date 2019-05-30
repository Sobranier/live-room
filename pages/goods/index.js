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
  onReady: function() {},
  onLoad: function () {
    this.setData({
      showLiveRoom: true
    });
    this.start();
  },
  start: function() {
    var self = this;
    self.component = self.selectComponent("#id_liveroom")
    console.log('self.component: ', self.component)
    console.log('self:', self);
    self.component.start();
  },
  showGoods: function() {
    wx.navigateBack({
      delta: 1
    })
  }
})
