<template>
	<!-- 去支付页面 -->
	<view class="payment">
		<!-- 支付金额框 -->
		<u-gap height="20"></u-gap>
		<view class="payment-box">
			<view class="common-style">需支付金额(元)</view>
			<view class="payment-price">￥120.00</view>
		</view>
		<view class="common-style payment-way">请选择支付方式</view>
		<view class="bankcard-box">
			<!-- 左侧 银联图片 银行卡 描述 -->
			<view class="left-card">
				<view class="card-box">
					<u-image src="/static/user-center-images/union.png" width="80" height="80"></u-image>
				</view>
				<view class="desc">
					<ul>
						<li>银行卡</li>
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
			}
		},
		methods: {
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
				uni.navigateTo({
					url: '/pages/merchants/payment/pay-success'
				})
			},
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
		padding: 0 42rpx 0 27rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left-card {
			display: flex;
			.card-box {
				background-color: #EEEEEE;
				border-radius: 10rpx;
				margin-right: 16rpx;
				padding: 0 10rpx;
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
