<template>
	<!-- 供求页面 -->
	<view class="require">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303"
				bar-width="200"></u-tabs>
		</view>
		<!-- 供应信息组件 -->
		<require-need v-if="currentTab===0"></require-need>
		
		<!-- 供应发布 -->
		<view v-show="currentTab===1" class="supply-publish">
			<u-form :model="form" ref="ruleForm" label-position="top">
				<u-form-item label="请填写你的供应标题" :required="true" prop="supplyTitle">
					<u-input v-model="form.supplyTitle" />
				</u-form-item>
				<u-form-item label="请填写你的供应内容" :required="true" prop="supplyContent" :border-bottom="false">
					<u-input v-model="form.supplyContent" type="textarea" height="300" :border="true" placeholder="24管控制器，国标1200瓦电机，双梁等"/>
				</u-form-item>
			</u-form>
			<u-gap height="200"></u-gap>
			<u-button @click="submit" class="submit-btn" type="error" shape="circle" :loading="supplyloading">提交内容</u-button>
		</view>
		
		<!-- 求购发布 -->
		<view v-show="currentTab===2"  class="require-publish">
			<view class="form">
				<u-form :model="formMore" ref="ruleFormMore" label-position="top">
					<u-form-item label="请填写你的求购标题" :required="true" prop="requireTitle">
						<u-input v-model="formMore.requireTitle" />
					</u-form-item>
					<u-form-item label="求购品牌" :required="true" prop="requireBrand">
						<u-input v-model="formMore.requireBrand" />
					</u-form-item>
					<u-form-item label="求购型号" :required="true" prop="requireModel">
						<u-input v-model="formMore.requireModel" />
					</u-form-item>
					<u-form-item label="求购车辆数量" prop="requireCars">
						<u-input v-model="formMore.requireCars" type="number"/>
					</u-form-item>
					<u-form-item label="求购车辆成色" prop="requireCondition">
						<u-input v-model="formMore.requireCondition" />
					</u-form-item>
					<u-form-item label="请填写联系电话" :required="true" prop="phoneNo">
						<u-input v-model="formMore.phoneNo" placeholder="请填写电话号码"/>
					</u-form-item>
					<u-gap height="30"></u-gap>
				</u-form>
			</view>
			<view class="submit-btn">
				<u-button @click="submitMore" class="submit-btn" type="error" shape="circle" :loading="requireloading">提交内容</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import requireNeed from './components/require-need.vue'
	export default {
		components: {
			requireNeed
		},
		data() {
			return {
				supplyloading: false, // 供应发布loading
				requireloading: false, // 求购发布Loading
				currentTab: 0, // 当前tab的索引
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
					supplyTitle: '', // 供应标题
					supplyContent: '', // 供应内容
				},
				formMore: {
					requireTitle: '', // 求购标题
					requireBrand: '', // 求购品牌
					requireModel: '', // 求购型号
					requireCars: '', // 求购车辆数量
					requireCondition: '', // 求购车辆成色
					phoneNo: '', // 电话号码
				},
				// 供应页面验证规则
				rules: {
					supplyTitle: [
						{
							required: true,
							message: '请填写供应标题',
							trigger: ['change','blur'],
						}
					],
					supplyContent: [
						{
							required: true,
							message: '请填写供应内容',
							trigger: ['change','blur'],
						}
					]
				},
				// 求购页面验证规则
				rulesMore: {
					requireTitle: [{
						required: true,
						message: '请输入标题',
						trigger: ['change','blur'],
					}],
					requireBrand: [{
						required: true,
						message: '请输入品牌',
						trigger: ['change','blur'],
					}],
					requireModel: [{
						required: true,
						message: '请输入型号',
						trigger: ['change','blur'],
					}],
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
					]
				}
			}
		},
		
		methods: {
			/**
			 * @desc 切换选项卡
			 * @param {number}
			 **/
			change(index) {
				this.currentTab = index;
				this.$refs.ruleForm.resetFields();
				this.$refs.ruleFormMore.resetFields();
			},
			/**
			 * @desc 供应发布提交按钮
			 * @param
			 **/
			submit() {
				// 验证是否通过校验
				this.$refs.ruleForm.validate(valid => {
					if(valid) {
						console.log('所有校验通过')
					}else{
						console.log('验证失败')
					}
				})
				this.supplyloading = false;
			},
			/**
			 * @desc 求购发布提交按钮
			 * @param
			 **/
			submitMore() {
				// 验证是否通过校验
				this.$refs.ruleFormMore.validate(valid => {
					if(valid) {
						console.log('所有校验通过')
					}else{
						console.log('验证失败')
					}
				})
				this.requireloading = false;
			}
		},
		
		onReady() {
			this.$refs.ruleForm.setRules(this.rules);
			this.$refs.ruleFormMore.setRules(this.rulesMore);
		},
		
		onLoad(options) {
			console.log(options)
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
			height: 700rpx;
			margin: 30rpx 30rpx 300rpx 30rpx;
			background: $uni-bg-color;
			border-radius: 20rpx;
			padding: 0 30rpx;
		}
		.require-publish {
			.form {
				margin: 30rpx 30rpx 100rpx 30rpx;
				padding: 0 30rpx;
				border-radius: 20rpx;
				background: $uni-bg-color;
			}
			.submit-btn {
				margin: 0 30rpx 80rpx 30rpx;
			}
		}
	}
</style>
