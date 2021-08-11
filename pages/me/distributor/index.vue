<template>
	<view class="distributor">
		<view class="container">
			<!-- 背景图片 -->
			<view class="background-image">
				<!-- 本月收益，累计收益与金额 -->
				<view class="income">
					<view class="income-text font-24 right-gap">
						<view class="current-month-income">本月收益</view>
						<view class="total-income">累计收益</view>
					</view>
					<!-- 收益金额显示 -->
					<view class="income-text">
						<view class="cash-coin">
							<view class="cash">{{currentMonthProfits.toFixed(2)}}</view>
							<u-image src="/static/user-center-images/distributor/coin.png" width="28rpx" height="28rpx"></u-image>
						</view>
						<view class="cash-coin">
							<view class="cash">{{totalProfits.toFixed(2)}}</view>
							<u-image src="/static/user-center-images/distributor/coin.png" width="28rpx" height="28rpx"></u-image>
						</view>
					</view>
				</view>
				<view class="deposit">
					<view class="deposit-fetch font-24">金币可提现</view>
					<view class="deposit-btn" @click="goFetch">
						<text class="deposit-go font-24">去提现</text>
						<u-icon name="arrow-right" color="#FFAC36" size="22"></u-icon>
					</view>
				</view>
			</view>
			<!-- 我的下线 -->
			<view class="my-employee">
				我的下线
			</view>
			<!-- 下面的容器 -->
			<view class="container-info">
				<!-- 每一个模块 -->
				<view v-for="(item,index) in depositList" class="module">
					<!-- 左侧头像 -->
					<view class="avatar">
						<u-image :src="item.avatar" width="118rpx" height="118rpx" shape="circle"></u-image>
					</view>
					<!-- 右侧详情 -->
					<view class="details">
						<!-- 第一行 昵称与日期 -->
						<view class="nickname-date">
							<text class="nickname">{{item.nickname}}</text>
							<text class="date font-20">{{item.createtime | timeStampFilter}}</text>
						</view>
						<!-- 第二行 article -->
						<!-- <view class="article font-24 multi-ellipsis">
								名片下面描述语句？
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentMonthProfits: 0,// 本月收益
				totalProfits: 0, // 累计收益
				depositList: [],
			}
		},
		onShow() {
			this.merchantInfo();
		},
		methods: {
			/**
			 * @desc 跳转提现页面
			 * @param
			 **/
			goFetch() {				
				uni.navigateTo({
					url: '/pages/me/distributor/fetch/index'
				})
			},
			/**
			 * @desc 分销商信息
			 * @param
			 **/
			merchantInfo() {
				this.$request({
					url: "/api/user/commission",
					method: "POST",
					success: res => {
						if(!!res&&res.code&&res.code!==1) {
							console.log('获取失败')
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
							return false;
						}
						this.currentMonthProfits = res.data.month_total; // 本月收益
						this.totalProfits = res.data.total; // 累计收益
						this.depositList = res.data.team; // 我的下线
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.distributor {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.font-24 {
		font-size: 24rpx;
	}
	.font-20 {
		font-size: 20rpx;
	}
	.container {
		.background-image {
			height: 304rpx;
			background-image: url(../../../static/user-center-images/distributor/background.png);
			background-repeat: no-repeat;
			background-size: 100% 304rpx;
			.income {
				position: relative;
				top: 57rpx;
				.right-gap {
					margin-right: 55rpx;
				}
				.income-text {
					display: flex;
					color: $uni-text-color-inverse;
					justify-content: space-around;
					.current-month-income {
						position: relative;
						left: -25rpx;
					}
					.cash-coin {
						display: flex;
						font-size: 60rpx;
						margin-top: 20rpx;
						.cash {
							margin-right: 10rpx;
						}
					}
				}
			}
			.deposit {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				top: 100rpx;
				.deposit-fetch {
					margin-right: 15rpx;
					color: $uni-text-color-inverse;
				}
				.deposit-btn {
					display: inline-block;
					color: #FFAC36;
					border: 1rpx solid #FFAC36;
					// padding: 5rpx 10rpx;
					padding: 0rpx 10rpx 5rpx 10rpx;
					border-radius: 20rpx;;
				}
				.deposit-go {
					margin-right: 5rpx;
				}
			}
		}
		.my-employee {
			height: 92rpx;
			line-height: 92rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: bolder;
			background-color: $uni-text-color-inverse;
		}
		.container-info {
			margin: 18rpx 35rpx;
			.module {
				background-color: $uni-text-color-inverse;
				height: 170rpx;
				display: flex;
				justify-content: space-between;
				// 具体看需不需要名片下面的描述样式，
				align-items: center;
				// 如果需要就去掉align-items:center。
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				.avatar {
					align-self: center;
					margin-left: 32rpx;
					margin-right: 22rpx;
				}
				.details {
					margin-right: 22rpx;
					width: 100%;
					.article {
						color: $uni-text-color-grey !important;
					}
					.nickname-date {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						.nickname {
							font-weight: bold;
							font-size: 30rpx;
						}
						.date {
							color: $uni-text-color-grey !important;
						}
						text {
							display: inline-block;
						}
					}
				}
			}
		}
	}
</style>
