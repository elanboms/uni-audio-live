<template>
	<view class="appContainer">
		<!-- banner部分 -->
		<swiper class="banner" :indicator-dots="false" :autoplay="true" :interval="3000" :circular='true' :duration="1000">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>

		<view class="top-box y_f_32 y_c_ff y_border_box y_ptb_10">
			<view class="y_elli_2">老师名字 课程名称称</view>
			<view class="top-box-text y_f_26 y_mtb_15">每日12:00 共12节课</view>
			<view class="top-price">￥1.00 - 99.00</view>
		</view>

		<!-- 课程 -->
		<view class="detail-box y_border_box">
			<view class="title y_pt_40 y_pb_25">课程简介</view>
			<view class="y_pt_25">这个直播课程的介绍，比如说我下介绍今天讲哪些，明天讲哪些，后天讲讲哪些。这个直播课程的介绍，比如说我下介绍今天讲哪些，明天讲哪些，后天讲讲哪些。 </view>

			<view class="title y_pt_50 y_pb_25">选择课程</view>
			<view class="class-list-box y_f_26 y_flex_s y_wrap">
				<view v-for="(item,index) in classDayList" :key="index" :class="item.status==1?'active':''" class="class-list-section y_flex_col y_align_c ">
					<view>{{item.day}}</view>
					<view v-if="item.status" class="y_f_18 y_pt_5">{{item.remark}}</view>
				</view>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="btm-box y_align_c y_flex_b">
			<view class="btm-lt y_align_c ">
				<view class="y_align_c y_mr_10" @tap="seleceAllTap">
					<view class="circle" :class="selectactive"></view>
					<view>全选</view>
				</view>
				<view class="y_gray y_f_26 y_align_s"> 已选择{{selectNum}}节，共 <view class="btm-price">￥12</view>
				</view>
			</view>
			<button class="y_f_32" @tap="buyTap">购买</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [{
					imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
				}, {
					imgUrl: 'http://shop.liankebao.net/uploads/2019082414313666eb61460.jpg',
				}],

				classDayList: [{id: 11,day: 1,status: 0,remark: ''},
					{id: 22,day: 2,status: 1,remark: '已购'},
					{id: 33,day: 3,status: 1,remark: '已购'},
					{id: 44,day: 4,status: 1,remark: '已购'},
					{id: 55,day: 5,status: 1,remark: '已购'},
					{id: 66,day: 6,status: 0,remark: ''},
					{id: 17,day: 7,status: 0,remark: ''},
					{id: 18,day: 8,status: 1,remark: '已购'},
					{id: 19,day: 9,status: 0,remark: ''},
					{id: 51,day: 10,status: 1,remark: '已购'},
					{id: 56,day: 11,status: 0,remark: ''},
					{id: 64,day: 12,status: 1,remark: '已购'},
					{id: 99,day: 13,status: 0,remark: ''},
					{id: 12,day: 14,status: 0,remark: ''},
					{id: 73,day: 15,status: 0,remark: ''},
					{id: 48,day: 16,status: 0,remark: ''},
					{id: 28,day: 17,status: 1,remark: '已购'},
				],
				selectactive: '',
				selectNum: 0,
			}
		},
		onLoad(options) {

		},
		onShow() {
			console.log("detail-onShow");
		},
		computed: {
			
		},
		methods: {
			seleceAllTap() { //全选
				let that = this,
					classDayList = that.classDayList,
					selectActive = that.selectactive,
					selectNum = 0;
				classDayList.map((v, k) => {
					if (v.status == 0) {
						selectNum++;
					}
				})
				if (selectActive == 'active') {
					that.selectactive = '';
					that.selectNum = 0;
				} else {
					that.selectactive = 'active';
					that.selectNum = selectNum;
				}
			},
			
			buyTap(){ //购买
				uni.showModal({
					title: '确认购买吗',
					content: '点击课程或课程表目录，就可以学习了！',
					showCancel: false,
					confirmText: '确定',
					success: res => {
						if(res.confirm){
								
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang='scss' scoped>
	.banner {
		width: 750rpx;
		height: 410rpx;

		.swiper-item,
		image {
			width: 750rpx;
			height: 100%;
			border-radius: 0rpx;
			flex-shrink: 0;
		}
	}

	.top-box {
		background: #3E465C;

		.top-price {
			color: #FF6901;
		}

		.top-box-text {
			color: rgba(255, 255, 255, 0.6)
		}
	}

	.detail-box {
		margin-bottom: 100rpx;

		.title {
			@include y_b_b;
			@include y_bold;
		}

		.class-list-section {
			width: 72rpx;
			height: 72rpx;
			margin: 30rpx 20rpx;
			box-sizing: border-box;
			padding-top: 5rpx;
			border-radius: 50%;
		}

		.class-list-section.active {
			color: #ffffff;
			background: $y_blue;
		}
	}

	.btm-box {
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background: #EFEEF3;

		.btm-lt {
			flex: 1;
			.circle {
				width: 30rpx;
				height: 30rpx;
				margin-left: 30rpx;
				margin-right: 10rpx;
				border: 2rpx solid $y_gray;
				background: #ffffff;
				border-radius: 50%;
			}

			.circle.active {
				border: 2rpx solid $y_blue;
				background: $y_blue;
			}

			.btm-price {
				color: #FF6901;
			}
		}

		button {
			width: 238rpx;
			height: 100%;
			flex-shrink: 0;
			@include y_align_c;
			@include y_flex_c;
			background: $y_blue;
			color: $y_c_ff;
		}
	}
</style>
