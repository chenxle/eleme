<template>
	<view class="shop">
		<!-- 顶部筛选栏 -->
		<view class="filtrate glue-line">
			<view :class="(currentFilter==0)?'select-color ranking':'ranking'" @click="choose2()">
				<ms-dropdown-menu>
					<ms-dropdown-item :title="getTitle" ref="dropdownItem1">
						<view class="dropdown-item-content">
							<view class="btn">
								<block v-for="(item,index) in list" :key="index">
									<view :class="((currentFilter == 0 && currentValue == index)?'select':'')" class="item" style="margin: 52rpx 0;font-size: 30rpx;margin-left: 28rpx;" @click="setCurrentValue(index)">
										<view>{{item.text}}</view>
										<view class="image" v-if="currentFilter == 0 && currentValue == index">
											<image src="../../static/images/gou.png" mode=""></image>
										</view>
									</view>
								</block>
							</view>
						</view>
					</ms-dropdown-item>
				</ms-dropdown-menu>
			</view>
			<view class="top-search">
				<text :class="(currentFilter==1)?'select-color near':'near'" @click="setCurrentFilter(1)">距离最近</text>
				<text :class="(currentFilter==2)?'select-color high-sales':'high-sales'" @click="setCurrentFilter(2)">销量最高</text>
			</view>
			<view :class="(currentFilter==3)?'select-color screening':'screening'" @click='choose1()'>
				<view>
					<ms-dropdown-menu>
						<ms-dropdown-item title="筛选" ref="dropdownItem2">
							<view class="dropdown-item-content">
								<view class="btn">
									<view class="choose">
										<view class="title">配送方式</view>
										<view class="content">
											<view class="item border-right" :style="{'background-color':(dispatching==0)?'skyblue':''}" @click="setDispatching">蜂鸟专送</view>
										</view>
									</view>
									<view class="choose">
										<view class="title">人均消费</view>
										<view class="content">
											<block v-for="item in consumptionList" :key='item.value'>
												<view 
												:style="{'background-color':(item.value == consumption)?'skyblue':''}"
												:class="(item.value+1)%3!=0?'border-right item':'item'"
												 @click="setSelectConsumption(item.value)"
												 >￥{{item.money}}</view>
											</block>
										</view>
									</view>
									<view class="choose">
										<view class="title"></view>
										<view class="handle">
											<view class="item" @click="empty">清空</view>
											<view class="item bgc-green">查看{{number}}个商家</view>
										</view>
									</view>
								</view>
							</view>
						</ms-dropdown-item>
					</ms-dropdown-menu>
				</view>
			</view>
		</view>
		
		<!-- 商家列表  -->
		<view class="merchant-list">
			<block v-for="(item,index) in getShopData" :key="index">
				<navigator class="merchant" :url="'/pages/goods/goods?id='+item.id">
					<view class="image">
						<image class="img" :src="item.img"></image>
					</view>
					<view class="footer">
						<view class="title">{{item.title}}</view>
						<view class="grade">{{item.grade}} 月售{{item.month_sales}}单</view>
						<view class="money">
							<view class="price">起送￥{{item.price}}</view>
							<view class="delivery">配送费￥{{item.delivery}}</view>
						</view>
					</view>
				</navigator>
			</block>
		</view>
		<!-- 加载更多 -->
		<uni-load-more :status="'loading'" v-if="isShow"></uni-load-more>
		<!-- 返回顶部 -->
		<view class="toTop" v-if="isShowToTop" @click="toTop">
			<image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOCAxMSkiIGZpbGw9IiM5OTkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMi4yMzkiIHdpZHRoPSI5OC41MjIiIGhlaWdodD0iOC45MTciIHJ4PSI0LjQ1OCIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDkwIDUxLjUgNjIuNDE3KSIgeD0iNi43MTciIHk9IjU3Ljk1OCIgd2lkdGg9Ijg5LjU2NSIgaGVpZ2h0PSI4LjkxNyIgcng9IjQuNDU4Ii8+PHJlY3QgdHJhbnNmb3JtPSJzY2FsZSgtMSAxKSByb3RhdGUoNDUgMCAtMjUuNzU3KSIgeD0iLTYuNjcxIiB5PSI0MC4xNzEiIHdpZHRoPSI3MS42NTIiIGhlaWdodD0iOC45MTciIHJ4PSI0LjQ1OCIvPjxyZWN0IHRyYW5zZm9ybT0icm90YXRlKDQ1IDczLjkzOCA0NC42MykiIHg9IjM4LjExMiIgeT0iNDAuMTcxIiB3aWR0aD0iNzEuNjUyIiBoZWlnaHQ9IjguOTE3IiByeD0iNC40NTgiLz48L2c+PC9zdmc+"></image>
		</view>
	</view>
