<template>
	<view class="appContainer">
		<view v-for="(order,index) in orderList" :key="index" class="order-section y_bg_ff y_f_26">
			<view class="y_c_c2  y_pt_25">{{order.time}}</view>
			<view class="y_bold y_mt_40 y_pb_12 y_f_30">{{order.title}}</view>
			
			<view v-for="(classItm,idx) in order.classList" :key="idx" class="order-item y_mt_25 y_flex_b y_align_c ">
				<view class="y_gray y_elli">{{classItm.title}}</view>
				<view class="y_bold y_flex_k y_ml_30">￥{{classItm.classPrice}}</view>
			</view>
			
			<view class="order-btm-con y_flex_b y_b_t">
				<view class="y_align_c y_flex_b">
					<view class="y_gray y_mr_10 y_elli">客户 |</view>
					<view class="order-name">{{order.name}}</view>
				</view>
				<view class="y_align_c">共{{order.num}}个商品,合计：<text class="y_orange y_bold">￥{{order.price}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[
					{
						time:'2020-3-2 12:00',
						title:'课程名称课程名称',
						name:'李小猫李小猫',
						num:221,
						price:'10000',
						classList:[
							{title:'3月2日：课程内容简介',classPrice:'100'},
							{title:'3月3日：课程内容简介课程内容简介课程内容简介简介课程内容简介简介课程内容简介',classPrice:'120'},
							{title:'3月4日：课程内容简介',classPrice:'18'},
						]
					},
					{
						time:'2020-3-12 12:00',
						title:'课程名称22课程名称222222课程名称23232',
						name:'李大猫',
						num:3,
						price:'100',
						classList:[
							{title:'3月2日：课程内容简介',classPrice:'120'},
							{title:'3月14日：课程内容简介',classPrice:'28'},
						]
					},
					
				]
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
	
		}
	}
</script>

<style>
	page {background: #EFEEF3;}
</style>
<style lang="scss" scoped>
	.order-section{
		width: 710rpx;
		margin: 20rpx auto 0;
		padding: 0 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		.order-btm-con{
			height: 90rpx;
			margin-top: 34rpx;
			.order-name{
				width: 210rpx;
				@include y_elli;
			}
		}
	}
</style>
