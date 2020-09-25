<template>
	<view class="home-container">
		<!-- 定位 -->
		<view class="location">
			<image class="img" src="../../static/images/bingwei.png"></image>广东省汕头市
		</view>
		<!-- 搜索 -->
		<view class="search">
			<navigator url="../search/search" style="text-align: center;">
				<uni-search-bar cancelButton='none' class="search" placeholder="搜索饿了么商家，商品名称" />
			</navigator>
		</view>
		<!-- 地道家乡味 -->
		<view class="tunnel">
			<image class="img" src="../../static/images/tunnel.jpg"></image>
		</view>
		<!-- 宫格 -->
		<view class="gongge">
			<uni-grid :column="5" :showBorder="false">
				<uni-grid-item v-for="item in gongGeData" :key="item.id">
					<navigator :url="'/pages/shoplist/shoplist?id='+item.id">
						<view>
							<image class="img" :src="item.img"></image>
						</view>
						<view class="title">
							<text class="text">{{item.title}}</text>
						</view>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 点餐提醒 -->
		<view class="warn" style="height: 76px; margin-top:40px;">
			<image class="img" src="../../static/images/naozhong.png"></image>
			<view class="middle">
				<text class="title">点餐提醒</text>
				<text class="num">已有49254人提醒自己按时吃饭</text>
			</view>
			<navigator url="../orderRemind/orderRemind">
				<button class="button" size="mini" style="background-color: rgb(0, 166, 255)">立即开启</button>
			</navigator>
		</view>
		<!-- 赏金 -->
		<view class="red-money">
			<image class="img" src="../../static/images/money.png"></image>
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="title">推荐商家</view>
			<view class="screen">
				<button class="first button" @click="setSelect1" :class="isSelect1?'select':''" type="default" size="mini">首单立减</button>
				<button class="subsiby button" @click="setSelect2" :class="isSelect2?'select':''" type="default" size="mini">津贴优惠</button>
				<button class="full button" @click="setSelect3" :class="isSelect3?'select':''" type="default" size="mini">满减优惠</button>
				<button class="return button" @click="setSelect4" :class="isSelect4?'select':''" type="default" size="mini">下单返红包</button>
			</view>
		</view>
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
	import {
		getGongge,
		getShopList
	} from "../../api/homeApi.js";
	export default {
		data() {
			return {
				gongGeData: [],
				getShopData: [],
				isSelect1: false,
				isSelect2: false,
				isSelect3: false,
				isSelect4: false
			};
		},
		methods: {
			async getGonggeData() {
				var 
					message
				 = await getGongge();
				console.log(message);
				this.gongGeData = message;
			},
			async getshoplistData() {
				var 
					message
				 = await getShopList();
				this.getShopData = message;
			},
			setSelect1(){
				this.isSelect1 = !this.isSelect1;
			},
			setSelect2(){
				this.isSelect2 = !this.isSelect2;
			},
			setSelect3(){
				this.isSelect3 = !this.isSelect3;
			},
			setSelect4(){
				this.isSelect4 = !this.isSelect4;
			}
		},
		created() {
			this.getGonggeData();
			this.getshoplistData();
		}
	}
</script>

<style lang="scss">
	/* 定位 */
	.home-container .location .img {
		width: 28px;
		height: 28px;
	}

	// 地道家乡
	.home-container .tunnel .img {
		height: 139px;
		width: 375px;
	}

	/* 宫格 */
	.home-container .gongge {
		text-align: center;
	}

	.home-container .gongge .img {
		width: 55px;
		height: 55px;
	}

	.home-container .gongge .title .text {
		font-size: 14px;
	}

	/* 闹钟 */
	.home-container .warn .img {
		width: 100rpx;
		height: 100rpx;
	}

	.home-container .warn {
		display: flex;
		justify-content: space-around;
		border: 2rpx solid rgb(225, 229, 238);
		align-items: center;
		border-radius: 16rpx;
		margin: 24rpx;
	}

	.home-container .warn .middle {
		display: flex;
		flex-direction: column;
	}

	.home-container .warn .middle .title {
		color: rgb(0, 87, 134)
	}

	.home-container .warn .middle .num {
		font-size: 24rpx;
		color: rgb(102, 154, 182);
	}

	/* 赏金 */
	.home-container .red-money .img {
		width: 710rpx;
		height: 194rpx;
		margin: auto 20rpx;
	}

	/* 推荐 */
	.home-container .recommend .title {
		font-size: 40rpx;
		color: rgb(0, 166, 255);
		margin: 30rpx 0rpx 30rpx 30rpx;
	}

	.home-container .recommend .screen {
		display: flex;
		justify-content: space-around;
		border-radius: 30rpx;
		margin: 40rpx auto;
	}

	.home-container .recommend .screen .van-button {
		color: black;

	}

	// 商家列表 
	.home-container .merchant-list {
		display: flex;
		justify-content: flex-start;
		margin: 20rpx 28rpx;
	}

	.home-container .merchant-list .image .img {
		width: 130rpx;
		height: 130rpx;
	}

	.home-container .merchant-list .footer .title {
		font-weight: bold;
		font-size: 40rpx;
		color: black;
	}

	.home-container .merchant-list .footer {
		// display: flex;
		// flex-direction: column;
		font-size: 24rpx;
		color: rgb(128, 128, 128);
		margin: auto 20rpx;
	}

	.home-container .merchant-list .grade {
		margin: 10rpx auto;
	}

	.home-container .merchant-list .money {
		display: flex;
		margin: 10rpx auto;
	}
	.select { 
		background-color:skyblue;
	}
</style>
