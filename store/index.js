import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false, // 用户是否登录
		user: { // 用户信息
		  userId: '', // id
			nickName: '', // 昵称
			avatarUrl: '', // 头像
			money: '', // 账户金额
			pid: '', // 我的下线id
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
			state.user.userId = '';
			state.user.nickName = '';
			state.user.avatarUrl = '';
			state.user.money = '';
			state.user.pid = '';
		},
		// 设置用户信息
		setUserInfo(state,payLoad) {
			state.user.userId = payLoad.id;
			state.user.nickName = payLoad.nickName;
			state.user.avatarUrl = payLoad.avatar;
			state.user.money = payLoad.money;
			state.user.pid = payLoad.pid;
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
