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
			￥120.00
		</view>
		<u-gap height="300"></u-gap>
		<u-button :custom-style="customStyle" shape="circle" @click="turnHome">返回首页</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					color: '#CA0303',
					background: '#FFF',
					margin: '0 30rpx',
					fontWeight: 'bolder'
				}
			}
		},
		methods: {
			/**
			 * @desc 返回首页
			 * @param
			 **/
			turnHome() {
				uni.navigateTo({
					url: '/pages/merchants/merchant-into-store/index'
				})
			}
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
