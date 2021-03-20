
const ApiUrl = 'https://whyjz.ltd:8080/';
const ajax = (opt) => {
	uni.showLoading({
		title: '加载中',
		mask:true
	});
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'GET';
	opt.header = opt.header || {
		"Content-Type": "application/json",
		// "version":"v010101",
		// "token":uni.getStorageSync('TOKEN')
	};
	opt.success = opt.success || function() {

	};

	uni.request({
		url: ApiUrl + opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		dataType: 'json',
		success: function(res) {
			if (res.data.code==520999) {
				uni.navigateTo({
					url: '../maintain/maintain?message=' + res.data.message,
				});
			} else if (res.data.code==520403) {
				uni.navigateTo({
					url: '../login/login?message=' + res.data.message,
				});
			}else {
				uni.stopPullDownRefresh()
				opt.success(res);
			}
			setTimeout(function(){
				uni.hideLoading();
			},300)
		},
		fail: function(res) {
			console.log(res)
			uni.showToast({
				title: '请稍后重试'
			});
		}
	})
}

export {
	ajax
}
