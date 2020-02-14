<template>
	<view class="appContainer y_bg_ff">
		<view class="top-box y_align_c y_b_b">
			<view v-for="(type,index) in dataType" :key='index' :data-idx='index' @tap="selectTap" class='top-section' :class="index==selectType?'active':''">{{type}}</view>
		</view>

		<!-- 收入数据 -->
		<view class="get-box" :hidden="selectType==1">
			<view class="get-top y_align_c y_mt_10">
				<view class="get-top-lt y_flex_1 y_ml_50">
					<view class="y_f_26 y_gray y_mb_15">总订单（个）</view>
					<view class="y_f_42 y_bold">18</view>
				</view>
				<view class="y_flex_1">
					<view class="y_f_26 y_gray y_mb_15">总收益（元）</view>
					<view class="y_f_42 y_bold">1899.00</view>
				</view>
			</view>
			<view class="y_bold y_m_40">趋势</view>
			<view class="chart-type-box y_align_c">
				<view data-idx='1' data-type='0' :class="chartsTypeIdx==1?'active':''"  @tap='chartsTypeTap'>收入</view>
				<view data-idx='2' data-type='0' :class="chartsTypeIdx==2?'active':''" @tap='chartsTypeTap'>单数</view>
			</view>
			
			<view class="chart-type-box y_align_c">
				<view data-idx='1' data-type='1' :class="chartsDateIdx==1?'active':''"  @tap='chartsTypeTap'>今日</view>
				<view data-idx='2' data-type='1' :class="chartsDateIdx==2?'active':''" @tap='chartsTypeTap'>昨日</view>
			</view>
			
			<!-- 表格 -->
			<view class="charts-box">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			</view>
		</view>

		<!-- 学员概况 -->
		<view class="con-box" :hidden="selectType==0">
			<view v-for="(student,studentIdx) in studentList" :key='studentIdx' class="student-item y_align_c">
				<image class="avatarImg" :src="student.avatarImg" mode=""></image>
				<view>
					<view class="y_f_32 y_mb_10">{{student.name}}</view>
					<view class="y_align_c y_gray y_f_24">
						<view class="y_mr_30">消费(元）：{{student.price}} </view>
						<view>课程(节）：{{student.classNum}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				selectType: 0,
				chartsTypeIdx:1,
				chartsDateIdx:1,
				dataType: ['收入数据', '学员概况'],
				studentList: [{
						avatarImg: 'http://www.xinyos.com/public/img/exam.jpg',
						name: '威德威德威德',
						price: '128.00',
						classNum: 2
					},
					{
						avatarImg: 'http://www.xinyos.com/public/img/exam.jpg',
						name: '凤凰台',
						price: '888',
						classNum: 1
					},
					{
						avatarImg: 'http://www.xinyos.com/public/img/exam.jpg',
						name: '部工会',
						price: '38',
						classNum: 18
					},
					{
						avatarImg: 'http://www.xinyos.com/public/img/exam.jpg',
						name: '恒房通',
						price: '19',
						classNum: 8
					},
				],
				//表格
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',

				//表格模拟数据
				LineA: {
					categories: ["2012", "2013", "2014", "2015", "2016", "2017"],
					series: [{
						name: "成交量A",
						data: [35, 8, 25, 37, 4, 20]
					}, {
						name: "成交量B",
						data: [70, 40, 65, 100, 44, 68]
					}, {
						name: "成交量C",
						data: [100, 80, 95, 150, 112, 132]
					}]
				},
			}
		},
		onShow() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			selectTap(e) { //选择顶部类别
				let that = this;
				let {idx} = e.currentTarget.dataset;
				that.selectType = idx
			},
			
			chartsTypeTap(e){ //表格曲线类型
				let that = this;
				let {type} = e.currentTarget.dataset;
				let {idx} = e.currentTarget.dataset;
				if(type==0){
					that.chartsTypeIdx = idx
				}else{
					that.chartsDateIdx = idx
				}
			},

			//表格
			getServerData() {
				let LineA = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				let that = this;
				LineA.categories = that.LineA.categories;
				LineA.series = that.LineA.series;
				_self.textarea = JSON.stringify(that.LineA);
				_self.showLineA("canvasLineA", LineA);
			},
			
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					padding:[15,20,0,15],
					legend:{ //图例
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					dataLabel:false, //数据点标签
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						disableGrid:true,
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8,
						boundaryGap:'justify'
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						format:(val)=>{return val.toFixed(0)+'元'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'curve'
						}
					}
				});
				
			},
			touchLineA(e) {
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						duration:1000
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background: #EFEEF3;
	}
</style>

<style lang="scss" scoped>
	.top-box {
		height: 80rpx;
		line-height: 80rpx;

		.top-section {
			box-sizing: border-box;
			padding: 0 50rpx;

			&.active {
				position: relative;
				color: $y_blue;
			}

			&.active::after {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
				display: block;
				content: '';
				width: calc(100% - 100rpx);
				height: 5rpx;
				background: $y_blue;
			}
		}
	}

	.get-box {
		.get-top {
			height: 150rpx;
			.get-top-lt {
				position: relative;
				&::after {
					position: absolute;
					content: '';
					display: block;
					top: 50%;
					right: 110rpx;
					transform: translateY(-50%);
					width: 2rpx;
					height: 70rpx;
					background: #EEEEEE;
				}
			}
		}
		.chart-type-box{
			margin-bottom: 20rpx;
			margin-left: 33rpx;
			>view{
				height: 50rpx;
				line-height: 50rpx;
				box-sizing: border-box;
				padding: 0 37rpx;
				@include y_f_24;
				border: 1rpx solid #B9B9B9;
				border-radius: 30rpx;
				&:first-child{
					margin-right: 10rpx;
				}
			}
			>view.active{
				border: 1rpx solid #4C64E9;
				color: #4C64E9;
			}
		}
		.charts-box {
			width: 750rpx;
			height: 500rpx;
			background-color: #FFFFFF;

			.charts {
				width: 750rpx;
				height: 500rpx;
				background-color: #FFFFFF;
			}
		}
	}



	.student-item {
		position: relative;
		box-sizing: border-box;
		padding: 30rpx;

		&::after {
			position: absolute;
			right: 0;
			bottom: 0;
			content: '';
			display: block;
			width: 610rpx;
			height: 2rpx;
			background: #EEEEEE;
		}

		&:last-child::after {
			display: none;
		}

		.avatarImg {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
			flex-shrink: 0;
			margin-right: 20rpx;

		}
	}
</style>
