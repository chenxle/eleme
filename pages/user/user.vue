<template>
	<view class="user-container">
		<!-- 信息及头像 -->
		<view class="user-info">
			<view class="noLogin">
				<view class="login" v-if="!isLogin">
					<view class="text">立刻登录</view>
					<view class="iconfont icon-greater-than-solid" />
				</view>
				<view class="login" v-else>
					<view class="text">message</view>
				</view>
				<view class="info" v-if="!isLogin">饿不饿都上饿了么</view>
				<view class="info" v-else>message</view>
			</view>
			<view class="img">
				<image src="/static/images/default_user_photo.png" v-if="!isLogin"></image>
				<image src="/static/images/user_photo.webp" v-else></image>
			</view>
		</view>
		<!-- 红包、余额 -->
		<view class="money">
			<view class="item">
				<view class="text">
					<text>红包</text>
					<text v-if="!isLogin">登录后查看</text>
					<text v-else>message个未使用</text>
				</view>
				<view class="img">
					<image src="/static/images/red-packet.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="text">
					<text>余额</text>
					<text v-if="!isLogin">登录后查看</text>
					<text v-else>￥message</text>
				</view>
				<view class="img">
					<image src="/static/images/balance.png"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:false
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.user-container {
	margin: 0 20rpx;
	.user-info {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
		.noLogin {
			margin-left: 6rpx;
			.login {
				display: flex;
				align-items: center;
				.text {
					font-size: 54rpx;
					font-weight: 600;
				}
				.icon-greater-than-solid{
					margin-left: 6rpx;
					color: #999;
				}
			}
			.info {
				color: #888;
				font-size: 24rpx;
			}
		}
		.img {
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 80rpx;
				overflow: hidden;
				margin-right: 10rpx;
			}
		}
	}
	.money {
		.item {
			.img {
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
}
</style>
