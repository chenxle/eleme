<template>
	<view class="shop">
		<!-- 商家列表  -->
		<view class="merchant-list" v-for="item in getShopData" :key="item.id">
			<view class="image">
				<image class="img" :src="item.img"></image>
			</view>
			<view class="footer">
				<view class="title">{{item.title}}</view>
				<view class="grade">{{item.grade}}</view>
				<view class="money">
					<view class="price">起送￥{{item.price}}</view>
					<view class="delivery">配送费￥{{item.delivery}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getShopList} from "../../api/homeApi.js";
	export default {
		
		data() {
			return {
				id:-1,
				getShopData: [],
			};
		},
		methods:{
			async getshoplistData() {
				var message = await getShopList();
				this.getShopData = message;
			},
			created() {
				this.getshoplistData();
			}
		},
		onLoad(option) {
			this.id = option.id;
			console.log(this.id);
		},
	}
</script>

<style lang="scss">
	// 商家列表
	.shop .merchant-list {
		display: flex;
		justify-content: flex-start;
		margin: 20rpx 28rpx;
	}
	
	.shop .merchant-list .image .img {
		width: 130rpx;
		height: 130rpx;
	}
	
	.shop .merchant-list .footer .title {
		font-weight: bold;
		font-size: 40rpx;
		color: black;
	}
	
	.shop .merchant-list .footer {
		// display: flex;
		// flex-direction: column;
		font-size: 24rpx;
		color: rgb(128, 128, 128);
		margin: auto 20rpx;
	}
	
	.shop .merchant-list .grade {
		margin: 10rpx auto;
	}
	
	.shop .merchant-list .money {
		display: flex;
		margin: 10rpx auto;
	}
</style>
