<template>
	<view class="appContainer">
		<view class="top-box y_flex_col y_align_c">
			<view class="top-bg"></view>
			<image class="avatarImg" src="http://www.xinyos.com/public/img/avatar.png" mode=""></image>
			<view class="avatarName y_mtb_8 y_f_36 y_bold">昵称啊</view>
			<view class="y_f_26 y_gray">15265030255</view>
		</view>

		<view class="nav-box">
			<view v-for="(itm,idx) in navList" :key='idx' class="nav-section y_b_b" @tap="$navigationTo" :data-url="itm.pathUrl">
				<view class="y_align_c">
					<image class="nav-icon" :src="itm.iconImg"></image>
					<view class="y_f_30">{{itm.title}}</view>
				</view>
				<view class="iconfont y_c_c2">&#xe64b;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[ 
					{iconImg:'../../static/images/mine-01.png',title:'我的订单',pathUrl:'pages/mine/my-order',status:1},
					{iconImg:'../../static/images/mine-02.png',title:'已购课程',pathUrl:'pages/mine/my-class',status:0},
					{iconImg:'../../static/images/mine-03.png',title:'数据',pathUrl:'pages/mine/my-data',status:1},
					{iconImg:'../../static/images/mine-04.png',title:'关于我们',pathUrl:'pages/mine/about',status:0},
					// {iconImg:'../../static/images/mine-05.png',title:'联系客服',pathUrl:'',status:0},
					{iconImg:'../../static/images/mine-06.png',title:'个人设置',pathUrl:'pages/mine/my-setting',status:0},
					{iconImg:'../../static/images/mine-07.png',title:'帮助',pathUrl:'pages/mine/help',status:0},
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top-box {
		text-align: center;

		.top-bg {
			width: 100%;
			height: 110rpx;
			background: $y_blue;
		}
		.avatarName{
			width: 650rpx;
			@include y_elli;
		}
		.avatarImg {
			width: 160rpx;
			height: 160rpx;
			margin-top: -70rpx;
			border-radius: 50%;
			border: 10rpx solid $y_white;
			text-shadow: 0px 4rpx 10rpx 0px rgba(52, 85, 102, 0.25);
		}
	}

	.nav-box {
		margin-top: 70rpx;
		box-sizing: border-box;
		padding: 0 60rpx;

		.nav-section {
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.nav-icon {
				width: 40rpx;
				height: 40rpx;
				flex-shrink: 0;
				margin-right: 25rpx;
			}

			.iconfont {
				width: 17rpx;
				height: 30rpx;
			}

		}
	}
</style>
