<template>
	<!-- 商家页 -->
	<scroll-view class="merchant">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303"
				bar-width="365"></u-tabs>
		</view>
		<view class="search">
			<u-form :model="form">
				<u-form-item label="搜索">
					<u-input v-model="form.searchKey" confirm-type="search" @confirm="search"/>
				</u-form-item>
			</u-form>
		</view>
		<u-gap height="20"></u-gap>
		<view class="nav-and-list">
			<!-- 左侧为导航 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="left-nav-bar">
				<ul>
					<li v-for="(item,index) in categoryList" :class="activeItem===index+1?'list':'white-list'" class="ellipsis"
						@click="switchTab(index,item.id)" :key="item.id">{{item.name}}</li>
				</ul>
			</scroll-view>
			<!-- 右侧为列表 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltolower="scrolltolower" class="right-list-bar">
				<!-- 最外层大盒子 Start-->
				<view @click="goToStore(_item.id)" class="information-block" v-for="(_item,_index) in informations" :key="_index">
					<!-- 第一行 Logo 标题 按钮 -->
					<view class="first-line">
						<!-- 左侧 Logo和标题 -->
						<view class="left-block">
							<u-image :src="_item.log || '/static/user-center-images/avatar.png'" width="80rpx" height="80rpx" shape="circle"></u-image>
							<view class="title-and-text">
								<view class="title ellipsis">{{_item.store_name || '-'}}</view>
								<view class="text ellipsis">{{_item.information || '-'}}</view>
							</view>
						</view>
						<view class="right-block">
							<u-button type="error" class="btn-style" size="mini" :plain="true" :ripple="true"
								ripple-bg-color="#dd524d" @click="goToStore(_item.id)">进店</u-button>
						</view>
					</view>
					<!-- 第二行 图片组 -->
					<view class="second-line">
						<u-image v-for="(sitem,sindex) in _item.goods" :key="sindex" class="image-list"
							:src="sitem.image || '-'" width="110rpx" height="67rpx"></u-image>
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
				firstComeId: 0, // 第一次进入页面传的id
				scrollTop: 0, // 距离顶部多少时设置滚动条
				informations: [], // 商家信息
				type: 'text',
				form: {
					searchKey: ''
				},
				categoryList: [], // 分类列表
				activeItem: 1, // 当前激活的色块item.id
				currentTab: 0, // 当前tab的索引 0 厂商，1 经销商
				id: 1, // 选择的分类数据 配件的id为1默认
				tabList: [{
						name: "厂商"
					},
					{
						name: "经销商"
					}
				],
			}
		},
		onHide() {
			delete this.$store.state.pageIndex;
			
			console.log('监听页面隐藏')
		},
		onShow() {
			const val = this.$store.state.pageIndex;
			if(typeof val !== "undefined") {
				console.log('不是Undefined')
				uni.clearStorageSync("tabBarData")
				uni.clearStorageSync("tabBarIndex")
				this.currentTab = val;
				this.activeItem = 1;
			}
			let data = uni.getStorageSync("tabBarData");
			if(Object.keys(data).length > 0) {
				this.activeItem = data.activeItem;
				this.id = data.id;
			}
			let index = uni.getStorageSync("tabBarIndex");
			if(!!index) {
				this.currentTab = index;
			}			
			this.getCategory(); // 获取分类
			this.getStoreList(); // 获取商家列表
			uni.clearStorageSync("tabBarData")
			uni.clearStorageSync("tabBarIndex")
		},
		methods: {
			/**
			 * @desc 获取分类
			 * @param
			 **/
			 getCategory() {
				 this.$request({
					 url: "/api/category/getList",
					 method: "POST",
					 data: {
						 type: this.currentTab
					 },
					 success: res => {
						 if(res.code===0) {
						 	 uni.showToast({
						 		 icon: "none",
						 		 title: res.msg,
						 		 duration: 3000
						 	 })
						 	 return false;
						 }
						 this.categoryList = res.data;
						 console.log('八八',res.data)
						 // this.id = res.data[0].id;
						 this.firstComeId = res.data[0].id; // 第一次进入页面请求的Id
						 //console.log(this.categoryList,'分类列表')
						 this.getStoreList();
					 }
				 })
			 },
			/**
			 * @desc 获取商家列表
			 * @param
			 **/
			getStoreList() {
				this.$request({
					url: "/api/category/index",
					method: "POST",
					data: {
						id: this.id,
						keyword: this.form.searchKey
					},
					success: res=> {
						if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 return false;
						}
						console.log(res.data,'商家列表')
						this.informations = res.data;
					}
				})
			},
			/**
			 * @desc 输入框搜索事件
			 * @param
			 **/
			search() {
				// 点搜索后调用页面接口
				this.getStoreList();
			},
			/**
			 * @desc 切换顶部选项卡
			 * @param {number}
			 **/
			change(index) {
				this.activeItem = 1;
				this.form.searchKey = '';
				this.currentTab = index;
				this.getCategory();
				this.getStoreList();
				uni.setStorageSync("tabBarIndex", index);
			},
			/**
			 * @desc 左侧导航切换
			 * @param {number}
			 **/
			switchTab(index,id) {
				console.log('index',index,'id',id)
				this.form.searchKey = '';
				this.activeItem = index+1; // 当前激活的分类
				this.id = id; // 通过id查询改分类下的商铺
				console.log('id是几何',this.id)
				this.getStoreList();
				let tabData = {
					activeItem: this.activeItem,
					id: this.id
				}
				uni.setStorageSync("tabBarData", tabData);
			},
			/**
			 * @desc 右侧列表滚动条触底事件
			 * @param {Object}
			 **/
			scrolltolower(e) {
				console.log("滚动到底部了",e)
			},
			/**
			 * @desc 跳转到进店详情页
			 * @param
			 **/
			goToStore(id) {
				uni.navigateTo({
					url: '/pages/merchants/merchant-into-store/index?id=' + id
				});
			},
		}
	}
</script>

<style lang="scss">
	.merchant {
		background-color: $uni-bg-color-grey;
		height: 100vh;
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
		height: 100vh;
		.left-nav-bar {
			width: 30%;
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
					border-top: 2rpx solid $uni-bg-color-grey;
				}
				.list:last-child, .white-list:last-child {
					border-bottom: 2rpx solid $uni-bg-color-grey;
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
			width: 70%;
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

					.image-list {
						display: inline-block;
						border: 2rpx solid #E5E5E5;
					}
				}
			}
		}
	}
</style>
