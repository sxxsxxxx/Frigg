var BreakingNewsBubble = {
		reportArray : [],
		currentPageArray : [],
		intervalPage : null,
		intervalAppend : null,
		intervalShowOne : null,
		createNewBubble : function(opts){
			var opts_default = {
					mediaSource : '',
					time : '',
					titleH1 : '',
					titleH2 : '',
					hasPic: false,
					hasVideo: false,
					content: '',
					container: $('.breaking-news-bubbles')
			}

			var breakingNewsBubble = {};
			breakingNewsBubble.options = $.extend(true, opts_default, opts);
			breakingNewsBubble.html = '<div class="breaking-news-bubble add-transition-1s">\
							                <div class="axis-y">\
							                	<div class="anchors"></div>\
												<div class="axis-y-line"></div>\
												<div class="join-point"></div>\
							            		<div class="axis-x add-transition-1s">\
													<div class="axis-x-line"></div>\
													<div class="head add-transition">\
														<div class="up-line add-transition-1s">\
															<span class="media-source">新华网</span>\
															<span class="time">2016-11-23 10:00:00</span>\
															<div class="media-flag">\
																<span class="glyphicon glyphicon-picture"></span>\
																<span class="glyphicon glyphicon-film"></span>\
															</div>\
														</div>\
														<div class="title">四川甘孜泸定县发生3.8级地震</div>\
													</div>\
													<div class="body add-transition-1s">\
														<span class="media-source">新华网</span>\
														<span class="content">四川甘孜泸定县发生3.8级地震四川甘孜泸定县发生3.8级地震四川甘孜泸定县发生3.8级地震四川甘孜泸定县发生3.8级地震四川甘孜泸定县发生3.8级地震四川甘孜泸定县发生3.8级地震</span>\
														<span class="media-flag">\
															<span class="glyphicon glyphicon-picture"></span>\
															<span class="glyphicon glyphicon-film"></span>\
														</span>\
														<span class="time">2016-11-23 10:00:00</span>\
													</div>\
							            		</div>\
											</div>\
							    		</div>';
			breakingNewsBubble.bubbleElement = $(breakingNewsBubble.html);
			breakingNewsBubble.bubbleElement.find('.media-source').text(breakingNewsBubble.options.mediaSource);
			var timeNew = Utils.parseTime(new Date().getTime(), 'y-m-d', true);
//			timeNew = +timeNew.substr(11,2)+Math.ceil(Math.random())
//			var h = new Date().getHours() - Math.ceil(10*Math.random());
//			h = h <= 0 ? Math.abs(h) : h;
//			h= h >= 10 ? h : ('0' + h);
//			var i = new Date().getMinutes() - Math.ceil(60*Math.random());
//			i = i <= 0 ? Math.abs(i) : i;
//			i = i >= 10 ? i : ('0' + i);
//			var s = Utils.parseTime(new Date().getTime(), 's', true);
//			timeNew = timeNew + " " + h + ":" + i + ":" + s;
			breakingNewsBubble.bubbleElement.find('.time').text(breakingNewsBubble.options.time);
			breakingNewsBubble.bubbleElement.find('.title').text(breakingNewsBubble.options.titleH1);
			/*breakingNewsBubble.bubbleElement.find('.content').text(breakingNewsBubble.options.content);*/
			breakingNewsBubble.bubbleElement.find('.content').text(breakingNewsBubble.options.content.substr(0,70)+'...');
			if(!breakingNewsBubble.options.content.hasPic){
				breakingNewsBubble.bubbleElement.find('.glyphicon-picture').remove();
			}
			if(!breakingNewsBubble.options.content.hasVideo){
				breakingNewsBubble.bubbleElement.find('.glyphicon-film').remove();
			}
			breakingNewsBubble.bubbleElement.click(function(){
								DetailShow.show({
						            container: $('body'),
						            data: {
						            	title: breakingNewsBubble.options.titleH1,
						            	time: breakingNewsBubble.options.time,
						            	content: breakingNewsBubble.options.content,
						            	pics: []
						            }});
							});
			breakingNewsBubble.options.container.append(breakingNewsBubble.bubbleElement);

			var $anchor = breakingNewsBubble.bubbleElement.find('div.anchors');
			var $axisYLine = breakingNewsBubble.bubbleElement.find('div.axis-y-line');
			var $axisXLine = breakingNewsBubble.bubbleElement.find('div.axis-x-line');
			var $joinPoint = breakingNewsBubble.bubbleElement.find('div.join-point');
			var $head = breakingNewsBubble.bubbleElement.find('div.head');
			//动画动作
			$anchor.addClass('opacity100', 200, function(){
				$axisYLine.addClass("axis-y-line-long", 200, function(){
					$joinPoint.addClass('opacity100', 200, function(){
						$axisXLine.addClass("axis-x-line-long", 200, function(){
							$head.addClass("right0",800);
						});
					} );
				});


			});
			return breakingNewsBubble;
		},

		/**
		 * X横轴动画弹出
		 */
		xBaseLineAnim : function(){
			//时间段
			var startTime=0,
				endTime = 6;
			var curTime = new Date();
			var curHour = curTime.getHours();
			if(curHour < 6){
				startTime = 0;
				endTime = 6;
			}else if(curHour >= 6 && curHour < 12){
				startTime = 6;
				endTime = 12;
			}else if(curHour >= 12 && curHour < 18){
				startTime = 12;
				endTime = 18;
			}else if(curHour >= 18 && curHour < 24){
				startTime = 18;
				endTime = 24;
			}
			var $axisXElem = $('div.x-base-line');
			$axisXElem.find('.x-base-line-head').text(startTime+':00:00');
			$axisXElem.find('.x-base-line-tail').text(endTime+':00:00');
			$axisXElem.animate({width:'100%'},1000);
		},

		/**
		 * Y轴动画弹出(多个页面)
		 */
		axisYAnim : function(){
			var copyArr = BreakingNewsBubble.reportArray.slice();
			var ar=[];
		    while(copyArr.length){
		    	ar.push(copyArr.splice(0,7));
		    }

		    var pageIndex = 0;
		    if(pageIndex >= ar.length){
		    	return;
		    }
		    if(BreakingNewsBubble.intervalPage){
				clearInterval(BreakingNewsBubble.intervalPage);
			}
		    BreakingNewsBubble.clearBubbles(BreakingNewsBubble.appendBubbles, ar[pageIndex]);
		    pageIndex++;
		    BreakingNewsBubble.intervalPage = setInterval(function(){
			    if(pageIndex >= ar.length){
			    	pageIndex = 0;//从第一页重新开始展示
//			    	clearInterval(BreakingNewsBubble.intervalPage);
//			    	return;
			    }
			    BreakingNewsBubble.clearBubbles(BreakingNewsBubble.appendBubbles, ar[pageIndex]);
			    pageIndex++;
			}, 29000);//每页切换的时间

		},

		/**
		 * 用于显示当前页的bubble
		 */
		appendBubbles : function (currentPageArray){
			//每隔3s append一个bubble
			BreakingNewsBubble.currentPageArray = currentPageArray;
			var reportArrayIndex = 0;
			var breakingNewsBubble = BreakingNewsBubble.createNewBubble(BreakingNewsBubble.currentPageArray[reportArrayIndex]);
			reportArrayIndex++;
			BreakingNewsBubble.intervalAppend = setInterval(function(){
				if(reportArrayIndex >= BreakingNewsBubble.currentPageArray.length){
			    	clearInterval(BreakingNewsBubble.intervalAppend);
			    	showAll();
			    	return;
			    }
			    var breakingNewsBubble = BreakingNewsBubble.createNewBubble(BreakingNewsBubble.currentPageArray[reportArrayIndex]);
			    reportArrayIndex++;
			}, 1000);

			function showAll(){
				//每隔6s钟显示一个bubble详情突出显示
				//第一个单独从interval中提出来，防止第一个也需要经过6000ms才触发的问题
				var bubblesIndex = 0;
				var $bubbleBodies = $('div.breaking-news-bubbles > div.breaking-news-bubble');
				showOne();

				BreakingNewsBubble.intervalShowOne = setInterval(function(){
					showOne();
				}, 3000);

				function showOne(){
					if(bubblesIndex >= $bubbleBodies.length){
						bubblesIndex = 0;
						$bubbleBodies.removeClass('active');
						$bubbleBodies.find('.join-point').removeClass('twinkling');
						return;
//				    	clearInterval(BreakingNewsBubble.intervalShowOne);
				    }
					$bubbleBodies.removeClass('active');
					$bubbleBodies.find('.join-point').removeClass('twinkling');
				    var $joinPoint = $($bubbleBodies[bubblesIndex]).find('.join-point');
				    $($bubbleBodies[bubblesIndex]).addClass('active');
					$joinPoint.addClass('twinkling');
				    bubblesIndex++;
				}
			}
		},

		initData : function (reportArray){
			BreakingNewsBubble.reportArray = [{},{},{},{},{},{},{}];
			if(reportArray!=null && reportArray.length > 0){
				BreakingNewsBubble.reportArray = reportArray;
			}
		},

		clearBubbles : function (callback, callbackData){
			if(BreakingNewsBubble.intervalShowOne){
				clearInterval(BreakingNewsBubble.intervalShowOne);
			}
			if(BreakingNewsBubble.intervalAppend){
				clearInterval(BreakingNewsBubble.intervalAppend);
			}
			var $bubbleBodies = $('div.breaking-news-bubbles > div.breaking-news-bubble');

			var index = $bubbleBodies.length-1;
			BreakingNewsBubble.intervalClearBubbles = setInterval(function(){
				    if(index < 0){
				    	clearInterval(BreakingNewsBubble.intervalClearBubbles);
				    	if(callback && typeof callback == 'function'){
							callback(callbackData);
						}
				    	return;
				    }
				    var temp = index;
				    $($bubbleBodies[temp]).removeClass('add-transition-1s').addClass('remove',50,function(){
				    	$($bubbleBodies[temp]).remove();
					});
				    index--;
				}, 100);//每页切换的时间
		},
		/**
		 * 每次更新数据时，调用此接口
		 * @param reportArray
		 * @param forUpdating 更新时，取值为true
		 */
		init : function (reportArray, forUpdating){
			BreakingNewsBubble.initData(reportArray);
			if(!forUpdating){
				BreakingNewsBubble.xBaseLineAnim();
			}
			if(BreakingNewsBubble.intervalClearBubbles){
				clearInterval(BreakingNewsBubble.intervalClearBubbles);
			}
			if(BreakingNewsBubble.intervalShowOne){
				clearInterval(BreakingNewsBubble.intervalShowOne);
			}
			if(BreakingNewsBubble.intervalAppend){
				clearInterval(BreakingNewsBubble.intervalAppend);
			}
			BreakingNewsBubble.axisYAnim();
		},
};
$(function(){
//	Utils.setBgCSS();
	$('body').addClass('lightblue');
	Utils.setPageFontSize(1920);

	var title = '本地最新新闻';
	$('.area-title').html(title);
	var breakingNewsBubble = {};
	var queryCount = 0;
	function loadData() {
		var param = {
				"loc": 4027,
				"ajax": 'json',
				"id": 'LocalNews'
		};
		$.ajax({
			url: "/frigg/data/route?url=https://news.baidu.com/widget?id=LocalNews" 
				+ '%26' +'loc=4027' + "%26" + 'ajax=json',
			type: 'GET',
			async: true,
			//cache: false,
			//data: JSON.stringify(param),
			contentType: 'application/json;charset=UTF-8',
			success: function(resp){
				queryCount++;
				if(resp.errno==0){
					breakingNewsBubble.queryResp = resp.data;
		            loadDataCallBack(breakingNewsBubble);
				}
			}
		});

  };

    	breakingNewsBubble.title = '';
	    loadData();

    function loadDataCallBack(breakingNewsBubble) {
        processData(breakingNewsBubble);
        BreakingNewsBubble.init(breakingNewsBubble.processedData,queryCount==1?false:true);
    };
    function processData(breakingNewsBubble) {
    	breakingNewsBubble.processedData = [];
        $(breakingNewsBubble.queryResp.LocalNews.data.first).each(function (index, row) {
        	breakingNewsBubble.processedData.push({
//        		mediaSource : row["autn:content"].DOCUMENT.CATEGORY_TWO.$,
        		mediaSource : row.source || '',
				time : row.date || '',
				titleH1 : row.title || '',
				hasPic: false,
				hasVideo: false,
				content: row.content || '',
            });
        });
    };
	});
