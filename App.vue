<script>
	export default {
		onLaunch: function() {
			console.log('App Launchs')
			uni.clearStorage();
			this.$request({
				url: "/api/index/getConfig",
				success: res => {
					if(res.code!=1) {
						uni.showToast({
							icon: "none",
							title: res.msg
						})
						return false;
					}
					this.$store.commit('saveConfigs', res.data) // 存储配置信息
					console.log('vuex',this.$store.state.config)
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
