<template>
	<view class="map-page">
		<map @click="position" class="map"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			position() {
				uni.chooseLocation({
					success: res => {
						console.log('地点名：', res.name, '详细地址：', res.address, '经度：', res.longitude, '纬度', res.latitude);
						const addressObj = {
							address: res.address,
							longitude: res.longitude,
							latitude: res.latitude
						}
						uni.$emit('addressInfo',addressObj);
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
</style>
