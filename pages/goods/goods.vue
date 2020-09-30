<template>
	<view class="goods-container">
		<!-- 顶部背景图和头像图 -->
		<view class="img" :style="{backgroundImage: 'url(' + shop.bgcImg + ')',
		'background-repeat':'no-repeat', backgroundSize:'100% 100%'}">
			<view class="photo">
				<image :src="shop.img" mode=""></image>
			</view>
		</view>
		<view class="main">
			<!-- 信息 -->
			<view class="info">
				<view class="title">{{shop.title}}</view>
				<view class="detailed">
					<text>评价{{shop.grade}}</text>
					<text>月售{{shop.month_sales}}单</text>
				</view>
				<view class="notice">
					公告：{{shop.notice}}
				</view>
			</view>
			<!-- 功能导航栏 -->
			<view class="shop-tab">
				<view @click="setCurrentSelect(0)">
					<text :class="(currentSelect == 0)&&'select'">点餐</text>
				</view>
				<view @click="setCurrentSelect(1)">
					<text :class="(currentSelect == 1)&&'select'">评价</text>
				</view>
				<view @click="setCurrentSelect(2)">
					<text :class="(currentSelect == 2)&&'select'">商家</text>
				</view>
			</view>
			<!-- 点餐 -->
			<view class="food" v-if="currentSelect==0">
				<view class="img">
					<image src="https://cube.elemecdn.com/a/d9/30f8aa49a6e569d0fc1ffdba91d66png.png?x-oss-process=image/format,webp/resize,w_686" mode=""></image>
				</view>
			</view>
			<!-- 评价 -->
			<view class="evaluate" v-if="currentSelect==1">
				
			</view>
			<!-- 商家 -->
			<view class="shop-info" v-if="currentSelect==2">
				
			</view>
		</view>
	</view>
</template>

<script>
import { getShopById } from '../../api/shopApi.js';
	export default {
		data() {
			return {
				shop:{},
				id:-1,
				// shop-tab选中功能(默认为0)
				currentSelect:0,
			}
		},
		methods: {
			async getShopByData(){
				var data = await getShopById(this.id);
				this.shop = data;
			},
			setCurrentSelect(index){
				this.currentSelect = index;
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getShopByData();
		}
	}
</script>

<style lang="scss" scoped>
.goods-container {
	.img {
		display: flex;
		justify-content: center;
		position: relative;
		height: 200rpx;
		.photo {
			position: absolute;
			bottom: -48rpx;
			image {
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
	.main {
		margin: 0 30rpx;
		.info {
			margin-top: 80rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin: 60rpx 60rpx 0;
			.title {
				color: #000;
				font-weight: 700;
				font-size: 44rpx;
			}
			.detailed {
				color: #919191;
				font-size: 24rpx;
				text {
					margin: 0 10rpx;
				}
			}
			.notice {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #9f9f9f;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
		.shop-tab {
			display: flex;
			view {
				flex: 1;
				display: flex;
				justify-content: center;
				margin: 40rpx 0;
				font-size: 30rpx;
				color: #666;
				font-weight: 500;
				text {
					padding-bottom: 10rpx;
				}
			}
			.select {
				border-bottom: 6rpx solid skyblue;
			}
		}
		.food {
			.img {
				height: 170rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
