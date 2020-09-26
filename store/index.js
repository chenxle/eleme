import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据
	state: {
		isLogin:false,
		userInfo:{}
	},
	// 存放获取数据的方法
	getters:{
		//获取是否登录
		getIsLogin(state){
			return state.isLogin;
		},
		// 获取用户信息
		getUserInfo(state){
			return state.userInfo;
		}
	},
	// 存放修改数据的方法
    mutations: {
		// 修改用户信息(登录时写入用户信息)
		setUserInfo(state,userInfo){
			state.userInfo = userInfo;
		},
		// 修改登录状态
		setIsLogin(state,bool){
			state.isLogin = bool;
		}
	},
	//异步修改
    actions: {}
})

export default store