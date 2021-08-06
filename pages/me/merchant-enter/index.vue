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
				<u-form-item label="请填写标签" :required="true" prop="tag">
					<u-input v-model="form.tag" placeholder="如: 品牌三轮"/>
				</u-form-item>
				<u-form-item label="请填写联系电话" :required="true" prop="phoneNo">
					<u-input v-model="form.phoneNo" placeholder="请填写电话号码"/>
				</u-form-item>
			</u-form>
		</view>

		<view class="upLoad-container">
			<view class="title">上传产品</view>
			<!-- <u-upload ref="uUpload" :action="action" :auto-upload="false" :file-list="fileList" max-count="9"></u-upload> -->
			<view class="add-btn" @click="jump">
				<u-image src="/static/user-center-images/add.png" width="38" height="38"></u-image>
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
				tabList: [
					{name: "厂商"},
					{name: "经销商"}
				],
				form: {
					merchantName: '', // 厂家名称
					merchantIntro: '', // 商家介绍
					tag: '', // 标签
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
					tag: [
						{
							required: true,
							message: '请填写标签',
							trigger: 'blur'
						},
						{
							max: 20,
							message: '最多不超过20个字符',
							trigger: 'blur'
						}
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
			uni.$on('addressInfo',this.addressInfos)
		},
		methods: {
			addressInfos(e) {
				console.log(e,'传来的地址对象')
				this.form.address = e.address;
				this.form.selected.longitude = e.longitude;
				this.form.selected.latitude = e.latitude;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title, .add-btn {
			padding: 0 15rpx 0;
		}
	}
	.submit-btn {
		margin: 0 30rpx;
	}
</style>