</template>

<script>
import { getShopListByClassId,getHighSalesshoplist } from "../../api/shopApi.js";
import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue';
import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue';
var bool = false;

	export default {
		components: {
		            msDropdownMenu,
		            msDropdownItem
		        },
		data() {
			return {
				id:-1,
				// 是否显示返回顶部
				isShowToTop:false,
				// 是否显示loading
				isShow:false,
				// 筛选查询到的商家人数
				number: 0,
				getShopData: [],
				// 当前过滤选中分类(默认为0)
				currentFilter:0,
				// 当前综合排序(默认为0，不选中默认为0)
				currentValue:0,
				// 筛选配送方式(-1:不选中，0选中)
				dispatching:-1,
				// 人均消费列表
				consumptionList:[
					{
						money:'20以下',
						value:0
					},
					{
						money:'20~40',
						value:1
					},
					{
						money:'40以上',
						value:2
					}
				],
				//筛选人均消费 
				consumption:-1,
				// 下拉选项
				list:[
					{
						text:'综合排序',
						value:0
					},
					{
						text:'好评优先',
						value:1
					},
					{
						text:'起送价最低',
						value:2
					},
					{
						text:'配送最快',
						value:3
					},
					{
						text:'配送费最低',
						value:4
					},
					{
						text:'人均从低到高',
						value:5
					},
					{
						text:'人均从高到低',
						value:6
					},
					{
						text:'通用排序',
						value:7
					}
				],
				//当前页数
				currentPage:1,
				//数据是否显示完毕
				isAll:false,
			};
		},
		methods:{
			async getshoplistData() {
				var message = await getShopListByClassId(this.id,this.currentPage);
				if(message.length == 0){
					this.isAll = true;
					uni.showToast({
						title:'已经没有更多了',
						icon:"none"
					})
					return;
				}
				this.currentPage++;
				this.getShopData = this.getShopData.concat(message);
			},
			// 销量排序
			async getHighSalesshoplistData() {
				var message = await getHighSalesshoplist(this.id,this.currentPage);
				if(message.length == 0){
					this.isAll = true;
					uni.showToast({
						title:'已经没有更多了',
						icon:"none"
					})
					return;
				}
				this.currentPage++;
				this.getShopData = this.getShopData.concat(message);
			},
			choose1() {
				this.$refs.dropdownItem1.closePopup();
			},
			choose2() {
				this.$refs.dropdownItem2.closePopup();
			},
			setCurrentValue(index){
				this.getShopData = [];
				this.currentPage = 1;
				this.isAll = false;
				this.getshoplistData();
				this.currentValue = index;
				this.currentFilter = 0;
				this.choose1();
			},
			async setCurrentFilter(index){
				this.getShopData = [];
				this.currentPage = 1;
				this.isAll = false;
				// 点击销量高
				if(index == 2){
					this.getHighSalesshoplistData();
				}else {
					this.getshoplistData();
				}
				this.currentFilter = index;
				this.currentValue = 0;
				this.choose1();
				this.choose2();
			},
			setDispatching(){
				this.dispatching = !this.dispatching;
			},
			setSelectConsumption(value){
				if(value == this.consumption){
					this.consumption = -1;
				}else {
					this.consumption = value
				}
			},
			empty(){
				this.dispatching = -1;
				this.consumption = -1;
			},
			toTop(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.isShowToTop = false;
			}
		},
		computed:{
			// 返回综合排序中对应的标题
			getTitle(){
				var val = this.list.find(v => {
					return v.value == this.currentValue;
				})
				return val.text;
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getshoplistData();
		},
		//到达页面最底部时显示
		onReachBottom(){
			setTimeout(1);
			if(!this.isAll){
				this.isShow = true;
				setTimeout(()=>{
					if(this.currentFilter == 2){
						this.getHighSalesshoplistData();
					}else {
						this.getshoplistData();
					}
					this.isShow = false;
				},1300);
			}
		},
		onPageScroll(e){
			e = parseInt(e.scrollTop);
			if(e < 280 && !bool){
				bool = true;
				this.isShowToTop = false;
			}else if(e > 280 && bool){
				bool = false;
				this.isShowToTop = true;
			}
		}
	}
</script>

<style lang="scss">
	.shop {
		margin: 0 28rpx;
		color: #888;
		// 顶部筛选栏
		.select-color {
			color: #111;
			font-weight: 600;
		}
		.filtrate {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			padding-top: 20rpx;
			.ranking {
				.dropdown-item__selected {
					padding: 0;
					.selected__name {
						font-size: 28rpx;
					}
				}
			}
			.screening {
				/deep/ .iconfont {
					visibility: hidden;
				}
			}
			.top-search {
				text {
					margin: 0 20rpx;
				}
			}
		}
		
		// 商家列表
		.merchant-list {
			display: flex;
			flex-wrap: wrap;
			.merchant {
				width: 100%;
				display: flex;
				padding: 26rpx 0;
				border-bottom: 2rpx solid #eee;
				.image .img {
					width: 130rpx;
					height: 130rpx;
				}
				.footer{
					font-size: 24rpx;
					color: rgb(128, 128, 128);
					margin: auto 20rpx;
					.title {
						font-weight: bold;
						font-size: 40rpx;
						color: black;
					}
					.money {
						display: flex;
						margin: 10rpx auto;
					}
					.grade {
						margin: 10rpx auto;
					}
				}
			}
		}
		/deep/ .dropdown-item__selected {
			padding: 0;
			.selected__name {
				font-size: 28rpx;
			}
		}
		/deep/ .dropdown-item__content {
			//#ifdef H5
			margin-top: 100rpx;
			//#endif
			//#ifdef MP-WEIXIN
			margin-top: 20rpx;
			//#endif
			.btn {
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.icon-greater-than-solid {
						margin-right: 40rpx;
					}
					.image {
						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 40rpx;
						}
					}
				}
				.select {
					color: skyblue;
				}
				.choose {
					background-color: #CCCCCC;
					.handle {
						display: flex;
						background-color: #fff;
						.item {
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 24rpx 0;
							color: #888;
						}
						.bgc-green{
							background-color: green;
						}
					}
					.title {
						display: flex;
						align-items: center;
						padding: 24rpx 0;
						padding-left: 20rpx;
					}
					.content {
						display: flex;
						flex-wrap: wrap;
						background-color: #fff;
						.item {
							padding: 24rpx 0;
							padding-left: 20rpx;
							width: 30.5%;
						}
						.border-right {
							border-right: 1rpx solid #eee;
						}
					}
				}
			}
		}
		.toTop {
			display: flex;
			position: fixed;
			justify-content: center;
			align-items: center;
			width: 80rpx;
			height: 80rpx;
			bottom: 40rpx;
			right: 40rpx;
			border: 4rpx solid #ccc;
			border-radius: 44rpx;
			overflow: hidden;
			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
		.glue-line {
			position: -webkit-sticky;
			position: sticky;
			top: var(--window-top);
			background-color: #fff;
			z-index: 99;
		}
	}
	
</style>
