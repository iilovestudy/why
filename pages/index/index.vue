<template>
	<view>
		<view class="top-btn">
			<view class="select-family" @tap="showSelections">
				{{selectFamily.value}}
				<image class="down-icon" src="../../static/down.png" mode=""></image>
			</view>
			<view class="select-family" @tap="familyDetails">
				<span>家族详情</span>
			</view>
		</view>
		<view class="select-list" v-if="isShowSelections">
			<view class="select-item" v-for="(item,index) in selectionList" :key="index" @tap="selectItem(item,index)">
				{{item.value}}
			</view>
		</view>
		<movable-area v-if="dataSource" style="height: 100vh;">
			<movable-view id="rootTree" scale direction="all" :style="{width:myWidth == 0 ? 'auto' : myWidth + 'px',height:myHeight == 0 ? 'auto' : myHeight + 'px'}" :x="-myWidth/2 + windowWidth/2">
				<tree-chart :dataSource="dataSource" :isRoot="true" ></tree-chart>
			</movable-view>
		</movable-area>
		<view class="person-message" v-show="isShowPersonMessage">
			<view class="message-title">
				<view class="message-title-icon">
					<image src="../../static/play.png" mode=""></image>
				</view>
				<view class="message-title-text">
					个人信息
				</view>
			</view>
			<view class="">
				<view class="person-avatar">
					<image src="../../static/shuijiao.jpg" mode=""></image>
				</view>
				<view class="person-text">

				</view>
			</view>
			<view class="pencel-icon">
				<image src="../../static/play.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				familyId:'',
				isShowPersonMessage:false,
				dataSource:{},
				myWidth: 0,
				myHeight: 0,
				windowWidth:0,
				windowHeight:0,
				isShowSelections:false,
				selectFamily:{
					key:'01',
					value:'赵家'
				},
				selectionList: [{
					key:'01',
					value:'赵家'
				},{
					key:'02',
					value:'钱家'
				},{
					key:'03',
					value:'孙家'
				},{
					key:'04',
					value:'李家'
				}],
			}
		},
		onLoad() {
			uni.login({
				provider:'weixin',
				scopes:'auth_base',
				success: (res) => {
					console.log(res)
					uni.getUserInfo({
						provider:'weixin',
						success: (res) => {
							console.log("res: ",res);
						}
					})
				}
			})
		},
		onReady() {
			let that = this
			let winInfo = uni.getSystemInfo({
				success: function(res) {
					that.windowWidth = res.windowWidth;
					that.windowHeight = res.windowHeight;
					that.getDataSource()
				}
			});
		},
		onShow() {
			that.getDataSource()
		},
		methods: {
			familyDetails(){
				uni.navigateTo({
					url:'../family_details/family_details?familyId=' + this.familyId
				})
			},
			getDataSource(){
				let jsonData = "{\"name\":\"\",\"relationid\":34,\"username\":\"王先生\",\"gender\":0,\"thumb\":\"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIpYoDe6gaZwdbLsZSohOBLgbOib6GCOCn9ulwjXUm4v26HeqA05n0VEWLib7QbBowreO9PUamOrB0w/132\",\"level\":null,\"child\":\"35,36,51\",\"is_wife\":\"0\",\"isBind\":1,\"isself\":true,\"children\":[{\"name\":\"郭先生\",\"relationid\":35,\"gender\":0,\"username\":\"郭先生\",\"thumb\":\"\",\"level\":3,\"child\":\"37,43\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"凤姐\",\"relationid\":43,\"gender\":1,\"username\":\"凤姐\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false},\"children\":[{\"name\":\"吴先生\",\"relationid\":37,\"gender\":0,\"username\":\"吴先生\",\"thumb\":\"\",\"level\":3,\"child\":\"38,39,42,45\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"乔碧萝\",\"relationid\":42,\"gender\":1,\"username\":\"乔碧萝\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false},\"children\":[{\"name\":\"严先生\",\"relationid\":38,\"gender\":0,\"username\":\"严先生\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"0\",\"isBind\":0,\"isself\":false},{\"name\":\"张先生\",\"relationid\":39,\"gender\":0,\"username\":\"张先生\",\"thumb\":\"\",\"level\":3,\"child\":\"44\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"蔡徐坤\",\"relationid\":44,\"gender\":1,\"username\":\"蔡徐坤\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}},{\"name\":\"陈先生\",\"relationid\":45,\"gender\":0,\"username\":\"陈先生\",\"thumb\":\"\",\"level\":3,\"child\":\"49,58\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"children\":[{\"name\":\"邓先生\",\"relationid\":49,\"gender\":0,\"username\":\"邓先生\",\"thumb\":\"\",\"level\":3,\"child\":\"50\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"彭女士\",\"relationid\":50,\"gender\":1,\"username\":\"彭女士\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}},{\"name\":\"谭先生\",\"relationid\":58,\"gender\":0,\"username\":\"谭先生\",\"thumb\":\"\",\"level\":3,\"child\":\"59\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"欧阳先生\",\"relationid\":59,\"gender\":1,\"username\":\"欧阳先生\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}}]}]}]},{\"name\":\"焦先生\",\"relationid\":36,\"gender\":0,\"username\":\"焦先生\",\"thumb\":\"\",\"level\":3,\"child\":\"41,46,47\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"张女士\",\"relationid\":41,\"gender\":1,\"username\":\"张女士\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false},\"children\":[{\"name\":\"黄先生\",\"relationid\":46,\"gender\":0,\"username\":\"黄先生\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"0\",\"isBind\":0,\"isself\":false},{\"name\":\"纪先生\",\"relationid\":47,\"gender\":0,\"username\":\"纪先生\",\"thumb\":\"\",\"level\":3,\"child\":\"48\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"候女士\",\"relationid\":48,\"gender\":1,\"username\":\"候女士\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}}]},{\"name\":\"周先生\",\"relationid\":51,\"gender\":0,\"username\":\"周先生\",\"thumb\":\"\",\"level\":3,\"child\":\"52,53,54,55\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"程先生\",\"relationid\":54,\"gender\":1,\"username\":\"程先生\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false},\"children\":[{\"name\":\"李先生\",\"relationid\":52,\"gender\":0,\"username\":\"李先生\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"0\",\"isBind\":0,\"isself\":false},{\"name\":\"徐先生\",\"relationid\":53,\"gender\":0,\"username\":\"徐先生\",\"thumb\":\"\",\"level\":3,\"child\":\"57\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"朱女士\",\"relationid\":57,\"gender\":1,\"username\":\"朱女士\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}},{\"name\":\"方先生\",\"relationid\":55,\"gender\":0,\"username\":\"方先生\",\"thumb\":\"\",\"level\":3,\"child\":\"56\",\"is_wife\":\"0\",\"isBind\":0,\"isself\":false,\"wife\":{\"name\":\"高女士\",\"relationid\":56,\"gender\":1,\"username\":\"高女士\",\"thumb\":\"\",\"level\":3,\"child\":null,\"is_wife\":\"1\",\"isBind\":0,\"isself\":false}}]}]}";
				this.dataSource = JSON.parse(jsonData)
				if(this.dataSource.length == 0){
					uni.navigateTo({
						url:'../add_member/add_member'
					})
				}
				if (this.dataSource) {
					///渲染完成后获取子组件大小重新设置宽高
					let that = this
					this.$nextTick(function(){
						const query = uni.createSelectorQuery().in(that);
						query.select('#rootTree').boundingClientRect(data => {
							that.myWidth = data.width > that.windowWidth ? data.width : that.windowWidth
							that.myHeight = data.height > that.windowHeight ? data.height : that.windowHeight
						}).exec();
					})

				}
			},
			showSelections(){
				this.isShowSelections = !this.isShowSelections
			},
			selectItem(item,index){
				this.isShowSelections = false
				this.selectFamily = item
			},
			hideMask(){
				this.isShowSelections = false
			}
		}
	}
