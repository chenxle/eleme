<template>
	<view class="user-container">
		<!-- 信息及头像 -->
		<view class="user-info">
			<!-- 未登陆页面 -->
			<block v-if="!getIsLogin">
				<view @click="toLoginPage" class="dl">
					<view class="noLogin">
						<view class="login">
							<view class="text">立刻登录</view>
							<view class="iconfont icon-greater-than-solid" />
						</view>
						<view class="info">饿不饿都上饿了么</view>
					</view>
					<view class="img">
						<image src="/static/images/default_user_photo.png"></image>
					</view>
				</view>
			</block>
			<!-- 已登录页面 -->
			<block v-if="getIsLogin">
				<view @click="outlogin" class="dl">
					<view class="noLogin">
						<view class="login">
							<view class="text">{{user.userId}}</view>
						</view>
						<view class="info">再忙，也要记得吃饭呦~</view>
					</view>
					<view class="img">
						<image src="/static/images/user_photo.webp"></image>
					</view>
				</view>
			</block>
			
			
		</view>
		<!-- 红包、余额 -->
		<view class="money">
			<view class="item" @click="toPage1">
				<view class="text">
					<view :class="getIsLogin==false?'asdf':'' " class="button">红包</view>
					<text v-if="!getIsLogin">登录后查看</text>
					<text v-else>{{user.redPacketNumber}}个未使用</text>
				</view>
				<view class="img">
					<image src="/static/images/red-packet.png"></image>
				</view>
			</view>
			<view class="item" @click="toPage2">
				<view class="text">
					<view>余额</view>
					<text v-if="!getIsLogin">登录后查看</text>
					<text v-else>￥{{user.balance}}</text>
				</view>
				<view class="img">
					<image src="/static/images/balance.png"></image>
				</view>
			</view>
		</view>
		<!-- 点餐提醒 -->
		<view class="warn" v-if="getIsLogin">
			<image class="img" src="/static/images/naozhong.png"></image>
			<view class="middle">
				<text class="title">点餐提醒</text>
				<text class="num">已有<text>{{49254}}</text>人提醒自己按时吃饭</text>
			</view>
			<navigator url="../orderRemind/orderRemind">
				<button class="button" size="mini" style="background-color: rgb(0, 166, 255)">
						立即开启
				</button>
			</navigator>
		</view>
		<!-- 其它功能 -->
		<view class="divisions">
			<!-- 我的地址 -->
			<navigator url="/pages/shippingSite/shippingSite" class="division">
				<view class="item">
					<view>
						<image src="/static/images/site.png" mode=""></image>
						<view>我的地址</view>
					</view>
					<view>
						<view class="iconfont icon-greater-than-solid right" />
					</view>
				</view>
			</navigator>
			<!-- 我的收藏 -->
			<navigator url="" class="division">
				<view class="item">
					<view>
						<image src="/static/images/like.png" mode=""></image>
						<view>我的收藏</view>
					</view>
					<view>
						<view class="iconfont icon-greater-than-solid right" />
					</view>
				</view>
			</navigator>
			<!-- 推荐有礼 -->
			<navigator url="" class="division">
				<view class="item">
					<view>
						<image src="/static/images/gift.png" mode=""></image>
						<view>推荐有礼</view>
					</view>
					<view>
						<view class="iconfont icon-greater-than-solid right" />
					</view>
				</view>
			</navigator>
			<!-- 我的客服 -->
			<navigator url="" class="division">
				<view class="item">
					<view>
						<image src="/static/images/HeadsetOutline.png" mode=""></image>
						<view>我的客服</view>
					</view>
					<view>
						<view class="iconfont icon-greater-than-solid right" />
					</view>
				</view>
			</navigator>
			<!-- 规则中心 -->
			<navigator url="" class="division">
				<view class="item">
					<view>
						<image src="/static/images/book.png" mode=""></image>
						<view>规则中心</view>
					</view>
					<view>
						<view class="iconfont icon-greater-than-solid right" />
					</view>
				</view>
			</navigator>
		</view>
		<!-- 版本号 -->
		<view class="versions">
			{{version}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:'1.1.9',
				user:{}
			}
		},
		methods: {
			getUserInfo(){
				var userInfo = this.$store.getters.getUserInfo;
				this.user = userInfo;
			},
			outlogin(){
				var _this = this;
				uni.showModal({
				    content: '是否退出登录',
				    success: function (res) {
				        if (res.confirm) {
							_this.$store.commit('setIsLogin',false);
							_this.$store.commit('setUserInfo',{});
							uni.clearStorageSync();
							uni.switchTab({
								url: '/pages/home/home'
							})
				        }
				    }
				});
			},
			toLoginPage(){
				//#ifdef H5
				console.log('只在h5有')
				uni.navigateTo({
					url: '/pages/login/photoLogin/photoLogin',
				});
				//#endif
				//#ifdef MP-WEIXIN
				console.log('只在微信有')
				uni.navigateTo({
					url: '/pages/login/login',
				});
				//#endif
			},
			toPage1(){
				if(!this.getIsLogin){
					this.toLoginPage();
				}
			},toPage2(){
				if(this.getIsLogin){
					uni.navigateTo({
						url: '/pages/balance/balance',
					});
				}else {
					this.toLoginPage();
				}
			}
		},
		computed:{
			getIsLogin(){
				return this.$store.getters.getIsLogin;
			}
		},
		onLoad() {
			this.getUserInfo();
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
			navigator {
				flex: 1;
				display: flex;
				justify-content: space-between;
			}
			.dl {
				flex: 1;
				display: flex;
				justify-content: space-between;
			}

			.noLogin {
				margin-left: 6rpx;

				.login {
					display: flex;
					align-items: center;

					.text {
						font-size: 54rpx;
						font-weight: 600;
					}

					.icon-greater-than-solid {
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
			display: flex;
			justify-content: space-between;

			.item {
				width: 49%;
				display: flex;
				justify-content: space-around;
				box-shadow: 4rpx 2rpx 8rpx #eee;

				.text {
					margin: 26rpx 0;
					view {
						color: #333;
						font-weight: 500;
					}

					text {
						font-size: 24rpx;
						color: #999;
					}
				}

				.img {
					margin-top: 24rpx;
					image {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}
		
			/* 闹钟 */
			.warn .img {
				width: 100rpx;
				height: 100rpx;
			}
			.warn {
				display: flex;
				justify-content: space-around;
				border: 2rpx solid rgb(225, 229, 238);
				align-items: center;
				border-radius: 16rpx;
				margin: 20rpx 0;
				padding: 26rpx 0;
			}
			.warn .middle {
				display: flex;
				flex-direction: column;
			}
			.warn .middle .title {
				color: rgb(0, 87, 134)
			}
			.warn .middle .num {
				font-size: 24rpx;
				color: rgb(102, 154, 182);
				text {
					color: skyblue;
					margin: 0 4rpx;
					font-weight: 900;
				}
			}


		.divisions {
			margin-top: 18rpx;

			.division {
				display: flex;
				border-bottom: 2rpx solid #eee;
				padding: 30rpx 8rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin: 0 30rpx;
				}

				.item {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;

					view {
						display: flex;
						align-items: center;

						.right {
							margin-top: 2rpx;
							color: #999;
						}
					}
				}
			}
		}
		.versions {
			display: flex;
			margin: 20rpx 0;
			justify-content: center;
			color: #888;
			font-size: 28rpx;
		}
	}
</style>
