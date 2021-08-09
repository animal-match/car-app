import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false, // 用户是否登录
		user: { // 用户信息
			nickName: '',
			avatarUrl: '',
		}
	},
	getters: {

	},
	mutations: {
		// 改变登录状态
		changeLoginState(state, payload) {
			state.isLogin = payload;
		},
		// 清空用户信息
		clearUserInfo(state) {
			state.user.nickName = '';
			state.user.avatarUrl = '';
		}
	},
	actions: {

	}
})
export default store
