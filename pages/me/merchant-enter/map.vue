<template>
	<view class="container">
		<view class="map-page">
			<map @click="position" class="map" :id="myMap" ref="myMap" :longitude="address.longitude"
				:latitude="address.latitude" :markers="markers"></map>
		</view>
		<view class="selected-position">
			<text>已选择：</text>
			<text>{{addressPosition.length>0?addressPosition:'点击地图选择位置'}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressPosition: '',
				address: {
					longitude: '',
					latitude: '',
				},
				myMap: 0,
				markers: [],
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						that.address.latitude = res.latitude;
						that.address.longitude = res.longitude;
					}
				})
			},
			position() {
				uni.chooseLocation({
					success: res => {
						console.log('地点名：', res.address);
						this.addressPosition = res.address;
						this.address.longitude = res.longitude;
						this.address.latitude = res.latitude;
						let addressObj = {
							address: res.address,
							longitude: res.longitude,
							latitude: res.latitude
						}
						let pages = getCurrentPages();
						let nowPage = pages[pages.length - 1]; //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						prevPage.$vm.upData(addressObj)
						uni.navigateBack({
							delta: 1 // 可以不傳delta值，默認為1
						})
						// 这里是显示定位的气泡，暂时业务不需要，需要时可解开
						let arr = [{
							id: 1,
							longitude: res.longitude,
							latitude: res.latitude,
							name: res.address
						}]
						let markers = [];
						for (var i = 0; i < arr.length; i++) {
							markers = markers.concat({
								id: arr[i].id,
								latitude: arr[i].latitude,
								longitude: arr[i].longitude,
								callout: {
									content: arr[i].name, //文本
									color: '#ffffff', //文字颜色
									fontSize: 10, //文本大小
									borderRadius: 2, //边框圆角
									bgColor: '#00c16f', //背景颜色
									display: 'ALWAYS', //常显
								}
							})
						}
						this.markers = markers;
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.map-page {
		.map {
			width: 100%;
			height: 500rpx;
		}
	}

	.selected-position {
		margin: 30rpx;
		font-size: 32rpx;
		font-weight: bold;

		text:last-child {
			color: $uni-baseColor;
		}
	}
</style>
