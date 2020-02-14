<template>
	<view class="appContainer">
		<view class="class-list-box">
			<view class="y_bg_ff" v-for=" (item,index) in classList" :key='index' @tap="$navigationTo" :data-url="'pages/index/class-detail'">
				<view class="class-list-section  y_align_c">
					<view class="class-tag y_f_22" :class="item.status==1?'active':''">{{item.statusText}}</view>
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
</template>

<script>
	export default {
		data() {
			return {
				classList: [{
						imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
						teacher: '王名字',
						title: '课程名称课程名称课程名称课程名称',
						time: '每天12:00',
						classNum: 12,
						text: '张老师',
						status: 1,
						statusText: '直播中'
					},
					{
						imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
						teacher: '老师名字',
						title: '课程名称课程名称课程名称课程名称',
						time: '每天12:00',
						classNum: 10,
						text: '张老师',
						status: 0,
						statusText: '已结束'
					},
					{
						imgUrl: 'http://www.xinyos.com/public/img/exam.jpg',
						teacher: '老师名字',
						title: '课程名称课程名称课程名称课程名称',
						time: '每天12:00',
						classNum: 10,
						text: '张老师',
						status: 0,
						statusText: '未开始'
					},
				],
			}
		},
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
	.class-list-box {
		margin-top: 5rpx;
		box-sizing: border-box;
		.class-list-section {
			position: relative;
			box-sizing: border-box;
			padding: 60rpx 30rpx 40rpx;
			.class-tag {
				position: absolute;
				top: 0;
				left: 0;
				box-sizing: border-box;
				height: 36rpx;
				line-height: 36rpx;
				padding: 0 30rpx;
				color: $y_black;
				background: $y_c_c2;
			}
			.class-tag.active {
				color: $y_white;
				background: $y_blue;
			}
			.class-tag::after {
				position: absolute;
				left: 95%;
				top: 0;
				display: inline-block;
				content: '';
				background: #ffffff;
				width: 20rpx;
				height: 40rpx;
				transform: rotate(15deg);
			}
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

		.hr_2 {
			width: 750rpx;
			height: 2rpx;
			background: #E6E3E3;
		}
	}
</style>
