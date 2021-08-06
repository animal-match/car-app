<template>
	<view class="home">
		<!-- 首页 -->
		<view class="container">
			<u-gap height="20"></u-gap>
			<!-- 轮播图 -->
			<u-swiper :list="list"></u-swiper>
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
				<view class="today-come-text">今日入驻</view>
				<view class="today-come-desc">
					<view class="manufacturers">
						<text class="title">厂家</text>
						<text class="quantity">233</text>
					</view>
					<view class="merchant">
						<text class="title">经销商</text>
						<text class="quantity">456</text>
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
			<view class="information-block" v-for="(_item,_index) in informations" :key="_index">
				<!-- 第一行 Logo 标题 按钮 -->
				<view class="first-line">
					<!-- 左侧 Logo和标题 -->
					<view class="left-block">
						<u-image :src="_item.image" width="80rpx" height="80rpx" shape="circle"></u-image>
						<view class="title-and-text">
							<view class="title ellipsis">{{_item.title}}</view>
							<view class="text ellipsis">{{_item.subtitle}}</view>
						</view>
					</view>
					<view class="right-block">
						<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true" ripple-bg-color="#dd524d" @click="handleClick">进店</u-button>
					</view>
				</view>
				<!-- 第二行 图片组 -->
				<view class="second-line">
					<u-image v-for="($item,$index) in _item.imageList" :key="$index" class="image-list" :src="$item.img" width="160rpx"
					 height="110rpx"></u-image>
				</view>
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
			<view class="information-block" v-for="(item2,index2) in informations" :key="index2">
				<!-- 第一行 Logo 标题 按钮 -->
				<view class="first-line">
					<!-- 左侧 Logo和标题 -->
					<view class="left-block">
						<u-image :src="item2.image" width="80rpx" height="80rpx" shape="circle"></u-image>
						<view class="title-and-text">
							<view class="title ellipsis">{{item2.title}}</view>
							<view class="text ellipsis">{{item2.subtitle}}</view>
						</view>
					</view>
					<view class="right-block">
						<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true" ripple-bg-color="#dd524d" @click="handleClick">进店</u-button>
					</view>
				</view>
				<!-- 第二行 图片组 -->
				<view class="second-line">
					<u-image v-for="(item3,index3) in item2.imageList" :key="index3" class="image-list" :src="item3.img" width="160rpx"
					 height="110rpx"></u-image>
				</view>
			</view>
			<!-- 最外层大盒子 End-->
			<u-gap height="40"></u-gap>
			
			<!-- 供求信息。。。更多 -->
			<view class="manufacturers-title">
				<view class="manufacturers-title-merchant">供求信息</view>
				<view class="manufacturers-title-more" @click="supplyDemand">更多 ></view>
			</view>
			<u-gap height="40"></u-gap>
			<!-- 最外层大盒子Start -->
			<view v-for="(item4,index4) in infos" :key="index4" class="information-require">
				<!-- 第一行 标签 标题 按城市-->
				<view class="first-line-other">
					<!-- 左侧 标签和标题 -->
					<view class="left-block-other" >
						<u-tag text="求购" mode="dark" />
						<view class="title-other ellipsis">
							<view class="title ellipsis">{{item4.title}}</view>
						</view>
					</view>
					<view class="right-block">
						{{item4.city}}
					</view>
				</view>
				<!-- 第二行 描述 -->
				<view class="second-line-other multi-ellipsis">
					{{item4.desc}}
				</view>
				<!-- 第三行 头像 昵称 时间 -->
				<view class="third-line-other">
					<!-- 左侧 头像 昵称 -->
					<view class="left-nickname">
						<u-image :src="item4.avatar" width="42rpx" height="42rpx" shape="circle"></u-image>
						<view class="nickname">
							{{item4.nickname}}
						</view>
					</view>
					<!-- 右侧 时间 -->
					<view class="date-other">{{item4.date}}</view>
				</view>
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
				infos: [
					{
						title: '求购二手三轮车5辆成色8成都市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '成都市',
						nickname: '旋风冷少',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},
					{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					}
				],
				informations: [{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.boqiicdn.com%2FData%2FBK%2FP%2Fimg57991418291533.jpg&refer=http%3A%2F%2Fimg.boqiicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630298901&t=be9f4858f70b9d1e575cb8cd36c414f3',
						title: '成都市保时捷汽车有限公司',
						subtitle: '是客户端爱空间的丝黛芬妮的解放军报上课施工方啊',
						imageList: [{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcms.xitek.com%2Fuploads%2Fallimg%2F120801%2F84-120P1150432-50.jpg&refer=http%3A%2F%2Fcms.xitek.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304332&t=60615b76887ce90dddeedc85fe00dbc2',
							},
							{
								img: 'https://img1.baidu.com/it/u=3375251621,733367456&fm=26&fmt=auto&gp=0.jpg',
							},
							{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy1.ifengimg.com%2Fa%2F2014_51%2F27ae2deba334edd.jpg&refer=http%3A%2F%2Fy1.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304515&t=2042631916e9f2e29e389a3c809baf04',
							},
							{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.xcar.com.cn%2Fattachments%2Fa%2Fday_091228%2F20091228_7e5c3baded03d9d32d13aNLs5o80b678.jpg&refer=http%3A%2F%2Fimage.xcar.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304450&t=fd64f892b7ca8f4e4312baf0cb6cc696',
							}
						],
					},

					{
						image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.boqiicdn.com%2FData%2FBK%2FP%2Fimg57991418291533.jpg&refer=http%3A%2F%2Fimg.boqiicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630298901&t=be9f4858f70b9d1e575cb8cd36c414f3',
						title: '成都市保时捷汽车有限公司',
						subtitle: '是客户端爱空间的丝黛芬妮的解放军报上课施工方啊',
						imageList: [{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcms.xitek.com%2Fuploads%2Fallimg%2F120801%2F84-120P1150432-50.jpg&refer=http%3A%2F%2Fcms.xitek.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304332&t=60615b76887ce90dddeedc85fe00dbc2',
							},
							{
								img: 'https://img1.baidu.com/it/u=3375251621,733367456&fm=26&fmt=auto&gp=0.jpg',
							},
							{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy1.ifengimg.com%2Fa%2F2014_51%2F27ae2deba334edd.jpg&refer=http%3A%2F%2Fy1.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304515&t=2042631916e9f2e29e389a3c809baf04',
							},
							{
								img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.xcar.com.cn%2Fattachments%2Fa%2Fday_091228%2F20091228_7e5c3baded03d9d32d13aNLs5o80b678.jpg&refer=http%3A%2F%2Fimage.xcar.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630304450&t=fd64f892b7ca8f4e4312baf0cb6cc696',
							}
						],
					},
				],
				// 轮播图
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			/**
			 * @desc 跳转商家进店页面
			 * @param
			 **/
			handleClick() {
				uni.navigateTo({
					url: '/pages/merchants/merchant-into-store/index'
				})
			},
			/**
			 * @desc 点击图片跳转对应页面
			 * @param {string}
			 **/
			goDetailsPage(pageName) {
				switch (pageName) {
					case 'supply':
						uni.switchTab({
							url: '/pages/require/index',
						})
					break;
					case 'require':
					  uni.switchTab({
					  	url: '/pages/require/index',
					  })
					break;
					case 'merchant':
						uni.navigateTo({
							url: '/pages/me/merchant-enter/index',
						})
					break;
				}
			},
			/**
			 * @desc 点击更多跳转到商家页面
			 * @param {string}
			 **/
			toMerchantPage(pageName) {
				console.log(pageName)
				uni.switchTab({
					url: '../merchants/index'
				})
			},
			/**
			 * @desc 点击更多跳转到供求页
			 * @param {string}
			 **/
			supplyDemand() {
				uni.switchTab({
					url: '/pages/require/index',
				})
			}
		}
	}
</script>
<style lang="scss">
	.home {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.container {
		margin: 0 30rpx;

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
			height: 220rpx;
			background-color: $uni-bg-color;
			padding: 27rpx 20rpx 44rpx 20rpx;
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
			height: 280rpx;
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
				justify-content: space-between;

				.image-list {
					display: inline-block;
					border: 2rpx solid #E5E5E5;
				}
			}
		}
	}
</style>
