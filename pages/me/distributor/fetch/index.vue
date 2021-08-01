<template>
	<!-- 提现 -->
	<view class="fetch-cash">
		<!-- 背景 -->
		<view class="container">
			<view class="can-fetch font-24">可提现金额</view>
			<view class="show-cash">789908.03</view>
		</view>
		<!-- 提现金额模块 -->
		<view class="fetch-money">
			<view class="title">提现金额</view>
			<view class="money-btn">
				<view class="money">65.00</view>
				<view>
					<u-button type="error" shape="circle" size="mini">全部提现</u-button>
				</view>
			</view>
			<view class="tips font-24">提现后可立即到账,请注意查收</view>
		</view>
		<!-- 提现方式 -->
		<view class="confirm-way">
			<text>提现方式</text>
		</view>
		<!-- 提现按钮 -->
		<view class="confirm-btn">
			<u-button type="error" shape="circle" size="default">全部提现</u-button>
		</view>
		<!-- 提现记录 -->
		<view class="fetch-records">
			<view class="fetch-records-title">提现记录</view>
			<!-- 循环体 -->
			<view v-for="(item,index) in recordsList" :key="index" class="all-details">
				<view class="left-right">
					<view class="date-time">{{item.dateTime}}</view>
					<view class="total-monoey cash-color">￥{{item.totalMonoey}}</view>
				</view>
				<!-- 提现详情 -->
				<view class="fetch-details">
					<!-- 第一行 -->
					<view class="first-line">
						<view>提现金额</view>
						<view class="text-color">￥{{item.fetchCash}}</view>
					</view>
					<!-- 第二行 -->
					<view class="second-line">
						<view>交易流水号</view>
						<view class="text-color">{{item.number}}</view>
					</view>
					<!-- 第三行 -->
					<view class="third-line">
						<view>提现状态</view>
						<view class="cash-color">已到账</view>
					</view>
				</view>
			</view>
			
		</view>
		<u-gap height="75"></u-gap>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				recordsList: [
					{
						dateTime: '2021-07-26 12:00',
						totalMonoey: 65,
						fetchCash: 65,
						number: '123456789',
					},
					{
						dateTime: '2021-09-15 10:00',
						totalMonoey: 133,
						fetchCash: 133,
						number: '123123231',
					},
				]
			}
		}
	}
</script>
<style lang="scss">
	.fetch-cash {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.font-24 {
		font-size: 24rpx;
	}
	.font-28 {
		font-size: 28rpx;
	}
	.cash-color {
		color: $uni-baseColor;
	}
	.text-color {
		color: $uni-text-color-grey;
	}
	.container {
		height: 455rpx;
		background-color: $uni-baseColor;
		.show-cash, .can-fetch {
			text-align: center;
			color: $uni-text-color-inverse;
		}
		.can-fetch {
			padding: 100rpx 0 39rpx;
		}
		.show-cash {
			font-size: 60rpx;
		}
	}
	.fetch-money {
		height: 260rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		margin: 0 30rpx;
		position: relative;
		top: -125rpx;
		padding: 27rpx 30rpx 35rpx;
		.title {
			padding-bottom: 38rpx;
		}
		.money-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 26rpx;
			border-bottom: 1rpx solid #D5D5D5;
			margin-bottom: 20rpx;
			.money {
				font-size: 48rpx;
			}
		}
		.tips {
			color: $uni-text-color-grey;
		}
	}
	.confirm-way {
		padding-left: 28rpx;
		font-size: 28rpx;
		height: 134rpx;
		line-height: 134rpx;
		background-color: $uni-text-color-inverse;
		margin: 0 30rpx;
		position: relative;
		top: -100rpx;
		border-radius: 20rpx;
		background-image: url(/static/user-center-images/distributor/wechat.png);
		background-repeat: no-repeat;
		background-size: 182rpx 62rpx;
		background-position: 180rpx 35rpx;
	}
	.confirm-btn {
		padding: 0 30rpx;
		padding-bottom: 106rpx;
	}
	.fetch-records {
		border-radius: 20rpx;
		margin: 0 30rpx;

		padding: 0 30rpx;
		background-color: $uni-text-color-inverse;
		.fetch-records-title {
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 2rpx solid $uni-bg-color-grey;
		}
		.all-details {
			.left-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 77rpx;
				line-height: 77rpx;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				.date-time {
					
				}
				.total-money {
					
				}
			}
			.fetch-details {
				height: 201rpx;
				line-height: 50rpx;
				padding: 20rpx 0 10rpx;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				.first-line, .second-line, .third-line {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
				}
			}
		}
	}
</style>