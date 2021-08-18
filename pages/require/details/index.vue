<template>
	<!-- 供求详情页 -->
	<view class="details">
		<u-gap height="20"></u-gap>
		<view class="container-top">
			<view class="title">
				{{detail.title || '-'}}
			</view>
			<view class="user">
				<view class="use-info">
					<view>
						<u-image :src="detail.user.avatar" width="42" height="42" shape="circle"></u-image>
					</view>
					<view>
						<text class="nickname">{{detail.user.nickname}}</text>
						<text class="date-time">{{detail.createtime || '-'}}</text>
					</view>
				</view>
				<view class="city">{{detail.city || '-'}}</view>
			</view>
			<view class="image">
				<u-image v-if="detail.image" :src="detail.image" width="300" height="200" @click="preview">
				</u-image>
			</view>
			<view class="article">
				{{detail.content}}
			</view>
		</view>
		<u-gap height="46"></u-gap>
		<view class="recommend" v-if="isShowComment">相关推荐</view>
		<u-gap height="40"></u-gap>
		<!-- 内容下部分 -->
		<view class="container-bottom" v-if="isShowComment">
			<view v-for="(item4,index4) in commentList" @click="goDetails(item4.id)" :key="index4" class="information-require">
				<!-- 第一行 标签 标题 按城市-->
				<view class="first-line-other">
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
					<view class="date-other">{{item4.createtime || '-'}}</view>
				</view>
			</view>
			<u-gap height="20"></u-gap>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}, // 详情页数据
				commentList: [], // 相关推荐列表
				isShowComment: false, // 是否展示相关推荐，（我的供求不需要展示）
			}
		},
		onLoad(opt) {
			console.log(opt,'详情页')
			let arr = opt.arr?JSON.parse(opt.arr):[];
			this.isShowComment = arr.length > 1;
			console.log('展示推荐',this.isShowComment)
			if(this.isShowComment===true) {
				this.commentList = arr.slice(0,3);
			}	
			console.log('推荐',this.commentList);
			this.detailInfo(opt.id);
		},
		methods: {
			/**
			 * @desc 预览图片
			 * @param
			 **/
			preview() {
				uni.previewImage({
					current: this.detail.image,
					urls: [this.detail.image],
				});
			},
			/**
			 * @desc 获取详情页数据
			 * @param
			 **/
			 detailInfo(id) {
				 this.$request({
					 url: "/api/supply/detail?id="+id,
					 method: "GET",
					 success: res => {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 console.log(res,'详情页数据');
						 this.detail = res.data;
					 }
				 })
			 },
			/**
			 * @desc 跳转到相关推荐的详情页
			 * @param
			 **/
			goDetails(id) {
				console.log(id,'详情的详情')
				uni.navigateTo({
					url: '/pages/require/details/index?id='+id
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.details {
		background: $uni-bg-color-grey;
		min-height: 100vh;
		.container-top {
			margin: 0 30rpx;
			padding: 35rpx 24rpx;
			background-color: $uni-text-color-inverse;
			border-radius: 20rpx;
			.title {
				font-size: 30rpx;
				font-weight: bold;
				margin-bottom: 32rpx;
			}
			.user {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				border-top: 2rpx solid $uni-bg-color-grey;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				margin-bottom: 20rpx;
				.use-info {
					display: flex;
					.nickname {
						margin-left: 15rpx;
						margin-right: 15rpx;
					}
					.nickname, .date-time {
						font-size: 20rpx;
						color: $uni-text-color-grey;
					}
				}
				.city {
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
			.article {
				font-size: 24rpx;
				color: #828282;
				line-height: 2em;
			}
		}
		.recommend {
				margin-left: 30rpx;
				font-size: 32rpx;
				font-weight: bold;
		}
		.container-bottom {
			margin: 0 30rpx;
			.information-require {
				border-radius: 20rpx;
				// height: 220rpx;
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
		}
	}
</style>
