<template>
	<!-- 商家入驻页 -->
	<view class="merchant-enter">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303" bar-width="365"></u-tabs>
		</view>
		<view class="container">
			<u-form :model="form" ref="ruleForm" label-position="top">
				<u-form-item label="请填写厂家名称" :required="true" prop="merchantName">
					<u-input v-model="form.merchantName" />
				</u-form-item>
				<u-form-item label="商家介绍" :required="true" prop="merchantIntro">
					<u-input v-model="form.merchantIntro" type="textarea" height="300" :border="border"/>
				</u-form-item>
				<!-- 地区选择按钮 -->
				<view class="district">
					<u-button @click="chooseAddress" size="mini" class="choose" :ripple="true" ripple-bg-color="#CA0303">选择</u-button>
					<u-form-item label="请选择地址" :required="true" prop="address">
						<text>{{ address }}</text>	
					</u-form-item>
				</view>
				
				<view class="district">
					<u-button @click="openSheet()" size="mini" class="choose" :ripple="true" ripple-bg-color="#CA0303">选择</u-button>
					<u-form-item label="请选择标签" :required="true" prop="id">
						 <u-select v-model="showTags" :list="tagList" value-name="id" label-name="name" @confirm="tagConfirm"></u-select>
					<text>{{form.name}}</text>
					</u-form-item>
				</view>
				
				<u-form-item label="请填写联系电话" :required="true" prop="phoneNo">
					<u-input v-model="form.phoneNo" placeholder="请填写电话号码"/>
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
			<view class="fileList">
				<view class="image-box" v-for="(item,index) in imageTitle" :key="index">
					<u-image :src="item.imageShow" width="200" height="150" class="pics"></u-image>
					<view class="ellipsis">{{item.title}}</view>
				</view>
			</view>
			
			<view class="fileList2">
				<view class="video-box" v-for="($item,$index) in videoTitle" :key="$index">
					<video :src="$item.videoShow" class="video"></video>
					<view class="ellipsis">{{$item.title}}</view>
				</view>
			</view>	
		</view>
		<u-gap height="40"></u-gap>
		<view class="submit-btn">
			<u-button @click="submit" type="error" shape="circle">提交</u-button>
		</view>
		<u-gap height="40"></u-gap>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				border: true, // 显示表单边框
				currentTab: 0, // 当前tab的索引
				showRegion: false, // 显示省市区选择器
				tagList: [],
				imageTitle: [], // 产品名称和图片
				videoTitle: [], // 产品名称和视频
				showTags: false, // 显示标签选择菜单
				tabList: [
					{name: "厂商"},
					{name: "经销商"}
				],
				form: {
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
								return this.$u.test.mobile(value);
							},
							message: '手机号码格式不正确', 
							trigger: ['change','blur'],
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
					]
				},
				action: '', // 后端服务器地址
				fileList: [], // 显示预先设置的图片
			}
		},
		computed: {
			address() {
				if(this.form.address.length > 0) {
					return this.form.address;
				}else{
					return '';
				}
			}
		},
		onLoad() {
			uni.$on('addressInfo',this.addressInfos) // 接收地址
			uni.$on('proDatas',this.productDatas) // 接收图片
			uni.$on('proDatas2', this.productDatas2); // 接收视频
		},
		onShow() {
			this.getTags();
			// this.toServer();
		},
		methods: {
			// 打开选择器
			openSheet() {
				this.showTags = true;
			},
			// 选择器确定按钮
			tagConfirm(arr) {
				console.log(arr);
				this.form.id = arr[0].value;
				this.form.name = arr[0].label;
			},
			// 接收从地图传来的数据
			addressInfos(e) {
				console.log(e,'传来的地址对象')
				this.form.address = e.address;
				this.form.selected.longitude = e.longitude;
				this.form.selected.latitude = e.latitude;
			},
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
					success: res => {
						if(res.code==0) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						this.tagList = res.data;
					}
				})
			},
			/**
			 * @desc 选择地址
			 * @param {number}
			 **/
			chooseAddress() {
				uni.navigateTo({
					url: './map'
				})
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
			change(index) {
				this.currentTab = index;
				this.$refs.ruleForm.resetFields();
				Object.keys(this.form).forEach(key=>{this.form[key] = ''}); // 清空对象的所有属性为''
				this.imageTitle = [];
				this.videoTitle = [];
			},

			/**
			 * @desc 提交表单数据，提交图片
			 * @param {Object}
			 **/
			submit() {
				console.log('除了产品填了些什么',this.form)
				let goods=this.imageTitle.concat(this.videoTitle);
				// console.log('产品传了什么',goods);
				// this.toServer(goods);
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						console.log('所有校验通过')
						if(this.imageTitle.length ==0 && this.videoTitle.length==0) { // && this.videoTitle.length==0
							uni.showToast({
								icon: "none",
								title: "您还未上传产品"
							})
							return;
						}
						this.toServer(goods);
						console.log('提交成功！！！')
					}else{
						console.log('验证失败')
						this.$request({
							url: "/api/category/getList",
							method: "POST",
							success: res => {
								if(res.code==0) {
									uni.showToast({
										icon: "none",
										title: res.msg
									})
									return false;
								}
								this.tagList = res.data;
							}
						})
					}
				})
			},
			// 提交接口
			toServer(goods) {
				console.log('访问接口',this.form.selected)
				this.$request({
					url: "/api/store/apply",
					method: "POST",
					data: {
						  address: this.form.address,
							store_name: this.form.merchantName,// 店铺名
							information: this.form.merchantIntro,// 介绍
							type: this.currentTab,// 0厂家 1经销商
							// lat: Number(this.form.selected.latitude),// 经度
							// long: Number(this.from.selected.longitude),// 纬度
							phone: this.form.phoneNo,// 电话
							store_category_id: this.form.id,// 标签分类
							goods: JSON.stringify(goods)//goods// 产品
					},
					success: res=> {
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
</style>
<style lang="scss" scoped>
	.switch-table {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.container {
		margin: 30rpx;
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
		.uploader{
			display: flex;
			justify-content: space-between;
			align-items: center;
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
			padding: 0 15rpx 0;

			.image-box {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				margin-top: 20rpx;
				view {
					width: 200rpx !important;
				}
				.pics {
					margin: 0 15rpx 15rpx 0 !important;
				}
			}
		}
		
		.fileList2 {
			display: flex;
			flex-wrap: wrap;
			padding: 0 15rpx 0;
			
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
	}
	.submit-btn {
		margin: 0 30rpx;
	}
</style>