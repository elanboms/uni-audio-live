import Vue from 'vue'
import store from './store'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$host = 'https://shop.liankebao.net/';

const tabBarLinks = [
  'pages/index/index',
  'pages/mine/mine',
  'pages/manage/manage'
];

// 记录推荐人id
Vue.prototype.$saveRefereeId = function(refereeId) {
  if (!wx.getStorageSync('referee_id'))
    wx.setStorageSync('referee_id', refereeId);
},

// 获取场景值(scene)
Vue.prototype.$getSceneData = function(query) {
  return query.scene ? util.scene_decode(query.scene) : {};
},

// 执行用户登录
Vue.prototype.$doLogin = function() {
  uni.showModal({
    content: '请先登录后操作！',
    success: (res) => {
      if (res.confirm) {
        // 保存当前页面
        let pages = getCurrentPages();
        if (pages.length) {
          let currentPage = pages[pages.length - 1];
          "pages/login/login" != currentPage.route &&
            uni.setStorageSync("currentPage", currentPage);
        }
        // 跳转授权页面
        uni.navigateTo({
          url: "/pages/login/login"
        });
      }
    }
  })
},

// 显示成功提示框
Vue.prototype.$showSuccess = function(msg, callback) {
  uni.showToast({
    title: msg,
    icon: 'success',
    mask: true,
    duration: 1500,
    success() {
      callback && (setTimeout(function() {
        callback();
      }, 1500));
    }
  });
},

// 显示失败提示框
Vue.prototype.$showError = function(msg, callback) {
  uni.showModal({
    title: '友情提示',
    content: msg,
    showCancel: false,
    success(res) {
      // callback && (setTimeout(function() {
      //   callback();
      // }, 1500));
      callback && callback();
    }
  });
},

// get方法
Vue.prototype.$get = function(url, data, success, showLoading=false, fail, complete) {
  let that = this;
  // 显示加载内容
  if (showLoading) {
    wx.showLoading({
      title: showLoading,
      mask: true,
    })
  }
  that.$request(url,'GET', data, success, fail, complete)
}

// post方法
Vue.prototype.$post = function(url, data, success, showLoading=false, fail, complete) {
  let that = this;
  // 显示加载内容
  if (showLoading) {
    wx.showLoading({
      title: showLoading,
      mask: true,
    })
  }
  that.$request(url, 'POST', data, success, fail, complete)
}


// 请求封装
Vue.prototype.$request = function(url, method, data, success, fail, complete) {
  let that = this;
  uni.showNavigationBarLoading();
  // 构造请求参数
  data = data || {};
  // data.wxapp_id = that.getWxappId(); //商城id
  data.token = wx.getStorageSync('token')||'';
  data.user_id = wx.getStorageSync('userId') || '';
  
  uni.request({
    url: that.$host + url,
    method: method == 'POST' ? 'POST' : 'GET',
    header: {
      "Content-type": method == 'POST' ? "application/x-www-form-urlencoded" : "application/json",
    },
    data: data,
    success(res) {
      if (res.statusCode !== 200 || typeof res.data !== 'object') {
        that.$showError('网络请求出错');
        return false;
      }
      if (res.data.code === 0) {
        that.$showError(res.data.msg, function() {
          fail && fail(res);
        });
        return false;
      } else {
        success && success(res.data);
      }
    },
    fail(res) {
      that.$showError(res.errMsg, function() {
        fail && fail(res);
      });
    },
    complete(res) {
      uni.hideNavigationBarLoading();
      complete && complete(res);
    },
  });
}

// 点击事件的验证登录
Vue.prototype.$confirmLogin = function(callback) {
	let that = this;
  let isLogin = uni.getStorageSync('isLogin') || false;
  if (!isLogin) {
    uni.showModal({
      content: '请先登录后操作！',
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  } else {
    callback && callback()
  }
}

//跳转事件
Vue.prototype.$navigationTo = function(e) {
  let that = this;
  let url = e.currentTarget.dataset.url;
  let check = e.currentTarget.dataset.check || false;
  check && function(){that.$confirmLogin();return;}
  if (!url || url.length == 0) {
    console.log('路径正确性校验')
    return false;
  }
  // tabBar页面
  if (tabBarLinks.indexOf(url) > -1) {
    uni.switchTab({
      url: '/' + url
    });
  } else {
    // 普通页面
    uni.navigateTo({
      url: '/' + url
    });
  }
},

Vue.prototype.$getShareUrlParams = function(params) {
  let that = this;
  return util.urlEncode(Object.assign({
    referee_id: that.getUserId()
  }, params));
},

//拨打电话
Vue.prototype.$makePhone = function(e){
	var phone = e.currentTarget.dataset.phone;
	uni.makePhoneCall({
		phoneNumber: phone
	});
}

// 上传图片
Vue.prototype.$uploadMoreImage = function(sumNumber, add_img, callback){
  var that = this;
  add_img||[]  //已上传图片数组
  // sumNumber 允许上传的总数量
  var photoNum = sumNumber - add_img.length; //剩余可上传数
  if (photoNum == 0) {
    uni.showToast({
      title: `最多上传${sumNumber}张图片`,
      icon: 'none',
      duration: 1500,
    })
    return;
  }
  uni.chooseImage({
    count: photoNum,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log(res)
      // tempFilePath可以作为img标签的src属性显示图片
      let tempFilePaths = res.tempFilePaths
      let temLength = tempFilePaths.length;
      let number = 0;
      for (let i = 0, h = temLength; i < h; i++) {
        uni.showLoading({
          title: '上传中',
          mask: true,
        })
        uni.uploadFile({
          url: that.$host + 'common/uploadimg',
          filePath: tempFilePaths[i],
          name: 'file',
          success: function (res) {
            console.log(res)
            number++;
            if (number == h) {
              uni.hideLoading();
            }
            res = JSON.parse(res.data);
            add_img.push(res.filesrc);
           
            callback && callback(add_img)
          },
          fail: function (err) {console.log(err)},
          complete: function (res) { },
        })
      }
    }
  })
},


// 微信支付
Vue.prototype.$wxPayment = function(option) {
  let options = Object.assign({
    payment: {},
    success: () => {},
    fail: () => {},
    complete: () => {},
  }, option);
  wx.requestPayment({
    timeStamp: options.payment.timeStamp,
    nonceStr: options.payment.nonceStr,
    package: 'prepay_id=' + options.payment.prepay_id,
    signType: 'MD5',
    paySign: options.payment.paySign,
    success(res) {
      options.success(res);
    },
    fail(res) {
      options.fail(res);
    },
    complete(res) {
      options.complete(res);
    }
  });
},

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
