<template>
	<view class="appContainer">
		<view class="header-box">
			<view class="search-input y_align_c y_f_28">
				<image class="search-logo" src="/static/images/search-logo.png"></image>
				<input class="" type="text" value="" placeholder="搜索" />
			</view>
		</view>

		<!-- banner部分 -->
		<swiper class="banner" :indicator-dots="false" :autoplay="true" :interval="3000" :circular='true' :duration="1000">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" @tap="$navigationTo" :data-url="item.linkUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 课程列表 -->
		<view class="y_bg_gray">
			<view class="title y_border_box y_f_36 y_bold y_bg_ff">课程列表</view>
			<!-- 分类 -->
			<view class="type-list-box y_border_box y_bg_ff y_f_26 y_wrap y_align_c y_flex_k">
				<view class="type-list-section" :class="typeListIdx==idx?'active':''" v-for="(itm,idx) in typeList" @tap="typeListTap"
				 :key="idx" :data-idx="idx">
					{{itm}}
				</view>
			</view>

			<!-- 课程 -->
			<view class="class-list-box">
				<view class="y_bg_ff" v-for=" (item,index) in classList" :key='index' @tap="$navigationTo" :data-url="'pages/index/class-detail'" >
					<view class="class-list-section  y_align_c">
						<image :src="item.imgUrl" mode=""></image>
						<view class="class-list-con y_flex_1">
							<view class="class-list-tit y_f_32 y_bold y_elli">{{item.teacher}} {{item.title}}</view>
							<view class="class-list-time y_f_28">{{item.time}} 共{{item.classNum}}节课</view>
							<view class="class-list-text y_gray y_f_28">{{item.text}}</view>
						</view>
					</view>
					<view class="hr_2"></view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [{
					imgUrl: 'http://shop.liankebao.net/uploads/2019082414313666eb61460.jpg',
					linkUrl: ''
				}, {
					imgUrl: 'http://shop.liankebao.net/uploads/2019082414313666eb61460.jpg',
					linkUrl: ''
				}],
				typeList: ['分类一', '分类2222', '分类3', '分类二', '分类999'],
				typeListIdx: 0,

				classList: [{
						imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
						teacher: '王名字',
						title: '课程名称课程名称课程名称课程名称',
						time: '每天12:00',
						classNum: 12,
						text: '张老师'
					},
					{
						imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
						teacher: '老师名字',
						title: '课程名称课程名称课程名称课程名称',
						time: '每天12:00',
						classNum: 10,
						text: '张老师'
					},
				],

			}
		},
		onLoad(options) {

		},
		onShow() {
			console.log("index-onShow");
		},
		methods: {
			typeListTap: function(e) {
				let that = this;
				console.log(e)
				let idx = e.currentTarget.dataset.idx;
				that.typeListIdx = idx
			},



			receiveTap: function(e) {
				let that = this,
					dataset = e.currentTarget.dataset;
				if (!dataset.state) {
					return false;
				}
				that.$post('user.coupon/receive', {
					coupon_id: dataset.couponId
				}, function(res) {
					that.$showSuccess(res.msg);
					that.coupon[dataset.index].state = {
						value: 0,
						text: '已领取'
					}
				}, true)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.header-box {
		width: 100%;
		height: 288rpx;
		padding-top: 30rpx;
		background: $y_blue;

		.search-input {
			box-sizing: border-box;
			background: $y_c_ff;
			width: 670rpx;
			height: 65rpx;
			margin: 0 auto;
			padding: 0 40rpx;
			border-radius: 33rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				flex-shrink: 0;
				padding-right: 18rpx;
				margin-right: 10rpx;
				position: relative;
			}

			image::after {
				position: absolute;
				display: block;
				content: '';
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 3rpx;
				height: 35rpx;
				background: #61D4FF;
			}

			input {
				flex: 1;
			}
		}

	}

	.banner {
		width: 750rpx;
		height: 360rpx;
		margin-top: -195rpx;
		text-align: center;

		.swiper-item,
		image {
			width: 670rpx;
			height: 100%;
			border-radius: 10rpx;
			flex-shrink: 0;
			margin: 0 auto;
		}
	}

	.title {
		margin: 60rpx 0 0rpx;
		padding-bottom: 10rpx;
	}

	.type-list-box {
		box-sizing: border-box;

		/* padding: 15rpx 0; */
		.type-list-section {
			height: 65rpx;
			margin: 25rpx 0 0;
			line-height: 65rpx;
			box-sizing: border-box;
			padding: 0 32rpx;
			margin-right: 20rpx;
			text-align: center;
			border-radius: 33rpx;
			color: #7B7A8E;
			background: #ffffff;
			border: 1rpx solid #E6E3E3;
		}

		.type-list-section.active {
			color: #ffffff;
			background: $y_blue;
			border: none;
		}
	}

	.class-list-box {
		box-sizing: border-box;

		/* padding: 15rpx 0rpx; */
		.class-list-section {
			box-sizing: border-box;
			padding: 40rpx 30rpx;

			image {
				flex-shrink: 0;
				width: 200rpx;
				height: 150rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}

			.class-list-tit {
				width: 450rpx;
			}

			.class-list-time {
				margin: 15rpx 0 17rpx;
			}
		}
		.hr_2{width: 690rpx;height: 2rpx;margin: 0 30rpx;background: #E6E3E3;} 
	}
</style>
