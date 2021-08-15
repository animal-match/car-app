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
			<view class="fileList" v-if="showImages.length>0 || showVideos.length>0">
				<view class="title">{{productTitle?'<<'+productTitle+'>>':''}}</view>
				<view class="image-box">
					<u-image :src="item" width="200" height="150" class="pics" v-for="(item,index) in showImages" :key="index"></u-image>
				</view>
				<view class="video-box">
					<video :src="$item" class="video" v-for="($item,$index) in showVideos" :key="$index"></video>
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
				showImages: [], // 显示选择好的图片
				showVideos: [], // 显示选择好的视频
				tagList: [],
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
				productTitle: "", // 产品名称
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
			uni.$on('imagesData',this.imagesData,this.inputValue) // 接收图片
			uni.$on('title', this.inputValue) // 接收标题
			uni.$on('vidiosData', this.videosData) // 接收视频
		},
		onShow() {
			this.getTags();
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
			imagesData(e) {
				console.log('图片临时文件',e)
				this.showImages = e;
			},
			videosData(e) {
				console.log('临时视频文件',e);
				this.showVideos = e;
			},
			inputValue(e) {
				this.productTitle = e;
				console.log('产品标题',e)
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
			},

			/**
			 * @desc 提交表单数据，提交图片
			 * @param {Object}
			 **/
			submit() {
				console.log('填了些什么',this.form)
				// 图片上传
				//this.$refs.uUpload.upload(); // 手动上传模式
				//let files = [];
					// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
					//files = this.$refs.uUpload.lists.filter(val => {
					//	return val.progress == 100;
					//})
					// 如果您不需要进行太多的处理，直接如下即可
					//files = this.$refs.uUpload.lists;
					//console.log('上传的图片',files);
					
				// 验证是否通过校验
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						console.log('所有校验通过')
						if(this.showImages.length ==0 && this.showVideos.length==0) {
							uni.showToast({
								icon: "none",
								title: "您还未上传产品"
							})
							return;
						}
						console.log('提交成功！！！')
					}else{
						console.log('验证失败')
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
			padding: 0 15rpx 0;
			.title {
			  margin-top: 20rpx;
				color: $uni-text-color-grey;
			}
			.image-box {
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
				.pics {
					margin: 0 15rpx 15rpx 0 !important;
				}
			}
			.video-box {
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
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