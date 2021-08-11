<template>
	<!-- 提现 -->
	<view class="fetch-cash">
		<!-- 背景 -->
		<view class="container">
			<view class="can-fetch font-24">可提现金额</view>
			<view class="show-cash">{{canFetchMoney.toFixed(2)}}</view>
		</view>
		<!-- 提现金额模块 -->
		<view class="fetch-money">
			<view class="title">提现金额</view>
			<view class="money-btn">
				<u-field
					v-model="cash"
					@focus="fetch"
				>
					<u-button slot="right" type="error" shape="circle" size="mini" @click="totalFetch">全部提现</u-button>
				</u-field>
			</view>
			<view class="tips font-24">提现后可立即到账,请注意查收</view>
		</view>
		<!-- 提现方式 -->
		<view class="confirm-way">
			<text>提现方式</text>
		</view>
		<!-- 提现按钮 -->
		<view class="confirm-btn">
			<u-button type="error" shape="circle" size="default" @click="fetchConfirm">确认提现</u-button>
		</view>
		<!-- 提现记录 -->
		<view class="fetch-records">
			<view class="fetch-records-title">提现记录</view>
			<!-- 循环体 -->
			<view v-for="(item,index) in recordsList" :key="index" class="all-details">
				<view class="left-right">
					<view class="date-time">{{item.createtime}}</view>
					<view class="total-monoey cash-color">￥{{item.money}}</view>
				</view>
				<!-- 提现详情 -->
				<view class="fetch-details">
					<!-- 第一行 -->
					<view class="first-line">
						<view>提现金额</view>
						<view class="text-color">￥{{item.money}}</view>
					</view>
					<!-- 第二行 -->
					<view class="second-line">
						<view>交易流水号</view>
						<view class="text-color">{{item.apply_sn}}</view>
					</view>
					<!-- 第三行 -->
					<view class="third-line">
						<view>提现状态</view>
						<view class="cash-color">{{item.status_text}}</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view v-if="page.page===page.totalPages" class="nomore">---没有更多了---</view>
		<u-gap height="20"></u-gap>
		<u-keyboard mode="number" @change="valChange" @backspace="backspace" v-model="showKeyboard" @cancel="cancel" @confirm="confirm" confirm-text="确定" cancel-text="清空" :dot-enabled="false" :mask-close-able="false"></u-keyboard>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showKeyboard: false, // 显示数字键盘
				canFetchMoney: 3000, // 可提现金额
				cash: '',// 提现金额
				recordsList: [],
				page: { // 分页参数
					totalPages: 0,
					page: 1, // 初始页
				},
			}
		},
		onShow() {
			this.fetchList();
		},
		onReachBottom() {
			console.log('触底！');
			if(this.page.page < this.page.totalPages) {
				this.page.page+=1;
				this.fetchList();
			}
		},
		methods: {
			/**
			 * @desc 全部提现
			 * @param 
			 **/
			totalFetch() {
				this.cash = this.canFetchMoney.toFixed(2);
			},
			/**
			 * @desc 提现记录列表
			 * @param 
			 **/
			fetchList() {
				this.$request({
					url: "/api/withdrawal/index",
					method: "POST",
					data: {page: this.page.page},
					success: res => {
						if(!!res&&res.code&&res.code!==1) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
						let arr = res.data.data;
						this.recordsList = this.recordsList.concat(arr);
						console.log(this.recordsList,'列表')
						this.page.totalPages = res.data.last_page;
					},
					fail: res => {
						uni.showToast({
							title: res.msg,
							icon: none
						})
					}
				});
			},
			/**
			 * @desc 激活输入框，打开数字键盘
			 * @param 
			 **/
			fetch() {
				uni.hideKeyboard(); //隐藏手机自带键盘
				this.showKeyboard = true;
			},
			/**
			 * @desc 数字键盘输入事件
			 * @param {string}
			 **/
			valChange(val) {
				this.cash += val;
				console.log('你输入的金额',this.cash);
			},
			/**
			 * @desc 数字键盘退格事件
			 * @param 
			 **/
			backspace() {
				if(this.cash.length) this.cash = this.cash.substr(0, this.cash.length-1);
				console.log('你输入的金额（退格后)',this.cash);
			},
			/**
			 * @desc 数字键盘左上角取消
			 * @param 
			 **/
			cancel() {
				this.cash = '';
			},
			/**
			 * @desc 数字键盘右上角确定
			 * @param 
			 **/
			confirm() {
				this.cash = Number(this.cash).toFixed(2);
			},
			/**
			 * @desc 确认提现
			 * @param 
			 **/
			fetchConfirm() {
				if(this.cash <= 0) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					})
				} else {
					if(this.cash > this.canFetchMoney) {
						uni.showToast({
							title: '超出可提现金额范围',
							icon: 'none'
						})
						return false;
					}
					const token = uni.getStorageSync("token");
					this.$request({
						url: "/api/withdrawal/apply",
						method: "POST",
						data: {
							money: this.cash,
							token: token
						},
						success: res => {
							console.log('提现成功')
							uni.navigateTo({
								url: 'fetch-success?cash='+this.cash,
							})
							this.cash = '';
						}
					})
				}
			},
		}
	}
