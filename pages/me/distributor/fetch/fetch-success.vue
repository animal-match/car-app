<template>
	<!-- 提现成功页 -->
	<view class="success">
		<u-gap height="285"></u-gap>
		<u-image class="success-img" src="/static/user-center-images/pay-success.png" width="168" height="168"></u-image>
		<u-gap height="50"></u-gap>
		<view class="pay-success common-style">
			提现申请成功
		</view>
		<u-gap height="33"></u-gap>
		<view class="pay-price common-style">
			{{'￥' + money }}
		</view>
		<u-gap height="300"></u-gap>
		<u-button :custom-style="customStyle" shape="circle" @click="turnHome">返回首页</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				customStyle: {
					color: '#CA0303',
					background: '#FFF',
					margin: '0 30rpx',
					fontWeight: 'bolder'
				}
			}
		},
		onLoad(opt) {
			this.money = opt.cash; // 路由传参跳转获取opt参数
			this.$store.commit("decreaseMoney", opt.cash); // 减少vue中金额的数量
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
