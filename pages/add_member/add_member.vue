<template>
	<view>
		<view class="purchase_top">
			<view class="title_item">
				<view class="title_text">
					姓名
				</view>
				<view class="title_detail">
					<input type="text" value="" v-model="member_name" placeholder="请填写姓名" />
				</view>
			</view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="title_item border_bottom">
					<view class="title_text">
						出生日期
					</view>
					<view class="title_detail">
						{{birthday}}
						<image src="../../static/img/mine_next.png" mode=""></image>
					</view>
				</view>
			</picker>
			<view class="title_item" @tap="show_sex_mask">
				<view class="title_text">
					性别
				</view>
				<view class="title_detail">
					{{sex_show.value}}
					<image src="../../static/img/mine_next.png" mode=""></image>
				</view>
			</view>
			<view class="title_item" @tap="show_relation_mask">
				<view class="title_text">
					关系
				</view>
				<view class="title_detail">
					{{relation_show.value}}
					<image src="../../static/img/mine_next.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="mask" @tap="hide_mask" v-show="sex_mask">
			<view class="time_mask">
				<view class="time_submit">
					<view class="font_weight">
						选择性别
					</view>
					<view class="">
						<!-- 确定 -->
					</view>
				</view>
				<view class="max_height">
					<view class="time_date" v-for="(item,index) in sex_list" :key='index' @tap.stop="sex_choose(item,index)">
						{{item.value}}
					</view>
				</view>
			</view>
		</view>
		<view class="mask" @tap="hide_mask" v-show="relation_mask">
			<view class="time_mask">
				<view class="time_submit">
					<view class="font_weight">
						选择关系
					</view>
					<view class="">
						<!-- 确定 -->
					</view>
				</view>
				<view class="max_height">
					<view class="time_date" v-for="(item,index) in relation_list" :key='index' @tap.stop="relation_choose(item,index)">
						{{item.value}}
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @tap="confimMember">
			确认
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/common.js'
	function getMyDate(type) {
		const date = new Date();

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				date: getMyDate({
					format: true
				}),
				birthday: getMyDate({
					format: true
				}),
				stock_time: Date.parse(getMyDate({
					format: true
				})) / 1000,
				startDate: getMyDate('start'),
				endDate: getMyDate('end'),
				sex_list:[{
					key:'woman',
					value:'女'
				},{
					key:'man',
					value:'男'
				}],
				sex_mask:false,
				sex_show:{
					key:'woman',
					value:'女'
				},
				relation_mask:false,
				relation_list:[{
					key:'parent',
					value:'父母',
				},{
					key:'child',
					value:'孩子',
				}],
				relation_show:{
					key:'child',
					value:'孩子',
				},
				member_name:'',
			}
		},
		methods: {
			/**
			 * @param {Object} e
			 * @description 监听日期变化
			 */
			bindDateChange: function(e) {
				this.birthday = e.detail.value
				this.stock_time = Date.parse(e.detail.value) / 1000
			},
			/**
			 * @description 显示性别弹窗
			 */
			show_sex_mask(){
				this.sex_mask = true
			},
			/**
			 * @description 显示关系弹窗
			 */
			show_relation_mask(){
				this.relation_mask = true
			},
			/**
			 * @description 隐藏弹窗
			 */
			hide_mask(){
				this.sex_mask = false
				this.relation_mask = false
			},
			/**
			 * @param {Object} item
			 * @param {Object} index
			 * @description 性别选择事件
			 */
			sex_choose(item,index){
				this.sex_mask = false
				this.sex_show = item
			},
			/**
			 * @param {Object} item
			 * @param {Object} index
			 * @description 关系选择事件
			 */
			relation_choose(item,index){
				this.relation_mask = false
				this.relation_show = item
			},
			/**
			 * @description 确认创建成员
			 */
			confimMember(){
				uni.navigateBack({
					
				})
				
			}
		}
	}
</script>

<style>
	page{
		padding: 20upx 20upx 20upx 20upx;
	}
	.purchase_top {
		width: 690upx;
		background: #FFFFFF;
		padding: 0 30upx;
		box-sizing: border-box;
		border-radius: 25upx;
		box-shadow: 0 5upx 10upx 0 rgba(79, 79, 79, 0.07);
		margin-bottom: 40upx;
	}
	.title_item {
		padding: 30upx 0;
		color: #333333;
		font-size: 28upx;
		border-bottom: 1upx solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title_item:last-child {
		border: none;
	}

	.border_bottom {
		border-bottom: 1upx solid #DDDDDD !important;
	}
	.title_text {
		font-weight: bold;
		width: 150upx;
	}

	.title_detail {
		width: 500upx;
		text-align: right;
	}

	.title_detail image {
		width: 14upx;
		height: 24upx;
		margin-left: 20upx;
	}

	.title_detail input {
		text-align: right;
		float: right;
	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.45);
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
	}
	.time_mask {
		position: absolute;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		font-size: 34upx;
		width: 100%;
	}
	.time_submit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40upx;
		font-size: 32upx;
		height: 100upx;
		border-bottom: 1rpx solid rgba(208, 208, 208, 0.8);
		background: #D0D0D0;
	}
	.font_weight {
		font-weight: bold;
	}
	.time_date {
		border-bottom: 1rpx solid rgba(208, 208, 208, 0.8);
		text-align: center;
		height: 120upx;
		line-height: 120upx;
	}
	.max_height{
		max-height: 900upx;
		overflow-y: auto;
	}
	.btn {
		position: absolute;
		bottom: 50upx;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 650upx;
		height: 98upx;
		opacity: 1;
		background: #ffffff !important;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		font-size: 36upx;
		border-radius: 50upx;
		border: 1px solid #b9b9b9;
	}
</style>
