<template>
	<view class="order-container">
		<!-- 未登录 -->
		<view class="page" v-if="!getIsLogin">
			<view class="img">
				<image src="/static/images/noLogin.png" mode=""></image>
			</view>
			<view class="text">
				登录后查看外卖订单
			</view>
			<button type="default" size="mini">立即登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
			getIsLogin(){
				return this.$store.getters.getIsLogin;
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-container {
	height: 70vh;
	display: flex;
	justify-content: center;
	align-items: center;
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.img {
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.text {
			margin: 6rpx 0;
			font-size: 30rpx;
		}
		button {
			margin: 6rpx 0;
			background-color: rgb(61, 255, 93);
		}
	}
}
</style>
