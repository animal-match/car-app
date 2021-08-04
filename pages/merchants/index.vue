<template>
	<scroll-view class="merchant">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303"
				bar-width="365"></u-tabs>
		</view>
		<view class="search">
			<u-form :model="form">
				<u-form-item label="搜索">
					<u-input v-model="form.searchKey" />
				</u-form-item>
			</u-form>
		</view>
		<u-gap height="20"></u-gap>
		<view class="nav-and-list">
			<!-- 左侧为导航 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="left-nav-bar">
				<ul>
					<li class="list" v-for="(item,index) in navList" :class="activeItem===index+1?'list':'white-list'"
						@click="switchTab(item.id)" :key="item.id">{{item.name}}</li>
				</ul>
			</scroll-view>
			<!-- 右侧为列表 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower="scrolltolower" class="right-list-bar">
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
							<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true"
								ripple-bg-color="#dd524d">进店</u-button>
						</view>
					</view>
					<!-- 第二行 图片组 -->
					<view class="second-line">
						<u-image v-for="(sitem,sindex) in _item.imageList" :key="sindex" class="image-list"
							:src="sitem.img" width="110rpx" height="67rpx"></u-image>
					</view>
				</view>
			</scroll-view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0, // 距离顶部多少时设置滚动条
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
					}, {
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
				searchValue: '', // 搜索条件
				type: 'text',
				form: {
					searchKey: ''
				},
				activeItem: 1, // 当前激活的色块item.id
				navList: [{
						id: 1,
						name: '解锁'
					},
					{
						id: 2,
						name: '省份'
					},
					{
						id: 3,
						name: '承诺'
					},
					{
						id: 4,
						name: '形容'
					},
					{
						id: 5,
						name: '解锁'
					},
					{
						id: 6,
						name: '省份'
					},
					{
						id: 7,
						name: '承诺'
					},
					{
						id: 8,
						name: '形容'
					},
					{
						id: 9,
						name: '解锁'
					},
					{
						id: 10,
						name: '省份'
					},
					{
						id: 11,
						name: '承诺'
					},
					{
						id: 12,
						name: '形容'
					},
					{
						id: 13,
						name: '解锁'
					},
					{
						id: 14,
						name: '省份'
					},
					{
						id: 15,
						name: '承诺'
					},
					{
						id: 16,
						name: '形容'
					}
				],
				currentTab: 0, // 当前tab的索引
				tabList: [{
						name: "厂商"
					},
					{
						name: "经销商"
					}
				],

			}
		},
		methods: {
			/**
			 * @desc 切换选项卡
			 * @param {number}
			 **/
			change(index) {
				this.currentTab = index;
			},

			switchTab(btnId) {
				console.log(btnId);
				this.activeItem = btnId;
			},
			
			scrolltolower(e) {
				console.log("滚动到底部了",e)
			}
		}
	}
</script>

<style lang="scss">
	.merchant {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.switch-table,
	.search {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.search {
		top: 80rpx;
		background-color: $uni-text-color-inverse;
		height: 140rpx;
		padding: 0 30rpx;
	}

	.nav-and-list {
		display: flex;

		.left-nav-bar {
			width: 30%;
			// 左侧菜单高度
			height: 1055rpx;
			overflow-y: auto;
			background-color: $uni-text-color-inverse;

			ul {
				list-style: none;
				padding: 0;

				.list,
				.white-list {
					height: 82rpx;
					line-height: 82rpx;
					text-align: center;
					border-bottom-right-radius: 20rpx;
				}

				.list {
					background-color: $uni-baseColor;
					color: $uni-text-color-inverse;
				}

				.white-list {
					background-color: $uni-text-color-inverse;
					color: $uni-text-color;
				}
			}
		}

		.right-list-bar {
			// 每一个盒子
			width: 70%;
			// 右侧列表高度
			height: 1055rpx;
			overflow-y: auto;

			.information-block {
				border-radius: 20rpx;
				margin: 0 30rpx 20rpx 15rpx;
				padding: 28rpx 15rpx;
				background-color: $uni-text-color-inverse;

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
							width: 260rpx;
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
	}
</style>
