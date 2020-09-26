<script>
import { getUserByNickname } from 'api/loginApi.js';
export default {
	onLaunch: async function() {
		var userInfo;
		try {
		    const value = uni.getStorageSync('userInfo');
		    userInfo = value;
		} catch (e) {
		    // error
		}
		if(userInfo){
			this.$store.commit('setUserInfo',userInfo);
			this.$store.commit('setIsLogin',true);
			console.log('账号和密码登录，直接从localStorage拿值');
			return;
		}
		
		//微信授权登录
		var _this = this;
		uni.getUserInfo({
			async success(data) {
				console.log('用户已登录，直接读取用户');
				var message = await getUserByNickname(data.userInfo.nickName);
				_this.$store.commit('setUserInfo',message[0]);
				_this.$store.commit('setIsLogin',true);
			},
			fail() {
				console.log('用户未登录')
			}
		})
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
