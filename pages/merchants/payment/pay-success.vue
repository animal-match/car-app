<template>
	<!-- 支付成功页 -->
	<view class="success">
		<u-gap height="285"></u-gap>
		<u-image class="success-img" src="/static/user-center-images/pay-success.png" width="168" height="168"></u-image>
		<u-gap height="50"></u-gap>
		<view class="pay-success common-style">
			支付成功
		</view>
		<u-gap height="33"></u-gap>
		<view class="pay-price common-style">
			￥{{money}}
		</view>
		<u-gap height="300"></u-gap>
		<u-button v-if="isSinglePay===false" :custom-style="customStyle" shape="circle" @click="turnHome">返回首页</u-button>
		<u-button v-else :custom-style="customStyle" shape="circle" @click="turnStore">返回商家</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSinglePay: false, // 是否为厂家单次查看经销商支付费用的方式
				storeId: null, // 支付成功后要返回的商家id
				money: 0,
				customStyle: {
					color: '#CA0303',
					background: '#FFF',
					margin: '0 30rpx',
					fontWeight: 'bolder',
				}
			}
		},
		onLoad(opt) {
			this.money = Number(opt.money) || 0;
			this.isSinglePay = opt.isSinglePay || false
			this.storeId = opt.storeId || null
		},
		methods: {
			/**
			 * @desc 返回首页
			 * @param
			 **/
			turnHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 返回商家页
			turnStore() {
				uni.navigateTo({
					url: "../merchant-into-store/index?id="+this.storeId
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.common-style {
		text-align: center;
		color: $uni-text-color-inverse;
	}
	.success {
		background-color: $uni-baseColor;
		min-height: 100vh;
		.success-img {
			display: flex;
			justify-content: center;
		}
		.pay-success {
			font-size: 30rpx;
		}
		.pay-price {
			font-size: 54rpx;
		}
	}
</style>