</script>
<style lang="scss">
	.fetch-cash {
		background-color: $uni-bg-color-grey !important;
		min-height: 100vh;
	}
</style>
<style lang="scss" scoped>
	.font-24 {
		font-size: 24rpx;
	}
	.font-28 {
		font-size: 28rpx;
	}
	.cash-color {
		color: $uni-baseColor;
	}
	.text-color {
		color: $uni-text-color-grey;
	}
	.nomore {
		font-size:28rpx;
		color: $uni-text-color-grey;
		text-align: center;
	}
	.container {
		height: 455rpx;
		background-color: $uni-baseColor;
		.show-cash, .can-fetch {
			text-align: center;
			color: $uni-text-color-inverse;
		}
		.can-fetch {
			padding: 100rpx 0 39rpx;
		}
		.show-cash {
			font-size: 60rpx;
		}
	}
	.fetch-money {
		height: 260rpx;
		background-color: $uni-text-color-inverse;
		border-radius: 20rpx;
		margin: 0 30rpx;
		position: relative;
		top: -125rpx;
		padding: 27rpx 30rpx 35rpx;
		.title {
			padding-bottom: 38rpx;
		}
		.money-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			.money {
				font-size: 48rpx;
			}
		}
		.tips {
			color: $uni-text-color-grey;
		}
	}
	.confirm-way {
		padding-left: 28rpx;
		font-size: 28rpx;
		height: 134rpx;
		line-height: 134rpx;
		background-color: $uni-text-color-inverse;
		margin: 0 30rpx;
		position: relative;
		top: -100rpx;
		border-radius: 20rpx;
		background-image: url(/static/user-center-images/distributor/wechat.png);
		background-repeat: no-repeat;
		background-size: 182rpx 62rpx;
		background-position: 180rpx 35rpx;
	}
	.confirm-btn {
		padding: 0 30rpx;
		padding-bottom: 106rpx;
	}
	.fetch-records {
		border-radius: 20rpx;
		margin: 0 30rpx;

		padding: 0 30rpx;
		background-color: $uni-text-color-inverse;
		.fetch-records-title {
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 2rpx solid $uni-bg-color-grey;
		}
		.all-details {
			.left-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 77rpx;
				line-height: 77rpx;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				.date-time {
					
				}
				.total-money {
					
				}
			}
			.fetch-details {
				height: 201rpx;
				line-height: 50rpx;
				padding: 20rpx 0 10rpx;
				border-bottom: 2rpx solid $uni-bg-color-grey;
				.first-line, .second-line, .third-line {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
				}
			}
		}
	}
</style>