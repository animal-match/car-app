export default {
	data() {
		return {
			//设置默认的分享参数
			share: {
				title: "新能源信息对接平台",
				path: "/pages/index/index",
				imageUrl: "",
				desc: "欢迎使用新能源信息对接平台",
				content: "分享内容："
			}
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path+'?pid='+this.$store.state.user.pid,
			imageUrl: '',
			desc: this.share.desc,
			content:this.share.content,
			success(res){
				uni.showToast({
						title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
			// 分享功能做法：↓
			//	
		}
	}
}