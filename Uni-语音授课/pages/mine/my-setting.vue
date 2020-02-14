<template>
	<view class="appContainer">
		<view class="y_container y_bg_ff">
			<view class="setting-top y_b_b y_flex_b y_align_c">
				<view>头像</view>
				<view class="y_align_c" @tap="$uploadMoreImage(1,[])">
					<image class="avatarImg" src="http://www.xinyos.com/public/img/avatar.png" mode=""></image>
					<view class="iconfont y_c_c2">&#xe64b;</view>
				</view>
			</view>
			
			<view class="setting-section y_flex_b y_align_c">
				<view>昵称</view>
				<input type="text" value="" placeholder="输入您的昵称" />
			</view>
			
			<view class="setting-section y_flex_b y_align_c">
				<view>电话</view>
				<input type="text" value="" placeholder="输入您的电话" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		onShow() {},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #EFEEF3;
	}
</style>
<style lang="scss" scoped>
	.setting-top{
		height: 150rpx;
		.avatarImg {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			flex-shrink: 0;
			margin-right: 20rpx;
		}
		.iconfont {
			width: 17rpx;
			height: 30rpx;
		}
	}
	.setting-section{
		height: 110rpx;
		input{
			text-align: right;
		}
	}
	
</style>
