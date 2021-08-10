// 封装网络请求
module.exports = (params) => {
	const baseUrl = 'https://yanxu.n867.cn/index.php';
	let url = baseUrl + params.url;
	let method = params.method;
	let header = params.header || {};
	let data = params.data || {};
	// GET或POST请求方式
	if(method) {
		method = method.toUpperCase();
		if(method==='POST') {
			header = { 
			  "content-type": "application/x-www-form-urlencoded",
				"token" : uni.getStorageSync("token"),
			}
		}
	}
	if(!params.hideLoading) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}
	// 发起请求
	uni.request({
		url: url,
		method: method || "GET",
		header: header,
		data: data,
		dataType: "json",
		sslVerify: false,
		success: (res) => {
			if(res.code && res.code !== 1) {
				uni.showModal({
					content: res.msg
				})
				uni.hideLoading();
				return false;
			}
			uni.hideLoading();
			typeof params.success == "function" && params.success(res.data);
		},
		fail: (err) => {
			uni.showModal({
				content: err.msg
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			console.log('请求完成');
			uni.hideLoading();
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}