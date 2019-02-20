/**
 * 调用示例
 * 
 * var configParam = { moid: moid, forcategoryid: categoryid };
 * top.CentralProxy.createClue(configParam, function(response){
 *  }) 或者 CentralProxy.createClue(configParam, function(response){
 *  })
 * 
 */

var CentralProxy = {
	SUCCESS : 0,
	CLIENT_ERROR : -20000,
	SERVER_ERROR : -10000,
	UNKNOWN : -1,
	showIndex : function() {
		top.location.href = '/central/';
	},
	__safeCallback : function(callback, data, extra) {
		if ('undefined' === typeof data) {
			return;
		}
		if ('function' === typeof callback) {
			callback(data, extra);
		}
	},
	project : '/central',
	newsphereProjectLocation : 'http://localhost:8080',
	// newsphereProjectLocation: 'http://newsphere.cloud.jstv.com',
	// publishAgentLocation:
	// 'http://newsphere.cloud.jstv.com:8380/publishagent/services/getflowdata',
	// 微博微信云视 TODO
	blogWechatLocation : 'http://interface.cdvcloud.com/jstv/V1/cdvcloud/jstv001/zyds/data/',

	/**
	 * 长江云公共主页获取最新报片（不需要session）
	 */
	search : function(param, callback, extra, realNameFlag) {
		$.ajax({
					// url : this.newsphereProjectLocation +
					// '/web/api/show/search' +
					// (realNameFlag===true?'?realNameFlag=true':''),
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.clue').queryUrl
							+ (realNameFlag === true ? '?realNameFlag=true'
									: ''),
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					}
				});
	},

	searchComb : function(param, callback, extra) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.clue').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					}
				});
	},
	getUserName : function(callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.clue').findName,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	getAssetAndRelatedAssets : function(id, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.rundown').queryUrlAssets
							+ "?moId=" + id,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	getRundownTitles : function(moids, callback) {
		$
				.ajax({
					url : "/central/api/data/routeHeader",
					type : 'GET',
					async : true,
					cache : false,
					headers : {
						"url" : ModuleConfigHelper
								.getConfigByModuleName('ns.daily.rundown').queryUrlTitles
								+ "?" + moids
					},
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	// 索贝报道流
	getSobeyTitles : function(callback) {
		$.ajax({
			url : "/central/api/data/routeHeader",
			type : 'GET',
			async : true,
			cache : false,
			headers : {
				"url" : ModuleConfigHelper
						.getConfigByModuleName('ns.daily.titleSobey').queryUrl
			},
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getReportStatistics : function(keyword, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.data').queryUrl
							+ keyword,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	getPhotosData : function(callback) {
		$.ajax({
					// url :
					// 'http://data.cloud.jstv.com:31801/service/bd/get/action=query&PrintFields=title,DRECONTENT,dredate,PATH_IMAGE,CATEGORY_TWO&anylanguage=true&OutputEncoding=UTF8&TotalResults=true&Predict=false&sort=date&anylanguage=true&responseformat=json&Start=1&MaxResults=35&fieldtext=MATCH%7B%E6%97%B6%E6%94%BF%E8%A6%81%E9%97%BB%7D:CATEGORY_THREE&databasematch=network',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.special.photos').queryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	getWorkingWorkitemNameStr : function(moID, callback) {
		$.ajax({
					// url : this.newsphereProjectLocation +
					// '/web/api/show/getWorkItemAndPrevWorkerName',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.topic').getWorkItemAndPrevWorkerNameUrl,
					type : 'GET',
					async : true,
					cache : false,
					contentType : 'application/json; charset=UTF-8',
					data : {
						moID : moID
					},
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	getTitles : function(callback) {
		$.ajax({
					// url : this.newsphereProjectLocation +
					// '/web/api/show/title?count=30',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.title').queryUrl,
					type : 'GET',
					async : true,
					cache : false,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	// getReports为荔枝版本今日报道
	getReports : function(callback) {
		$.ajax({
					// url : this.newsphereProjectLocation +
					// '/web/api/show/title?count=30',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.reports').queryUrl,
					type : 'GET',
					async : true,
					cache : false,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	getTitleCounts : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.title').queryUrlAssets,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				})
	},
	/**
	 * 微博微信发布统计
	 */
	getWWStatistics : function(param, callback) {
		$.ajax({
			url : this.blogWechatLocation + 'getWWStatistics',
			// url :
			// ModuleConfigHelper.getConfigByModuleName('ns.blog.data').queryUrl,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	/*
	 * 轨迹
	 */
	getTrack : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.analysis.track').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	/**
	 * 获取微博排行
	 */
	getWeiboRank: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeiboRank',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.blog.top').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	/*
	 * 记者报道数量
	 */
	getUserTitle : function(startTime, endTime, callback, column) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.reports.user').queryUrl
							+ "&startTime=" + startTime + "&endTime=" + endTime + "&column=" + column,
					// url :
					// ModuleConfigHelper.getConfigByModuleName('ns.reports.user').queryUrl,
					type : 'GET',
					async : true,
					cache : true,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/*
	 * 记者报道数量丹阳
	 */
	getUserTitleDY : function(startTime, endTime, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.reports.userDY').queryUrl
							+ "&startTime=" + startTime + "&endTime=" + endTime+ "&column=",
					// url :
					// ModuleConfigHelper.getConfigByModuleName('ns.reports.user').queryUrl,
					type : 'GET',
					async : true,
					cache : true,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/*
	 * 栏目id2name
	 */
	getColumnId2name : function(callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.reports.column').columnIdUrl,
					type : 'GET',
					async : true,
					cache : true,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/*
	 * 栏目稿件数量
	 */
	getColumnTitle : function(createdTimeBegin, createdTimeEnd, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.reports.column').queryUrl
							+ "&createdTimeBegin="
							+ createdTimeBegin
							+ "&createdTimeEnd=" + createdTimeEnd,
					// url :
					// ModuleConfigHelper.getConfigByModuleName('ns.reports.column').queryUrl,
					type : 'GET',
					async : true,
					cache : true,
					data : null,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/*
	 * 专题页面
	 */
	getSubjectByLS : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.subjects').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	/**
	 * 获取微信排行
	 */
	getWeixinRank: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeixinRank',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.top').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getWeixinContentRank : function(param, callback) {
		$.ajax({
			// url : this.blogWechatLocation + 'getWeixinRank',
			url : ModuleConfigHelper
					.getConfigByModuleName('ns.wechat.colorful').queryUrl,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	getWeixinLatest_guangxi: function(param, callback) {
		$.ajax({
			// url : this.blogWechatLocation + 'getWeixinRank',
			url : ModuleConfigHelper
					.getConfigByModuleName('ns.wechat.latest1').queryUrl,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	getWeixinPaperRank: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeixinRank',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.paper').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getCategoryData : function(param, callback) {
		$.ajax({
			// url : this.blogWechatLocation + 'getWeixinRank',
			url : ModuleConfigHelper
					.getConfigByModuleName('ns.wechat.category').queryUrl,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	getCommentData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeixinRank',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.comment').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getWechatHot : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.hot').queryUrl,
					type : 'POST',
					async : true,
					cache : false,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/**
	 * 获取新媒体渠道 微信内容排行数据
	 */
	getWeixinMediaData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeixinRank',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.content').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	/**
	 * 获取订阅微信数据
	 */
	getWeixinData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeixinData',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.wechat.latest').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},

	/**
	 * 获取微博数据
	 */
	getWeiboData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeiboData',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.blog.latest').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getWxWbData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeiboData',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.blog.latest').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getOtherWxWbData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeiboData',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.blog.other').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getCityData: function(param, callback){
		$.ajax({
					// url : this.blogWechatLocation + 'getWeiboData',
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.blog.city').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	/**
	 * 获取热点资讯
	 */
	// getHotNews: function(param, callback){
	// var conf = ModuleConfigHelper.getConfigByModuleName('ns.news.hot');
	// $.ajax({
	// url : conf.queryUrl,
	// type : 'GET',
	// dataType: "jsonp",
	// jsonp: "callback",
	// jsonpCallback:"flightHandler",
	// async : true,
	// // contentType : 'application/json;charset=UTF-8',
	// // data : JSON.stringify(param),
	// success : function(response) {
	// CentralProxy.__safeCallback(callback, response);
	// }
	// });
	// },
	getHotNews : function(param, callback) {
		var conf = ModuleConfigHelper.getConfigByModuleName('ns.news.hot');
		$.ajax({
			url : conf.queryUrl,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/*
	 * 串编单
	 */
	getRundowns : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.rundown').queryUrlList,
					type : 'GET',
					async : true,
					data : param,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	getRundownAssets : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.rundown').queryUrlAssets,
					type : 'GET',
					async : true,
					data : param,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	/* 荔枝新闻，安徽新闻等等 */
	getNetPlayer : function(callback) {
		var dataUrl = ModuleConfigHelper
				.getConfigByModuleName('ns.player.netPlayer').queryUrl;
		$.ajax({
			url : dataUrl,
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				console.log(response);
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/* 东西湖新闻 */
	getNewsDongxi : function(param, callback) {
		var dataUrl = ModuleConfigHelper
				.getConfigByModuleName('ns.player.netPlayer').queryUrl;
		$.ajax({
			url : dataUrl,
			type : 'POST',
			async : true,
			data : JSON.stringify(param),
			cache : false,
			contentType : 'application/json;charset=UTF-8',
			success : function(response) {
				console.log(response);
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	/* 国内热点 */
	nationalNews : function(param, callback) {
		var dataUrl = ModuleConfigHelper
				.getConfigByModuleName('ns.news.national').queryUrl;
		$.ajax({
			url : dataUrl,
			type : 'POST',
			async : true,
			data : JSON.stringify(param),
			cache : false,
			contentType : 'application/json;charset=UTF-8',
			success : function(response) {
				console.log(response);
				CentralProxy.__safeCallback(callback, JSON.parse(response));
			}
		});
	},
	getNewsBreaking : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.breaking').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				})
	},
	getNewsTown : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.town').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				})
	},
	/* 金华GIS地图 */
	getGisData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.map.gis').queryUrl,
					type : 'POST',
					async : true,
					data : JSON.stringify(param),
					cache : false,
					contentType : 'application/json;charset=UTF-8',
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getGisCountData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.map.gis').queryUrlCount,
					type : 'POST',
					async : true,
					data : JSON.stringify(param),
					cache : false,
					contentType : 'application/json;charset=UTF-8',
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getVideoList : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.player.video').queryUrlList,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getVideoHot : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.player.video').queryUrlHot,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				});
	},
	getPieData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.keyword').queryUrlPie,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				})
	},
	getPieListData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.keyword').queryUrlList,
					// url :
					// "/central/api/data/route?url=http://lsgcloud.com/auton/interface/v2/getMediaData.do",
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				})
	},
	getBarData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.news.keyword').queryUrlBar,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
					}
				})
	},
	/*
	 * 渠道排行和内容排行 app接口
	 */

	getV2TotalData : function(param) {
		return $
				.ajax({
					url : 'http://newsphere.gzstvcloud.com/web/api/show/getV2TotalData',
					type : 'GET',
					async : true,
					data : param,
				// success : function(response) {
				// CentralProxy.__safeCallback(callback, response);
				// }
				})
	},
	getV2Top10 : function(param) {
		return $.ajax({
			// url : this.project + '/api/show/getV2Top10',
			url : 'http://newsphere.gzstvcloud.com/web/api/show/getV2Top10',
			type : 'GET',
			async : true,
			data : param,
		// success : function(response) {
		// CentralProxy.__safeCallback(callback, response);
		// }
		})
	},
	getDongJingTotalData : function(param) {
		return $.ajax({
					// url : this.project + '/api/show/getDongJingTotalData',
					url : 'http://newsphere.gzstvcloud.com/web/api/show/getDongJingTotalData',
					type : 'GET',
					async : true,
					data : param,
				// success : function(response) {
				// CentralProxy.__safeCallback(callback, response);
				// }
				})
	},
	getDongJingTop10 : function(param) {
		return $.ajax({
					// url : this.project + '/api/show/getDongJingTop10',
					url : 'http://newsphere.gzstvcloud.com/web/api/show/getDongJingTop10',
					type : 'GET',
					async : true,
					data : param,
				// success : function(response) {
				// CentralProxy.__safeCallback(callback, response);
				// }
				})
	},
	// TODO 待天马提供专题接口
	/**
	 * 主流媒体
	 */
	getMainMediaData : function(callback) {
		$.ajax({
					// url :
					// "http://data.cloud.jstv.com:31801/service/bd/get/action=query&text=*&fieldtext=EQUAL%7B1%7D:IS_EMERGENCY&printfields=DREDATE,CATEGORY_THREE,CATEGORY_TWO,DRECONTENT&sort=date&anylanguage=true&responseformat=json&DatabaseMatch=network&maxresults=35",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.special.media').queryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 报警事件
	 */
	// getMonitorNotice: function(callback){
	// $.ajax({
	// // url :
	// "http://paas.cloud.jstv.com/api/monitor/getNoices/?platformId=aliyun-lizhiyun&timeZone=1440",
	// url :
	// ModuleConfigHelper.getConfigByModuleName('ns.monitor.notice').queryUrl,
	// type : 'GET',
	// async : true,
	// cache : false,
	// success : function(response) {
	// CentralProxy.__safeCallback(callback, response);
	// }
	// });
	// },
	getMonitorNotice : function(url, callback) {
		$.ajax({
			// url :
			// "http://paas.cloud.jstv.com/api/monitor/getNoices/?platformId=aliyun-lizhiyun&timeZone=1440",
			url : url,
			type : 'POST',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 查询实例列表
	 * 
	 */
	getInstanceList : function(param, callback) {
		$.ajax({
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getInstances/",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.cloud').getInstanceListQueryUrl,
					type : 'GET',
					async : true,
					data : param,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取虚机总数状态等相关信息
	 */
	getInstanceInfo : function(callback) {
		$.ajax({
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getInstanceInfo/?platformId=aliyun-lizhiyun",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.cloud').getInstanceInfoQueryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取存储相关信息
	 */
	getStorageInfo : function(callback) {
		$.ajax({
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getStorageInfo/?platformId=aliyun-lizhiyun",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.cloud').getStorageInfoQueryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取指定虚机CPU相关信息
	 * platformId=aliyun-lizhiyun&instanceId=i-235inctt7&beginTime=2016-07-29
	 * 06-00&endTime=2016-07-29 10-30
	 */
	getCpuInfo : function(param, callback) {
		$.ajax({
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getCpuInfo/",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.cloud').getCpuInfoQueryUrl,
					type : 'GET',
					async : true,
					data : param,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取指定虚机内存相关信息
	 * platformId=aliyun-lizhiyun&instanceId=i-235inctt7&beginTime=2016-07-29
	 * 06-00&endTime=2016-07-29 10-30
	 */
	getMemoryInfo : function(param, callback) {
		$.ajax({
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getMemoryInfo/",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.cloud').getMemoryInfoQueryUrl,
					type : 'GET',
					async : true,
					data : param,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取虚机总数状态等相关信息
	 */
	getPlatformUsersData : function(callback) {
		$
				.ajax({
					// TODO
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getInstanceInfo/?platformId=aliyun-lizhiyun",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.users').getPlatformUsersDataQueryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取虚机总数状态等相关信息
	 */
	getAppsUsersData : function(callback) {
		$
				.ajax({
					// TODO
					// url :
					// "http://paas.cloud.jstv.com/api/monitor/getInstanceInfo/?platformId=aliyun-lizhiyun",
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.monitor.users').getAppsUsersDataQueryUrl,
					type : 'GET',
					async : true,
					cache : false,
					success : function(response) {
						CentralProxy.__safeCallback(callback, response);
					}
				});
	},

	/**
	 * 获取所有页面的配置信息
	 */
	getModulesInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/module/list',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 获取页面的配置信息
	 */
	getModule : function(param, callback) {
		$.ajax({
			url : this.project + '/api/module/get',
			type : 'GET',
			async : true,
			cache : false,
			data : param,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 保存某个页面的配置信息
	 */
	saveModulesInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/module/save',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},

	/**
	 * 保存某个页面的配置信息
	 */
	delModulesInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/module/delete',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},

	/**
	 * 获取最近几天的值班信息
	 */
	getMonitorWorkerDaysInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/monitorWorkerDay/list',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},

	/**
	 * 保存某一天的值班人员信息
	 */
	saveMonitorWorkerDaysInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/monitorWorkerDay/save',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},

	/**
	 * 删除某一天的值班信息
	 */
	delMonitorWorkerDaysInf : function(param, callback) {
		$.ajax({
			url : this.project + '/api/monitorWorkerDay/delete',
			type : 'POST',
			async : true,
			cache : false,
			contentType : 'application/json; charset=UTF-8',
			dataType : 'json',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 系统维护 - 用户管理相关的方法
	 */
	// 列举系统中所有用户 @author sunwei
	listAllUsers : function(callback) {
		$.ajax({
			url : this.project + '/api/lo/users/find/all',
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getUser : function(userId, callback) {
		$.ajax({
			url : this.project + '/api/lo/users/find/get',
			type : 'GET',
			async : true,
			data : {
				id : userId
			},
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getCurrentSession : function(callback) {
		$.ajaxSetup({
			cache : false
		});
		$.ajax({
			url : this.project + '/api/lo/sessions/current_session',
			type : 'GET',
			async : true,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	createUser : function(user, callback) {
		$.ajax({
			url : this.project + '/api/lo/users/create',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(user),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	modifyUser : function(user, callback) {
		$.ajax({
			url : this.project + '/api/lo/users/update',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(user),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	deleteUser : function(userID, callback) {
		$.ajax({
			url : this.project + '/api/lo/users/delete?id=' + userID,
			type : 'DELETE',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getUserList : function(userids, callback) {
		$.ajax({
			url : this.project + '/api/user/getUserList',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(userids),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getUserDetailList : function(userids, callback) {
		$.ajax({
			url : this.project + '/api/user/getUserDetailList',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(userids),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	freshCloudUserList : function(callback) {
		$.ajax({
			url : this.project + '/api/user/freshCloudUserList',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getCloudUserList : function(callback) {
		$.ajax({
			url : this.project + '/api/user/clouduser',
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	addUserFromCloud : function(param, orgID, roleID, callback) {
		$.ajax({
			url : this.project + '/api/user/addUserFromCloud?orgID=' + orgID
					+ '&roleID=' + roleID,
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	// getUserProperties: function(param, callback) {
	// $.ajax({
	// url : this.project + '/api/user/property/get',
	// type : 'POST',
	// async : true,
	// contentType : 'application/json; charset=UTF-8',
	// data : JSON.stringify(param),
	// success : function(response) {
	// CentralProxy.__safeCallback(callback, response);
	// }
	// });
	// },
	orgsByUser : function(param, callback) {
		$.ajax({
			url : this.project + '/api/org/orgsByUser',
			type : 'GET',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : param,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 我的消息相关的方法
	 */
	// 列举某组织节点下所有用户 @author yoson
	listUsers : function(orgid, callback) {
		$.ajax({
			url : this.project + '/api/user/list/' + orgid,
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	/**
	 * 角色权限相关
	 */
	listPermissions : function(callback) {
		$.ajax({
			url : this.project + '/api/role/permission/list',
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	createPermission : function(perm, callback) {
		$.ajax({
			url : this.project + '/api/role/permission',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(perm),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	modifyPermission : function(perm, callback) {
		$.ajax({
			url : this.project + '/api/role/permission',
			type : 'PUT',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(perm),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	deletePermission : function(id, callback) {
		$.ajax({
			url : this.project + '/api/role/permission?permissionID=' + id,
			type : 'DELETE',
			async : true,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	listRoles : function(callback) {
		$.ajax({
			url : this.project + '/api/lo/roles/find/all',
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	createRole : function(role, callback) {
		$.ajax({
			url : this.project + '/api/lo/roles/create',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(role),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	modifyRole : function(role, callback) {
		$.ajax({
			url : this.project + '/api/lo/roles/update',
			type : 'POST',
			async : true,
			contentType : 'application/json; charset=UTF-8',
			data : JSON.stringify(role),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	deleteRole : function(id, callback) {
		$.ajax({
			url : this.project + '/api/lo/roles/delete?id=' + id,
			type : 'DELETE',
			async : true,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	uploadExcel : function(dataType, formData, callback) {
		$.ajax({
			url : this.project + '/api/excel/upload?dataType=' + dataType,
			type : 'POST',
			async : true,
			cache : false,
			contentType : false,
			processData : false,
			data : formData,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	loginSwan : function(param, callback, extra) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.swan.task').baseURL
							+ '/api/nsite/authc/logon',
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					}
				});
	},
	findSwanMobjects : function(param, callback, extra) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.swan.task').baseURL
							+ '/api/nsite/mobjects/search/assets?'
							+ 'sid='
							+ extra.sid,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					},
					error : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					}
				});
	},
	findSwanProcessInstance : function(param, callback, extra) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.swan.task').baseURL
							+ '/api/nsite/workflow/process/get?'
							+ 'sid='
							+ param.sid + '&procId=' + param.procId,
					type : 'GET',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					success : function(response) {
						CentralProxy.__safeCallback(callback, response, extra);
					}
				});
	},
	/**
	 * [{ dataType: 'dutySchedule', caption: '值日表' },{ dataType:
	 * 'audienceRating', caption: '收视率' },{ dataType: 'fusionRating', caption:
	 * '融合力' },{ dataType: 'weiwei', caption: '两微' }]
	 * 
	 * @param dataType
	 * @param callback
	 */
	getExcel : function(dataType, callback) {
		$.ajax({
			url : this.project + '/api/excel/' + dataType,
			type : 'GET',
			async : true,
			cache : false,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	getSnmp : function(ip, param, callback) {
		$.ajax({
			url : this.project + '/api/snmp/mid?ip=' + ip,
			type : 'POST',
			async : true,
			contentType : 'application/json;charset=UTF-8',
			data : JSON.stringify(param),
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
	// 金华昨夜今晨模块数据获取
	getDailyLatestData : function(param, callback) {
		$
				.ajax({
					url : ModuleConfigHelper
							.getConfigByModuleName('ns.daily.latest').queryUrl,
					type : 'POST',
					async : true,
					contentType : 'application/json;charset=UTF-8',
					data : JSON.stringify(param),
					success : function(response) {
						// response = {
						// "code": 0,
						// "message": "处理成功",
						// "data": {
						// "result": [
						// {
						// "type":"wx",
						// "content": "01 前段时间，回了趟老家。。。。。",
						// "title": "为什么你埋头苦干却一直提拔不了？而他们摇身一变，就官至副部",
						// "source": "江苏新闻广播",
						// "publishTime": "2017-06-04 10:21:35",
						// "readCount": 4669,
						// "goodCount": 1234,
						// "headUrl":
						// "http://mmbiz.qpic.cn/mmbiz_png/qoxI9NQQfn7Aib5pVMXa88XWR8Jn6TgHSUCZxguwCPJu0XveC3IwAkuiavF6tn6KQ3t6eBBLLf8EldibrNgqHCsng/0?wx_fmt=png",
						// },
						// {
						// "type":"wx",
						// "content":
						// "“我调到贵州三年来，没有遇到雾霾，贵州没有雾霾。”在正在举行的十三届全国人大一次会议贵州代表团团组开放日活动上，全国人大代表、贵州省委书记、省人大常委会主任孙志刚在介绍贵州经济社会发展情况时，向中外记者这样介绍贵州。",
						// "title": "孙志刚：我在贵州三年，没有遇到雾霾，贵州没有雾霾！",
						// "source": "贵州新闻联播",
						// "publishTime": "2017-06-04 10:21:35",
						// "readCount": 1000,
						// "goodCount": 50,
						// "headUrl":
						// "http://mmbiz.qpic.cn/mmbiz_png/qoxI9NQQfn7Aib5pVMXa88XWR8Jn6TgHSUCZxguwCPJu0XveC3IwAkuiavF6tn6KQ3t6eBBLLf8EldibrNgqHCsng/0?wx_fmt=png",
						// },
						// {
						// "type":"wx",
						// "content":
						// "今天（8日）上午，韩国青瓦台国家安保室长郑义溶和国家情报院院长徐薰启程赴美，向特朗普传达朝鲜最高领导人金正恩的信息，呼吁美方启动朝美对话。",
						// "title": "韩高官今赴美传金正恩信息 美却先来一记新制裁",
						// "source": "看看新闻网",
						// "publishTime": "2017-06-04 10:21:35",
						// "readCount": 500,
						// "goodCount": 1,
						// "headUrl":
						// "http://mmbiz.qpic.cn/mmbiz_png/qoxI9NQQfn7Aib5pVMXa88XWR8Jn6TgHSUCZxguwCPJu0XveC3IwAkuiavF6tn6KQ3t6eBBLLf8EldibrNgqHCsng/0?wx_fmt=png",
						// },
						// {
						// "type":"wx",
						// "content":
						// "尽管美国国会共和党议员和商业团体强烈反对加征钢铁和铝进口关税，但美国总统特朗普仍然可能在当地时间8号正式公布具体的措施。对此，欧盟委员会在7号的例行会议后宣布，当天的会议讨论并通过了一份针对美国加征钢铝关税出台反制措施的提案。",
						// "title": "特朗普今宣布加征钢铝关税 欧盟反制措施已备好",
						// "source": "看看新闻网",
						// "publishTime": "2017-06-04 10:21:35",
						// "readCount": 125,
						// "goodCount": 10,
						// "headUrl":
						// "http://mmbiz.qpic.cn/mmbiz_png/qoxI9NQQfn7Aib5pVMXa88XWR8Jn6TgHSUCZxguwCPJu0XveC3IwAkuiavF6tn6KQ3t6eBBLLf8EldibrNgqHCsng/0?wx_fmt=png",
						// },
						// {
						// "type":"wx",
						// "content": "参考消息网3月7日报道
						// 去年以来，中澳关系出现了一系列风波。今年3月初，《澳大利亚人报》用“深冻”一词描述当前中澳外交互动状态，尽管这种说法仅代表澳方观感，但仍不难看出两国在经历多场风波后不得不面对相应受损的关系。而扫描澳大利亚国内，最新消息显示，走过2017年的澳大利亚留学产业已经率先显现出了某种“后遗症”效应。",
						// "title": "澳大利亚“反华后遗症”显现 这个领域已经开始“发抖”",
						// "source": "参考消息",
						// "publishTime": "2017-06-04 10:21:35",
						// "readCount": 50000,
						// "goodCount": 666,
						// "headUrl":
						// "http://mmbiz.qpic.cn/mmbiz_png/qoxI9NQQfn7Aib5pVMXa88XWR8Jn6TgHSUCZxguwCPJu0XveC3IwAkuiavF6tn6KQ3t6eBBLLf8EldibrNgqHCsng/0?wx_fmt=png",
						// }
						// ]
						// }
						// }
						CentralProxy.__safeCallback(callback, JSON
								.parse(response));
						// CentralProxy.__safeCallback(callback, response);
					}
				});
	},
	getColumn : function(callback) {
		var url = ModuleConfigHelper.getConfigByModuleName('ns.reports.user').columnUrl
		$.ajax({
			url : url,
			type : 'GET',
			async : true,
			// data : param,
			success : function(response) {
				CentralProxy.__safeCallback(callback, response);
			}
		});
	},
// 获取栏目接口
	
	   //上海东方网GIS地图数据
    getGisDataSHDF: function(param, callback) {
        $.ajax({
            url: ModuleConfigHelper.getConfigByModuleName('ns.map.gisSHDF').queryUrl,
            type: 'POST',
            async: true,
            data: JSON.stringify(param),
            cache: false,
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
                CentralProxy.__safeCallback(callback, JSON.parse(response));
            }
        });
    },
    //上海东方网
    getGisCountDataSHDF: function(param, callback) {
        $.ajax({
            url: ModuleConfigHelper.getConfigByModuleName('ns.map.gisSHDF').queryUrlCount,
            type: 'POST',
            async: true,
            data: JSON.stringify(param),
            cache: false,
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
                CentralProxy.__safeCallback(callback, JSON.parse(response));
            }
        });
    }
};