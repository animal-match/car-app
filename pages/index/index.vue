<template>
	<view class="home">
		<!-- 首页 -->
		<!-- 轮播图 -->
		<view class="banner">
			<u-swiper class="swiper" :list="banner" height="356" border-radius="12"></u-swiper>
		</view>
		<view class="container">
			<u-gap height="20"></u-gap>
			<u-gap height="45"></u-gap>
			<view class="nav-district">
				<u-image @click="goDetailsPage('supply')" src="/static/nav-images/supply_publish.png" width="120rpx" height="120rpx"></u-image>
				<u-image @click="goDetailsPage('require')" src="/static/nav-images/buy.png" width="120rpx" height="120rpx"></u-image>
				<u-image @click="goDetailsPage('merchant')" src="/static/nav-images/merchant_come.png" width="120rpx" height="120rpx"></u-image>
			</view>
			<!-- 导航区域 -->
			<view class="nav-district">
				<text>供应发布</text>
				<text>我要求购</text>
				<text>商家入驻</text>
			</view>
			<!-- 今日入驻 -->
			<view class="today-come">
				<view class="today-come-text">入驻商家</view>
				<view class="today-come-desc">
					<view class="manufacturers">
						<text class="title">厂家</text>
						<text class="quantity">{{manufactor}}</text>
					</view>
					<view class="merchant">
						<text class="title">经销商</text>
						<text class="quantity">{{distributor}}</text>
					</view>
				</view>
			</view>
			<!-- 厂家。。。更多 -->
			<view class="manufacturers-title">
				<view class="manufacturers-title-merchant">厂家</view>
				<view class="manufacturers-title-more" @click="toMerchantPage('manufacturers')">更多 ></view>
			</view>
			<u-gap height="40"></u-gap>
			<!-- 最外层大盒子 Start-->

			<view v-if="merchant_0.length>0">
				<view @click="handleClick(_item.id)" class="information-block" v-for="(_item,_index) in merchant_0">
					<!-- 第一行 Logo 标题 按钮 -->
					<view class="first-line" :key="_index">
						<!-- 左侧 Logo和标题 -->
						<view class="left-block">
							<u-image :src="_item.log" width="80rpx" height="80rpx" shape="circle"></u-image>
							<view class="title-and-text">
								<view class="title ellipsis">{{_item.store_name}}</view>
								<view class="text ellipsis">{{_item.information}}</view>
							</view>
						</view>
						<view class="right-block">
							<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true" ripple-bg-color="#dd524d" @click="handleClick(_item.id)">进店</u-button>
						</view>
					</view>
					<!-- 第二行 图片组 -->
					<view class="second-line">
						<u-image v-for="($item,$index) in _item.goods" :key="$index" class="image-list" :src="$item.image" width="160rpx"
						 height="110rpx"></u-image>
					</view>
				</view>
			</view>
			<view v-else class="empty-block">
				<text>暂无厂家</text>
			</view>
			<!-- 最外层大盒子 End-->
			<u-gap height="40"></u-gap>
			<!-- 经销商。。。更多 -->
			<view class="manufacturers-title">
				<view class="manufacturers-title-merchant">经销商</view>
				<view class="manufacturers-title-more" @click="toMerchantPage('dealer')">更多 ></view>
			</view>
			<u-gap height="40"></u-gap>
			<!-- 最外层大盒子 Start-->
			<view v-if="merchant_1.length>0">
				<view @click="handleClick(item2.id)" class="information-block" v-for="(item2,index2) in merchant_1">
					<!-- 第一行 Logo 标题 按钮 -->
					<view class="first-line" :key="index2">
						<!-- 左侧 Logo和标题 -->
						<view class="left-block">
							<u-image :src="item2.log" width="80rpx" height="80rpx" shape="circle"></u-image>
							<view class="title-and-text">
								<view class="title ellipsis">{{item2.store_name}}</view>
								<view class="text ellipsis">{{item2.information}}</view>
							</view>
						</view>
						<view class="right-block">
							<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true" ripple-bg-color="#dd524d" @click="handleClick(item2.id)">进店</u-button>
						</view>
					</view>
					<!-- 第二行 图片组 -->
					<view class="second-line">
						<u-image v-for="(item3,index3) in item2.goods" :key="index3" class="image-list" :src="item3.image" width="160rpx"
						 height="110rpx"></u-image>
					</view>
				</view>
			</view>
			<view v-else class="empty-block">
				<text>暂无经销商</text>
			</view>
			<!-- 最外层大盒子 End-->
			<u-gap height="40"></u-gap>
			
			<!-- 供求信息。。。更多 -->
			<view class="manufacturers-title">
				<view class="manufacturers-title-merchant">供求信息</view>
				<view class="manufacturers-title-more" @click="goDetailsPage('supNeed')">更多 ></view>
			</view>
			<u-gap height="40"></u-gap>
			<!-- 最外层大盒子Start -->
			<view v-if="totalinfo.length>0">
				<view v-for="(item4,index4) in totalinfo.slice(0, 6)" @click="goDetails(item4.id)" class="information-require">
					<!-- 第一行 标签 标题 按城市-->
					<view class="first-line-other" :key="index4">
						<!-- 左侧 标签和标题 -->
						<view class="left-block-other" >
							<u-tag :text="item4.type=='supply'?'供应':'求购'" mode="dark" :type="item4.type=='supply'?'primary':'error'"/>
							<view class="title-other ellipsis">
								<view class="title ellipsis">{{item4.title || '-'}}</view>
							</view>
						</view>
						<view class="right-block">
							{{item4.city || '-'}}
						</view>
					</view>
					<!-- 第二行 描述 -->
					<view class="second-line-other multi-ellipsis">
						{{item4.content || '-'}}
					</view>
					<!-- 第三行 头像 昵称 时间 -->
					<view class="third-line-other">
						<!-- 左侧 头像 昵称 -->
						<view class="left-nickname">
							<u-image :src="item4.user.avatar" width="42rpx" height="42rpx" shape="circle"></u-image>
							<view class="nickname">
								{{item4.user.nickname || '-'}}
							</view>
						</view>
						<!-- 右侧 时间 -->
						<view class="date-other">{{ item4.createtime || '-' }}</view>
					</view>
				</view>
			</view>
			<view v-else class="empty-block">
				<text>暂无供求信息</text>
			</view>
			<!-- 最外层大盒子End -->
			<u-gap height="40"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				manufactor: 0,
				distributor: 0,
				banner: [], // // 轮播图
				merchant_0: [], // 厂家
				merchant_1: [], // 经销商
				totalinfo: [] ,// 供求信息
				cloneTotalinfo: [], // 深拷贝的供求信息
			}
		},
		onLoad() {
			// 如果得到token，自动登录
			this.autologin();
		},
		onShow() {
			this.getBanner();
			this.getList();
			this.getMoreList();
			this.static(); // 厂家和经销商数量
			this.getRequireSupply();
		},
		methods: {
			autologin() {
				uni.login({
				  provider: 'weixin',
				  success: (loginRes) => {
				    console.log('是否登录',loginRes.code);
						this.$request({
							url: "/api/user/getWxMiniProgramSessionKey",
							data: {
								code: loginRes.code,
								autoLogin: 1
							},
							success: res=> {
								if(res.code != 1) {
									 console.log("不是你本人的token")
									 return false;
								}
								const openid = res.data.openid;
								const session_key = res.data.session_key;
								const token = res.data.token;
								// 检查登录是否过期
								uni.checkSession({
									success: res => {
										console.log("处于登录状态")
									},
									fail: err => {
										uni.showToast({
											icon: "none",
											title: "登录已过期，请重新登录"
										})
										return
									}
								})
								if(token) {
									uni.setStorageSync("token", token); // 保存token到缓存中
									this.$store.commit('changeLoginState', true); // 登录状态为true
									this.$request({
										url: "/api/user/index",
										data: { token: token },
										success: res => {
											console.log('用户中心',res);
											let user = {
												id: res.data.user.id, // 用户id
												nickName: res.data.user.nickname, // 昵称
												avatar: res.data.user.avatar, // 头像
												money: res.data.user.money ,// 帐户金额
												pid: res.data.user.pid, // 下线Id
												type: res.data.user.type, // 商家类型
											};
											this.$store.commit('setUserInfo',user);
											let isVip = res.data.user.is_vip; // 0 非会员 1会员
											uni.$emit("vipStatus",isVip);
											uni.setStorage({
												key: 'isVip',
												data: isVip,
											})
										}
									})
								} else {
									console.log("你还没有授权，无法自动登录！")
								}
							},
						})
				  }
				});
			},
			/**
			 * @desc 轮播图
			 * @param
			 **/
			 getBanner() {
				 this.$request({
					 url: "/api/decorate/banner",
					 success: res => {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 this.banner = res.data;
					 }
				 })
			 },
			/**
			 * @desc 请求页面数据（厂家列表）
			 * @param
			 **/
			 getList() {
				 this.$request({
					 url: "/api/store/index",
					 method: "GET",
					 data: {type: 0}, // 厂家
					 success: res=> {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 this.merchant_0 = res.data.slice(0,4);
						 console.log(res,"首页厂家");
					 }
				 })
			 },
			 /**
			  * @desc 请求页面数据（经销商列表）
			  * @param
			  **/
			getMoreList() {
				this.$request({
					 url: "/api/store/index",
					 method: "GET",
					 data: {type: 1}, // 经销商
					 // hideLoading: true,
					 success: res=> {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 this.merchant_1 = res.data.slice(0,4);
						 console.log(res,"首页经销商");
				 }
				})
			},
			/**
			 * @desc 获取厂家经销商数量
			 * @param
			 **/
			static() {
				this.$request({
					url: "/api/store/statistics",
					 success: res=> {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 this.manufactor = res.data.manufactor;
						 this.distributor = res.data.distributor;
					}
				})
			},
			/**
			 * @desc 获取供求信息
			 * @param
			 **/
			getRequireSupply() {
				this.$request({
					url: "/api/supply/index",
					method: "POST",
					success: res => {
						if(res&&res.code&&res.code!==1) {
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
							return false
						}
						console.log('供求',res.data.data)
						this.totalinfo = res.data.data;
						// 深拷贝数组
						let arr = [];
						for(let i=0; i<this.totalinfo.length; i++) {
							arr.push(this.totalinfo[i]);
						}
						this.cloneTotalinfo = arr;
					}
				})
			},
			/**
			 * @desc 跳转商家进店页面
			 * @param
			 **/
			handleClick(id) {
				console.log('dianle',id)
				uni.navigateTo({
					url: '/pages/merchants/merchant-into-store/index?id='+id
				})
			},
			/**
			 * @desc 点击图片跳转对应页面
			 * @param {string}
			 **/
			goDetailsPage(pageName) {
				switch (pageName) {
					case 'supply':
						uni.setStorageSync(
							'tabBarIndex',
							 'fromHomePage1',
						);
						uni.switchTab({
							url: '/pages/require/index',
						})
					break;
					case 'require':
						uni.setStorageSync(
							'tabBarIndex',
							'fromHomePage2',
						);
					  uni.switchTab({
					  	url: '/pages/require/index',
					  })
					break;
					case 'merchant':
						uni.navigateTo({
							url: '/pages/me/merchant-enter/index',
						})
					break;
					case 'supNeed':
					uni.setStorageSync(
						'tabBarIndex',
						 0,
					);
					uni.switchTab({
						url: '/pages/require/index',
					})
				}
			},
			/**
			 * @desc 点击更多跳转到商家页面
			 * @param {string}
			 **/
			toMerchantPage(pageName) {
				console.log(pageName)
				switch(pageName) {
					case 'manufacturers':
						// uni.setStorageSync('pageIndex',0);
						this.$store.state.pageIndex = 0
						uni.switchTab({
							url: '../merchants/index'
						})
					break;
					case 'dealer':
					  // uni.setStorageSync('pageIndex',1);
						this.$store.state.pageIndex = 1
						uni.switchTab({
							url: '../merchants/index'
						})
					break;
				}
			},
			/**
			 * @desc 跳转供求详情页
			 * @param {string}
			 **/
			goDetails(id) {
				let arr = this.cloneTotalinfo; // 只要传数组过去 就会有相关推荐列表
				console.log('传递数组',arr)
				uni.navigateTo({
					url: '/pages/require/details/index?id='+id + '&arr=' + JSON.stringify(arr)
				})
			},
		}
	}