</script>

<style>
	page{
	  background-color: #753636;
	}
	movable-area{
	  overflow: hidden;
	  width: 100vw;
	}

	movable-view {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

	.top-btn{
		display: flex;
		justify-content: space-between;
		margin: 10rpx 10rpx 0 10rpx;
	}

	.select-family{
		width: 250rpx;
		height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		background: white;
	}
	.down-icon{
		width: 20rpx;
		height: 10rpx;
		margin-left: 60rpx;
	}
	.select-list{
		position: absolute;
		z-index: 999;
		max-height: 500rpx;
		width: 250rpx;
		border-radius: 10rpx;
		background: white;
		margin: 0 10rpx 10rpx 10rpx;
		border: 1rpx solid #8c8c8c;
		overflow: scroll;
	}
	.select-item{
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		margin-left: 20rpx;
		width: 200rpx;
		border-bottom: 1rpx solid #8c8c8c;
	}

	.person-message{
		width: 100%;
		height: 200rpx;
		background: #ffaa7f;
		color: #333333;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.message-title-icon{
		height: 50rpx;
		width: 50rpx;
	}
	.message-title-icon image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.person-avatar{
		height: 110rpx;
		width: 110rpx;
	}
	.person-avatar image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.pencel-icon{
		height: 50rpx;
		width: 50rpx;
	}
	.pencel-icon image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
</style>
