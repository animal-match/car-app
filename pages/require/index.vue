<template>
	<!-- 供求页面 -->
	<view class="require">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303"
				bar-width="200"></u-tabs>
		</view>
		<!-- 供应信息组件 -->
		<require-supply ref="requireSupply" @refresh-page="refreshPage" :infos="infos" :page-info="page" v-if="currentTab===0"></require-supply>
		
		<!-- 供应发布 -->
		<view class="supply-publish" v-show="currentTab!==0">
			<u-form :model="form" ref="ruleForm" label-position="top">
				<u-form-item :label="currentTab==1?'请填写你的供应标题':'请填写你的求购标题'" :required="true" prop="title">
					<u-input v-model="form.title" maxlength="30"/>
				</u-form-item>
				<u-form-item :label="currentTab==1?'请填写你的供应内容':'请填写你的求购内容'" :required="true" prop="content" :border-bottom="false">
					<u-input v-model="form.content" maxlength="200" type="textarea" height="300" :border="true" placeholder="24管控制器，国标1200瓦电机，双梁等"/>
				</u-form-item>
			</u-form>
			<view class="upload-btn">
				<view style="margin-bottom:20rpx;"> <text class="red">*</text>上传图片 </view>
				<view v-if="VideoOfImagesShow">
					<u-icon label="添加图片" size="40" name="plus-circle" @click="chooseImages"></u-icon>
				</view>
			</view>
			<view class="upload-image" v-if="imageList.length>0">
				<view v-for="(item, index) in imageList" :key="index" class="image-list">
					<u-image :src="item" @click="previewImage(index)" width="200" height="150" class="pics">
					</u-image>
					<u-image v-if="imageList.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delect(index)"  class="close-btn"></u-image>
				</view>
			</view>
			<view class="supply-publish-btn">
				<u-button @click="submit" class="submit-btn" type="error" shape="circle" :loading="supplyloading">提交内容</u-button>
			</view>
		</view>
		<u-gap height="40"></u-gap>

		<!-- 第一版求购发布 -->
		<!--
		<view v-show="currentTab===2"  class="require-publish">
			<view class="form">
				<u-form :model="formMore" ref="ruleFormMore" label-position="top">
					<u-form-item label="请填写你的求购标题" :required="true" prop="title">
						<u-input v-model="formMore.title" maxlength="30"/>
					</u-form-item>
					<u-form-item label="求购品牌" :required="true" prop="brand">
						<u-input v-model="formMore.brand" maxlength="30"/>
					</u-form-item>
					<u-form-item label="求购型号" :required="true" prop="model">
						<u-input v-model="formMore.model" maxlength="30"/>
					</u-form-item>
					<u-form-item label="求购车辆数量" prop="num">
						<u-input v-model="formMore.num" type="number" maxlength="6"/>
					</u-form-item>
					<u-form-item label="求购车辆成色" prop="condition">
						<u-input v-model="formMore.condition" :type="type" @click="showSheet = true" maxlength="3" />
					</u-form-item>
					<u-form-item label="请填写联系电话" :required="true" prop="phone">
						<u-input v-model="formMore.phone" maxlength="11" placeholder="请填写电话号码"/>
					</u-form-item>
					<u-gap height="30"></u-gap>
				</u-form>
			</view>
			<view class="submit-btn">
				<u-button @click="submitMore" class="submit-btn" type="error" shape="circle" :loading="requireloading">提交内容</u-button>
			</view>
			<u-gap height="40"></u-gap>
		</view>
    -->
		<u-action-sheet :list="actionSheetList" v-model="showSheet" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '', // 真实图片地址
				VideoOfImagesShow: true,
				imageList: [], // 上传图片列表
				showSheet: false, // 显示上拉选择器
				fromPage: '', // 来自哪个页面
				actionSheetList: [
					{
						text: '全新'
					},
					{
						text: '9成新'
					},
					{
						text: '8成新'
					},
					{
						text: '7成新'
					},
					{
						text: '6成新'
					},
					{
						text: '5成新'
					},
					{
						text: '4成新'
					},
					{
						text: '3成新'
					}
				],
				type: 'supply', // 初始化供应信息列表
				supplyloading: false, // 供应发布loading
				currentTab: 0, // 当前tab的索引
				infos: [], // 供求信息数据
				page: { // 供求信息分页
					start: 1,
					totalPages: 0,
					pageSort: 'requireSupply', // 代表此页是全局供求页面
				},
				tabList: [{
						name: "供应信息"
					},
					{
						name: "供应发布"
					},
					{
						name: "求购发布"
					}
				],
				form: {
					title: '', // 供应标题
					content: '', // 供应内容
				},
				/*
				formMore: {
					title: '', // 求购标题
					brand: '', // 求购品牌
					model: '', // 求购型号
					num: '', // 求购车辆数量
					condition: '', // 求购车辆成色
					phone: '', // 电话号码
				},
				*/
				// 供应页面验证规则
				rules: {
					title: [
						{
							required: true,
							message: '请填写供应标题',
							trigger: ['change','blur'],
						}
					],
					content: [
						{
							required: true,
							message: '请填写供应内容',
							trigger: 'change'
						}
					]
				},
				// 求购页面验证规则
				/*
				rulesMore: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: ['change','blur'],
					}],
					brand: [{
						required: true,
						message: '请输入品牌',
						trigger: ['change','blur'],
					}],
					model: [{
						required: true,
						message: '请输入型号',
						trigger: ['change','blur'],
					}],
					phone: [
						{
							required: true,
							message: '请输入电话号码',
							trigger: 'change',
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码格式不正确', 
							trigger: ['change','blur'],
						}
					]
				},
				*/
			}
		},
		onReachBottom() {
			if(this.currentTab===0 && (this.page.start < this.page.totalPages)) {
				console.log('页面触底了')
				this.page.start+=1;
				this.getDemandsList();
			}
		},
		onShow() {
			if(this.currentTab==0) {
				this.init();
			}
			this.fromPage = uni.getStorageSync('tabBarIndex');

			if(this.fromPage==="fromHomePage1") {
				this.currentTab = 1;
			}else if(this.fromPage==="fromHomePage2") {
				this.currentTab = 2;
			}else {
				this.currentTab = 0;
			}

		},
		methods: {
			//上传图片
			chooseImages(){
				uni.chooseImage({
					count:1, //默认是1张
					sizeType:['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success:res=>{
						this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList,'你选择的图片')
						if(this.imageList.length >= 1){
							this.VideoOfImagesShow = false; //图片上传数量和count一样时，让点击拍照按钮消失
						}
						uni.uploadFile({
							url: "https://yanxu.n867.cn/index.php/api/common/upload",
							header: { 
								"content-type": "application/x-www-form-urlencoded",
								"token" : uni.getStorageSync("token"),
							},
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data,'res!!');
								let data = JSON.parse(uploadFileRes.data);
								this.imageUrl = data.data.fullurl;
								console.log('图片地址',this.imageUrl);
							}
						})
					}
				})
			},
			/**
			 * @desc 预览图片
			 * @param 
			 **/
			previewImage(e) {
				uni.previewImage({
					current: this.imageList[e],
					urls: this.imageList,
				});
			},
			delect(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: res => {
						console.log('成功回调',res);
						if (res.confirm) {
							this.imageList.splice(index, 1);
							console.log(this.imageList,'列表')
						}
						if (this.imageList.length == 1) {
							this.VideoOfImagesShow = false;
						} else {
							this.VideoOfImagesShow = true;
						}
					}
				});
			},
			/**
			 * @desc 初始化页面
			 * @param 
			 **/
			init() {
				this.infos = [];
				this.page.start = 1;
				this.getDemandsList();
			},
			/**
			 * @desc 切换选项卡
			 * @param {number}
			 **/
			change(index) {
				if(index===0) {
					this.type = 'supply';
					this.init();
					this.getDemandsList();
				}
				for(let key in this.form) {
					this.form[key] = '';
				}
				this.imageList = [];
				this.VideoOfImagesShow = true;
				if(index==1) this.fromPage = 'fromHomePage1';
				else if(index==2) this.fromPage = 'fromHomePage2';
				else this.fromPage = '';
				uni.setStorageSync('tabBarIndex', this.fromPage)

				this.currentTab = index;
				this.$refs.ruleForm.resetFields();
				// this.$refs.ruleFormMore.resetFields();
			},
			/**
			 * @desc 上拉选择器
			 * @param 
			 **/
			// actionSheetCallback(i) {
			// 	this.formMore.condition = this.actionSheetList[i].text
			// },
			/**
			 * @desc 供应发布提交
			 * @param
			 **/
			productPublic() {
				let sort = this.currentTab==1?'supply':'demand';
				this.supplyloading = true;
				this.$request({
					url: "/api/supply/release",
					method: "POST",
					data: {
						type: sort,
						title: this.form.title,
						content: this.form.content,
						image: this.imageUrl
					},
					success: res => {
						if(res.code!=1) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 this.supplyloading = false;
							 return false;
						}
						uni.showToast({
							icon: "success",
							title: "发布成功"
						})
						// 发布成功清空数据
						for(let key in this.form) {
							this.form[key] = '';
						}
						this.imageUrl = '';
						this.imageList = [];
						this.supplyloading = false;
					}
				})
			},

			/**
			 * @desc 求购发布提交
			 * @param 
			 **/
			 /*
			productPublicMore() {
				this.requireloading = true;
				this.$request({
					url: "/api/supply/release",
					method: "POST",
					data: {
						type: 'demand',
						title: this.formMore.title,
						condition: this.formMore.condition,
						brand: this.formMore.brand,
						model: this.formMore.model,
						phone: this.formMore.phone,
						num: this.formMore.num,
					},
					success: res => {
						if(res.code===0) {
							 uni.showToast({
								 icon: "none",
								 title: res.msg,
								 duration: 3000
							 })
							 this.requireloading = false;
							 return false;
						}
						uni.showToast({
							icon: "success",
							title: "发布成功"
						})
						this.requireloading = false;
					}
				})
			},
			*/
			/**
			 * @desc 供应发布提交按钮
			 * @param
			 **/
			submit() {
				// 验证是否通过校验
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						console.log('所有校验通过')
						if(this.imageList.length<1) {
							uni.showToast({
								title: "请上传产品图片",
								icon: "none"
							})
							return false;
						}
						this.productPublic();
					}
				})
			},
			/**
			 * @desc 求购发布提交按钮
			 * @param
			 **/
			 /*
			submitMore() {
				// 验证是否通过校验
				this.$refs.ruleFormMore.validate(valid => {
					if(valid) {
						if(valid) {
							console.log('所有校验通过')
							this.productPublicMore();
							this.$nextTick(function(){
								for(let key in this.formMore) {
									this.formMore[key] = '';
								}
							})
						}
					}
				})
				this.requireloading = false;
			},
			*/
			/**
			 * @desc 获取供求信息数据
			 * @param
			 **/
			getDemandsList() {
				this.$request({
					url: "/api/supply/index",
					method: "POST",
					data: {
						type: this.type, // supply, demand
						list_rows: 10,// 条数
						page: this.page.start,// 页数
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
						let arr = res.data.data;
						this.infos = this.infos.concat(arr);
						console.log("页面请求", res);
						this.page.totalPages = res.data.last_page;
					}
				})
			},
			/**
			 * @desc 切换tab页刷新本页面数据
			 * @param {string}
			 **/
			refreshPage(type) {
				this.type = type;
				this.page.start = 1;
				this.infos = [];
				this.getDemandsList();
			}
		},
		
		onReady() {
			this.$refs.ruleForm.setRules(this.rules);
			// this.$refs.ruleFormMore.setRules(this.rulesMore);
		},
	}
