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
			path: this.share.path,
			// imageUrl:
			// 分享功能做法：↓
			//https://blog.csdn.net/qq_35432904/article/details/106330079
		}
	}
}