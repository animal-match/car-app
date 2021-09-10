<script>
	export default {
		onLaunch: function() {
			console.log('App Launchs')
			uni.clearStorage();
			this.$request({
				url: "/api/index/getConfig",
				success: res => {
					if (res.code != 1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						return false;
					}
					let data = res.data;
					data.is_free = 0; // 查看经销商免费 后期删除 后端暂时没提供
					this.$store.commit('saveConfigs', data) // 存储配置信息
					console.log('vuex', this.$store.state.config)
				}
			})
			// 厂家的第一个id
			this.$request({
				url: "/api/category/getList",
				method: "POST",
				data: {
					type: 0
				},
				success: res => {
					if (res.code != 1) {
						uni.showToast({
							icon: "none",
							title: res.msg,
							duration: 3000
						})
						return false;
					}
					let dataId = res.data[0].id;
					this.$store.state.activeId = dataId; // 商家页面初始化进入页面时获取厂家模块第一个导航的id编号
				}
			})
			// 经销售的第一个id
			this.$request({
				url: "/api/category/getList",
				method: "POST",
				data: {
					type: 1
				},
				success: res => {
					if (res.code != 1) {
						uni.showToast({
							icon: "none",
							title: res.msg,
							duration: 3000
						})
						return false;
					}
					let dataId = res.data[0].id;
					this.$store.state.activeId_2 = dataId; // 商家页面初始化进入页面时获取经销售模块第一个导航的id编号
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
