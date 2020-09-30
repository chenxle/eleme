<template>
	<view class="addSite">
		<view class="touch">
			<view class="top">
				<view class="man">联系人</view>
				<view class="right">
					<view class="right-top">
						<input class="write" type="text" v-model="name" placeholder="姓名"/>
					</view>
					<view class="right-bottom">
						<button type="default"  plain="true" :class="(set == 0)?'but-red':''" size="mini" @click="setSet(0)">先生</button>
						<button type="default" plain="true" :class="(set == 1)?'but-red':''" size="mini" @click="setSet(1)">女士</button>
					</view>
				</view>
			</view>
			<view class="phone">
				<text>电话</text>
				<input class="write" type="text" v-model="phone" placeholder="手机号码" />
			</view>
			<view class="site">
				<text>地址</text>
				<input class="write" type="text" v-model="site" placeholder="选择收货地址" />
			</view>
			<view class="tail">
				<view class="state">补充说明</view>
				<view class="bottom">
					<input class="write" type="text" v-model="detailed" placeholder="详细(如门牌号等)" />
					<button type="default" size="mini" plain="false" :class="(select == 0)?'but-red':''" @click="setSelect(0)">家</button>
					<button type="default" size="mini" plain="false" :class="(select == 1)?'but-red':''" @click="setSelect(1)">学校</button>
					<button type="default" size="mini" plain="false" :class="(select == 2)?'but-red':''" @click="setSelect(2)">公司</button>
				</view>
			</view>
		</view>
		<view class="but"><button type="default" @click="save" style="background-color: rgb(76, 217, 100); color: white;margin: 0rpx 20rpx;">确定</button></view>
	</view>
</template>

<script>
	import {getAddress} from '../../api/homeApi.js';
	export default {
		data() {
			return {
				name:"",
				phone:'',
				site:"",
				detailed:"",
				set:-1,
				select:-1
			};
		},
		methods:{
			setSet(i){
				this.set = i;
			},
			setSelect(i){
				this.select = i;
			},
			async save(){
				var name1 = this.name.trim();
				if(name1 == ""){
					uni.showToast({
						title:'请填写联系人'
					})
					return;
				}
				var setStr = '';
				if(set == 0){
					setStr = '先生'
				}else if(set == 1){
					setStr = '女士'
				}
				var phone1 = this.phone;
				if(phone1.length != 11){
					uni.showToast({
						title:'请输入正确的号码'
					})
					return;
				}
				var site1 = this.site.trim();
				if(site1 == ""){
					uni.showToast({
						title:'请填写地址'
					})
					return;
				}
				var detailed1 = this.detailed.trim();
				if(detailed1 == ""){
					uni.showToast({
						title:'请填写详细地址'
					})
					return;
				}
				var setSelected = '';
				if(select == 0){
					
					setSelected = '家';
				}else if(select == 1){
					setSelected = '学校';
				}else if(select == 2){
					setSelected = '公司';
				}
				var item = {
					name:name1,
					sex:setStr,
					phone:phone1,
					remark:setSelected,
					definite:definite1
				}
			}
		}
	}
</script>

<style lang="scss">
	.addSite{
		height: 93.4vh;
		background-color:#EEE;
		.touch{
			background-color: #fff;
			padding: 20rpx;
			.top{
				display:  flex;
				border-bottom: 2rpx solid rgb(238,238,238);
				.man{
					margin: 20rpx 60rpx 60rpx 0rpx;
				}
				.right{
					.right-top{
						padding: 10rpx 0rpx;
						border-bottom: 2rpx solid rgb(238, 238, 238);
						.write{
							padding: 20rpx 20rpx 20rpx 32rpx;
						}
					}
					.right-bottom{
						padding: 20rpx 0rpx 20rpx 30rpx;
						button{
							margin-right: 20rpx;
							// border-color: rgb(221, 221, 221);
							border-color: #EEE;
							color: rgb(102, 102, 102);
						}
						.but-red{
							border-color: skyblue;
							color: skyblue;
						}
					}
				}
			}
			.phone{
				display: flex;
				border-bottom: 2rpx solid rgb(238,238,238);
				text{
					margin: 20rpx 50rpx 50rpx 0rpx;
					align-items: center;
				}
				.write{
					padding: 20rpx 30rpx 20rpx 95rpx;
				}

			}
			.site{
				display: flex;
				border-bottom: 2rpx solid rgb(238,238,238);
				align-items: center;
				text{
					margin: 20rpx 50rpx 50rpx 0rpx;
				}
				.write{
				padding: 20rpx 30rpx 20rpx 95rpx;
				}
			}
			.tail{
				display: flex;
				.state{
					margin: 20rpx 50rpx 50rpx 0rpx;
				}
				.bottom{
					.write{
						display: flex;
						align-items: center;
						padding: 20rpx 25rpx 60rpx 25rpx ;
						margin-bottom: 20rpx;
						border-bottom: 2rpx solid rgb(238,238,238);
					}
					button{
						margin: 20rpx 20rpx 20rpx 0rpx;
						border-color: #eee;
						color: rgb(102, 102, 102);
					}
					.but-red{
						border-color: skyblue;
						color: skyblue;
					}
				}
			}
		}
		
	}
</style>
