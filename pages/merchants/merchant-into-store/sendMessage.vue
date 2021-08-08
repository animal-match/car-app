<template>
	<!-- 留言板 -->
	<view class="send-message">
		<u-gap height="20"></u-gap>
		<!-- 上层 留言框 -->
		<view class="container-top" v-if="true">
			<!-- 输入框和按钮盒子 -->
			<view class="input-button">
				<view class="input">
					<u-form :model="form">
						<u-form-item :border-bottom="false">
							<u-input placeholder="请输入留言内容" type="text" v-model="form.message" :border="true" />
						</u-form-item>
					</u-form>
				</view>
				<view class="button">
					<u-button type="error" size="medium" :custom-style="customStyle">留言</u-button>
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
							<u-image width="80" height="80" :src="item.avatarUrl" shape="circle" class="avatar"></u-image>
							<view class="nickname">
								<text>{{item.nickName}}</text>
								<text>{{item.dateTime}}</text>
							</view>
						</view>
					</view>
					<view class="message-box" @click="showAwserInput(index)">
						<view class="sender">
							{{item.sendMessage}}
						</view>
						<view class="anwser" v-if="item.answerMessage">
							<text class="anwser-text">回复：</text>
							{{item.answerMessage}}
						</view>
					</view>
					<!-- 回复输入框 -->
					<view v-if="isShow==true&&activeItem==index+1" class="anwser-input">
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
				messageList: [
					{
						avatarUrl:'https://pic1.zhimg.com/v2-3f73f9a06801f5f7405fcba09715edae_r.jpg?source=1940ef5c',
						nickName: '不可爱233',
						dateTime: '2021/10/12 13:29:30',
						sendMessage: '我想买一个8成新左右的品牌三轮，下单以后可以尽快发货吗？',
						answerMessage: '没问题，我们会尽快安排',
					},
					{
						avatarUrl: 'https://pic1.zhimg.com/80/v2-efb69ed639b04c9952aeb8cd3163bf8e_1440w.jpg?source=1940ef5c',
						nickName: '走心小卖家',
						dateTime: '2021/10/10 19:33:50',
						sendMessage: '你们家有5台三轮吗？给我来5台',
						// answerMessage: '有的哦亲',
					},
					{
						avatarUrl: 'https://pic1.zhimg.com/80/v2-efb69ed639b04c9952aeb8cd3163bf8e_1440w.jpg?source=1940ef5c',
						nickName: '我是复制人',
						dateTime: '2021/10/10 19:33:50',
						sendMessage: '你们家有5台三轮吗？给我来5台',
						// answerMessage: '有的哦亲',
					}
				],
				activeItem: 1, // 展开选中的其中一个列表
				replyItem: 1, // 回复的对象
				isShow: false, // 显示回复框
				isDisabled: false, // 是否禁用输入框
				answerTimes: 0, // 回复次数
				form: {
					message: '', // 输入留言
				},
				answer: '', // 回复内容
				customStyle: {
					width: '20px'
				}
			}
		},
		onShow() {
			let value = uni.getStorageSync('answerTimes'); // 页面初始化获取已回复的次数
			this.answerTimes = value || 0;
			console.log('回复次数',this.answerTimes);
			// let value2 = uni.getStorageSync('replyObj');
			// this.replyItem = value2 || 1;
		},
		methods: {
			/**
			 * @desc 显示经销商输入框
			 * @param
			 **/
			showAwserInput(index) {
				console.log(index)
				this.activeItem = index+1;
				this.isShow = true; // 显示回复输入框
			},
			/**
			 * @desc 提交回复内容
			 * @param
			 **/
			answerSubmit(index) {
				this.answer = '';
			}
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
