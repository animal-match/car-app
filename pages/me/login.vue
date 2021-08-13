<template>
	<view class="login">
		<u-gap height="144"></u-gap>
		<view class="container">
			<view class="login-text">
				欢迎使用
			</view>
			<view class="login-text">
				一条龙信息对接平台
			</view>
			<view class="background-image">
				<image class="image" src="/static/user-center-images/distributor/login.png"></image>
			</view>
			<u-button 
			  shape="circle"
			  type="error"
				@click="login"
				open-type="getUserInfo"
				@getuserinfo="userInfo"
				>
					微信授权登录
				</u-button>
			<view class="ckeck">
					<u-checkbox :label-disabled="true" v-model="isChecked" :name="name" active-color="#CA0303" shape="circle"
					 @change="radioChange">
						<text class="checkout-text" @click="serviceItem">同意一条龙信息对接平台的《服务条款》和《隐私协议》</text>
					</u-checkbox>
			</view>
		</view>
		<u-modal v-model="showModal" :content="content" width="50%"></u-modal>
		<u-modal v-model="showToast" :content="loginToast" width="50%"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false, // 显示弹出框
				showToast: false, // 微信弹窗
				content: '请先同意以下条款！',
				loginToast: '登录失败', // 微信登录失败提示
				isChecked: false, // 是否勾选协议
				name: 'ckeckBox',
				openid: '',
			}
		},
		methods: {
			radioChange(e) {
				if(e.value===true){
					this.isChecked = true;
				} else {
					this.isChecked = false;
				}
				console.log('EEE',this.isChecked)
			},
			// 登录微信
			login() {
				if (this.isChecked === true) {
					console.log('调用微信登录接口')
					// 获取供应商
					uni.getProvider({
						service: 'oauth', // 服务类型: oauth 授权登录 payment 支付 share 分享
						success: (res) => {
							const _this = this;
							// success 返回参数说明 service(服务类型)  provider(得到的服务供应商)
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: (loginRes) => {
										let code = loginRes.code; // 登录code
										// 获取用户信息
										uni.getUserInfo({
											provider: 'weixin',
											success: (loginRes) => {
												console.log('打印登录信息', loginRes);
												let info = {
													encryptedData: loginRes.encryptedData,
													signature: loginRes.signature,
													iv: loginRes.iv,
													refresh: true,  // 重新获取或刷新最新的用户信息
													pid: '', // 	上级用户id
												}
												this.getSessionKey(code,info);
											},
											fail: (err) => {
												uni.showToast({
													icon: 'none',
													title: '获取用户信息失败'
												})
											}
										})
									}
								});
							}
						},
						fail: (res) => {
							console.log('失败', res);
							this.showToast = true;
							return false;
						}
					});
				} else {
					this.showModal = true;
				}
			},

			// 用户登录信息
			userInfo(info) {
				console.log('用户信息', info.detail.userInfo); // 将用户信息存入VUEX
			},
			// 跳到隐私条款页面
			serviceItem() {
				console.log('跳到隐私条款页面')
			},
			// 获取sessionKey
			getSessionKey(code,info) {
				this.$request({
					url: "/api/user/getWxMiniProgramSessionKey",
					method: "GET",
					data: {
						code: code
					},
					success: res=> {
						if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 return false;
						}
						const key = res.data.session_key;
						this.openid = res.data.openid;
						this.userLogin(info,key); // 服务器后台登录操作
					},
					fail: err=> {
						console.log('每有得到session',err);
					}
				}) 
			},
			// 登录接口
			userLogin(data,sessionKey) {
				this.$request({
					url: "/api/user/wxMiniProgramOauth",
					method: "POST",
					data: {
						session_key: sessionKey,
						...data
					},
					success: res => {
						if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 return false;
						}
						this.token = res.data.token; // 获取token
						uni.setStorageSync("token",this.token); // 保存token到缓存中
						this.$store.commit('changeLoginState', true); // 登录状态为true
						// 会员中心接口 获取用户头像，手机号码, vip状态
						this.$request({
							url: "/api/user/index",
							data: { token: this.token },
							success: res => {
								if(res.code===0) {
									 uni.showToast({
										 icon: "none",
										 title: res.msg,
										 duration: 3000
									 })
									 return false;
								}
								console.log('用户中心',res);
								let user = {
									id: res.data.user.id, // 用户id
									nickName: res.data.user.nickname,
									avatar: res.data.user.avatar,
									money: res.data.user.money // 帐户金额
								}; // 保存用户信息到vuex
								uni.$emit('setUser', user);
								this.$store.commit('setUserInfo',user);
								let isVip = res.data.user.is_vip; // 0 非会员 1会员
                // 把会员状态存入缓存
								uni.setStorage({
									key: 'isVip',
									data: isVip,
								})
							}
						})
						uni.switchTab({
							url: '/pages/me/index',
						})
					},
					fail: res => {
						uni.showToast({
							icon: "none",
							title: "登录失败"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.container {
		margin: 0 30rpx;

		.login-text {
			text-align: center;
			font-size: 56rpx;
			color: $uni-baseColor;
		}

		.background-image {
			text-align: center;
			margin-top: 102rpx;

			.image {
				width: 466rpx;
				height: 597rpx;
			}
		}

		.ckeck {
			text-align: center;
			margin-top: 50rpx;
			::v-deep .u-checkbox__label {
				color: $uni-text-color-grey;
				font-size: 24rpx;
			}
		}
	}
</style>
