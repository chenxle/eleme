<template>
	<view class="balance-container">
		<view class="my-balance">
			<view class="title">我的余额</view>
			<view class="content">￥{{balance}}</view>
		</view>
		<view class="hint">请打开饿了么app，在“我的-钱包-余额”中提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance:0
			}
		},
		methods: {
			
		},
		onLoad() {
			this.balance = this.$store.getters.getUserInfo().balance;
		}
	}
</script>

<style lang="scss" scoped>
.balance-container {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	.my-balance {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin:360rpx 0;
		.title {
			font-size: 38rpx;
		}
		.content {
			color: #000;
			font-size: 50rpx;
			font-weight: 700;
		}
	}
	.hint {
		font-size: 26rpx;
		color: #ccc;
	}
}
</style>
