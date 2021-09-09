<template>
	<!-- 商家入驻页 -->
	<view class="merchant-enter">
<!-- 		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303" bar-width="365"></u-tabs>
		</view> -->
		<u-gap height="20"></u-gap>
		<view class="container">
			<u-form :model="form" ref="ruleForm" label-position="top">
				<u-form-item label="请填写厂家名称" :required="true" prop="merchantName">
					<u-input v-model="form.merchantName" />
				</u-form-item>
				<u-form-item label="商家介绍" :required="true" prop="merchantIntro">
					<u-input v-model="form.merchantIntro" type="textarea" height="300" :border="border"/>
				</u-form-item>
				<!-- 地址选择按钮 -->
				<view class="district">
					<u-select v-model="showAreaList" mode="mutil-column-auto" :list="areaList" @confirm="areaConfirm"></u-select>
					<u-button @click="chooseArea" size="mini" class="choose" :ripple="true" ripple-bg-color="#CA0303">选择</u-button>
					<u-form-item label="请选择地区" :required="true" prop="area">
						<text>{{ form.area }}</text>
					</u-form-item>
				</view>
				<!-- 地区选择按钮 -->
				<view class="district">
					<u-button @click="chooseAddress" size="mini" class="choose" :ripple="true" ripple-bg-color="#CA0303">选择</u-button>
					<u-form-item label="请选择地址" :required="true" prop="address">
						<text>{{ form.address }}</text>	
					</u-form-item>
				</view>

				<view>
					<u-form-item label="请选择商家类型" :required="true">
						<u-radio-group v-model="form.storeType" @change="radioChange">
									<u-radio
									  active-color="red"
										v-for="(item, index) in RadioList" :key="index" 
										:name="item.id"
									>
										{{item.name}}
									</u-radio>
								</u-radio-group>
					</u-form-item>
					
					<u-form-item label="请选择标签" :required="true" prop="id" :border-bottom="false">
						 <u-checkbox-group @change="checkboxGroupChange">
							 <u-checkbox 
									v-model="item.checked" 
									v-for="(item, index) in tagList" :key="index" 
									:name="item.id"
									active-color="red"
									size="30"
								>
								{{item.name}}
							 </u-checkbox>
						</u-checkbox-group>
					</u-form-item>
				</view>
				
				<u-form-item label="请填写联系电话" :required="true" prop="phoneNo">
					<u-input v-model="form.phoneNo" placeholder="请填写电话号码" />
					<text style="font-size: 24rpx; color: red;" :class="alert===true?'tipsShow':'tipsHide'">手机号码格式不正确</text>
				</u-form-item>
				
			</u-form>
		</view>

		<view class="upLoad-container">
			<view class="uploader">
				<view class="title"><text class="start">*</text>上传产品</view>
				<!-- <u-upload ref="uUpload" :action="action" :auto-upload="false" :file-list="fileList" max-count="9"></u-upload> -->
				<view class="add-btn" @click="jump">
					<u-image src="/static/user-center-images/add.png" width="38" height="38"></u-image>
				</view>
			</view>
			<!-- 显示图片 -->
			<view class="fileList">
				<view class="image-box" v-for="(item,index) in imageTitle" :key="index">
					<u-image :src="item.imageShow" width="200" height="150" class="pics"></u-image>
					<view class="ellipsis text-grey">{{item.title}}</view>
				</view>
			</view>
			<!-- 显示视频 -->
			<view class="fileList2">
				<view class="video-box" v-for="($item,$index) in videoTitle" :key="$index">
					<video :src="$item.videoShow" class="video"></video>
					<view class="ellipsis text-grey">{{$item.title}}</view>
				</view>
			</view>	
			<!-- 上传商标logo -->
			<view class="upload-logo">
				<view class="layout-flex">
					<view> <text class="red">*</text>上传商标 </view>
					<view v-if="showLogoBtn">
						<u-icon class="red" size="40" name="plus-circle" @click="chooseImages('logo')"></u-icon>
					</view>
				</view>
				<view class="logo">
					<u-image v-if="logoUrl.length>0" :src="logoUrl" @click="previewImage('logo')" width="200" height="150" class="pics">
					</u-image>
					<u-image v-if="logoUrl.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delect('logo')"  class="close-btn"></u-image>
				</view>
			</view>
			<!-- 上传店铺展示图 -->
			<view class="upload-logo">
				<view class="layout-flex">
					<view> <text class="red">*</text>上传店铺封面 </view>
					<view v-if="showMajorBtn">
						<u-icon class="red" size="40" name="plus-circle" @click="chooseImages('major')"></u-icon>
					</view>
				</view>
				<view class="logo">
					<u-image v-if="majorUrl.length>0" :src="majorUrl" @click="previewImage('major')" width="200" height="150" class="pics">
					</u-image>
					<u-image v-if="majorUrl.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delect('major')"  class="close-btn"></u-image>
				</view>
			</view>
		</view>
		<u-gap height="40"></u-gap>
		<view class="submit-btn">
			<u-button @click="submit" type="error" shape="circle">提交</u-button>
		</view>
		<u-gap height="40"></u-gap>
		<!-- <u-picker mode="region" v-model="showAreaList" @confirm="areaConfirm()"></u-picker> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				alert: false, // 显示手机号格式错误提示
				areaList: [], // 省市区地区选择级联列表
				showAreaList: false, // 显示地区选择器
				logoUrl: '', // 传给服务器的Logo商标地址
				majorUrl: '', // 传给服务器的主图地址
				showLogoBtn: true, // 显示上传logo按钮
				showMajorBtn: true, // 显示主图按钮
				border: true, // 显示表单边框
				//currentTab: 0, // 当前tab的索引
				showRegion: false, // 显示省市区选择器
				tagList: [], // 标签列表
				imageTitle: [], // 产品名称和图片
				videoTitle: [], // 产品名称和视频
				RadioList: [
					{name: "厂商", id: '0'},
					{name: "经销商", id: '1'}
				],
				// tabList: [
				// 	{name: "厂商"},
				// 	{name: "经销商"}
				// ],
				form: {
					area: '', // 选好的地区
					province_id: '',
					city_id: '',
					area_id: '',
					storeType: '0', // 商家类型
					merchantName: '', // 厂家名称
					merchantIntro: '', // 商家介绍
					id: '', // 标签id
					name: '', // 标签名
					phoneNo: '', // 电话号码
					address: '', // 详细地址
					selected: {
						longitude: '', // 经度
						latitude: '' // 纬度
					},
				}, 
				// 验证规则
				rules: {
					merchantName: [
						{
							required: true, 
							message: '请输入厂家名称',
							trigger: ['change','blur']
						}
					],
					merchantIntro: [
						{
							required: true,
							message: '如：24管控制器，国际1200瓦电机，双梁等',
							trigger: ['change','blur']
						}
					],
					id: [
						{
							validator: (rule, value, callback) => {
								console.log(value,'选了什么')
								return !!value;
							},
							message: '请选择标签',
							trigger: ['change','blur'],
						},
					],
					phoneNo: [
						{
							required: true,
							message: '请输入电话号码',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// if(this.form.phoneNo.length>=11) {
								// 	return this.$u.test.mobile(value);
								// }
								return this.$u.test.mobile(value);
							},
							message: '手机号码格式不正确',
							trigger: ['blur'],
						}
					],
					address: [
						{
							validator: (rule, value, callback) => {
								console.log(value,'选了什么')
								return value.length > 0;
							},
							message: '请选择地址',
							trigger: ['change','blur'],
						}
					],
					area: [
						{
							validator: (rule, value, callback) => {
								return value.length > 0;
							},
							message: '请选择地区',
							trigger: ['change','blur'],
						}
					],
				},
				action: '', // 后端服务器地址
				fileList: [], // 显示预先设置的图片
			}
		},
		onLoad() {
			uni.$on('proDatas',this.productDatas) // 接收图片
			uni.$on('proDatas2', this.productDatas2); // 接收视频
			this.getTags();
			this.getArea();
		},
		onShow() {
			let token = uni.getStorageSync("token");
			if(!token) {
				uni.showToast({
					icon: "none",
					title: "请登录后操作"
				})
			}
		},
		methods: {
			// 接收地图页面传来的数据
			upData(msg) {
				this.form.address = msg.address;
				this.form.selected.longitude = msg.longitude;
				this.form.selected.latitude = msg.latitude;
			},
			// 省市区列表
			getArea() {
				let req = {
					url: "/api/store/getArea",
					method: "POST",
					success: res => {
						if(res.code != 1) {
							uni.showToast({
								icon: "none",
								title: res.msg,
							})
							return false;
						}
						let arr = res.data;
						let arrJosn = JSON.stringify(arr);
						let decodeJson = JSON.parse(arrJosn);
						this.areaList = decodeJson;
						console.log('地区数据',this.areaList)
					}
				}
				this.$request(req);
			},
      // 单选
			radioChange(e) {
				this.form.storeType = e; // 选择厂家 经销商类型
				this.getTags();
			},
			// 选择Logo图
			chooseImages(type) {
				let token = uni.getStorageSync("token");
				if(token) {
					uni.chooseImage({
						count:1, //默认是1张
						sizeType:['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success:res=>{
							let data = res.tempFilePaths;
							console.log(data,'你选择的图片')
							if(data.length >= 1 && type==="logo"){
								this.showLogoBtn = false; //图片上传数量和count一样时，让点击拍照按钮消失
							}else{
								this.showMajorBtn = false;
							}
							uni.uploadFile({
								url: "https://www.cdyanxu.com/api/common/upload",
								header: { 
									"content-type": "multipart/form-data",
									"token" : uni.getStorageSync("token"),
								},
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (uploadFileRes) => {
									console.log(uploadFileRes.data,'res!!');
									let image = JSON.parse(uploadFileRes.data);
									if(type==="logo")
										this.logoUrl = image.data.fullurl; // 提交时传给服务器的图片路径
									else
									  this.majorUrl = image.data.fullurl; // 提交时传给服务器的图片路径
									console.log('logo地址',this.logoUrl,this.majorUrl);
								}
							})
						}
					})
				}else{
					uni.showToast({
						icon: "none",
						title: "请登录后操作"
					})
				}
			},
			// 预览logo图片
			previewImage(type) {
				if(type==="logo") {
					uni.previewImage({
						current: this.logoUrl,
						urls: [this.logoUrl]
					})
				} else {
					uni.previewImage({
						current: this.majorUrl,
						urls: [this.majorUrl]
					})
				}
				
			},
			// 删除logo图片
			delect(type) {
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: res => {
						if(res.confirm && type==="logo") {
							this.logoUrl = "";
							this.showLogoBtn = this.logoUrl.length == 0;
						}else{
							this.majorUrl = "";
							this.showMajorBtn = this.majorUrl.length == 0;
						}
					}
				})
			},
			// 选择的标签组
			checkboxGroupChange(e) {
				this.form.id = e.toString();
				console.log(this.form.id,'y')
			},
			// 接收从地图传来的数据
			// addressInfos(e) {
			// 	console.log(e,'传来的地址对象')
			// 	this.form.address = e.address;
			// 	this.form.selected.longitude = e.longitude;
			// 	this.form.selected.latitude = e.latitude;
			// },
			// 产品名称和图片
			productDatas(e) {
				this.imageTitle = this.imageTitle.concat(e);
				console.log('产品名和图',this.imageTitle);
			},
			productDatas2(e) {
				this.videoTitle = this.videoTitle.concat(e);
				console.log('产品名和视频',this.videoTitle);
			},
			// 获取标签接口
			getTags() {
				this.$request({
					url: "/api/category/getList",
					method: "POST",
					data: {
						type: this.form.storeType
					},
					success: res => {
						if(res.code==0) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						let result = res.data;
						result.map((item)=> {
							item.checked = false;
						})
						this.tagList = result;
					}
				})
			},
			/**
			 * @desc 选择地址
			 * @param
			 **/
			chooseAddress() {
				uni.navigateTo({
					url: './map'
				})
			},
			/**
			 * @desc 选择地区
			 * @param
			 **/
			chooseArea() {
				this.showAreaList = true;
			},
			/**
			 * @desc 确认地区
			 * @param
			 **/
			areaConfirm(e) {
				console.log("确认地区：",e);
				this.form.province_id = e[0].value;
				this.form.city_id = e[1].value;
				this.form.area_id = e[2].value;
				console.log('地区表单', this.form);
				this.form.area = e[0].label +'/'+ e[1].label + '/' + e[2].label;
			},
			// 上传产品页面
			jump() {
				uni.navigateTo({
					url: 'upload-file' 
				})
			},
			/**
			 * @desc 切换选项卡
			 * @param {number}
			 **/
			// change(index) {
			// 	this.currentTab = index;
			// 	this.$refs.ruleForm.resetFields();
			// 	Object.keys(this.form).forEach(key=>{this.form[key] = ''}); // 清空对象的所有属性为''
			// 	this.imageTitle = [];
			// 	this.videoTitle = [];
			// },

			/**
			 * @desc 提交表单数据，提交图片
			 * @param {Object}
			 **/
			submit() {
				console.log('777',this.form)
				let goods = this.imageTitle.concat(this.videoTitle);
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						// 开始验证产品是否上传
						if(this.imageTitle.length ==0 && this.videoTitle.length==0) { // && this.videoTitle.length==0
							uni.showToast({
								icon: "none",
								title: "您还未上传产品"
							})
							return;
						}
						// 验证商标是否上传
						if(this.logoUrl.length == 0) {
							uni.showToast({
								icon: "none",
								title: "您还未上传商标"
							})
							return
						}
						// 验证主图是否上传
						if(this.majorUrl.length == 0) {
							uni.showToast({
								icon: "none",
								title: "您还未上传店铺封面"
							})
							return
						}
						this.toServer(goods);
					}else{
						console.log('失败')
					}
				})
			},
			// 提交接口
			toServer(goods) {
				console.log('访问接口',this.form.selected.latitude)
				this.$request({
					url: "/api/store/apply",
					method: "POST",
					data: {
						  log: this.logoUrl, // 商标
							image: this.majorUrl, // 主图（封面）
						  address: this.form.address,// 地址
							store_name: this.form.merchantName,// 店铺名
							information: this.form.merchantIntro,// 介绍
							type: parseInt(this.form.storeType),// 0厂家 1经销商
							lat: Number(this.form.selected.latitude),// 经度
							long: Number(this.form.selected.longitude),// 纬度
							phone: this.form.phoneNo,// 电话
							store_category_id: this.form.id,// 标签分类
							goods: JSON.stringify(goods),// 产品
							province_id: this.form.province_id, // 省
							city_id: this.form.city_id, // 市
							area_id: this.form.area_id, // 区县
					},
					success: res=> {
						if(res.code != 1) {
							uni.showToast({
								icon: "none",
								title: res.msg,
							})
							return
						}
						uni.showToast({
							icon: "success",
							title: res.msg
						})
						uni.navigateTo({
							url: "/pages/me/index"
						})
					}
				})
			},
		},
		onReady() {
			this.$refs.ruleForm.setRules(this.rules);
		}
	}
