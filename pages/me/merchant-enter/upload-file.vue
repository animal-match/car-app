<template>
	<view class="upload">
		<!--图片-->
		<view class="add-pictures">
			<view v-if="VideoOfImagesShow" class="add-btn" @click="chooseVideoImage">
				<view>
					<u-image src="/static/user-center-images/up.png" width="44" height="44"></u-image>
				</view>
				<view class="upload-text">选择</view>
			</view>
		</view>
		<!-- 上传图片 -->
		<view class="upload-image">
			<view v-for="(item, index) in imageList" :key="index">
				<u-image  :src="item" @click="previewImage(index)" width="200" height="150" class="pics"></u-image>
				<u-image v-if="imageList.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delect(index)"  class="close-btn"></u-image>
			</view>
		</view>
		<!-- 上传视频 -->
		<view class="upload-video">
			<view v-for="(item_1,index_1) in VideoList" :key="index_1">
				<video :src="item_1" class="video"></video>
				<u-image v-if="VideoList.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delectVideo(index_1)" class="delete-btn"></u-image>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [['camera'], ['album'], ['camera', 'album']];
	export default{
		data(){
			return {
				VideoOfImagesShow: true, // 页面图片或视频数量超出后，拍照按钮隐藏
				imageList: [], //存放图片的地址
				VideoList: [],//视频存放的地址
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				sourceTypeIndex: 2,
				cameraList: [{ value: 'back', name: '后置摄像头', checked: 'true' }, { value: 'front', name: '前置摄像头' }],
				cameraIndex: 0,//上传视频时的数量
				image: '',
			}
		},
		onUnload() {
			(this.imageList = []),(this.sourceTypeIndex = 2),(this.sourceType = ['拍摄','相册','拍摄或相册']);
		},
		methods:{
			//点击上传图片或视频
			chooseVideoImage(){
				uni.showActionSheet({
					title: '选择上传类型',
					itemList: ['图片', '视频'],
					success: res => {
						console.log(res);
						if (res.tapIndex == 0) {
							this.chooseImages();
						} else {
							this.chooseVideo();
						}
					}
				});
			},
			//上传图片
			chooseImages(){
				uni.chooseImage({
					count:4, //默认是9张
					sizeType:['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success:res=>{
						this.imageList = this.imageList.concat(res.tempFilePaths);
						//console.log(this.imageList)
						if(this.imageList.length == 4){
							this.VideoOfImagesShow = false; //图片上传数量和count一样时，让点击拍照按钮消失
						}
					}
				})
			},
			//上传视频
			chooseVideo(index){
				uni.chooseVideo({	
					maxDuration: 60,//拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
					count: 4,
					camera: this.cameraList[this.cameraIndex].value,//'front'、'back'，默认'back'
					sourceType: ['camera', 'album'],//sourceType[this.sourceTypeIndex],
					success:res =>{
						this.VideoList = this.VideoList.concat(res.tempFilePath);
						if (this.VideoList.length == 4) {
							this.VideoOfImagesShow = false;
						}
						console.log(this.VideoList,'结束');
					}
				})
			},
			//预览图片
			previewImage: function(e){
				console.log(e)
				uni.previewImage({
					current: this.imageList[e],
					urls: this.imageList,
				});
			},
			// 删除图片
			delect(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index, 1);
						}
						if (this.imageList.length == 4) {
							this.VideoOfImagesShow = false;
						} else {
							this.VideoOfImagesShow = true;
						}
					}
				});
			},
			// 删除视频
			delectVideo(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除此视频',
					success: res => {
						if (res.confirm) {
							this.VideoList.splice(index, 1);
						}
						if (this.VideoList.length == 4) {
							this.VideoOfImagesShow = false;
						} else {
							this.VideoOfImagesShow = true;
						}
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	.upload {
		min-height: 100vh;
		.add-pictures {
			
			.add-btn {
				width: 220rpx;
				height: 220rpx;
				margin-left: 30rpx;
				// background-color: $uni-text-color-inverse;
				background-color: #F4F5F6;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.upload-text {
					margin-top:20rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #606266;
				}
			}
		}
		.upload-image, .upload-video {
			margin: 0 30rpx;
			padding: 20rpx 0;
			display: flex;
			flex-wrap: wrap;
			.pics,.video {
				margin-bottom: 15rpx;
				margin-right: 15rpx;
			}
			.close-btn {
				position: relative;
				bottom: 185rpx;
				left: 175rpx;
			}
			.delete-btn {
				position: relative;
				bottom: 240rpx;
				left: 280rpx;
			}
			.video {
				width: 300rpx;
				height: 200rpx;
			}
		}
	}
</style>


