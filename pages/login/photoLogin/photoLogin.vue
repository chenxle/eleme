<template>
	<view class="photo-login-container">
		<view class="login">
			<!-- 手机号 -->
			<view class="photo">
				<input type="text" placeholder="请输入手机号" v-model="photo" />
			</view>
			<!-- 用户密码 -->
			<view class="password">
				<input type="text" placeholder="请输入密码" v-model="password"/>
			</view>
			<!-- 登录 -->
			<view class="verification">
				<button type="default" @click="login">同意协议并登录</button>
			</view>
			<view class="protocol">
				已阅读并同意<text>《用户服务协议》</text>、<text>《隐私权政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserByPhotoAndPassword } from '../../../api/loginApi.js';
	export default {
		data() {
			return {
				photo:'',
				password:''
			}
		},
		methods: {
			// 登录
			async login(){
				var photo = this.photo;
				var password = this.password;
				if(!photo.trim() || !password.trim()){
					uni.showToast({
						title: '手机号和密码不能为空',
						icon:'none'
					});
					return;
				}
				if(isNaN(photo)){
					uni.showToast({
						title: '手机号存在非数字',
						icon:'none'
					});
					return;
				}
				if(photo.length != 11){
					uni.showToast({
						title: '手机号长度错误',
						icon:'none'
					});
					return;
				}
				
				// 发送验证请求
				var message = await getUserByPhotoAndPassword(photo,password);
				if(message.length == 0){
					uni.showToast({
						title: '手机号或密码错误',
						icon:'none'
					});
					return;
				}
				this.$store.commit('setUserInfo',message[0]);
				this.$store.commit('setIsLogin',true);
				uni.setStorage({
					key:"userInfo",
					data:message[0]
				})
				uni.navigateBack({
					delta:2
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
.photo-login-container {
	.login {
		margin: 50rpx;
		view {
			input {
				margin: 30rpx 0;
				padding: 16rpx 0;
				border-bottom: 2rpx solid #ccc;
			}
		}
		.verification {
			button {
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}
		.protocol {
			margin-top: 40rpx;
			font-size: 26rpx;
			color: #888;
			text {
				color: #007AFF;
			}
		}
	}
}
</style>
