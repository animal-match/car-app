<template>
	<!-- 我的供求页面 -->
	<view class="my-require-supply">
		<!-- 供求组件 -->
		<require-supply ref="requireSupply" @refresh-page="refreshPage" :infos="infos" :page-info="page"></require-supply>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: 'supply',
				page: {
					start: 1,
					totalPages: 0,
					pageSort: 'myRequireSupply', // 代表此页是我的供求页面
				},
				infos: [], // 列表数据
			}
		},
		onReachBottom() {
			console.log('页面触底了')
			if(this.page.start < this.page.totalPages) {
				this.page.start+=1;
				this.getDemandsList();
			}
		},
		onShow() {
			this.getDemandsList();
		},
		methods: {
			/**
			 * @desc 我的供求列表
			 * @param
			 **/
			getDemandsList() {
				const userId = this.$store.state.user.userId;
				this.$request({
					url: "/api/supply/index",
					method: "POST",
					data: {
						user_id: 2,
						type: this.type, // supply, demand
						list_rows: 10,// 条数
						page: this.page.start,// 页数
					},
					success: res=> {
						let arr = res.data.data;
						this.infos = this.infos.concat(arr);
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
			},
		},
	}
</script>
<style lang="scss" scoped>
	
</style>