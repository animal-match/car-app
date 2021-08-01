<template>
	<!-- 我的页面 -->
	<view class="user-center">
		<view class="container">
			<u-gap height="42"></u-gap>
			<!-- 我的名片 -->
			<view class="business-card">
				<view class="vip">
					<u-image src="/static/user-center-images/golden_vip.png" width="22rpx" height="28rpx"></u-image>
					<text class="normal-vip font-24">普通会员</text>
				</view>
				<!-- 名片详情 -->
				<view class="card-details">
					<view class="avatar">
						<u-image src="/static/user-center-images/default.jpg" shape="circle" width="140rpx" height="140rpx"></u-image>
						<view class="nickname-phone">
							<view class="nickname">邓超</view>
							<view class="phone font-28">{{ phoneNum }}</view>
						</view>
					</view>
					<view class="arrow">
						<u-image src="/static/user-center-images/arrow.png" width="13rpx" height="20rpx"></u-image>
					</view>
				</view>
			</view>
			<!-- 模块中心 -->
			<view @click="intoDetailsPage(item.id)" v-for="item in modules" :key="item.id" class="module">
				<view class="icon-vip">
					<u-image :src="item.url" width="35rpx" height="30rpx"></u-image>
					<text class="vip-center font-28">{{item.moduleName}}</text>
				</view>
				<view class="right-arrow">
					<text v-if="item.id === 1" class="be-golden-vip font-24">成为黄金会员</text>
					<text class="arrow">></text>
				</view>
			</view>
			<u-gap height="248"></u-gap>
			<u-button type="error" shape="circle" @click="logout">退出</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumCode: '15828292076',
				modules: [{
						id: 1,
						moduleName: '会员中心',
						url: '/static/user-center-images/vip.png'
					},
					{
						id: 2,
						moduleName: '商家入驻',
						url: '/static/user-center-images/merchant.png'
					},
					{
						id: 3,
						moduleName: '我的供求信息',
						url: '/static/user-center-images/supply.png'
					},
					{
						id: 4,
						moduleName: '分销商',
						url: '/static/user-center-images/sale.png'
					}
				],
			}
		},
		computed: {
			phoneNum() {
				let start, end;
				start = this.phoneNumCode.slice(0, 3);
				end = this.phoneNumCode.slice(7);
				console.log(start, end);
				return start + '****' + end;
			}
		},
		methods: {
			/** 
			 * @description 退出登录
			 * @param {}
			 **/
			logout() {
				console.log('退出')
				uni.navigateTo({
					url: '/pages/me/login'
				})
			},

			/**
			 * @description 跳转到对应的详情页
			 * @param {number}
			 **/
			intoDetailsPage(id) {
				// console.log(id);
				switch (id) {
					case 1:
						// 跳转到会员中心
						break;
					case 2:
						// 跳转到商家入驻
						break;
					case 3:
						// 跳转到我的供求信息
						uni.navigateTo({
							url: '/pages/me/my-supply-info/index'
						})
						break;
					case 4:
						// 跳转到分销商
						uni.navigateTo({
							url: '/pages/me/distributor/index'
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.user-center {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.container {
		margin: 0 30rpx;

		.font-24 {
			font-size: 24rpx;
		}

		.font-28 {
			font-size: 28rpx;
		}

		.business-card {
			margin-bottom: 21rpx;
			height: 202rpx;
			background-image: url(../../static/user-center-images/card.png);
			background-repeat: no-repeat;
			background-size: 100% 202rpx;
			padding: 0 30rpx;

			.vip {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding-top: 21rpx;

				.normal-vip {
					display: block;
					color: #FFCF66;
					margin-left: 10rpx;
				}
			}

			.card-details {
				height: 136rpx;
				position: relative;
				bottom: 15rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.avatar {
					display: flex;
					align-items: center;

					.nickname-phone {
						display: flex;
						flex-direction: column;
						margin-left: 27rpx;

						.nickname,
						.phone {
							color: $uni-text-color-inverse;
						}

						.nickname {
							font-weight: bold;
							font-size: 36rpx;
						}
					}
				}
			}
		}

		.module {
			background-color: $uni-text-color-inverse;
			border-radius: 20rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			padding-left: 32rpx;
			padding-right: 38rpx;
			margin-bottom: 2rpx;

			.icon-vip {
				display: flex;
				align-items: center;

				.vip-center {
					display: inline-block;
					margin-left: 20rpx;
					color: $uni-text-color;
				}
			}

			.right-arrow {
				display: flex;
				align-items: center;

				text {
					display: inline-block;
				}

				.be-golden-vip {
					color: #CA0303;
					margin-right: 31rpx;
				}

				.arrow {
					color: $uni-text-color-grey;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
