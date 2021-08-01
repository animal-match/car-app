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

				bindgetphonenumber="getPhoneNumber"
				>
					微信授权登录
				</u-button>
			<view class="ckeck">
				<u-radio-group v-model="value">
					<u-radio :label-disabled="true" v-for="(item,index) in radioList" :key="index" :name="item.name" active-color="red"
					 @change="radioChange">
						<text @click="serviceItem">同意一条龙信息对接平台的《服务条款》和《隐私协议》</text>
					</u-radio>
				</u-radio-group>
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
				value: '',
				showModal: false, // 显示弹出框
				showToast: false, // 微信弹窗
				content: '请先同意以下条款！',
				loginToast: '登录失败', // 微信登录失败提示
				radioList: [{
					name: 'ok',
					title: "selected",
				}],
			}
		},
		methods: {
			radioChange(e) {
				if (e === 'ok') {
					this.vaue = 'ok';
				}
			},
			// 登录微信
			login() {
				if (this.value === 'ok') {
					console.log(this.value, '调用微信登录接口')
					// 获取供应商
					uni.getProvider({
						service: 'oauth', // 服务类型: oauth 授权登录 payment 支付 share 分享
						success: (res) => {
							// success 返回参数说明 service(服务类型)  provider(得到的服务供应商)
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										console.log(JSON.stringify(loginRes.errMsg));
										console.log(JSON.stringify(loginRes.code, loginRes.authResult));
										// 登录
										uni.login({
											provider: 'weixin',
											success: function(infoRes) {
												console.log('打印登录信息', infoRes);
												uni.switchTab({
													url: '/pages/me/index',
												})
											},
											fail: function(err) {
												console.log('登录失败了')
												// uni.showToast({
												// 	icon: 'none',
												// 	title: err
												// })
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
				console.log('用户信息', info.detail.userInfo);
			},
			// 跳到隐私条款页面
			serviceItem() {
				console.log('跳到隐私条款页面')
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
			padding-left: 20rpx;
			text-align: center;
			margin-top: 50rpx;

			::v-deep .u-radio__label {
				color: $uni-text-color-grey;
				font-size: 24rpx;
			}
		}
	}
</style>
