<template>
	<view class="shipping-site">
		<view class="top" v-for="item in getAddressData" :key="item.id">
			<view class="site">
				<view class="title">
					<view class="name">{{item.name}}</view>
					<view class="sex">{{item.sex}}</view>
					<view class="phone">{{item.phone}}</view>
				</view>
				<view class="footer">
					<view class="remark" :class="getBgc(item.remark)">{{item.remark}}</view>
					<view class="definite">{{item.definite}}</view>
				</view>
			</view>
			<view class="edit">
				<image class="img" src="../../static/images/edit.png"></image>
			</view>
		</view>
		<navigator url="../addSite/addSite">
			<view class="add">
				<image class="img" src="../../static/images/add.png"></image>新增地址
			</view>
		</navigator>
	</view>
</template>

<script>
	import {getAddress} from "../../api/homeApi.js";
	export default {
		data() {
			return {
				getAddressData:[]
			};
		},
		methods:{
			async getAddressList(){
				var message = await getAddress();
				this.getAddressData = message;
			},
			getBgc(remark){
				switch (remark){
					case '家':
						return "bgc-red";
					case '公司':
						return "bgc-blur";
					case '学校':
						return "bgc-green";
					default:
						return '';
				}
			}
		},
		onLoad() {
			this.getAddressList();
		}
	}
</script>

<style lang="scss">
	.shipping-site {
		position: relative;
		height:93.4vh;
		background-color: rgb(245, 245, 245);
		.top {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
			border-bottom: 4rpx solid rgb(245, 245, 245);
			background-color: white;
			
			.site {
				.title {
					display: flex;

					.name {
						font-weight: bold;
					}

					.sex {
						margin: 0rpx 20rpx;
						font-size: 32rpx;
					}

					.phone {
						font-size: 32rpx;
					}
				}

				.footer {
					display: flex;
					.bgc-red {
						background-color: rgb(255, 96, 32);
					}
					.bgc-blur{
						background-color: rgb(0, 151, 255);
					}
					.bgc-green{
						background-color: rgb(93, 207, 123);
					}
					
					.remark {
						color: white;
					}

					.definite {
						color: rgb(170, 170, 170);
						font-size: 32rpx;
						margin-left: 20rpx;
					}
				}
			}

			.edit {
				display: flex;
				align-items: center;
				.img {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
		.add{
			width: 100%;
			position: absolute;
			background-color: white;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			bottom: 0;
			.img{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
