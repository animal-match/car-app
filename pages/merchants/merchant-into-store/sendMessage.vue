<template>
	<!-- 留言板 -->
	<view class="send-message">
		<u-gap height="20" v-if="userLoginId!=storeId"></u-gap>
		<!-- 上层 留言框 -->
		<view class="container-top" v-if="true">
			<!-- 输入框和按钮盒子 -->
			<view class="input-button" v-if="userLoginId!=storeId">
				<view class="input">
					<u-form :model="form">
						<u-form-item :border-bottom="false">
							<u-input placeholder="请输入留言内容" type="text" v-model="form.message" :border="true" />
						</u-form-item>
					</u-form>
				</view>
				<view class="button">
					<u-button type="error" size="medium" :custom-style="customStyle" @click="emitMessage">留言</u-button>
				</view>
			</view>
		</view>
		<!-- 下层留言列表 -->
		<view class="container-bottom">
			<u-gap height="40"></u-gap>
			<!-- 消息列表 -->
			<view class="message-list">
				<!-- 循环体 -->
				<view class="modal" v-for="(item,index) in messageList" :key="index">
					<!-- 左侧 头像 昵称 时间 -->
					<view class="avatar-box">
						<view class="top">
							<u-image width="80" height="80" :src="item.user.avatar" shape="circle" class="avatar"></u-image>
							<view class="nickname">
								<text>{{item.user.nickname}}</text>
								<text>{{item.createtime}}</text>
							</view>
						</view>
					</view>
					<view class="message-box" @click="showAwserInput(index,item.id)">
						<view class="sender">
							{{item.message}}
						</view>
						<view class="anwser" v-if="item.reply">
							<text class="anwser-text">商家回复：</text>
							{{item.reply}}
						</view>
					</view>
					<!-- 回复输入框 -->
					<view v-if="userLoginId==storeId&&isShow==true&&activeItem==index+1" class="anwser-input">
						<view class="enter-content">
							<u-input placeholder="请输入回复内容" v-model="answer" :border="true" />
						</view>
						<view>
							<u-button :disabled="isDisabled" size="medium" type="error" :custom-style="customStyle" @click="answerSubmit(index)">回复</u-button>
						</view>
					</view>
					<u-gap height="40"></u-gap>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var clickTimes = 0;
	export default {
		data() {
			return {
				page: {
					start: 1,
					totalPages: 0
				},
				userLoginId: '', // 用户登录Id 用于判断是商家还是用户身份userloginid===storeId则是商家
				storeId: '', // 商家id
				messageList: [], // 留言列表
				activeItem: 1, // 展开选中的其中一个列表
				replyItem: 1, // 回复的对象
				isShow: false, // 显示回复框
				isDisabled: false, // 是否禁用输入框
				messageId: '', // 留言信息的id
				form: {
					message: '', // 输入留言
				},
				answer: '', // 回复内容
				customStyle: {
					width: '20px'
				}
			}
		},
		onLoad(opt) {
			this.storeId = opt.id;
			console.log('商家id',opt.id, typeof opt.id)
		},
		onShow() {
			const userLoginId = this.$store.state.user.userId; // 用户登录Id
			this.userLoginId = userLoginId;
			console.log('登录Id',this.userLoginId, typeof this.userLoginId);
			this.getMessageList();
		},
		onReachBottom() {
			console.log('到底了','起始页',this.page.start)
			if(this.page.start < this.page.totalPages) {
				this.page.start+=1;
				this.getMessageList();
			}
		},
		methods: {
			/**
			 * @desc 获取留言列表
			 * @param
			 **/
			getMessageList() {
				this.$request({
					url: "/api/message/getList",
					method: "POST",
					data: {
						store_id: this.storeId, 
						page: this.page.start, 
						list_rows: 10,
					},
					success: res => {
						if(res.code===0) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						console.log(res.data,'数据哦')
						let arr = res.data.data;
						this.messageList = this.messageList.concat(arr);
						this.page.totalPages = res.data.last_page;
					}
				})
			},
			/**
			 * @desc 用户发送留言
			 * @param
			 **/
			emitMessage() {
				this.$request({
					url: "/api/message/index",
					method: "POST",
					data: {
						store_id: this.storeId,
						message: this.form.message
					},
					success: res => {
						if(res.code===0) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						uni.showToast({
							icon: "success",
							title: "已发送",
							duration: 3000
						})
						this.page.start = 1;
						this.messageList = [];
						this.getMessageList();
						this.form.message = '';
					}
				})
			},
			/**
			 * @desc 商家回复
			 * @param
			 **/
			answerSubmit(index) {
				this.$request({
					url: "/api/message/reply",
					method: "POST",
					data: {
						id: this.messageId, // 留言id
						reply: this.answer // 回复内容
					},
					success: res => {
						if(res.code===0) {
							uni.showToast({
								icon: "none",
								title: res.msg
							})
							return false;
						}
						uni.showToast({
							icon: "success",
							title: "已发送",
							duration: 3000
						})
						this.getMessageList();
						this.answer = '';
					}
				})
				this.answer = '';
			},
			/**
			 * @desc 显示商家输入框
			 * @param {Number}
			 **/
			showAwserInput(index,messageId) {
				console.log(index,'留言ID',messageId)
				this.messageId = messageId;
				this.activeItem = index+1;
				this.isShow = true; // 显示回复输入框
			},
		}
	}
</script>

<style lang="scss" scoped>
	.send-message {
		background-color: $uni-bg-color-grey;
		min-height: 100vh;
		.container-top {
			margin: 0 30rpx;
			background: $uni-text-color-inverse;
			padding: 0 20rpx 5rpx;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.input-button {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.input {
					width: 80%;
				}
				.button {
					margin-left: 20rpx;
				}
			}
		}
		.container-bottom {
			margin: 0 30rpx 0;
			background: $uni-bg-color;
			border-radius: 20rpx;
			padding: 30rpx 20rpx;
			.message-list {
				.modal {
					display: flex;
					flex-direction: column;
					.avatar-box {
						display: flex;
						margin-bottom: 20rpx;
						.top {
							display: flex;
							.avatar {
								margin-right: 15rpx;
							}
							text {
								display: block;
								font-weight: bold;
							}
							text:nth-child(2) {
								font-size: 24rpx;
								margin-top: 10rpx;
								font-weight: 400;
								color: $uni-text-color-grey;
							}
						}
					}
					.message-box {
						background: $uni-bg-color-grey;
						border-radius: 20rpx;
						padding: 20rpx 20rpx;
						word-break: break-all;
						.sender {
							font-size:24rpx;
							padding-bottom: 10rpx;
						}
						.anwser {
							border-top: 2rpx solid $uni-bg-color-hover;
							font-size:24rpx;
							padding-top: 10rpx;
							.anwser-text {
								color: $uni-baseColor !important;
								font-weight: bolder;
							}
						}
					}
					.anwser-input {
						margin-top: 10rpx;
						display: flex;
						.enter-content {
							width: 100%;
							margin-right: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
