/**
 * 框架公用js，其中的网页布局class名称、id号均必须一致，否则无法使用。
 * 如果需要个性化的操作，建议不要使用这个js文件
 * @author Yoson
 * @since 1.0 2014-11-22
 */

(function NovaNav($) {
	jQuery.fn.novaNav = function(opts){
		var options = $.extend(true, {menu: [], notice: []}, opts);
		var $this = $(this);
		var novaHtml = '<nav class="navbar navbar-inverse" role="navigation"><div class="container-fluid"><div class="collapse navbar-collapse"></div></div></nav>';
		var pane = $(novaHtml).appendTo($this);
		
		/** @memberOf NovaNav */
		var renderLogo = function(){
			/*更改为荔枝云的门户页面*/
//			var logoHtml = '<div class="navbar-header"><a class="navbar-brand" href="/central"><img alt="LOGO" src="../images/gztv.png" height="32"></a><span>指挥中心管理控制台</span></div>';
			var logoHtml = '<div class="navbar-header"><span>指挥中心管理控制台</span></div>';
			$(logoHtml).insertBefore('.container-fluid>.collapse');
		};
		
		/** @memberOf NovaNav */
		var renderNovaMain = function(rows){
			var ulHtml = '<ul class="nav navbar-nav"></ul>';
			var ul = $(ulHtml).appendTo(pane.find('.container-fluid>.collapse'));
			//{name: '工作台', url:'javascript:;',icon: 'glyphicon glyphicon-tasks',isactive: false}
			$(rows).each(function(index, row){
				var rowHtml = '<li class="nav-item"><a href="' + row.url + '"><i class="' + row.icon + '"></i><span>' + row.name + '</span></a></li>';
				if(row.target){
					rowHtml = '<li class="nav-item"><a href="' + row.url + '" target="_blank"><i class="' + row.icon + '"></i><span>' + row.name + '</span></a></li>';
				}
				var li = $(rowHtml).appendTo(ul);
				if(row.isactive){
					li.addClass('active');
				}
			});
		};
		
		/** @memberOf NovaNav */
		var renderNovaRight = function(rows){
			var ulHtml = '<ul class="nav navbar-nav navbar-right"></ul>';
			var ul = $(ulHtml).appendTo(pane.find('.container-fluid>.collapse'));
			
			$(rows).each(function(index, row){
				var rowHtml = '';
				if(row.subtitles && row.subtitles.length > 0){
					var li = $('<li class="dropdown">').appendTo(ul);
					$('<a href="#" "class="dropdown-toggle" data-toggle="dropdown"><i class="' + row.icon + '"></i> <span>' + row.title + '</span> <span class="caret"></span></a>').appendTo(li);
					var subul = $('<ul class="dropdown-menu" role="menu">').appendTo(li);
					$(row.subtitles).each(function(index, subrow){
						if(subrow.divider){
							$('<li class="divider"></li>').appendTo(subul);
						} else {
							var url = subrow.url;
							if(!url){
								url = 'javascript:;';
							}
							var st = $('<li><a href="' + url + '"><i class="' + subrow.icon + '"></i><span>' + subrow.title + '</span></a></li>').appendTo(subul);
							st.find('a').click(function(){
								if('function' === typeof subrow.event){
									subrow.event();
								}
							});
						}
					});
				} else {
					var li = $('<li><a href="' +row.url+ '"><i class="' + row.icon + '"></i></a></li>').appendTo(ul);
					li.find('a').click(function(){
						if('function' === typeof row.event){
							row.event();
						}
					});
				}
				$(rowHtml).appendTo(ul);
			});
		};
		
		renderLogo();
		renderNovaMain(options.menu);
		renderNovaRight(options.notice);
	};
})(jQuery);

