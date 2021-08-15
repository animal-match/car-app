<template>
	<!-- 我的页面 -->
	<view class="user-center">
		<view class="container">
			<u-gap height="42"></u-gap>
			<!-- 我的名片 -->
			<view @click="login" class="business-card">
				<view class="vip">
					<u-image src="/static/user-center-images/golden_vip.png" width="22rpx" height="28rpx"></u-image>
					<text class="normal-vip font-24">{{isVip==1?'黄金会员':'普通会员'}}</text>
				</view>
				<!-- 名片详情 -->
				<view class="card-details">
					<view class="avatar">
						<u-image :src="avatar.length>0 ? avatar:'/static/user-center-images/avatar.png'" shape="circle" width="140rpx" height="140rpx"></u-image>
						<view class="nickname-phone">
							<view class="nickname">{{userName.length>0?userName:'未登录'}}</view>
							<!-- <view v-if="isLogin===true" class="phone font-28">{{ phoneNum }}</view> -->
							<view v-if="false" class="phone font-28">{{ phoneNum }}</view>
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
					<text v-if="item.id === 1 && isVip==0" class="be-golden-vip font-24">成为黄金会员</text>
					<text class="arrow">></text>
				</view>
			</view>
			<u-gap height="248"></u-gap>
			<u-button v-if="isLogin===false" type="error" shape="circle" @click="login">去登录</u-button>
			<u-button v-else type="error" shape="circle" @click="logout">退出</u-button>
		</view>
		<u-modal v-model="showLogout" content="退出成功" :mask-close-able="true" :show-confirm-button="false" width="50%"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isVip: 0, // 是否黄金会员
				avatar: '', // 用户头像
				userName: '', // 用户昵称
				showLogout: false, // 打开退出登录弹窗
				isLogin: false, // 用户是否登录
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
		onLoad() {
			uni.$on('setUser', res => {
				console.log('我的信息页面用户信息',res)
				this.userName = res.nickName;
				this.avatar = res.avatar;
			})
		},
		onShow() {
			console.log('检查登录状态',this.$store.state.isLogin);
			this.isLogin = this.$store.state.isLogin;
			uni.getStorage({
				key: 'isVip',
				success: (res)=> {
					this.isVip = res.data;
				}
			})
			console.log('vip',this.isVip);
		},
		methods: {
			/** 
			 * @description 退出登录
			 * @param {}
			 **/
			logout() {
				const token = uni.getStorageSync("token");
				this.$request({
					url: '/api/user/logout',
					data: {token: token},
					success: res => {
						if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 return false;
						}
						this.isLogin = false; // 更改本页登录状态
						this.userName = "",
						this.avatar = "",
						this.isVip = 0,
						this.$store.commit('changeLoginState',false); // 登录状态改为false
						this.$store.commit('clearUserInfo'); // 清空vuex存储的用户信息
						uni.clearStorage();
						this.showLogout = true;
					}
				})
			},
			/**
			 * @description 登录
			 * @param {}
			 **/
			login() {
				if(this.isLogin==false) {
					uni.navigateTo({
						url: '/pages/me/login'
					})
				}
			},

			/**
			 * @description 跳转到对应的详情页
			 * @param {number}
			 **/
			intoDetailsPage(id) {
				// console.log(id);
				switch (id) {
					case 1:
						// 跳转到支付页面
						if(this.isVip==0) {
							uni.navigateTo({
								url: '/pages/merchants/payment/index'
							})
						} else {
							uni.showToast({
								title: "您已是黄金会员",
								icon: "none"
							})
						}
						break;
					case 2:
						// 跳转到商家入驻
						uni.navigateTo({
							url: '/pages/me/merchant-enter/index'
						})
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
