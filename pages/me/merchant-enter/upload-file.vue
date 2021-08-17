<template>
	<view class="upload">
		<!--大盒子-->
		<u-gap height="30"></u-gap>
		<view class="container">
			<view class="upload-title">产品信息</view>
			<view class="upload-desc">上传自身优势产品图，让我们更了解你</view>
			<view class="upload-input-title"><text class="start">*</text>标题</view>
			<view class="upload-input">
				<u-input v-model.trim="inputValue" type="text" :border="true" maxlength="30"/>
			</view>
			<view class="add-elements">添加图片/视频</view>
			<!-- 上传图片 -->
			<view class="upload-image">
				<view v-for="(item, index) in imageList" :key="index">
					<u-image :src="item" @click="previewImage(index)" width="200" height="150" class="pics">
					</u-image>
					<u-image v-if="imageList.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delect(index)"  class="close-btn"></u-image>
				</view>
			</view>
			<!-- 上传视频 -->
			<view class="upload-video">
				<view style="width: 310rpx;" v-for="(item_1,index_1) in VideoList" :key="index_1">
					<video :src="item_1" class="video"></video>
					<u-image v-if="VideoList.length>0" src="/static/user-center-images/close.png" width="40" height="40" @click="delectVideo(index_1)" class="delete-btn"></u-image>
				</view>
			</view>
			<view class="add-pictures">
				<view v-if="VideoOfImagesShow" class="add-btn" @click="chooseVideoImage">
					<view>
						<u-image src="/static/user-center-images/up.png" width="44" height="44"></u-image>
					</view>
					<view class="upload-text">选择图片/视频</view>
				</view>
				<u-gap height="30"></u-gap>
			</view>
		</view>
		<u-gap height="90"></u-gap>
		<view class="save-btn">
			<u-button type="error" shape="circle" @click="submit">保存</u-button>
		</view>
		<u-gap height="40"></u-gap>
	</view>
</template>

<script>
	var sourceType = [['camera'], ['album'], ['camera', 'album']];
	export default{
		data(){
			return {
				imageUrl: '', // 后端图片链接
				inputValue: '', // 标题输入框
				videoUrl: '', // 后端视频链接
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
			// 保存按钮
			submit() {
				if(this.inputValue.length<1) {
					uni.showToast({
						icon: "none",
						title: "请输入标题"
					})
					return 
				}
				if(this.imageList.length==0) {
					uni.showToast({
						icon: "none",
						title: "请上传产品图片或视频"
					})
					return 
				}
				let productDatas = {
					title: this.inputValue,
					imageShow: this.imageList[0], // 用来在商家入驻产品上传页面时显示图片
					image: this.imageUrl, // 用来传给后端
				};
				let productDatas2 = {
					title: this.inputValue,
					videoShow: this.VideoList[0],
					video: this.videoUrl,
				}
				 uni.showToast({
				 	icon: "success",
					title: "已保存"
				 })
				 if(!!productDatas.imageShow) {
				 	uni.$emit('proDatas', productDatas); // 图片和标题 发过去进行显示
				 }
				 if(!!productDatas2.videoShow) {
				 	uni.$emit('proDatas2', productDatas2); // 视频和标题 发过去进行显示
				 }
				this.inputValue = '';
				this.imageList = [];
				this.VideoList = [];
			},
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
					count:1, //默认是9张
					sizeType:['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success:res=>{
						this.imageList = this.imageList.concat(res.tempFilePaths);
						console.log(this.imageList,'你选择的图片')
						if(this.imageList.length == 1){
							this.VideoOfImagesShow = false; //图片上传数量和count一样时，让点击拍照按钮消失
						}
						uni.uploadFile({
							url: "https://yanxu.n867.cn/index.php/api/common/upload",
							header: { 
								"content-type": "application/x-www-form-urlencoded",
								"token" : uni.getStorageSync("token"),
							},
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data,'res!!');
								let data=JSON.parse(uploadFileRes.data);
								this.imageUrl = data.data.fullurl;
								console.log('图片地址',this.imageUrl);
							}
						})
					}
				})
			},
			//上传视频
			chooseVideo(index){
				uni.chooseVideo({	
					maxDuration: 60,//拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
					count: 1,
					camera: this.cameraList[this.cameraIndex].value,//'front'、'back'，默认'back'
					sourceType: sourceType[this.sourceTypeIndex],//['camera', 'album'],//sourceType[this.sourceTypeIndex],
					success:res =>{
						this.VideoList = this.VideoList.concat(res.tempFilePath);
						console.log(this.VideoList,'你选择的视频')
						if (this.VideoList.length == 1) {
							this.VideoOfImagesShow = false;
						}
						uni.uploadFile({
							url: "https://yanxu.n867.cn/index.php/api/common/upload",
							header: { 
								"content-type": "application/x-www-form-urlencoded",
								"token" : uni.getStorageSync("token"),
							},
							filePath: res.tempFilePath,
							name: 'file',
							success: (uploadFileRes) => {
								console.log('上传视频!!',uploadFileRes);
								this.videoUrl = uploadFileRes.data.fullurl;
								console.log('视频地址',this.videoUrl);
							}
						})
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
							this.imageUrl = '';
						}
						if (this.imageList.length == 1) {
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
							this.videoUrl = '';
						}
						if (this.VideoList.length == 1) {
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
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
		.container {
			background-color: $uni-text-color-inverse;
			border-radius: 20rpx;
			margin: 0rpx 30rpx;
			padding-top: 54rpx;
			.upload-title, .upload-desc, .upload-input-title, .upload-input, .add-elements {
				padding: 0 30rpx;
				.start {
					color: $uni-baseColor;
				}
			}
			.add-elements {
				text-align: right;
				margin: 44rpx 0 20rpx 0;
				 color: $uni-baseColor;
			}
			.upload-title {
				font-size: 36rpx;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
			.upload-desc {
				font-size: 24rpx;
				color: #828282;
				margin-bottom: 46rpx;
			}
			.upload-input-title {
				font-size: 28rpx;
				color: #424242;
				margin-bottom: 30rpx;
			}
			// 选择图片按钮
			.add-pictures {
				display: flex;
				justify-content: flex-end;
				padding: 0 30rpx 30rpx 0;
				.add-btn {
					width: 220rpx;
					height: 220rpx;
					// margin-left: 30rpx;
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
			// 上传图片、视频
			.upload-image, .upload-video {
				margin: 0 20rpx;
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				view {
					margin-right: 15rpx !important;
				}
				.pics,.video {
					margin: 0 15rpx 15rpx 0 !important;
				}
				.close-btn {
					position: relative;
					top: -200rpx;
					left: 180rpx;
					z-index: 99;
				}
				/deep/.u-image__image {
					position: relative !important;
					bottom: 0 !important;
				}
				.delete-btn {
					height: 22rpx;
					position: relative;
					bottom: 240rpx;
					left: 280rpx;
					z-index: 99;
				}
				.video {
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
		.save-btn {
			margin: 0 30rpx;
		}
	}
</style>


