<template>
	<view>
		<view class="tree-container">
			<view class="user-super-container">
				 <!-- 画当前节点 -->
				 <view class="user-wife-container">
				 	<!-- 有妻子 有儿子的情况下 给当前节点添加22.5rpx的右侧内边距-->
					<view class="user-container" :style="{'padding-right':(dataSource.wife && dataSource.children) ? '22.5rpx':'0'}">
						<!-- 每个子节点头部画一个垂直的线  根节点除外 -->
						<view class="vertical-line" v-if="!isRoot"/>
						<!-- 用户信息 -->
						<view class="user-info" @tap="itemClick">
							<image class="user-avatar" :src="dataSource.isBind ? dataSource.thumb : dataSource.gender == 1 ? '/static/img/icon_default_woman.png' : '/static/img/icon_default_man.png'" mode=""></image>
							<view :class="[dataSource.isself ? 'user-self':'user-name']">
								<view class="user-name-text">
									{{dataSource.username}}
								</view>
								<image class="user-sex" :src="dataSource.gender == 1 ? '/static/img/icon_sex_woman.png' : '/static/img/icon_sex_man.png'" mode=""></image>
							</view>
						</view>
						<!-- 如果当前节点有儿子 有妻子 在节点下方画一条垂直的线 -->
						<view class="vertical-line" v-if="dataSource.children && dataSource.wife" />
					</view>
					<!-- 处理配偶 -->
					<!-- 如果有配偶 没儿子  则画一根水平线关联夫妻关系 -->
					<view class="horizontal-line" style="width:35rpx;margin-left:5rpx;margin-right:5rpx;" v-if="!dataSource.children && dataSource.wife"></view>
					<!-- 有妻子 没有儿子的情况下 给当前配偶节点添加22.5rpx的左侧内边距-->
					<view class="user-container" :style="{'padding-left':dataSource.wife && dataSource.children?'22.5rpx':'0'}">
						<!-- 每个子节点头部画一个垂直的线 由于是配偶  要透明处理 -->
						<view class="vertical-line" style="background-color:rgba(0,0,0,0)" v-if="!isRoot"></view>
						<!-- 用户信息 -->
						<view class="user-info" @tap="itemClick">
							<image class="user-avatar" :src="dataSource.wife.isBind ? dataSource.wife.thumb : dataSource.wife.gender == 1 ? '/static/img/icon_default_woman.png' : '/static/img/icon_default_man.png'" mode=""></image>
							<view class="user-name">
								<view class="user-name-text">{{dataSource.wife.username}}</view>
								<image class="user-sex" :src="dataSource.wife.gender == 1 ? '/static/img/icon_sex_woman.png' : '/static/img/icon_sex_man.png'" mode=""></image>
							</view>
						</view>
						<!-- 如果当前节点有儿子 在配偶下方画一条垂直的线 -->
						<view class="vertical-line" v-if="dataSource.children"></view>
					</view>
				</view>
				<!-- 如果当前节点有儿子并且有配偶 在夫妻下方画一条水平的线 并设置左下 右下圆角 -->
				<view class="horizontal-line left-bottom-radius right-bottom-radius" v-if="dataSource.children && dataSource.wife"></view>
			</view>
			<!-- 有多个儿子 先要画一条垂直的线 再画一条水平的线 -->
			<view v-if="dataSource.children.length > 1" class="vertical-line"></view>
			<!-- 渲染子节点 如果他的下级最后一个子节点有配偶 则下级的整个布局向右移动144rpx -->
			<view class="children-container" :style="{'margin-left':dataSource.children[dataSource.children.length-1].wife?'144rpx':'0'}" v-if="dataSource.children">
				<view class="" v-for="(item,index) in dataSource.children" :key="index">
					<view class="children-super">
						<view class="" v-if="dataSource.children.length > 1">
							<!-- 第一个的情况 -->
							<view v-if="index == 0" :class="[item.wife?'horizontal-line left-top-radius first-wife-line':'horizontal-line left-top-radius first-line']" />
							<!-- 最后一个 -->
							<view v-else-if="index == dataSource.children.length-1" :class="[item.wife?'horizontal-line right-top-radius last-wife-line':'horizontal-line right-top-radius last-line']" />
							<!-- 中间的 -->
							<view v-else class="horizontal-line" style="width:100%" />
						</view>
						<tree-chart :dataSource="item"></tree-chart>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import treeChart from './tree-chart.vue'
	export default {
		name:'treeChart',
		components:{
			treeChart
		},
		props:{
			dataSource:{
				type:Object
			},
			isRoot:{
				type:Boolean
			}
		},
		mounted() {
			console.log("this.dataSource: ",this.dataSource);
		},
		data() {
			return {

			};
		},
		methods:{
			itemClick(){
				uni.showModal({
					title:'哈哈哈'
				})
			}
		}
	}
</script>

<style>
	.tree-container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}

	.user-super-container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}

	.user-wife-container {
	  display: flex;
	  align-items: center;
	  padding-left: 22.5rpx;
	  padding-right: 22.5rpx;
	}

	.user-container {
	  width: 96rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}

	.user-info {
	  overflow: hidden;
	}

	.user-avatar {
	  margin-top: 5rpx;
	  height: 96rpx;
	  width: 96rpx;
	  display: block;
	  border-radius: 50%;
	  background-color: white;
	}

	.user-name {
	  width: 96rpx;
	  height: 32rpx;
	  border-radius: 4rpx;
	  background-color: #bbb;
	  display: flex;
	  margin-top: 12rpx;
	  margin-bottom: 5rpx;
	}

	.user-name-text {
	  font-size: 20rpx;
	  width: 80rpx;
	  margin-left: 2rpx;
	  flex: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  text-align: center;
	  text-overflow: -o-ellipsis-lastline;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 1;
	  -webkit-box-orient: vertical;
	  align-content: center;
	}

	.user-sex {
	  height: 12rpx;
	  width: 14rpx;
	}

	.user-self {
	  color: white;
	  background-color: #c69b2f;
	}

	.vertical-line {
	  height: 25rpx;
	  width: 4rpx;
	  background-color: #777;
	}

	.horizontal-line {
	  width: calc(50% + 4rpx);
	  height: 4rpx;
	  background-color: #777;
	}

	.left-bottom-radius {
	  border-bottom-left-radius: 2rpx;
	}

	.right-bottom-radius {
	  border-bottom-right-radius: 2rpx;
	}

	.left-top-radius {
	  border-top-left-radius: 2rpx;
	}

	.right-top-radius {
	  border-top-right-radius: 2rpx;
	}

	.children-container {
	  display: flex;
	  flex-direction: row;
	}

	.children-super {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}

	.first-wife-line {
	  width: calc(50% + 22.5rpx + 50rpx);
	  margin-left: calc(50% - 22.5rpx - 50rpx);
	}

	.first-line {
	  width: calc(50% + 2rpx);
	  margin-left: calc(50% - 2rpx);
	}

	.last-wife-line {
	  width: calc(50% - 22.5rpx - 46rpx);
	  margin-right: calc(50% + 22.5rpx + 46rpx);
	}

	.last-line {
	  width: calc(50% + 2rpx);
	  margin-right: calc(50% - 2rpx);
	}

	.placeholder-view {
	  width: 125rpx;
	  background-color: white;
	}

</style>
