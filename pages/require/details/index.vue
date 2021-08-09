<template>
	<!-- 供求详情页 -->
	<view class="details">
		<u-gap height="20"></u-gap>
		<view class="container-top">
			<view class="title">
				1.8米宽1.3米30台限时秒购质量台限时秒购质
				量台限时秒购质量
			</view>
			<view class="user">
				<view class="use-info">
					<view>
						<u-image src="https://pic1.zhimg.com/v2-3f73f9a06801f5f7405fcba09715edae_r.jpg?source=1940ef5c" width="42" height="42" shape="circle"></u-image>
					</view>
					<view>
						<text class="nickname">狗狗旺旺</text>
						<text class="date-time">2021/07/22</text>
					</view>
				</view>
				<view class="city">成都市</view>
			</view>
			<view class="article">
				本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆...
				价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系...
			</view>
		</view>
		<u-gap height="46"></u-gap>
		<view class="recommend">相关推荐</view>
		<u-gap height="40"></u-gap>
		<!-- 内容下部分 -->
		<view class="container-bottom">
			<view v-for="(item4,index4) in infos" @click="goDetails" :key="index4" class="information-require">
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
			<u-gap height="20"></u-gap>
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
			}
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
			height: 1000rpx;
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
				margin-bottom: 40rpx;
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
		}
	}
</style>
