<template>
	<view class="collection">
		<u-gap height="20"></u-gap>
		<view @click="handleClick(_item.store.id)" class="information-block" v-for="(_item,_index) in collectionList" :key="_index">
			<!-- 第一行 Logo 标题 按钮 -->
			<view class="first-line">
				<!-- 左侧 Logo和标题 -->
				<view class="left-block">
					<u-image :src="_item.store.log" width="80rpx" height="80rpx" shape="circle"></u-image>
					<view class="title-and-text">
						<view class="title ellipsis">{{_item.store.store_name}}</view>
						<view class="text ellipsis">{{_item.store.information}}</view>
					</view>
				</view>
				<view class="right-block">
					<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true" ripple-bg-color="#dd524d" @click="handleClick(_item.store.id)">进店</u-button>
				</view>
			</view>
			<!-- 第二行 图片组 -->
			<view class="second-line">
				<u-image v-for="($item,$index) in _item.store.goods" :key="$index" class="image-list" :src="$item.image" width="160rpx"
				 height="110rpx"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectionList: [],
				page: {
					start: 1,
					totalPages: 0,
				},
			}
		},
		onShow() {
			this.getCollectionList();
		},
		onReachBottom() {
			if(this.page.start < this.page.totalPages) {
				this.page.start+=1;
				this.getCollectionList();
			}
		},
		methods: {
			/**
			 * @desc 获取收藏列表
			 * @param
			 **/
			getCollectionList() {
				this.collectionList = [];
				this.$request({
					url: "/api/likes/getList",
					method: "POST",
					success: res => {
						if(res.code!=1) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						let arr = res.data.data;
						this.collectionList = this.collectionList.concat(arr);
						this.page.totalPages = res.data.last_page;
					}
				})
			},
			/**
			 * @desc 跳转商家详情页
			 * @param
			 **/
			handleClick(id) {
				console.log('dianle',id)
				uni.navigateTo({
					url: '/pages/merchants/merchant-into-store/index?id='+id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.collection {
		min-height: 100vh;
		background-color: $uni-bg-color-grey;
		.information-block {
			border-radius: 20rpx;
			background-color: $uni-bg-color;
			padding: 27rpx 20rpx 22rpx 20rpx;
			margin: 0 30rpx;
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
