<template>
	<view class="serach-container">
		<!-- 搜索 -->
		<view >
			<uni-search-bar class="search" cancelButton='none' :radius="100" placeholder="搜索商家,商品名称"/>
		</view>
		<!-- 历史搜索 -->
		<view class="history">
			<view class="top">
				<view class="history-search">历史搜索</view>
				<image class="img" src="../../static/images/laji.png"></image>
			</view>
			<button size="mini" type="default" plain="true" class="button">一品香锅</button>
		</view>
		<!-- 热门搜索 -->
		<view class="hot" >
			<view class="hot-search">热门搜索</view>
			<button class="button" size="mini"  plain="true" type="default" v-for="item in getHotSearchList">{{item.title}}</button>
		</view>
	</view>
</template>

<script>
	import {getHotSearch} from '../../api/homeApi.js'
	export default {
		data() {
			return {
				getHotSearchList:[]
			};
		},
		methods:{
			async getHotSearchData(){
				var {message} = await getHotSearch();
				this.getHotSearchList = message;
			}
		},
		created() {
			this.getHotSearchData();
		}
	}
</script>

<style lang="scss">
	.serach-container{
		.search{
			background-color: rgb(0, 151, 255);
			border:0px;
		}
	} 
	// 历史搜索
	.serach-container .history{
		margin: auto 15rpx;
	}
	.serach-container .history .top{
		display: flex;
		justify-content: space-between;
		margin: 25rpx auto;
		align-items: center;
	}
	.serach-container .history .history-search{
		font-size: 36rpx;
	}
	.serach-container .history .img{
		width: 58rpx;
		height: 58rpx;
	}
	.serach-container .history .button{
		// margin: 10rpx;
	}
	// 热门搜索
	.serach-container .hot{
		margin: 25rpx 15rpx 25rpx 15rpx;
	}
	.serach-container .hot .button{
		margin: 10rpx;
	}
</style>
