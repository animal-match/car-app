<template>
	<!-- 商家-进店详情页 -->
	<view class="merchant-into-store">
		<!-- 上半部分 -->
		<view class="top-container">
			<u-image src="http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png" height="320rpx" shape="square" border-radius="20rpx"></u-image>
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
					<u-button type="error" shape="circle" size="default" @click="toMySupply">我的供求信息</u-button>
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
			<text v-if="!!isvip" class="address ellipsis">地址：成都市金牛区二环路北二段199号</text>
			<text v-else class="address ellipsis">地址：*************</text>
			<u-button v-if="showMessageButton" type="error" size="mini" @click="sendMessage">留言</u-button>
			<u-button class="btn-position" type="error" size="mini" @click="showAddress(104.05293,30.69015,'四川省成都市金牛区碧山路2688号')">
				<!-- <u-image src="/static/user-center-images/navigator.png"></u-image> -->
				<u-icon color="#FFF" size="30" name="map-fill"></u-icon>导航
			</u-button>
			<u-image src="/static/user-center-images/call.png" width="21" height="25" @click="showPhone"></u-image>
		</view>
		<u-gap height="20" bg-color="#F8F8F8"></u-gap>
		<!-- 底部部分 产品图 -->
		<view class="production">产品</view>
		<view class="bottom-container">
			<view v-for="(_item,_index) in productText" :key="index" class="image-box">
				<view style="display: flex; flex-direction: column;">
					<u-image class="production-iamges" :src="_item.url" width="210" height="190"></u-image>
					<text class="production-text ellipsis">{{_item.text}}</text>
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
				productText: [
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:1},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:2},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:3},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:4},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:5},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:6},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:7},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:8},
					{text: '一级产品，品质优良，值得信奈！！！',url: 'http://cdnfile.op110.com.cn/files/895/image/20170801/%E9%A3%9E%E6%9C%BA4_1501553952047.png',id:9},
				],
				showMessageButton: false, // 显示留言按钮
				addressShow: false, // 显示地址弹窗
				phoneNoShow: false, // 显示电话号码弹窗
				phoneTips: '商家查看经销商电话需成为会员',
				adressTips: '非会员查看地址电话需支付120元费用',
				isvip: false, // 是否是会员
			}
		},
		onLoad(opt) {
			const idValue = opt.id;
			this.storeInfo(idValue);		
		},
		onShow() {
			 this.isvip = uni.getStorageSync("isVip") // 判断用户是否为会员
			 if(!!this.isvip) this.showMessageButton = true;
		},
		methods: {
			/**
			 * @desc 商家详情数据
			 * @param 
			 **/
			storeInfo(idValue) {
				this.$request({
					url: "/api/store/detail",
					method: "POST",
					data:{
						user_id: idValue
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
					}
				})
			},
			/**
			 * @desc 获取地址手机号
			 * @param 
			 **/
			 getDetailInfo() {
				 this.$request({
					 url: "/api/store/getAddress",
					 method: "POST",
					 success: res => {
						 if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 return false;
						 }
						 console.log('查询成功手机地址',res.data);
					 }
				 })
			 },
			// /api/store/getAddress
			/**
			 * @desc 展示经销商电话
			 * @param 
			 **/
			showPhone() {
				if(!!this.isvip) {
					// 如果是会员，必须留言超过三条并且都被回复，就可以显示打电话功能
					uni.makePhoneCall({
						phoneNumber: '15828292076',
						success: res => {
							console.log('打电话')
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
			showAddress(longi,lati,address) {
				// 如果是会员，必须留言超过三条并且都被回复，就可以显示导航功能
				if(!!this.isvip) {
					let latitude = Number(lati);
					let longitude = Number(longi);
					// 获取定位信息
					uni.getLocation({
						type: 'wgs84', //返回可以用于uni.openLocation的经纬度
						// 用户允许获取定位的时候
						success: function(res) {
							console.log('用户当前位置的经纬度',res);
							if(res.errMsg==='getLocation:ok') {
								uni.openLocation({
									latitude: latitude,
									longitude: longitude,
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
				  uni.navigateTo({
				  	url: 'sendMessage'
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
			}
		}
	}
</style>
