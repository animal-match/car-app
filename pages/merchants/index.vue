<template>
	<view class="merchant">
		<view class="switch-table">
			<u-tabs :list="tabList" :is-scroll="false" :current="currentTab" @change="change" active-color="#CA0303" bar-width="365"></u-tabs>
		</view>
		<view class="search">
			<u-form :model="form">
				<u-form-item label="搜索"><u-input v-model="form.searchKey" /></u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '', // 搜索条件
				type: 'text',
				form: {
					searchKey: ''
				},
				currentTab: 0, // 当前tab的索引
				tabList: [
					{name: "厂商"},
					{name: "经销商"}
				],
				
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
		}
	}
</script>

<style lang="scss">
	.merchant {
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
	.search {
		background-color: $uni-text-color-inverse;
		height: 140rpx;
		// line-height: 140rpx;
		padding: 0 30rpx;
	}
</style>