</script>

<style lang="scss" scoped>
	.require {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;

		.switch-table {
			position: sticky;
			top: 0;
			z-index: 999;
		}
		// .supply-publish, .require-publish {
		// 	margin: 30rpx 30rpx 300rpx 30rpx;
		// 	background: $uni-bg-color;
		// 	border-radius: 20rpx;
		// 	padding: 0 30rpx;
		// }
		
		.supply-publish {
			margin: 30rpx 30rpx 150rpx 30rpx;
			background: $uni-bg-color;
			border-radius: 20rpx;
			padding: 0 30rpx 20rpx 30rpx;
			.red {
				color: red;
			}
			.upload-btn {
				display: flex;
				justify-content: space-between;
				view:nth-child(2) {
					color: $uni-baseColor;
				}
			}
			.upload-image, {
				margin: 0 20rpx;
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.image-list {
					margin-right: 15rpx !important;
				}
				.pics {
					margin: 0 30rpx 15rpx 0 !important;
				}
				.close-btn {
					position: relative;
					top: -200rpx;
					left: 180rpx;
					z-index: 99;
				}
			}
			.supply-publish-btn {
				position: relative;
				top: 200rpx;
			}
		}
		// .require-publish {
		// 	.form {
		// 		margin: 30rpx 30rpx 100rpx 30rpx;
		// 		padding: 0 30rpx;
		// 		border-radius: 20rpx;
		// 		background: $uni-bg-color;
		// 	}
		// 	.submit-btn {
		// 		margin: 0 30rpx 0 30rpx;
		// 	}
		// }
	}
</style>
