<template>
	<view class="merchant-enter">
		<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303" bar-width="365"></u-tabs>
		<view class="container">
			<u-form :model="form" ref="ruleForm" label-position="top" :bottom-border="!border">
				<u-form-item label="请填写厂家名称">
					<u-input v-model="form.merchantName" />
				</u-form-item>
				<u-form-item label="商家介绍">
					<u-input v-model="form.merchantIntro" type="textarea" height="300" :border="border"/>
				</u-form-item>
				<!-- 地区选择按钮 -->
				<u-button @click="showRegion = true" size="mini" class="choose" :ripple="true" ripple-bg-color="#CA0303">选择</u-button>
				<u-form-item label="请选择地址">
					<u-picker mode="region" v-model="showRegion" :params="regionParams" @confirm="confirm">
					</u-picker>
					<text>{{ selectedArea }}</text>
				</u-form-item>
				<u-form-item label="请填写标签">
					<u-input v-model="form.tag" placeholder="如: 品牌三轮"/>
				</u-form-item>
				<u-form-item label="请填写联系电话">
					<u-input v-model="form.phoneNo" placeholder="请填写电话号码"/>
				</u-form-item>
			</u-form>
		</view>

		<view class="upLoad-container">
			
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
				regionParams: { // 省市区
					province: true,
					city: true,
					area: true
				},
				selected: {
					province: '',
					city: '',
					area: ''
				},
				tabList: [
					{name: "厂商"},
					{name: "经销商"}
				],
				form: {
					merchantName: '', // 厂家名称
					merchantIntro: '', // 商家介绍
					tag: '', // 标签
				}
			}
		},
		computed: {
			// 显示选中的省市区
			selectedArea() {
				if(this.selected.province && this.selected.city && this.selected.area) {
					return `${this.selected.province}-${this.selected.city}-${this.selected.area}`;
				} else {
					return '';
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
			},
			/**
			 * @desc 选中的省市区
			 * @param {Object}
			 **/
			confirm(obj) {
				this.selected.province = obj.province.label;
				this.selected.city = obj.city.label;
				this.selected.area = obj.area.label;
				console.log('你选中了：'+this.selected.province+'/'+this.selected.city+'/'+this.selected.area)
			},
			btnClick() {
				console.log('打开')
			},
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
	.container {
		margin: 30rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		padding: 42rpx 30rpx 54rpx;
		position: relative;
		.choose {
			// 选择按钮定位样式
			position: absolute;
			top: 705rpx;
			right: 40rpx;
			padding: 3rpx 30rpx;
		}
	}
	.upLoad-container {
		margin: 30rpx;
		background-color: $uni-text-color-inverse;
		height: 500rpx;
		border-radius: 20rpx;
	}
</style>