import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    //数据
	state: {
		isLogin:false
	},
	// 存放获取数据的方法
	getters:{
		getIsLogin(state){
			return state.isLogin;
		}
	},
	// 存放修改数据的方法
    mutations: {},
	//异步修改
    actions: {}
})

export default store