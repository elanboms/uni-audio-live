<script>
	export default {
		onLaunch: function() {
			var that = this;
			// 登录
      // #ifdef MP
        uni.login({
        	success: (res) => {
        		var code = res.code;
            console.log(code)
        		// uni.request({
        		//   url: that.globalData.host + 'getOpenid',
        		//   data:{code},
        		//   success:(res)=>{
        		//     // 存session_key
        		//     uni.setStorageSync('session_key', res.data.session_key);
        		//     // 存openid
        		//     uni.setStorageSync('open_id', res.data.openid);
        		//   }
        		// })
        	}
        })
        that.updateMp()
      // #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    globalData: {  
        text: 'text',
    },
    methods:{
      updateMp() {
        if (!uni.canIUse('getUpdateManager')) {
          return false;
        }
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          // console.log(res.hasUpdate)
        });
        updateManager.onUpdateReady(function() {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，即将重启应用',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          });
        });
        updateManager.onUpdateFailed(function() {
          // 新的版本下载失败
          uni.showModal({
            title: '更新提示',
            content: '新版本下载失败',
            showCancel: false
          })
        });
      },
    }
	}
</script>

<style>
  @import './common/rebuild.css';
  /*每个页面公共css */
  @font-face {
    font-family: 'iconfont';  /* project id 888726 */
    src: url('https://at.alicdn.com/t/font_888726_ng090zbhgxq.ttf') format('truetype');
  }
  /* #ifdef H5 */
  uni-page-head{display: none;}
  html{width: 750rpx;overflow-y: hidden;}
  /* #endif */
</style>