$(function(){
	$('.bottom_tool a').tooltip({
		trigger: 'hover'
	});
	
	var collapse = function(){
		$('#menu_close').tooltip('hide');
		$('.menu').addClass('only-icon');
		$('.only-icon a').tooltip({trigger: 'hover', placement: 'right', container:'body'});
		$('#menu_close').parent().prev().hide();
		$("#nv_left").animate({width: '80px'});
		$("#nv_content").animate({left: '80px'});
		$('#menu_close').find('i').addClass('glyphicon-step-forward').removeClass('glyphicon-step-backward');
		localStorage.setItem('nova_collapse', true);
	};
	var open = function(){
		var help = $('#menu_close').parent().prev();
		$("#nv_left").animate({width: '180px'}, function(){
			help.show();
			$('.menu').removeClass('only-icon');
			$('.menu a').tooltip('destroy');
		});
		$("#nv_content").animate({left: '180px'});
		$('#menu_close').find('i').addClass('glyphicon-step-backward').removeClass('glyphicon-step-forward');
		localStorage.setItem('nova_collapse', false);
	};
	var isCollapse = localStorage.getItem('nova_collapse');
	if(isCollapse == 'true'){
		$('#menu_close').tooltip('hide');
		$('#menu_close').parent().prev().hide();
		$("#nv_left").width(80);
		$("#nv_content").css('left', 80); 
		$('#menu_close').find('i').addClass('glyphicon-step-forward').removeClass('glyphicon-step-backward');
		localStorage.setItem('nova_collapse', true);
	}
	
	$('#menu_close').click(function(){
		if($(this).find('i').hasClass('glyphicon-step-backward')){
			collapse();
		} else {
			open();
		}
	});
	
	$('.message-genius .collaspe').click(function(){
		var genius = $(this).parent();
		if(genius.hasClass('message-genius-collaspe')){
			genius.removeClass('message-genius-collaspe');
		} else {
			genius.addClass('message-genius-collaspe');
		}
	});
	$('.message-genius .detail').click(function(){
		var genius = $(this).parent();
		genius.addClass('message-genius-collaspe');
	});
	var session = SessionHelper.getCurrentSession();
	loadNovaNav(session);
	// 一个调用触发链式回调
//	getCurrentInf();

	// 获取当前登录的SessionID
	function getCurrentInf() {
		var session = SessionHelper.getCurrentSession();
		var ret = getCurrentUserPermissions(session);
		if(ret === 'json-error'){
			return;
		}
//		getCurrentOrgs(session);
//		getBaseAttribute(session);
//		connectBySocket(session);
	}
	// 获取当前登录用户的权限
	function getCurrentUserPermissions(session) {
		CentralProxy.getUser(session.userId, function(response){
			if(response.id !== session.userId){
				Message.danger("错误：无法确认用户的权限");
			} else {
				//TODO 保存权限配置
//				SessionHelper.setPermissions(session, response.roles);
			}
		});
	}
	
	function getCurrentOrgs(session){
		CentralProxy.orgsByUser({userID: session.userID}, function(response){
			if(response.code !== CentralProxy.SUCCESS){
				Message.danger('无法确认用户所在部门');
			} else {
				SessionHelper.setOrgs(session, response.result);
			}
		});
	}
	
	function getBaseAttribute(session){
		CentralProxy.queryBaseAttributes(function(response){
			if(response.code !== CentralProxy.SUCCESS){
				Message.danger('获取基础配置属性失败!');
			} else {
				//配置页面不读取配置进行验证，防止json格式不对造成的死循环而无法进入配置页面
				if('/web/sites/syscfg/index.html' !== window.location.pathname){
					SessionHelper.setBaseAttributes(session, response.result);
				}
			}
		});
	}
	
	/**
	 * 初始化系统枚举类型
	 */
	function getEnums(session) {
		CentralProxy.getEnums(function(data){
			if(data.code !== CentralProxy.SUCCESS){
				Message.danger("初始化系统枚举类型参数失败");
			} else{
				SessionHelper.setEnums(data.result);
				loadNovaNav(session);
			}
		});
	}
	/**
	 * 页面websocket长连接，用于APP消息推送给客户端
	 */
	function connectBySocket(session){
		var $appPushDiv;
		var host = window.location.host;
//		var path = '/web/api/registerSocketSession'
		var path = '/web/websockets/im/' + session.sessionID;
		var socket = new WebSocket('ws://' + host + path);
		var times = 0;
		var timeFlag;
		function blink(){
			var selector = $appPushDiv.find('.top-icon');
			var color = selector.css('color');
			if('rgb(255, 255, 255)'==color){
				selector.css('color', 'rgb(204, 204, 255)');
			}else{
				selector.css('color', 'rgb(255, 255, 255)');
			}
			if(times < 10){
				timeFlag = setTimeout(function(){
					times++;
					blink();
				}, 300);
			}else{
				$appPushDiv.find('.tip-text').html('<i class="fa fa-circle new-circle"></i>新消息');
				times = 0;
			}
		}
		socket.onopen = function(event) { 
			socket.send('{"fault": null}');
			var appPushDiv = $('.app-push-div');
			if(appPushDiv.length == 0){
				var html = '<div class="app-push-div panel panel-info">\
								<div class="left-btn-ctl">\
									<div class="top-icon"><i class="fa fa-envelope-o"></i></div>\
					                <div class="tip-text">暂无消息</div>\
								</div>\
							    <div class="panel-heading">APP消息推送\
								</div>\
							    <div class="panel-body"><div class="app-push-content"></div></div>\
							</div>';
				appPushDiv = $(html).appendTo($('body'));
			}
			appPushDiv.find('.left-btn-ctl').click(function(){
				appPushDiv.toggleClass('come');
				if(appPushDiv.hasClass('come')){
					appPushDiv.find('.top-icon').css('color', 'rgb(255, 255, 255)');
					clearTimeout(timeFlag);
					appPushDiv.find('.tip-text').text('暂无消息');
					times = 0;
				}
			});
//			appPushDiv.find('.close').click(function(){
//				appPushDiv.removeClass('come');
//			});
			$appPushDiv = appPushDiv;
		};
		socket.onmessage = function(event) { 
			var appPushDiv = $appPushDiv;
			var data = JSON.parse(event.data);
			if(data.talkMessage){
				setTimeout(function(){
					appPushDiv.find('.panel-heading').text(data.talkMessage.body.systemNotify.title)
					   .attr('title', data.talkMessage.body.systemNotify.title);
					appPushDiv.find('.app-push-content').text(data.talkMessage.body.systemNotify.content);
					if(!appPushDiv.hasClass('come')){
						blink();
					}
				}, 2000);
			}
		}; 
		socket.onclose = function(event) { 
		    console.log('Client notified socket has closed',event); 
		}; 
	}

	function loadNovaNav(session){
		if(session == null) {
			CentralProxy.showLogin();
			return;
		}
		var menu = [/*{name: '工作台'		, url:'../mhome/index.html',icon: 'fa fa-dashboard'},
		            {name: '稿件库'		, url:'../library/index.html',icon: 'glyphicon glyphicon-globe'},
		            {name: '数据中心'	, url:'../datacenter/index.html',icon: 'fa fa-bar-chart'},
		            {name: '资源管理'	, url: '../resource/index.html', icon: 'fa fa-automobile'},
		            {name: '资讯汇聚'	, url: '../../api/onair/sites/collector' ,icon: 'glyphicon glyphicon-fire', target: '_blank'},
		            //{name: '发布'		, url: '../../api/onair/sites/dispatcher' ,icon: 'glyphicon glyphicon-cloud', target: '_blank'},
		            {name: '考评统计'	, url: '../evaluation/index.html' ,icon: 'glyphicon glyphicon-thumbs-up'},
		            {name: '通联'		, url: '../relatedcom/index.html' ,icon: ' glyphicon glyphicon-road'},
		            {name: 'Web报片'		, url: '../reportclue/index.html', icon: 'fa fa-send-o'},
		            {name: '大屏维护'	, url: '../screencontrol/index.html', icon: 'fa fa-th-large'},
		            {name: '系统维护'	, url: '../manager/index.html', icon: 'glyphicon glyphicon-cog'},
		            {name: '系统配置'	, url: '../syscfg/index.html', icon: 'glyphicon glyphicon-wrench'}*/
		           ];
		var myMenu = [];
		for(var i = 0; i < menu.length; i++){
//			if(SessionHelper.canDO(menu[i].name)){
				myMenu.push(menu[i]);
//			}
		}
		var location = window.location.href;
		
		$(myMenu).each(function(index, m){
			if(location.indexOf(m.url.substring(2, m.url.length)) > 0){
				m.isactive = true;
				m.url = 'javascript:;';
			} else {
				m.isactive = false;
			}
		});
		
		var craeteSub = null;
		craeteSub = [{
			title: '线索(快速)', icon: 'glyphicon glyphicon-flash', event: function(){
				top.GlobalDetail.ask(function(){
					ClueCreate.quickCreate();
				});
			}
		}, {
			divider: true
		}, {
			title: '线索', icon: 'fa fa-send', event: function(){
				var session = SessionHelper.getCurrentSession();
				
				top.GlobalDetail.ask(function(){
					var pane = $('.detail-div').empty().addClass('active detail-globe');
					var header = '<div class="detail-title">\
							<h4><i class="glyphicon glyphicon-list-alt"></i><span class="title-name"></span></h4>\
							<div class="toolbar"></div>\
							<a href="javascript:;" class="close">×</a>\
						</div>\
						<div class="detail-body"></div>';
					$(header).appendTo(pane);
					ClueCreate.create();
//						ClueCreate.closeQuickCreate();
				});
				
			}
		}, {
			title: '报题', icon: 'glyphicon glyphicon-inbox', event: function(){
				var session = SessionHelper.getCurrentSession();
				var result = session.attrCreatedTos;
				if(!result){
					result = new Array();
				}
				if(result.length==0){
					Message.warn(Message.TEXT.NO_CREATEDTO);
				}else{
					top.GlobalDetail.ask(function(){
						Topic.create(null, 'detail-globe');
//					ClueCreate.closeQuickCreate();
					});
				}
			}
		}, {
			title: '文稿', icon: 'glyphicon glyphicon-th-list', event: function(){
				top.GlobalDetail.ask(function(){
					TitleCreate.create();
//					ClueCreate.closeQuickCreate();
				});
			}
		/*}, {
			title: '新建串编单', icon: 'glyphicon glyphicon-list-alt', event: function(){
				RundownCreate.create(true);
				ClueCreate.closeQuickCreate();
			}*/
		}, {
			title: '任务', icon: 'fa fa-microphone', event: function(){
				top.GlobalDetail.ask(function(){
					Interviewtask.createInterviewtask(null, 'detail-globe', null, {interviewType:0});
//					ClueCreate.closeQuickCreate();
				});
			}
		}, {
			title: '报片', icon: 'fa fa-send-o', event: function(){
				top.GlobalDetail.ask(function(){
					ReportClue.quickCreate(null, 'detail-globe');
				});
			}
		}];
		if(location.indexOf('reportclue/index.html') > 0){//Web报片中仅能够新建采访任务和报片
			craeteSub = [{
				title: '任务', icon: 'fa fa-microphone', event: function(){
					top.GlobalDetail.ask(function(){
						Interviewtask.createInterviewtask(null, 'detail-globe', null, {interviewType:0});
//						ClueCreate.closeQuickCreate();
					});
				}
			}, {
				title: '报片', icon: 'fa fa-send-o', event: function(){
					top.GlobalDetail.ask(function(){
						ReportClue.quickCreate();
					});
				}
			},];
		}
		if(location.indexOf('resource/index.html') > 0){//资源调度页面仅能够新建直接到资源分配然后结束的采访任务
			craeteSub = [{
				title: '任务', icon: 'fa fa-microphone', event: function(){
					top.GlobalDetail.ask(function(){
						Interviewtask.createInterviewtask(null, 'detail-globe', null, {interviewType:4});
//						ClueCreate.closeQuickCreate();
					});
				}
			}];
		}
		var myCreate = [];
		$(craeteSub).each(function(index, item){
//			if(SessionHelper.canDO('菜单/新建' + item.title)){
				myCreate.push(item);
//			}
		});
		var notice = [];
		if(myCreate.length > 0 && 
				(location.indexOf('mhome/index.html') > 0 || location.indexOf('library/index.html') > 0 || location.indexOf('reportclue/index.html') > 0 || location.indexOf('resource/index.html') > 0)){
			notice.push({title: '新建', icon: 'glyphicon glyphicon-plus', subtitles: myCreate});
		}
		//notice.push({title: '', icon: 'glyphicon glyphicon-bell', url: 'javascript:;'});
		var userInfo = {
				title: '', icon: 'glyphicon glyphicon-user', subtitles: [{
					title: session.userName, icon: 'glyphicon glyphicon-user user-name-icon', url: 'javascript:;', event: function(){
						top.GlobalDetail.ask(function(){
							EditUser.openEditDialog( session.userID , $('.user-name-icon').next());//最后一个变量是 相对路径里面 插件swf的路径
						});
					}
				}, {
					title: '修改密码', icon: 'fa fa-key', url: 'javascript:;', event: function(){
						//TODO 修改密码
						top.GlobalDetail.ask(function(){
							EditUser.showChangePwd(session);
						});
						
					}
				}, {
					title: '注销', icon: 'glyphicon glyphicon-off', url: 'javascript:;', event: function(){
						CentralProxy.logout(function(resp){}, function(message) {
							Message.danger('注销失败,' + resp.message);
						});
					}
				}]
			};
		notice.push(userInfo);
		var logoff = {
				title: '', icon: 'glyphicon glyphicon-off', url: 'javascript:;', event: function(){
					top.location.href = '../api/logoff';
				}
			};
		notice.push(logoff);
		
		$('#nv_header').novaNav({menu: myMenu, notice: notice});
		
		if('function' === typeof loadLeftNav){
			loadLeftNav(session);
			var isCollapse = localStorage.getItem('nova_collapse');
			if(isCollapse == 'true'){
				$('.menu').addClass('only-icon');
				$('.only-icon a').tooltip({trigger: 'hover', placement: 'right', container:'body'});
			}
		}
		
		// 这是一个彩蛋，用于对象重建索引
//		+function(){
//			var ttt = 0;
//			$('#nv_header').click(function(){
//				ttt += 1;
//				if(ttt >= 6) {
//					ttt = 0;
//				}
//			});
//			setInterval(function(){
//				ttt = 0;
//			}, 1000);
//		}();
	}
});