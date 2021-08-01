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
							<view class="cash">88.00</view>
							<u-image src="/static/user-center-images/distributor/coin.png" width="28rpx" height="28rpx"></u-image>
						</view>
						<view class="cash-coin">
							<view class="cash">909966.00</view>
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
							<text class="date font-20">{{item.date}}</text>
						</view>
						<!-- 第二行 article -->
						<view class="article font-24 multi-ellipsis">
							{{item.comment}}
						</view>
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
				depositList: [
					{
						avatar: 'https://img2.baidu.com/it/u=1325995315,4158780794&fm=26&fmt=auto&gp=0.jpg',
						nickname: '不知火舞',
						date: '2019/11/20',
						comment: '本人诚心求购8诚心三轮车5辆价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系十多个感受到阿达'
					},
					{
						avatar: 'https://img2.baidu.com/it/u=1325995315,4158780794&fm=26&fmt=auto&gp=0.jpg',
						nickname: 'QQ飞车',
						date: '2020/10/10',
						comment: '本人诚心求购8诚心三轮车5辆价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系十多个感受到阿达'
					},
					{
						avatar: 'https://img2.baidu.com/it/u=1325995315,4158780794&fm=26&fmt=auto&gp=0.jpg',
						nickname: '希望号',
						date: '2021/07/08',
						comment: '本人诚心求购8诚心三轮车5辆价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系十多个感受到阿达'
					},
				],
			}
		},
		methods: {
			goFetch() {				
				console.log('009')
				uni.navigateTo({
					url: '/pages/me/distributor/fetch/index'
				})
			}
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
						justify-content: space-between;
						align-items: center;
						margin: 36rpx 0 10rpx 0;
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
