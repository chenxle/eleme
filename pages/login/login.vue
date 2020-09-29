<template>
	<view class="login-conatiner">
		<!-- 图片 -->
		<view class="img">
			<image src="/static/images/home-server.png" mode=""></image>
		</view>
		<view class="title">饿了么外卖</view>
		<button type="default" style="background-color: #007AFF;" open-type="getUserInfo" @getuserinfo="login">微信账号一键登录</button>
		<view class="photo-login">
			<navigator url="/pages/login/photoLogin/photoLogin">
				<text>使用手机号码登录</text>
			</navigator>
		</view>
		<view class="login-info">
			<text>登录代表您已同意</text>
			<text class="protocol">《用户服务协议》</text>
			<text class="protocol">《隐私权政策》</text>
		</view>
	</view>
</template>

<script>
import { getUserByNickname } from '../../api/loginApi.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 登录
			login(){
				var _this = this;
				uni.login({
					provider:'wexin',
					// 登录成功
					success(info){
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: async function (infoRes) {
								console.log(infoRes.userInfo);
								var userInfo = infoRes.userInfo;
								var message = await getUserByNickname(userInfo.nickName);
								
								// 登录成功，修改vuex中的数据
								_this.$store.commit('setUserInfo',message[0]);
								_this.$store.commit('setIsLogin',true);
								// 只返回不刷新数据
								// uni.navigateBack();
								uni.switchTab({
									url: '/pages/user/user',
									success(){
										let page = getCurrentPages().pop(); //跳转页面成功之后
										if (!page) return;
										page.onLoad(); //如果页面存在，则重新刷新页面
									}
								})
							},
							fail() {
								console.log("失败");
							}
						})
					},
					fail(res) {
						uni.showToast({
							title:"登录失败，请稍后再试",
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.login-conatiner {
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: column;
	height: 95vh;
	.img {
		display: flex;
		width: 460rpx;
		height: 460rpx;
		justify-content: center;
		align-items: center;
		image {
			width: 300rpx;
			height: 300rpx;
		}
	}
	.title {
		color: #000;
		font-size: 46rpx;
		font-weight: 500;
	}
	button {
		margin: 20rpx;
		display: flex;
		width: 90%;
		justify-content: center;
		color: #fff;
	}
	.photo-login {
		display: flex;
		justify-content: center;
	}
	.login-info {
		position: absolute;
		bottom: 0rpx;
		font-size: 28rpx;
		.protocol {
			color: blue;
		}
	}
}
</style>