</script>
<style lang="scss">
	.merchant-enter {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
	}
	::v-deep .u-checkbox__label {
		font-size: 24rpx;
		color: $uni-text-color-placeholder;
	}
</style>
<style lang="scss" scoped>
	// .switch-table {
	// 	position: sticky;
	// 	top: 0;
	// 	z-index: 999;
	// }
	.tipsHide {
		display: none;
	}
	.tipsShow {
		display: inline-block;
	}
	.container {
		margin: 0 30rpx 30rpx 30rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		padding: 42rpx 30rpx 54rpx;
		.district {
			position: relative;
			.choose {
				// 选择按钮定位样式
				position: absolute;
				top: 32rpx;
				right: -30rpx;
				padding: 5rpx 40rpx;
			}
		}
	}
	.upLoad-container {
		margin: 30rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		padding: 42rpx 10rpx 54rpx;
		// height: 500rpx;
		.uploader{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.title, .add-btn {
				padding: 0 15rpx 0;
			}
			.start {
				color: red;
			}
		}
		.fileList {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15rpx 20rpx;

			.image-box {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				margin-top: 20rpx;
				view {
					width: 200rpx !important;
				}
				.text-grey {
					color: $uni-text-color-grey;
				}
				.pics {
					margin: 0 15rpx 15rpx 0 !important;
				}
			}
		}
		
		.fileList2 {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15rpx 20rpx;
			
			.video-box {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				margin-top: 20rpx;
				view {
					width: 290rpx !important;
				}
				.video {
					margin: 0 15rpx 15rpx 0 !important;
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
		.upload-logo {
			margin: 20rpx 15rpx 20rpx 15rpx;
			.layout-flex {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.red {
					color: red;
				}
			}
			.logo {
				position: relative;
				min-height: 40rpx;
				.close-btn {
					position: absolute;
					top: -20rpx;
					left: 180rpx;
				}
			}
		}
	}
	.submit-btn {
		margin: 0 30rpx;
	}
</style>