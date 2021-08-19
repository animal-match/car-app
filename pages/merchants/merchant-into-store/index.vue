<template>
	<!-- 商家-进店详情页 -->
	<view class="merchant-into-store">
		<!-- 上半部分 -->
		<view class="top-container">
			<u-image :src="storeInformation.image" height="320rpx" shape="square" border-radius="20rpx"></u-image>
			<view class="name-tags-button">
				<!-- 左侧 厂家名称和标签 -->
				<view class="name-and-tags">
					<view style="display: flex;">
						<view class="merchant-name ellipsis">{{storeInformation.store_name || '-'}}</view>
						<u-icon size="40" :name="iconName" class="yellow" @click="collecting"></u-icon>
					</view>
					<view class="tags">
						<text class="tag-name" v-for="(item,index) in goodsTags" :key="index">{{item}}</text>
					</view>
				</view>
				<!-- 右侧 按钮 -->
				<view>
					<u-button type="error" shape="circle" size="default" @click="toMySupply">我的供求信息</u-button>
				</view>
			</view>
			<view class="informations">
				<u-tag text="介绍" type="error" mode="dark" class="intro"/>
				<text>{{storeInformation.information || '-'}}</text>
			</view>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 中间部分 联系电话 定位 -->
		<view class="center-container">
			<u-image src="/static/user-center-images/addr.png" width="23" height="36"></u-image>
			<text v-if="!!isvip || userLoginId==idValue || store.address.length>0" class="address ellipsis">地址：{{store.address || '*************'}}</text>
			<text v-else class="address ellipsis">地址：*************</text>
			<u-button v-if="storeInformation.type===1" type="error" size="mini" @click="sendMessage">留言</u-button>
			<u-button class="btn-position" type="error" size="mini" @click="showAddress(store.longitude,store.latitude,store.address)">
				<!-- <u-image src="/static/user-center-images/navigator.png"></u-image> -->
				<u-icon color="#FFF" size="30" name="map-fill"></u-icon>导航
			</u-button>
			<u-image src="/static/user-center-images/call.png" width="21" height="25" @click="showPhone(store.phoneNo)"></u-image>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 底部部分 产品图 -->
		<view class="production">产品</view>
		<view class="bottom-container">
			<view v-for="(_item,_index) in productions" class="image-box" v-show="!!_item.image">
				<view style="display: flex; flex-direction: column;" :key="_index">
					<u-image class="production-iamges" :src="_item.image" width="210" height="190"></u-image>
					<text class="production-text ellipsis">{{_item.title}}</text>
				</view>
			</view>
			<view v-for="(_item,_index) in productions" class="image-box" v-show="!!_item.video">
				<view style="display: flex; flex-direction: column; width: 310rpx;" :key="_index">
					<video :src="_item.video" class="video"></video>
					<text class="production-text ellipsis">{{_item.title}}</text>
				</view>
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
				storeType: 0, // 商家类型：0 厂家 1经销商
				isCollection: 0, // 0未收藏 1已收藏
				iconName: 'star', // star为空心 star-fill为实心
				starStatus: false, // 收藏的激活状态
				addressShow: false, // 显示地址弹窗
				phoneNoShow: false, // 显示电话号码弹窗
				phoneTips: '非会员查看地址电话需支付120元费用',
				adressTips: '非会员查看地址电话需支付120元费用',
				isvip: false, // 是否是会员
				idValue: '', // 商家id
				userLoginId: '', // 用户登录的id
				goodsTags: [], // 标签
				productions: [], // 产品
				storeInformation: {} ,// 商家详情数据
				store: { // 商家手机地址
					longitude: '',
					latitude: '',
					phoneNo: '',
					address: '',
				},
			}
		},
		onLoad(opt) {
			this.idValue = opt.id;
			this.storeInfo(opt.id);	
			this.getPhoneAddr();
		},
		onShow() {
			 this.userLoginId = this.$store.state.user.userId; // 用户登录id
			 console.log('用户登录id',this.userLoginId,typeof this.userLoginId)
			 this.isvip = uni.getStorageSync("isVip") // 判断用户是否为会员
		},
		methods: {
			/**
			 * @desc 收藏店铺点击事件
			 * @param 
			 **/
			collecting() {
				this.starStatus = !this.starStatus; // 切换收藏状态
				if(this.starStatus===true) {
					this.iconName = 'star-fill';
					this.collectStore(); // 收藏
				}else{
					this.iconName = 'star';
					this.collectStore(); // 取消收藏
				}
			},
			/**
			 * @desc 收藏店铺接口
			 * @param 
			 **/
			 collectStore() {
				 this.$request({
					 url: this.starStatus===true ? "/api/likes/add" : "/api/likes/delete",
					 method: "POST",
					 data: {store_id : this.idValue},
					 success: res => {
						 if(res.code!=1) {
							 uni.showToast({
							 	icon: "none",
								title: res.msg
							 })
							 return false;
						 }
						 uni.showToast({
						 	icon: this.starStatus===true?"success":"none",
						 	title: this.starStatus===true?"收藏店铺成功":"已取消收藏"
						 })
					 }
				 })
			 },
			/**
			 * @desc 获取商家手机地址
			 * @param 
			 **/
			async getPhoneAddr() {
				await this.$request({
					url: "/api/store/getAddress",
					method: "POST",
					data: {
						store_id: this.idValue
					},
					success: res => {
						if(res.code===0) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								duration: 3000
							})
							return false
						}
						console.log('手机',res.data)
						this.store.phoneNo = res.data.phone;
						this.store.address = res.data.address;
						this.store.longitude = res.data.long;
						this.store.latitude = res.data.lat;
						return 'success';
					}
				})
			},
			/**
			 * @desc 商家详情数据
			 * @param {Number}
			 **/
			storeInfo(idValue) {
				this.$request({
					url: "/api/store/detail",
					method: "POST",
					data:{
						store_id: idValue
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
						console.log('详情',res.data);
						this.goodsTags = res.data.category; // array 商品标签
						this.productions = res.data.goods; // array 产品
						this.storeInformation = res.data; // Object 详情数据
						this.storeType = res.data.type; // 商家类型：0 厂家 1经销商
						this.isCollection = res.data.is_likes; // 是否收藏该店
						if(this.isCollection===1) {
							this.starStatus = true;
							this.iconName = 'star-fill';
						}else {
							this.iconName = 'star';
							this.starStatus = false;
						}
					}
				})
			},
			// /api/store/getAddress
			/**
			 * @desc 展示经销商电话
			 * @param 
			 **/
			showPhone(phoneNo) {
				this.getPhoneAddr();
				if(!!this.isvip || this.userLoginId==this.idValue) {
					// 如果是会员，必须留言超过三条并且都被回复，就可以显示打电话功能 （商家自己也能看到自己的电话）
				  uni.makePhoneCall({
				  	phoneNumber: phoneNo,
				  	success: res => {
				  	}
				  })
				}else{
					// 否则打开去升级弹窗
					this.phoneNoShow = true;
				}
			},
			/**
			 * @desc 展示定位地址
			 * @param 
			 **/
			showAddress(longitude,latitude,address) {
				this.getPhoneAddr();
				// 如果是会员，必须留言超过三条并且都被回复，就可以显示导航功能 (商家自己也能看到自己的定位)
				if(!!this.isvip || this.userLoginId==this.idValue) {
					// 获取定位信息
					uni.getLocation({
						type: 'wgs84', //返回可以用于uni.openLocation的经纬度
						// 用户允许获取定位的时候
						success: function(res) {
							console.log('商家位置的经纬度',res);
							if(res.errMsg==='getLocation:ok') {
								uni.openLocation({
									latitude: Number(latitude),
									longitude: Number(longitude),
									address: address,
									scale: 18,
									success:function() {
										console.log('定位成功')
									}
								})
							}
						},
						// 用户拒绝获取定位后 再次点击触发
						fail: function(res) {
							if(res.errMsg==='getLocation:fail auth deny') {
								uni.showModal({
									content: '检测到您没打开获取信息功能权限，是否去设置打开？',
									confirmText: '确认',
									cancelText: '取消',
									success: (res) => {
										if(res.confirm) {
											uni.openSetting({
												success: res => {
													
												}
											})
										} else {
											return false;
										}
									}
								})
							}
						}
					})
				}else{
					// 如果不是会员，就打开去升级弹窗
					this.addressShow = true;
				}			
			},
			/**
			 * @desc 点击 去升级按钮
			 * @param 
			 **/
			upDate() {
				console.log('跳转支付页面')
				uni.navigateTo({
					url: '../payment/index'
				})
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
			 /**
			  * @desc 跳转到我的供求信息
			  * @param 
			  **/
			 toMySupply() {
				 uni.navigateTo({
				 	url: '/pages/me/my-supply-info/index'
				 })
			 },
			 /**
			  * @desc 跳转到留言列表
			  * @param 
			  **/
			 sendMessage() {
				 // idValue 店铺id, storeType 商家类型
				  uni.navigateTo({
				  	url: 'sendMessage?id='+this.idValue+'&type='+this.storeType
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
						max-width: 350rpx;
						font-size: 30rpx;
						font-weight: bolder;
						margin-right: 20rpx;
					}
					.yellow {
						color: $uni-color-warning;
					}

					.tags {
						margin-top: 20rpx;
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
			.btn-position {
				margin: 0 25rpx 0 15rpx;
			}
			.address {
				display: inline-block;
				color: $uni-text-color-grey;
				margin-left: 22rpx;
				font-size: 24rpx;
				width: 400rpx;
			}
			.u-btn {
				margin-right: 20rpx;
			}
		}
		// 底部部分
		.production {
			padding: 25rpx 0rpx 25rpx 30rpx;
			border-bottom: 2rpx solid $uni-bg-color-grey;
			font-size: 30rpx;
			font-weight: bolder;
			margin-bottom: 0 0 20rpx 20rpx;
		}
		.bottom-container {
			margin: 30rpx 46rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			
			.image-box {
				.production-iamges {
					display: inline-block;
					margin-bottom: 10rpx;
					margin-right: 10rpx;
				}
				.production-text {
					display: inline-block;
					width: 210rpx;
					font-size: 24rpx;
					margin-bottom: 15rpx;
					color: $uni-text-color-grey;
				}
				.video {
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
	}
</style>
