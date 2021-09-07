<template>
	<!-- 去支付页面 -->
	<view class="payment">
		<!-- 支付金额框 -->
		<u-gap height="20"></u-gap>
		<view class="payment-box">
			<view class="common-style">需支付金额(元)</view>
			<view class="payment-price">￥{{payment || 0}}</view>
		</view>
		<view class="common-style payment-way">请选择支付方式</view>
		<view class="bankcard-box">
			<!-- 左侧 微信图片 微信支付 描述 -->
			<view class="left-card">
				<view class="card-box">
					<u-image src="/static/user-center-images/union.png" width="80" height="72"></u-image>
				</view>
				<view class="desc">
					<ul>
						<li>微信支付</li>
						<li>数亿用户都在用，安全可托付</li>
					</ul>
				</view>
			</view>
			<!-- 右侧 单选框 -->
			<view class="right-radio">
				<u-radio-group v-model="radioValue">
					<u-radio @change="radioChange" v-for="(item, index) in paylist" :key="index" :name="item.name"
						active-color="#CA0303">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="payment-btn">
			<u-button type="error" shape="circle" @click="payNow">立即支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radioValue: '', // 单选选中的值
				paylist: [{
					name: ''
				}],
				type: '', // 商家类型
				payment: null, // 支付金额
				storeId: '', // 厂家要查看的商家ID
				sortType: 1, // 要支付的类型 1 开通会员 2查看经销商
			}
		},
		onLoad(options) {
			this.type = this.$store.state.user.type; // 登录人的商家类型
			console.log('有没有options', options)
			// 如果options不是空对象 就会传来金额
			if (Object.keys(options).length > 0) {
				this.payment = options.money;
				if (!!options.storeId) {
					this.storeId = options.storeId;
					this.sortType = 2; // 要查看经销商
				}
			} else {
				// 如果options是空对象 说明他要开通会员
				if (this.type === 0) {
					this.payment = this.$store.state.config.d_vip_money;
				} else if (this.type === 1) {
					this.payment = this.$store.state.config.s_vip_money;
				} else {
					uni.showToast({
						icon: "none",
						title: "您还未入驻商家",
						duration: 2000
					})
					return
				}
			}
		},

		methods: {
			/**
			 * @desc 选择支付方式
			 * @param
			 **/
			radioChange(e) {
				this.radioValue = e;
			},
			/**
			 * @desc 立即支付-跳转到支付成功
			 * @param
			 **/
			payNow() {
				uni.getProvider({
					service: 'payment',
					fail: res => {
						uni.hideLoading();
						uni.showToast({
							title: '支付失败，请稍后再试',
							icon: 'none'
						})
					},
					success: res => {
						this.$request({
							url: "/api/pay/prepay",
							method: "POST",
							data: {
								type: this.sortType,
								store_id: this.sortType === 2 ? this.storeId : ''
							}, // 成为会员1
							success: res => {
								if (res.code != 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									return false
								}
								let resobj = res.data;
								console.log(resobj, 'obj')
								let payInfo = {
									appId: resobj.appId, // 小程序ID
									timeStamp: resobj.timeStamp, // 时间戳
									nonceStr: resobj.nonceStr, // 随机字符串
									package: resobj.package,
									signType: resobj.signType, // 签名算法
									paySign: resobj.paySign, // 签名
								}

								uni.requestPayment({
									...payInfo, //微信订单数据（Object类型）
									success: res => {
										uni.hideLoading();
										const money = this.payment;
										uni.navigateTo({
											url: "./pay-success?money=" + money
										})
									},
									fail: err => {
										uni.hideLoading();
										uni.showToast({
											title: '支付失败，请稍后再试',
											icon: 'none'
										})
									}
								});

							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.payment {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.common-style {
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}

	.payment-box {
		margin: 0rpx 30rpx 46rpx;
		height: 304rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		display: -webkit-flex;
		justify-content: center;
		/*水平居中*/
		align-items: center;
		/*垂直居中*/
		-webkit-align-items: center;

		.payment-price {
			font-size: 60rpx;
			color: $uni-text-color;
			font-weight: bold;
		}
	}

	.payment-way {
		margin: 0 30rpx 43rpx;
	}

	.bankcard-box {
		height: 120rpx;
		border-radius: 20rpx;
		margin: 0 30rpx;
		background-color: $uni-text-color-inverse;
		padding: 0 0 0 27rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left-card {
			display: flex;
			justify-content: center;
			align-items: center;

			.card-box {

				background-color: #EEEEEE;
				border-radius: 10rpx;
				margin-right: 18rpx;
				padding: 10rpx 20rpx;
			}

			ul {
				display: inline-block;
				list-style: none;
				padding: 0;

				li:first-child {
					font-size: 28rpx;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				li:last-child {
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}
	}

	.payment-btn {
		margin: 300rpx 30rpx 0;
	}
</style>
