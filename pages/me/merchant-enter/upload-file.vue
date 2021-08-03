<template>
	<view>
		<view style="display: flex; flex-wrap: wrap;">
			<!--图片-->
			<view  style="width:550rpx;height:auto;margin:20rpx auto 0;display:flex;justify-content: space-between;flex-wrap: wrap;">
				<view v-for="(item,index) in imageList" :key="index">
					<view style="position:relative;width:250rpx;height:200rpx;margin: 20upx 0 20upx 0;">
						<image style="width:250upx;height:200upx;" :src="item" :data-src="image" @tap="previewImage"></image>
							<view style="position:absolute; right: -10rpx; top: -10rpx; z-index:1000;" @tap="delect(index)">
								<image src="/static/logo.png" style="width:30rpx;height:30rpx;" mode=""></image>
							<!--这个图标是指，图片或者视频上传成功了，点击右上角叉号（也就是这个图标）可以删除 这里自己找一个合适的替换掉就好-->
						</view>	
					</view>
				</view>
				<!--视频-->
				<view v-for="(item1, index1) in srcVideo" :key="index1">
					<view style="position:relative;width:250rpx;height:200rpx; margin: 20upx 0 20upx 0;">
						<video style="width:250upx;height:200upx;" :src="item1"></video>
						<view style="position:absolute; right: -10rpx; top: -10rpx; z-index:1000;" @tap="delectVideo(index1)">
							<image style="width:30rpx;height:30rpx;" src="/static/logo.png" mode=""></image>
						</view>
					</view>
				</view>
					<view v-if="VideoOfImagesShow" @tap="chooseVideoImage" style="width: 250rpx;height:250rpx;background-color: #F1F1F1; margin: 20rpx auto 0;display:flex; justify-content: center; align-items: center; flex-direction: column;">
					<image src="/static/logo.png" style="width:100rpx;height:100rpx;" mode=""></image>
					<view  style="font-size:30rpx;">拍照/视频</view>
				</view>
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
				srcVideo: [],//视频存放的地址
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
					maxDuration: 10,//拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
					count: 4,
					camera: this.cameraList[this.cameraIndex].value,//'front'、'back'，默认'back'
					sourceType: sourceType[this.sourceTypeIndex],
					success:res =>{
						this.srcVideo = this.srcVideo.concat(res.tempFilePath);
						if (this.srcVideo.length == 4) {
							this.VideoOfImagesShow = false;
						}
						console.log(this.srcVideo);
					}
				})
			},
			//预览图片
			previewImage: function(e){
				var current = e.target.dataset.src;
				uni.previewImage({
					current: current,
					urls: this.imageList
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
							this.srcVideo.splice(index, 1);
						}
						if (this.srcVideo.length == 4) {
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


