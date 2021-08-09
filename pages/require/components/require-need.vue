<template>
	<!-- 供求组件 -->
	<view class="my-supply">
		<view class="container">
			<u-gap height="26"></u-gap>
			<!-- tab切换 -->
			<view class="switch-tab">
				<view v-for="(item, index) in buttons" :key="index" :class="activeItem===index+1?'active-btn':'default-btn'" @click="switchTab(item.id)">{{item.name}}</view>
			</view> 
			
			<u-gap height="26"></u-gap>
			
			<!-- 循环结构 主体内容-->
			<view v-for="(_item,_index) in infos" :key="_index" class="information-require" @click="goDetails">
				<!-- 第一行 标签 标题 按城市-->
				<view class="first-line-other">
					<!-- 左侧 标签和标题 -->
					<view class="left-block-other" >
						<u-tag :text="activeItem===1?'供应':'求购'" mode="dark" :type="activeItem===1?'primary':'error'"/>
						<view class="title-other ellipsis">
							<view class="title ellipsis">{{_item.title}}</view>
						</view>
					</view>
					<view class="right-block">
						{{_item.city}}
					</view>
				</view>
				<!-- 第二行 描述 -->
				<view class="second-line-other multi-ellipsis">
					{{_item.desc}}
				</view>
				<!-- 第三行 头像 昵称 时间 -->
				<view class="third-line-other">
					<!-- 左侧 头像 昵称 -->
					<view class="left-nickname">
						<u-image :src="_item.avatar" width="42rpx" height="42rpx" shape="circle"></u-image>
						<view class="nickname">
							{{_item.nickname}}
						</view>
					</view>
					<!-- 右侧 时间 -->
					<view class="publish-date">{{_item.date}}</view>
				</view>
			</view>
			<!-- 最外层大盒子End -->
			<u-gap height="20"></u-gap>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				activeItem: 1,
				buttons: [
					{
						id: 1,
						name: '供应',
					},
					{
						id: 2,
						name: '求购',
					}
				],
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
					},
					{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					},{
						title: '求购二手三轮车5辆成色上海市',
						desc: '本人诚心求购8诚心三轮车5辆，价格面议急用欢迎联系本人诚心求购辆价格面议急用欢迎联系电话号码：139987765509008879',
						city: '上海市',
						nickname: '小可爱',
						date: '2021/09/28',
						avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi4%2FTB2yhlYDeSSBuNjy0FlXXbBpVXa_%21%210-mtopupload.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630310660&t=abdac5c377af829bf5065a625f188963',
					}
				],
			}
		},
		methods: {
			// 切换tab标签页
			switchTab(btnId) {
				console.log(btnId);
				if(btnId === 1) {
					this.activeItem = 1;
				}else {
					this.activeItem = 2;
				}
			},
			// 跳转供求详情页
			goDetails() {
				console.log('1')
				uni.navigateTo({
					url: '/pages/require/details/index'
				})
			},
		}
	}
</script>
<style lang= "scss">
	.my-supply {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.container {
		margin: 0 30rpx;
		.switch-tab {
			display: flex;
			height: 80rpx;
			.active-btn, .default-btn{
				line-height: 80rpx;
				text-align: center;
				width: 50%;
			}
			.active-btn {
				background-color: #CA0303;
				color: $uni-text-color-inverse;
			}
			.default-btn {
				border: 2rpx solid #CA0303;
				color: $uni-text-color;
				background-color: $uni-text-color-inverse;
			}
		}
		.information-require {
			border-radius: 20rpx;
			height: 250rpx;
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
						margin-left: 20rpx;
					}
				}
				.publish-date {
						color: $uni-text-color-grey !important;
						font-size: 20rpx !important;
					}
			}
			.right-block {
				color: $uni-text-color-grey;
			}
		}
	}
</style>