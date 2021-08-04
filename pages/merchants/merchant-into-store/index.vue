<template>
	<!-- 商家-进店详情页 -->
	<view class="merchant-into-store">
		<!-- 上半部分 -->
		<view class="top-container">
			<u-image src="http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png" height="320rpx" shape="square" border-radius="20rpx"></u-image>
			<view class="name-tags-button">
				<!-- 左侧 厂家名称和标签 -->
				<view class="name-and-tags">
					<view class="merchant-name">成都品牌豪车厂家</view>
					<view class="tags">
						<text class="tag-name">品牌商</text>
						<text class="tag-name">品牌商</text>
						<text class="tag-name">品牌商</text>
					</view>
				</view>
				<!-- 右侧 按钮 -->
				<view>
					<u-button type="error" shape="circle" size="default">我的供求信息</u-button>
				</view>
			</view>
			<view class="informations">
				<u-tag text="介绍" type="error" mode="dark" class="intro"/>
				<text>&nbsp;&nbsp;&nbsp;&nbsp;锁定拉动房价肯定的法国时尚 开个房反馈给坑了发过来看房 撒旦非十大撒是发给客服但是法国发过模块是敢死队风格 ，手动阀手动阀是德国通过邮件看try对方的</text>
			</view>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 中间部分 联系电话 定位 -->
		<view class="center-container">
			<u-image src="/static/user-center-images/addr.png" width="23" height="36"></u-image>
			<text class="address ellipsis">成都市金牛区二环路北二段199号</text>
			<u-button type="error" size="mini" @click="showAddress">
				<!-- <u-image src="/static/user-center-images/navigator.png"></u-image> -->
				<u-icon color="#FFF" size="30" name="map-fill"></u-icon>导航
			</u-button>
			<u-image src="/static/user-center-images/call.png" width="21" height="25" @click="showPhone"></u-image>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 底部部分 产品图 -->
		<view class="bottom-container">
			<view class="production">产品</view>
			<view class="image-box">
				<u-image class="production-iamges" :src="item.url" width="32%" height="190" v-for="(item,index) in imgList" :key="index" ></u-image>
			</view>
			<u-gap height="40"></u-gap>
		</view>
		<!-- 弹出框 查看电话去升级-->
		<u-modal v-model="phoneNoShow" width="70%" :content="phoneTips" show-confirm-button show-cancel-button confirm-text="去升级" title="重要提示" confirm-color="#CA0303" @confirm="upDate"></u-modal>
		<!-- 弹出框 查看地址去支付 -->
		<u-modal v-model="addressShow" width="80%" :content="adressTips" show-confirm-button show-cancel-button confirm-text="去支付" title="重要提示" confirm-color="#CA0303" @confirm="payment"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressShow: false, // 显示地址弹窗
				phoneNoShow: false, // 显示电话号码弹窗
				phoneTips: '商家查看经销商电话需成为会员',
				adressTips: '非会员查看地址电话需支付120元费用',
				imgList: [
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
					{url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png'},
				]
			}
		},
		methods: {
			/**
			 * @desc 展示经销商电话
			 * @param 
			 **/
			showPhone() {
				this.phoneNoShow = true;
			},
			/**
			 * @desc 展示定位地址
			 * @param 
			 **/
			showAddress() {
				this.addressShow = true;
			},
			/**
			 * @desc 点击 去升级按钮
			 * @param 
			 **/
			upDate() {
				console.log('跳转去升级页面')
			},
			/**
			 * @desc 点击 去支付按钮
			 * @param 
			 **/
			 payment() {
				 uni.navigateTo({
				 	url: "/pages/merchants/payment/index"
				 })
			 },
		}
	}
</script>

<style lang="scss" scoped>
	.merchant-into-store {
		// 上半部分
		.top-container {
			height: 620rpx;
			margin: 23rpx 30rpx;
			.name-tags-button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				.name-and-tags {
					display: flex;
					flex-direction: column;
					padding: 31rpx 0 24rpx;
					.merchant-name {
						font-size: 30rpx;
						font-weight: bolder;
						margin-bottom: 20rpx;
					}
					.tags {
						.tag-name {
							padding: 5rpx 14rpx;
							font-size: 24rpx;
							color: $uni-baseColor;
							background-color: #f4f4f5;
							margin-right: 10rpx;
							border-radius: 7rpx;
						}
					}
				}
			}
			.informations {
				padding: 23rpx 0;
				.intro {
					margin-right: 10rpx !important;
				}
				text {
					display: inline;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}
		// 中间部分
		.center-container {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 50rpx;
			.address {
				display: inline-block;
				color: $uni-text-color-grey;
				margin-left: 22rpx;
				font-size: 24rpx;
				width: 400rpx;
			}
			.u-btn {
				
			}
		}
		// 底部部分
		.bottom-container {
			margin: 30rpx 46rpx;
			.production {
				padding-bottom: 25rpx;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				font-size: 30rpx;
				font-weight: bolder;
				margin-bottom: 20rpx;
			}
			.image-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.production-iamges {
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
