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
		<view style="background: #fff">
				<u-dropdown active-color="#CA0303" ref="uDropdown" height="60">
					<!--  v-model="provinceCode"  :options="provinceCodeList"-->
					<u-dropdown-item v-model="provinceCode"  :options="provinceCodeList" :title="provinceName ||'省份'" @change="provinceChange">
					</u-dropdown-item>

					<u-dropdown-item v-model="cityCode" :title="cityName || '城市'" :options="cityCodeList" @change="cityChange"></u-dropdown-item>
					<u-dropdown-item v-model="countyCode" :title="countyName || '区县'" :options="countyCodeList" @change="countyChange"></u-dropdown-item>
				</u-dropdown>
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
			<scroll-view v-if="informations&&informations.length>0" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="scrolltolower" class="right-list-bar">
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
			<Empty v-else class="empty"></Empty>
		</view>
	</scroll-view>
</template>

<script>
	import Empty from '../../components/empty.vue'
	export default {
		components: {
			Empty
		},
		data() {
			return {
				provinceName: '', // 省名
				cityName: '', // 市名
				countyName: '', // 区名
				scrollTop: 0, // 距离顶部多少时设置滚动条
				informations: [], // 商家信息
				type: 'text',
				form: {
					searchKey: ''
				},
				categoryList: [], // 分类列表
				activeItem: 1, // 当前激活的色块item.id
				currentTab: 0, // 当前tab的索引 0 厂商，1 经销商
				id: 0, // 选择的分类数据 配件的id为1默认
				activeId: 0,
				activeId_2: 0,
				provinceCodeList: [], // 省列表
				provinceCode: 0, // 要查询的省代码
				cityCodeList: [], // 市列表
				cityCode: 0, // 要查询的市代码
				countyCodeList: [], // 区列表
				countyCode: 0, // 要查询的区代码
				data: {}, // 选好的省份对象，用于继续拼接城市数据
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
			console.log("监听页面show")
			const val = this.$store.state.pageIndex;
			this.activeId = this.$store.state.activeId; // 初始化app时获取的厂家第一个商店id
			this.activeId_2 = this.$store.state.activeId_2; // 初始化app时获取的经销商商店id
			this.id = this.currentTab === 0 ? this.activeId : this.activeId_2;
			if(typeof val !== "undefined") {
				// 如果是从首页跳转过来就会进入该判断语句内
				console.log('不是Undefined')
				uni.removeStorageSync('tabBarData');
				uni.removeStorageSync('tabBarIndex');
				this.currentTab = val;
				this.activeItem = 1;
				this.id = this.currentTab === 0 ? this.activeId : this.activeId_2;
				this.form.searchKey = '';
				this.provinceName = '';
				this.provinceCode = 0;
				this.cityName = '';
				this.cityCode = 0;
				this.countyName = '';
				this.countyCode = 0;
			}
			// 如果点击过 顶部导航tab或左侧导航tab会进入此判断 Start
			const data = uni.getStorageSync("tabBarData");
			if(Object.keys(data).length > 0) {
				this.activeItem = data.activeItem;
				this.id = data.id;
			}
			const index = uni.getStorageSync("tabBarIndex");
			if(!!index) {
				this.currentTab = index;
			}			
			const obj = uni.getStorageSync("tabBarData")
			if(!!obj) {
				this.id = obj.id;
			}
			// 如果点击过 顶部导航tab或左侧导航tab会进入此判断 End
			this.getCategory(); // 获取分类
			this.getStoreList(this.provinceCode,this.cityCode,this.countyCode); // 获取商家列表
			console.log('onshow的时候5')
		},
		onLoad() {
			console.log("监听页面load")
			// 获取省市区数据
			this.getAreaData();
		},
		methods: {
			/**
			 * @desc 选中某个省份以后 获取城市数据
			 * @param
			 **/
			provinceChange(val) {
				console.log('点击', val)
				this.provinceCodeList.forEach((item) => {
					if(item.value === val) {
						this.provinceName = item.label;
					}
				})
				console.log('省名', this.provinceName)
				this.provinceCode = val;
				this.getStoreList(val);
				this.data = { province: val };
				if(val) this.getAreaData(this.data);
				this.countyCodeList = [];
			},
			// 选中某个城市以后 获取某个区县数据
			cityChange(val) {
				this.cityCodeList.forEach((item) => {
					if(item.value === val) {
						this.cityName = item.label;
					}
				})
				this.cityCode = val;
				this.getStoreList(this.provinceCode,val);
				this.data.city = val;
				if(val) this.getAreaData(this.data,'city');
			},
			// 给区县数据赋值
			countyChange(val) {
				this.countyCodeList.forEach((item) => {
					if(item.value === val) {
						this.countyName = item.label;
					}
				})
				this.countyCode = val;
				this.getStoreList(this.provinceCode,this.cityCode,val);
			},
			/**
			 * @desc 获取省数据
			 * @param
			 **/
			getAreaData(code, flag) {
				let req = {
					url: "/api/store/area",
					// data: {province:220},
					success: res => {
						if(res.code != 1) {
							uni.showToast({
								icon: "none",
								title: res.msg,
							})
							return false;
						}
						if(!code)
							this.provinceCodeList = JSON.parse(JSON.stringify(res.data).replace(/name/g, "label"));
						if(code&&flag!=='city')
						  this.cityCodeList = JSON.parse(JSON.stringify(res.data).replace(/name/g, "label"));
						if(code&&flag==='city')
							this.countyCodeList = JSON.parse(JSON.stringify(res.data).replace(/name/g, "label"));
					}
				}
				if(code) req.data = code
				this.$request(req);
			},
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
					 }
				 })
			 },
			/**
			 * @desc 获取商家列表
			 * @param
			 **/
			getStoreList(province, city, county) {
				this.$request({
					url: "/api/category/index",
					method: "POST",
					data: {
						type: this.currentTab,
						id: this.id,
						keyword: this.form.searchKey,
						province_id: province ? province : '',
						city_id: city ? city : '',
						area_id: county ? county : '',
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
				const province = this.provinceCode;
				const city = this.cityCode;
				const county = this.countyCode;
				this.getStoreList(province, city, county);
				console.log('搜索2')
			},
			/**
			 * @desc 切换顶部选项卡
			 * @param {number}
			 **/
			change(index) {
				this.activeItem = 1;
				this.id = index === 0 ? this.activeId : this.activeId_2;
				let tabData = {
					activeItem: this.activeItem,
					id: this.id
				}
				uni.setStorageSync("tabBarData", tabData);
				this.form.searchKey = '';
				this.currentTab = index;
				this.getCategory();
				this.getStoreList();
				console.log('切换顶部3')
				uni.setStorageSync("tabBarIndex", index);
				this.clearArea();
				this.provinceName = '';
				this.cityName = '';
				this.countyName = '';
			},
			clearArea() {
				this.provinceCodeList = [];
				this.provinceCode = 0;
				this.cityCodeList = [];
				this.cityCode = 0;
				this.countyCodeList = [];
				this.countyCode = 0;
				this.getAreaData();
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
				console.log('切换左侧4')
				let tabData = {
					activeItem: this.activeItem,
					id: this.id
				}
				uni.setStorageSync("tabBarData", tabData);
				this.clearArea();
				this.provinceName = '';
				this.cityName = '';
				this.countyName = '';
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
	// 省市区选择器 滚动条显示
	::v-deep .u-dropdown-item {
		.u-dropdown-item__options {
			height: 520rpx;
			overflow-y: visible;
		}
	}

</style>
<style lang="scss" scoped>
	.empty {
		width: 70%;
	}
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
					border-right: 2rpx solid $uni-bg-color-grey;
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
