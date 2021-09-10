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
			type: '', // 商家类型
		},
		config: {} // 全局配置
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
			state.user.type = '';
		},
		// 设置用户信息
		setUserInfo(state,payLoad) {
			state.user.userId = payLoad.id;
			state.user.nickName = payLoad.nickName;
			state.user.avatarUrl = payLoad.avatar;
			state.user.money = payLoad.money;
			state.user.pid = payLoad.pid;
			state.user.type = payLoad.type;
		},
		// 设置配置信息
		saveConfigs(state, payLoad) {
			state.config = payLoad;
			//d_vip_money 厂家会员价格
			//d_vip_time 厂家会员天数
			// message: "1" 全局留言按钮的显示
			// one_money: "10" 厂家单次查看经销商的价格
			// s_vip_money: 经销商会员价格
			//s_vip_time: 经销商会员时间
			//title 导航标题
			//is_free 是否免费
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
