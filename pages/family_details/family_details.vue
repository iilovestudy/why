<template>
	<view>
		<view class="family-header">
			<view class="family-header-avatar">
				<!-- <image :src="familyHeaderInfo.family_avatar" mode=""></image> -->
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="family-header-name">
				{{familyHeaderInfo.family_name}}家族
			</view>
		</view>
		<view class="family-desc">
			<view class="family-desc-title">
				家族描述
			</view>
			<view class="family-desc-text">
				{{familyHeaderInfo.family_desc}}
			</view>
		</view>
		<view class="family-items">
			<view class="family-item" v-for="(item,index) in memberList" :key="index">
				<view class="member-avatar">
					<!-- <image :src="item.member_avatar" mode=""></image> -->
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="member-text">
					<view class="member-text-left">
						<view class="member-name">
							姓名：{{item.member_name}}
						</view>
						<view class="member-age">
							年龄：{{item.member_age}}
						</view>
						<view class="member-location">
							所在地：{{item.member_location}}
						</view>
					</view>
					<view class="member-text-right">
						<view class="member-relationship">
							关系：{{item.member_relationship}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				familyId:'',
				familyHeaderInfo:'',
				memberList:[],
			}
		},
		onLoad(options) {
			this.familyId = options.familyId
			this.getFamilyInfo()
		},
		methods: {
			/**
			 * 获取家庭成员列表
			 */
			getFamilyInfo(){
				this.familyHeaderInfo = {
					family_name:'DEMO',
					family_desc:'这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~这是一个DEMO~'
				}
				this.memberList = [
					{
						member_name:'why1',
						member_age:1,
						member_location:'why1',
						member_relationship:'why1'
					},{
						member_name:'why2',
						member_age:2,
						member_location:'why2',
						member_relationship:'why2'
					},{
						member_name:'wy3',
						member_age:3,
						member_location:'wy3',
						member_relationship:'wy3'
					},{
						member_name:'尼古拉斯',
						member_age:4,
						member_location:'尼古拉斯',
						member_relationship:'尼古拉斯'
					},{
						member_name:'尼赵四',
						member_age:5,
						member_location:'尼赵四',
						member_relationship:'尼赵四'
					}
				]
			}
		}
	}
</script>

<style>
	/* 家族头像及名称 */
	.family-header{
		height: 200upx;
		display: flex;
		align-items: center;
		padding-left: 20upx;
	}
	.family-header-avatar{
		height: 148upx;
		width: 148upx;
	}
	.family-header-avatar image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.family-header-name{
		font-size: 70upx;
		margin-left: 80upx;
	}
	/* 家族描述 */
	.family-desc{
		height: 140upx;
		margin: 0 10upx 0 10upx;
		padding: 20upx 60upx 20upx 60upx;
		border: 1upx solid #dedede;
		overflow: scroll;
	}
	.family-desc-title{
		font-size: 35upx;
	}
	/* 家族成员 */
	.family-item{
		height: 140upx;
		margin: 20upx 10upx 20upx 10upx;
		padding: 20upx 60upx 20upx 60upx;
		border: 1upx solid #dedede;
		display: flex;
	}
	.member-avatar{
		height: 110upx;
		width: 110upx;
	}
	.member-avatar image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.member-text{
		width: 500upx;
		display: flex;
		margin-left: 20upx;
		justify-content: space-between;
	}
</style>
