<template>
	<view class="appContainer">
		<scroll-view class="live-box" scroll-y="true" >
			<view  class="live-item y_flex" >
				<view class='y_flex_k' :class="{'y_orange':true}">{{name | nameFormat(name)}}</view>
				<view>语音直播期间，全部禁言</view>
			</view>
			<view class="live-item y_flex" :class="{'bgon':true}">
				<view class='y_flex_k'>{{name | nameFormat(name)}}</view>
				<view> 本次课题的只是点是：1我是知识点我是知识点。2 我是知识点。 </view>
			</view>
			
			<view v-for="itm in 100" :key='' class="live-item y_flex">
				<view class='y_flex_k'>{{name | nameFormat(name)}}</view>
				<view>老师太厉害了，原来是这样子。</view>
			</view>
			
		
		</scroll-view>
		<!-- 底部输入框 -->
		<view class="btm-box y_align_c y_flex_b">
			<image :src="pattern?'../../static/images/live-logo-1.png':'../../static/images/live-logo-11.png'" @tap="patternTap"></image>
			<view class="input-box"  @touchstart="getAudioStartTap" @touchend='getAudioEndTap'>
				<view :class="{'y_t_c':inputDisabled}" :hidden='!inputDisabled'>{{audioText}}</view>
				<input  :hidden='inputDisabled' type="text" :disabled="inputDisabled" :value="inputCon" placeholder="输入问题与同学沟通~" confirm-type='发送'  />
			</view>
			<image src="../../static/images/live-logo-2.png" mode=""></image>
			<image src="../../static/images/live-logo-3.png" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'管理员',
				inputCon:'', //输入聊天内容
				inputDisabled:false, //是否禁言
				pattern:true, //true键盘模式,false语音模式
				audioText:'按住 说话',
				sTime:0, //按下时间
				eTime:0,
				chartList:[
					{
						id:1,type:''
					}
				]
			}
		},
		filters: {
			nameFormat(e) {
				return e +'：' 
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
			patternTap(){ //模式切换
				if(this.pattern){
					this.inputDisabled=true
					this.inputCon='按住 说话'
				}else{
					this.inputDisabled=false
					this.inputCon=''
				}
				this.pattern = !this.pattern
				console.log(this.pattern)
			},
			getAudioStartTap(e){ //录音
				if(!this.inputDisabled){
					return;
				}
				console.log(e);
				console.log(e.mp.timeStamp);
				this.sTime = e.mp.timeStamp
				// uni.vibrate({ //震动
				//     success: function () {
				//         console.log('success');
				//     }
				// });
				
			},
			getAudioEndTap(e){
				if(!this.inputDisabled){
					return;
				}
				console.log(e);
				console.log(e.mp.timeStamp);
				this.eTime = e.mp.timeStamp
				let time = (this.eTime - this.sTime) / 1000
				console.log(time);
			},
		}
	}
</script>
<style>
	page{
		background:#3E465C;
		-webkit-touch-allout:none;  /*系统默认菜单被禁用*/
		-webkit-user-select:none; /*webkit浏览器*/  
		-khtml-user-select:none; /*早期浏览器*/  
		-moz-user-select:none;/*火狐*/  
		-ms-user-select:none; /*IE10*/  
		user-select:none;
	}
</style>
<style lang="scss" scoped>
	.live-box{
		font-size: 30rpx;
		box-sizing: border-box;
		padding: 20rpx;
		color: #FFFFFF;
		height: calc( 100vh - 100rpx);
		.live-item{
			max-width: 650rpx;
			box-sizing: border-box;
			padding: 15rpx 30rpx 15rpx 20rpx;
		}
		.live-item.bgon{
			margin: 20rpx 0;
			padding: 15rpx 30rpx 25rpx 20rpx;
			background: rgba(32,178,255,0.2);
			border-radius:25rpx;
		}
	}
	// 底部盒子
	.btm-box{
		position: fixed;
		bottom: 0rpx;
		left: 0;
		right: 0;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		image{
			width: 52rpx;
			height: 52rpx;
			flex-shrink: 0;
		}
		.input-box{
			width: 500rpx;
			height: 75rpx;
			line-height: 75rpx;
			box-sizing: border-box;
			padding: 0 40rpx;
			background:rgba(0,0,0,0.3);
			border-radius:38rpx;
			color: $y_gray;
			user-select:none;
			input{
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>

