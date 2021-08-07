<template>
	<view class="container">
		<view class="map-page">
			<map @click="position" class="map"></map>
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
			}
		},
		methods: {
			position() {
				uni.chooseLocation({
					success: res => {
						console.log('地点名：', res.name, '详细地址：', res.address, '经度：', res.longitude, '纬度', res.latitude);
						this.addressPosition = res.address;
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
	.selected-position {
		margin: 30rpx;
		font-size: 32rpx;
		font-weight: bold;
		text:last-child {
			color: $uni-baseColor;
		}
	}
</style>
