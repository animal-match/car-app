<template>
	<!-- 去支付页面 -->
	<view class="payment">
		<!-- 支付金额框 -->
		<u-gap height="20"></u-gap>
		<view class="payment-box">
			<view class="common-style">需支付金额(元)</view>
			<view class="payment-price">￥{{payment}}</view>
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
							<u-radio 
								@change="radioChange" 
								v-for="(item, index) in paylist" :key="index" 
								:name="item.name"
								active-color="#CA0303"
							>
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
				paylist: [
					{name: ''}
				],
				type: '', // 商家类型
				payment: null, // 支付金额
			}
		},
		onLoad(options) {
			// this.checkPrice();
			this.type = this.$store.state.user.type;
			console.log(this.type,'商家类型')
			this.payment = options.money?options.money:null
			if(!options.money){ // 如果传来的金额不存在，说明要从个人中心进去冲会员
				this.payment = this.type === 0 ? this.$store.state.config.d_vip_money : this.$store.state.config.s_vip_money
			}
		},
		computed: {
			// payment() {
			// 	if(this.type === 0) 
			// 	  return this.$store.state.config.d_vip_money // 厂商会员的价格
			// 	else if(this.type === 1)
			// 	  return this.$store.state.config.s_vip_money // 经销商会员价格
			// 	else 
			// 	  return '-'
			// },
		},
		methods: {
			/**
			 * @desc 查看价格
			 * @param
			 **/
			 // checkPrice() {
				//  this.$request({
				// 	 url: "/api/pay/prepay",
				// 	 method: "POST",
				// 	 data: {
				// 		 type: 1
				// 	 },
				// 	 success: res => {
				// 		 if(res.code===0) {
				// 			 uni.showToast({
				// 			 	icon: "none",
				// 				title: res.msg
				// 			 })
				// 			 return false;
				// 		 }
				// 		 console.log('价格',res);
				// 	 }
				//  })
			 // },
			/**
			 * @desc 选择支付方式
			 * @param
			 **/
			radioChange(e) {
				console.log(e,'eee')
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
						uni.showToast({title: '支付失败，请稍后再试',icon:'none'})
					},
					success: res => {
						this.$request({
							url: "/api/pay/prepay",
							method: "POST",
							data: {type: 1}, // 成为会员1
							success: res => {
								if(res.code!=1) {
									uni.showToast({title: res.msg,icon:'none'})
									return false
								}
								console.log(res,'支付')
								// let resobj=JSON.parse(res.data.data)
								// 							let payInfo={
								// 								appid: resobj.appid, // 小程序ID
								// 								nonceStr: resobj.nonce_str, // 随机字符串
								// 								package:"Sign=WXPay", // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
								// 								partnerid: resobj.mch_id,
								// 								prepayid: resobj.prepay_id,
								// 								timeStamp: resobj.time_stamp, // 时间戳
								// 								signType: resobj.sign, // 签名算法
								//                paySign: 0, // 签名
								// 							}
								// 							uni.requestPayment({
								// 								provider: 'wxpay',
								// 								orderInfo: payInfo, //微信订单数据（Object类型）
								// 								success: res=>{
								// 									uni.hideLoading();
								// 							  },
								// 								fail: err => {
								// 									uni.hideLoading();
								// 									uni.showToast({title: '支付失败，请稍后再试',icon:'none'})
								// 								}
								// 							});
															
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
		text-align:center;
		display: flex;
		flex-direction: column;
		display:-webkit-flex; 
		justify-content: center;/*水平居中*/
		align-items: center;/*垂直居中*/
		-webkit-align-items:center; 
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
