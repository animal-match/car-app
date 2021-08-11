import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false, // 用户是否登录
		user: { // 用户信息
			nickName: '', // 昵称
			avatarUrl: '', // 头像
			money: '', // 账户金额
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
			state.user.money = '';
		},
		// 设置用户信息
		setUserInfo(state,payLoad) {
			state.user.nickName = payLoad.nickName;
			state.user.avatarUrl = payLoad.avatar;
			state.user.money = payLoad.money;
		},
		// 提现并减少账户金额的数量
		decreaseMoney(state, payLoad) {
			state.user.money-=payLoad;
		}
	},
	actions: {

	}
})
export default store
