<template>
	<!-- 供求信息组件 -->
	<view class="my-supply">
		<view class="container">
			<u-gap height="26"></u-gap>
			<!-- tab切换 -->
			<view class="switch-tab">
				<view v-for="(item, index) in buttons" :key="index" :class="activeItem===index+1?'active-btn':'default-btn'" @click="switchTab(item.id)">{{item.name}}</view>
			</view> 
			
			<u-gap height="26"></u-gap>
			
			<!-- 循环结构 主体内容-->
			<view v-for="(_item,_index) in infos" :key="_index" class="information-require" @click="goDetails(_item.id)">
				<!-- 第一行 标签 标题 按城市-->
				<view class="first-line-other">
					<!-- 左侧 标签和标题 -->
					<view class="left-block-other" >
						<u-tag :text="activeItem===1?'供应':'求购'" mode="dark" :type="activeItem===1?'primary':'error'"/>
						<view class="title-other ellipsis">
							<view class="title ellipsis">{{_item.title || '-'}}</view>
						</view>
					</view>
					<view class="right-block">
						{{_item.city || '-'}}
					</view>
				</view>
				<!-- 第二行 描述 -->
				<view class="second-line-other multi-ellipsis">
					{{_item.content || '-'}}
				</view>
				<!-- 第三行 头像 昵称 时间 -->
				<view class="third-line-other">
					<!-- 左侧 头像 昵称 -->
					<view class="left-nickname">
						<u-image :src="_item.user.avatar" width="42rpx" height="42rpx" shape="circle"></u-image>
						<view class="nickname">
							{{_item.user.nickname || '-'}}
						</view>
						<view :class="pageInfo.pageSort==='myRequireSupply'?'publish-date':'publish-date-normal'">{{_item.createtime || '-'}}</view>
					</view>
					<!-- 右侧 时间 -->
					<view class="operation-btn" v-if="pageInfo.pageSort==='myRequireSupply'">
						<u-button @click="goDetails(_item.id)" type="primary" size="mini" class="check">查看</u-button>
						<u-button type="error" size="mini" class="delete">删除</u-button>
					</view>
				</view>
			</view>
			<!-- 最外层大盒子End -->
			<u-gap height="40"></u-gap>
		</view>
		<view v-if="pageInfo.start===pageInfo.totalPages" class="nomore">---没有更多了---</view>
		<u-gap height="40"></u-gap>
	</view>
</template>
<script>
	export default {
		props: {
			infos: {
				type: Array,
				default: () => []
			},
			pageInfo: {
				type: Object,
				default: () => {}
			},
		},
		name: 'require-supply',
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
				type: 'supply',
			}
		},
		methods: {
			/**
			 * @desc 切换tab标签
			 * @param {number}
			 **/
			switchTab(btnId) {
				console.log(btnId);
				if(btnId === 1) {
					this.activeItem = 1;
					this.$emit('refresh-page', 'supply')
				}else {
					this.activeItem = 2;
					this.$emit('refresh-page', 'demand')
				}
			},
			/**
			 * @desc 跳转供求详情页
			 * @param {Number}
			 **/
			goDetails(id) {
				console.log('详情页',id)
				let arr;
				if(this.pageInfo.pageSort==='requireSupply') {
					  arr = this.infos.slice(0,2)
				} else {
					  arr=[];
				}
				uni.navigateTo({
					url: '/pages/require/details/index?id=' + id +'&arr='+JSON.stringify(arr)
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
	.nomore {
		font-size:28rpx;
		color: $uni-text-color-grey;
		text-align: center;
	}
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
				position: relative;
				.left-nickname {
					display: flex;
					align-items: center;
					.nickname, .publish-date {
						display: inline-block;
						color: $uni-text-color-grey;
						font-size: 20rpx;
						margin-left: 20rpx;
					}
					.publish-date {
						margin-left: 26rpx;
					}
					.publish-date-normal {
						position: absolute;
						right: 0rpx;
						font-size: 20rpx;
						color: $uni-text-color-grey;
					}
				}
				.operation-btn {
					display: flex;
					.check {
						margin-right: 10rpx;
					}
				}
			}
			.right-block {
				color: $uni-text-color-grey;
			}
		}
	}
</style>