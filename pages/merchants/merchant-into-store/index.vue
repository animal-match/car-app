<template>
	<!-- 商家-进店详情页 -->
	<view class="merchant-into-store">
		<!-- 上半部分 -->
		<view class="top-container">
			<u-image src="/static/fly.jpg" height="320rpx" shape="square" border-radius="20rpx"></u-image>
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
			<u-button type="error" size="mini">
				<!-- <u-image src="/static/user-center-images/navigator.png"></u-image> -->
				<u-icon color="#FFF" size="30" name="map-fill"></u-icon>导航
			</u-button>
			<u-image src="/static/user-center-images/call.png" width="21" height="25"></u-image>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 底部部分 产品图 -->
		<view class="bottom-container">
			<view class="production">产品</view>
			<view class="image-box">
				<u-image :src="item.url" width="210" height="210" v-for="(item,index) in imgList" :key="index" ></u-image>
			</view>
			<u-gap height="40"></u-gap>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
					{url: require("../../../static/gun.jpg")},
				]
			}
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
				justify-content: space-evenly;
			}
		}
	}
</style>
