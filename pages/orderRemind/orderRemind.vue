<template>
	<view class="remind">
		<long-date 
		    type="between" 
		    getDayNum="10" 
		    :openStatus="true" 
		    startTime="2018-10-21" 
		    endTime="2019-06-01" 
		    chooesMaxDay="8"
		    @select="onSelectTime">
		</long-date>
		<view class="reptition">
			<view class="reptition-cycle">重复周期</view>
			<view class="reptition-button">
				<button class="button" @click="" size="mini" plain="true" type="default">法定工作日(智能跳过节假日)</button>
				<button class="button" size="mini" plain="true" type="default">周一到周五</button>
				<button class="button" size="mini" plain="true" type="default">每天</button>
				<button class="button" size="mini" plain="true" type="default"><image class="img" src="../../static/images/shizhi.png"></image>自定义</button>
			</view>
		</view>
		<view class="save"><button  type="primary" class="but" >保存</button></view>
	</view>
</template>

<script>	
	export default {
		data() {
			return {
			but1:false,
			but2:false,
			but3:false
			};
		},
		components:{
			
		},
		methods: {
			onSelectTime(val) {
				console.log(val);
			}
		},
	}
</script>

<style lang="scss">
	.remind {
		position: relative;
		height: 90vh;
	}
	.remind .reptition .reptition-cycle{
		margin: 20rpx 20rpx 20rpx 10rpx;
	}
	.remind .reptition .reptition-button .button{
		margin: 10rpx;
	}
	.remind .reptition .reptition-button .button .img{
		width: 30rpx;
		height: 30rpx;
	}
	
	.remind .save{
		width: 100%;
		position: absolute;
		margin: 0 auto;
		bottom: 30rpx;
	}
	.remind .save .but{
		width: 90%;
	}
</style>
