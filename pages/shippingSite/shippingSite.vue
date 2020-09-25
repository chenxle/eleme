<template>
	<view class="shipping-site">
		<view class="top">
			<view class="site">
				<view class="title">
					<view class="name">郑晓玲</view>
					<view class="sex">女士</view>
					<view class="phone">12345678900</view>
				</view>
				<view class="footer">
					<view class="remark">家</view>
					<view class="definite">广东省汕头市潮南区陇田镇东仙村里十四</view>
				</view>
			</view>
			<view class="edit">
				<image class="img" src="../../static/images/edit.png"></image>
			</view>
		</view>
		<view class="add">
			<image class="img" src="../../static/images/add.png" mode=""></image>新增地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.shipping-site {
		position: relative;
		height:93.4vh;
		.top {
			display: flex;
			padding:4rpx auto;
			border-bottom: 4rpx solid rgb(245, 245, 245);
			.site {
				margin: auto 20rpx;

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

					.remark {
						background: rgb(255, 96, 32);
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
			background-color: grey;
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