</script>
<style lang="scss">
	.home {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
		.banner {
			height: 280rpx;
			border-bottom-left-radius: 5%;
			border-bottom-right-radius: 5%;
			background-color: $uni-baseColor;
			padding: 0 20rpx;
			.swiper {
				position: relative;
				top: 20rpx;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.container {
		margin: 0 30rpx;
		margin-top:100rpx;
		.nav-district {
			display: flex;
			justify-content: space-around;

			u-image,
			text {
				display: inline-block;
			}

			text {
				padding-top: 20rpx;
				padding-bottom: 40rpx;
				color: $uni-text-color-placeholder;
			}
		}

		.today-come {
			height: 180rpx;
			border-radius: 20rpx;
			background-color: $uni-bg-color;
			margin-bottom: 55rpx;

			.today-come-text {
				text-align: center;
				padding: 20rpx 0;
				color: $uni-text-color;
			}

			.today-come-desc {
				display: flex;
				width: 100%;

				.manufacturers,
				.merchant {
					height: 77rpx;
					line-height: 77rpx;
					width: 50%;
					text-align: center;

					.title {
						font-size: 24rpx;
						position: relative;
						bottom: 8rpx;
						margin-right: 20rpx;
						color: $uni-text-color-grey;
					}

					.quantity {
						font-size: 40rpx;
						color: $uni-text-color;
					}
				}

				.manufacturers {
					background-color: #F1EFFD;
					margin-left: 20rpx;
				}

				.merchant {
					background-color: #FFEAEA;
					margin-right: 20rpx;
				}
			}
		}
		.empty-block {
			color: $uni-text-color-grey;
			height: 173rpx;
			line-height: 173rpx;
			border-radius: 20rpx;
			background: $uni-bg-color;
			text-align: center;
		}
		.manufacturers-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.manufacturers-title-merchant {
				font-size: 32rpx;
			}

			.manufacturers-title-more {
				color: $uni-text-color-grey;
				font-size: 24rpx;
			}
		}
		.information-require {
			border-radius: 20rpx;
			background-color: $uni-bg-color;
			padding: 27rpx 20rpx 22rpx 20rpx;
			margin-bottom: 20rpx;
			.first-line-other {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;
				.left-block-other {
					display: flex;
					.title-other {
						width: 350rpx;
						font-weight: bolder;
						color: $uni-text-color;
						font-size: 30rpx;
						margin-left: 10rpx;
					}
				}
			}
			.second-line-other {
				font-size: 24rpx;
				margin-bottom: 10rpx;
				color: $uni-text-color-grey;
				padding: 0 10rpx;
			}
			.third-line-other {
				display: flex;
				justify-content: space-between;
				padding: 0 10rpx;
				.left-nickname {
					display: flex;
					align-items: center;
					.nickname {
						display: inline-block;
						color: $uni-text-color-grey;
						font-size: 20rpx;
						margin-left: 10rpx;
					}
				}
				.date-other {
					color: $uni-text-color-grey;
					font-size: 20rpx;
				}
			}
			.right-block {
				color: $uni-text-color-grey;
			}
		}
		.information-block {
			border-radius: 20rpx;
			background-color: $uni-bg-color;
			padding: 27rpx 20rpx 44rpx 20rpx;
			margin-bottom: 20rpx;
			
			.first-line {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 28rpx;

				.left-block {
					display: flex;
					.title-and-text {
						display: flex;
						flex-direction: column;
						width: 450rpx;
						margin-left: 20rpx;

						.title {
							font-weight: bolder;
							color: $uni-text-color;
							font-size: 30rpx;
						}

						.text {
							color: $uni-text-color-grey;
							font-size: 24rpx;
						}
					}
				}
			}
			.second-line {
				display: flex;
				.image-list {
					display: inline-block;
					border: 2rpx solid #E5E5E5;
				}
			}
		}
	}
</style>
