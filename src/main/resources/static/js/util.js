var Utils = {
		/**
		 * Escaping HTML strings
		 * @param string
		 * @returns
		 */
		escapeHtml: function (string) {
//			var entityMap = {
//				"&" : "&amp;",
//				"<" : "&lt;",
//				">" : "&gt;",
//				'"' : '&quot;',
//				"'" : '&#39;',
//				"/" : '&#x2F;'
//			};
//			return String(string).replace(/[&<>"'\/]/g, function(s) {
//				return entityMap[s];
//			}).trim();
			return string.replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ");
		},

		/**
		 * 设置皮肤和背景图片
		 * @param skin
		 * @param bg
		 */
		setBgCSS: function(skin, bg){
			if(!skin||$.trim(skin)==''){
				skin = this.getSkin();
			}
			if(!bg||$.trim(bg)==''){
				bg = this.getBg();
			}
			if(bg === 'transparent'){
				$('body').addClass(skin).css({'background': 'transparent'});
			}else{
				$('body').addClass(skin).css({'background': '#333645 url("'+window.location.origin+'/central/css/'+skin+'/images/'+bg+'") no-repeat','background-size': '100% 100%'});
			}
			//动画背景，暂不开放
			/*var canvas = document.getElementById('canvas');
			if(!canvas){
				return;
			}
			var	ctx = canvas.getContext('2d'), 
				w = canvas.width = window.innerWidth, 
				h = canvas.height = window.innerHeight, 
				hue = 217, 
				count = 0, 
				maxStars = 1200;
			var stars = [];
			
			var canvas2 = document.createElement('canvas'), ctx2 = canvas2.getContext('2d');
			canvas2.width = 100;
			canvas2.height = 100;
			var half = canvas2.width / 2, gradient2 = ctx2.createRadialGradient(half, half,
					0, half, half, half);
			gradient2.addColorStop(0.025, '#fff');
			gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
			gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
			gradient2.addColorStop(1, 'transparent');
			
			ctx2.fillStyle = gradient2;
			ctx2.beginPath();
			ctx2.arc(half, half, half, 0, Math.PI * 2);
			ctx2.fill();
			
			// End cache
			
			function random(min, max) {
				if (arguments.length < 2) {
					max = min;
					min = 0;
				}
			
				if (min > max) {
					var hold = max;
					max = min;
					min = hold;
				}
			
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			
			function maxOrbit(x, y) {
				var max = Math.max(x, y), diameter = Math.round(Math.sqrt(max * max + max
						* max));
				return diameter / 2;
			}
			
			var Star = function() {
			
				this.orbitRadius = random(maxOrbit(w, h));
				this.radius = random(60, this.orbitRadius) / 12;
				this.orbitX = w / 2;
				this.orbitY = h / 2;
				this.timePassed = random(0, maxStars);
				this.speed = random(this.orbitRadius) / 900000;
				this.alpha = random(2, 10) / 10;
			
				count++;
				stars[count] = this;
			};
			
			Star.prototype.draw = function() {
				var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX, y = Math
						.cos(this.timePassed)
						* this.orbitRadius + this.orbitY, twinkle = random(10);
			
				if (twinkle === 1 && this.alpha > 0) {
					this.alpha -= 0.05;
				} else if (twinkle === 2 && this.alpha < 1) {
					this.alpha += 0.05;
				}
			
				ctx.globalAlpha = this.alpha;
				ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2,
						this.radius, this.radius);
				this.timePassed += this.speed;
			};
			
			for (var i = 0; i < maxStars; i++) {
				new Star();
			}
			
			function animation() {
				ctx.globalCompositeOperation = 'source-over';
				ctx.globalAlpha = 0.8;
				ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
				ctx.fillRect(0, 0, w, h);
			
				ctx.globalCompositeOperation = 'lighter';
				for (var i = 1, l = stars.length; i < l; i++) {
					stars[i].draw();
				}
			
				window.requestAnimationFrame(animation);
			}
			
			animation();*/
		},
		
		getSkin: function(){
			var skin = window.location.search.getParameter('skin');
			if(!skin || skin.length == 0 || skin == 'null' || skin == 'undefined') {
				skin = 'lightblue';
			}
			return skin;
		},
		
		getBg: function(){
			var bg = window.location.search.getParameter('bg');
			if(!bg || bg =='' || bg=='null' || bg == 'undefined'){
				bg = '00.jpg';
			}
			return bg;
		},
		
		
		/**
		 * 格式化日期
		 * 
		 * @param timestamp
		 *            时间戳
		 * @param format
		 *            如 y-m-d h:i:s
		 * @param full
		 *            是否补零 5 => 05
		 * @param dbtime
		 *            是否数据库时间 true,false
		 * @returns {string}
		 */
		parseTime: function(timestamp,format,full, dbtime){
		    full = full != undefined ? full : true;
		    if(dbtime){
		    	timestamp = timestamp*1000;
		    }
		    if(!format) format = "y-m-d h:i:s";
		    format = format.toLowerCase();
		    function zeroFull(str){
		        return full ? (str >= 10 ? str : ('0' + str)) : str;
		    }
		    var time = new Date(timestamp),
		        o = {
		            y : time.getFullYear(),
		            m : zeroFull(time.getMonth() + 1),
		            d : zeroFull(time.getDate()),
		            h : zeroFull(time.getHours()),
		            i : zeroFull(time.getMinutes()),
		            s : zeroFull(time.getSeconds())
		       };
		    return format.replace(/([a-z])(\1)*/ig,function(m){
		        return o[m];
		    });
		},
		//console.log(parseTime(1451460186,"y年m月d日 h:i"));
		////2015年12月30日 15:23
		//console.log(parseTime(1451460186,"y-m-d h:i"));
		////2015-12-30 15:23
		//console.log(parseTime(1451460186,"m-d h:i"));
		////12-30 15:23
		
		/**
		 * 多久之前
		 * @param stamp 数据库时间戳
		 * @param format 对于不在范围的日期格式化 如 y-m-d h:i:s
		 * @param max 最大级别 默认 月
		 * @returns {string}
		 */
		timeAgo: function(stamp,format,max) {
		    max = max ? parseInt(max) : 2592000;
		    var now = (new Date() * 1) / 1000,
		       time = now - stamp,
		       text = {
		        31536000 : "年",
		        2592000  : "个月",
		        604800   : "周",
		        86400    : "天",
		        3600     : "小时",
		        60       : "分钟",
		        1        : "秒"
		    };
		    var back = "";
		    if(time <= max){
		        for(var k in text){
		            var c = Math.floor(time / parseInt(k));
		            if( 0 != c ){
		                if(text[k] == "天" && c <= 2){
		                    back =  (((c == 1) ? "昨天" : "前天") + Utils.parseTime(stamp,"h:i"));
		                }else{
		                    back = (c + text[k] + "前");
		                }
		            }
		        }
		    }else{
		        back = Utils.parseTime(stamp,format);
		    }
		    return back;
		},
		//console.log(timeAgo(1451460186,"m-d h:i"));
		//3小时前 
		
		// +---------------------------------------------------
		// | 求两个时间的天数差 日期格式为 YYYY-MM-dd
		// +---------------------------------------------------
		daysBetween: function(DateOne, DateTwo) {
			var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
			var OneDay = DateOne
					.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
			var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

			var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
			var TwoDay = DateTwo
					.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
			var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

			var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date
					.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
			return Math.abs(cha);
		},
		
		// +---------------------------------------------------
		// | 日期合法性验证
		// | 格式为：YYYY-MM-DD或YYYY/MM/DD
		// +---------------------------------------------------
		IsValidDate: function (DateStr) {
			var sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); // 去两边空格;
			if (sDate == '')
				return true;
			// 如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
			// 数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
			var s = sDate.replace(
					/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
			if (s == '') // 说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
			{
				var t = new Date(sDate.replace(/\-/g, '/'));
				var ar = sDate.split(/[-/:]/);
				if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1
						|| ar[2] != t.getDate()) {
					// alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
					return false;
				}
			} else {
				// alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
				return false;
			}
			return true;
		},

		// +---------------------------------------------------
		// | 日期时间检查
		// | 格式为：YYYY-MM-DD HH:MM:SS
		// +---------------------------------------------------
		CheckDateTime: function (str) {
			var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
			var r = str.match(reg);
			if (r == null)
				return false;
			r[2] = r[2] - 1;
			var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
			if (d.getFullYear() != r[1])
				return false;
			if (d.getMonth() != r[2])
				return false;
			if (d.getDate() != r[3])
				return false;
			if (d.getHours() != r[4])
				return false;
			if (d.getMinutes() != r[5])
				return false;
			if (d.getSeconds() != r[6])
				return false;
			return true;
		},
		
		// +---------------------------------------------------
		// | 字符串转成日期类型
		// | 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
		// +---------------------------------------------------
		StringToDate: function (DateStr) {

			var converted = Date.parse(DateStr);
			var myDate = new Date(converted);
			if (isNaN(myDate)) {
				// var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
				var arys = DateStr.split('-');
				myDate = new Date(arys[0], --arys[1], arys[2]);
			}
			return myDate;
		},
		//视频时间格式化hh：mm：ss
		toTimeString: function(duration, speechrate) {
			// duration是整数，speechrate单位为分钟（默认为300）
			var hour = parseInt((duration) / speechrate / 60) < 10 ? '0' + parseInt((duration) / speechrate / 60) : parseInt((duration) / speechrate / 60);
			var min = parseInt((duration) / speechrate) % 60 < 10 ? '0' + parseInt((duration) / speechrate) % 60 : parseInt((duration) / speechrate) % 60;
			var sec = parseInt((duration) / speechrate * 60) % 60 < 10 ? '0' + parseInt((duration) * 60 / speechrate) % 60 : parseInt((duration) * 60 / speechrate) % 60;
			var s = hour + ':' + min + ':' + sec;
			return s;
		},
		
		dateFormat: function (date, formatStr) {
			var str = formatStr;
			var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
			str = str.replace(/yyyy|YYYY/, date.getFullYear());
			str = str
					.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date
							.getYear() % 100).toString() : '0'
							+ (date.getYear() % 100));

			str = str.replace(/MM/, (date.getMonth()+1) > 9 ? (date.getMonth()+1)
					.toString() : '0' + (date.getMonth()+1));
			str = str.replace(/M/g, date.getMonth());

			str = str.replace(/w|W/g, Week[date.getDay()]);

			str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate()
					.toString() : '0' + date.getDate());
			str = str.replace(/d|D/g, date.getDate());

			str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes()
					.toString() : '0' + date.getMinutes());
			str = str.replace(/m/g, date.getMinutes());

			str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date
					.getSeconds().toString() : '0' + date.getSeconds());
			str = str.replace(/s|S/g, date.getSeconds());

			if (date.getHours() > 12 && str.indexOf('ap' >= 0)) {
				str = str.replace(/hh|HH/, date.getHours() - 12);
				str = str.replace(/h|H/g, date.getHours() - 12);
				str = str.replace('ap', 'pm');
			} else if(str.indexOf('ap') >= 0){
				str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
				str = str.replace(/h|H/g, date.getHours());
				str = str.replace('ap', 'am');
			} else{
				str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
				str = str.replace(/h|H/g, date.getHours());
			}
			
			return str;
		},
		
		/*
		 * @description		根据某个字段实现对json数组的排序
		 * @param	 array	要排序的json数组对象
		 * @param	 field	排序字段（此参数必须为字符串）
		 * @param	 reverse  是否倒序（默认为false）
		 * @return	array	返回排序后的json数组
		*/
		jsonSort: function(array, field, reverse) {
		  //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
		  if(array.length < 2 || !field || typeof array[0] !== "object") return array;
		  //数字类型排序
		  if(typeof array[0][field] === "number") {
		    array.sort(function(x, y) { return x[field] - y[field]});
		  }
		  //字符串类型排序
		  if(typeof array[0][field] === "string") {
		    array.sort(function(x, y) { return x[field].localeCompare(y[field])});
		  }
		  //倒序
		  if(reverse) {
		    array.reverse();
		  }
		  return array;
		},
		
		/**
		 * 使用rem单位实现字体和其他元素长度根据页面分辨率自适应
		 */
		setPageFontSize: function(defResolution){
			var docEl = document.documentElement, 
			isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			dpr = isIOS ? Math.min(window.devicePixelRatio, 3) : window.devicePixelRatio, 
			dpr = window.top === window.self ? dpr : 1, 
			resizeEvt = 'orientationchange' in window ? 'orientationchange'	: 'resize';
			docEl.dataset.dpr = dpr;
			var recalc = function() {
				var width = docEl.clientWidth;
	//			if (width / dpr > 1080) {
	//				width = 1080 * dpr;
	//			}
				docEl.dataset.width = width
				docEl.dataset.percent = 100 * (width / (defResolution?defResolution:1680));
				docEl.style.fontSize = 100 * (width / (defResolution?defResolution:1680)) + 'px';
			};
			recalc();
			if (!document.addEventListener)
				return;
			window.addEventListener(resizeEvt, recalc, false);
		},
		
		/**
		 * 根据当前页面宽度获取对应的字号，单位PX
		 * @param fontSize
		 * @param defResolution
		 * @returns
		 */
		getEchartsFontSize: function(fontSize, defResolution){
			fontSize = fontSize || 28;
			defResolution = defResolution || 1920
			var width = document.documentElement.clientWidth;
			return Math.floor(width * fontSize / defResolution);
		},
};

Number.prototype.formatDate = function(fmt) {
	var d = new Date(this);
	return d.format(fmt);
};

var Message = {
		defaults: {
			cls: 'warning',
			closable: false,
			lifecycle: 5000
		},
		danger : function(text, closable) {
			this.show(text, {cls: 'danger', closable: closable || false});
		},
		warn : function(text, closable) {
			this.show(text, {cls: 'warning', closable: closable || false});
		},
		info : function(text, closable) {
			this.show(text, {cls: 'info', closable: closable || false});
		},
		success : function(text, closable) {
			this.show(text, {cls: 'success', closable: closable || false});
		},
		show : function(text, opt){
			var div;
			//默认值不用修改，修改新对象并返回
			var options = $.extend(true, {}, this.defaults, opt);
			if(options.id){
				div = $('<div>').addClass('alert alert-'+ options.cls + ' message-alert').appendTo($(options.id));
			} else {
				div = $('<div>').addClass('alert alert-'+ options.cls + ' message-alert').appendTo('body');
			}
			div.empty();
			//alert-dismissable和close两个类配合使用，用于关闭按钮样式
			if(!options.closable){
				div.removeClass('alert-dismissable');
			} else {
				div.addClass('alert-dismissable');
				$('<button>').addClass('close').attr('data-dismiss', 'alert').attr('aria-hidden', true).html('&times;').appendTo(div);
			}
			$('<strong>').html(text).attr('title', text).appendTo(div);			
			
			div.slideDown(400, function(){
				if(!options.closable) {
					window.setTimeout(function(){
						div.fadeOut(500);
						div.remove();
					}, options.lifecycle);
				}
			});
		}
};

var Dialog = {
	    init: function () {
	        var dlgHtml = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
	                            <div class="modal-dialog modal-lg">\
	                                <div class="modal-content">\
	                                </div>\
	                            </div>\
	                        </div>';
	        var dialog = $(dlgHtml).appendTo('body');
	        dialog.modal({
	            backdrop: 'true'
	        });
	        /**
	         * 避免页面出现多个模态框
	         */
	        dialog.on('hidden.bs.modal', function () {
	            dialog.remove();
	        });
	        return dialog;
	    }
	};

/**
 * moduleConfig样例：
 * [{
		"id": "57c55994d4f6ae8e8063baf0",
		"name": "daily.clue",
		"relativePath": "xxxxxxxxxxxxx",
		"conf": {
			
			"phoneQueryUrl": {"caption":"电话爆料请求地址","value":"http://xxxxxxxxxxxxxx"},
			"phoneQueryUrl2": {"caption":"通联线索请求地址","value":"http://xxxxxxxxxxxxxx"}
		}
	}, {
		"id": "57c6312cd4f6ae8e80534d3c",
		"name": "daily.clue",
		"relativePath": "xxxxxxxxxxxxx",
		"conf": {
			"phoneQueryUrl": "http://xxxxxxxxxxxxxx",
			"phoneQueryUrl2": "http://xxxxxxxxxxxxxx4"
		}
	}]
 */
var ModuleConfigHelper = {
		getAllConfig: function() {
			var config = this.getCurrentConfig();
			this.__currentConfig = config;
			if(!config) {
				return [];
			} else {
				return config;
			}
		},
		__currentConfig : null,
		setConfig: function(config) {
			localStorage.setItem('nova.central.modules', JSON.stringify(config));
			this.__currentConfig = config;
		},
		getCurrentConfig: function() {
			return this.__currentConfig || JSON.parse(localStorage.getItem('nova.central.modules'));
		},
		getConfigByModuleName: function(moduleName) {
			if(!moduleName||$.trim(moduleName)==''){
				return;
			}
			var configs = this.getAllConfig();
			for(var i in configs){
				if(configs[i].name === moduleName){
					return configs[i].conf;
				}
			}
		},
	};

//--------------------------------------------------- 
// 判断闰年 
//--------------------------------------------------- 
Date.prototype.isLeapYear = function() {
	return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this
			.getYear() % 400 == 0)));
};
Number.prototype.formatDate = function(fmt){
	var d = new Date(this);
	if(!fmt){
		fmt = "yyyy-MM-dd hh:mm:ss";
	}
    var o = {
        "M+": d.getMonth() + 1, //月份 
        "d+": d.getDate(), //日 
        "h+": d.getHours(), //小时 
        "m+": d.getMinutes(), //分 
        "s+": d.getSeconds(), //秒 
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度 
        "S": d.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// ---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// ---------------------------------------------------
Date.prototype.format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/,
			(this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
					: '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth()+1) > 9 ? (this.getMonth()+1).toString()
			: '0' + (this.getMonth()+1));
	str = str.replace(/M/g, this.getMonth()+1);

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString()
			: '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString()
			: '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
			.toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
			.toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}

///**
// * 日期格式化
// * 
// * @param format
// * @returns
// */
//Date.prototype.format =function(format) {
//	var o = {
//		"M+" : this.getMonth() + 1, //month
//		"d+" : this.getDate(), //day
//		"h+" : this.getHours(), //hour
//		"m+" : this.getMinutes(), //minute
//		"s+" : this.getSeconds(), //second
//		"q+" : Math.floor((this.getMonth() + 3 ) / 3), //quarter
//		"S" : this.getMilliseconds() //millisecond
//	};
//	if(/(y+)/.test(format)){
//		format=format.replace(RegExp.$1, (this.getFullYear() + "").substr( 4 - RegExp.$1.length));
//	}
//		
//	for(var k in o)if(new RegExp("("+ k +")").test(format)){
//		format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
//	}
//	return format;
//};

// +---------------------------------------------------
// | 日期计算
// +---------------------------------------------------
Date.prototype.DateAdd = function(strInterval, Number) {
	var dtTmp = this;
	switch (strInterval) {
	case 's':
		return new Date(Date.parse(dtTmp) + (1000 * Number));
	case 'n':
		return new Date(Date.parse(dtTmp) + (60000 * Number));
	case 'h':
		return new Date(Date.parse(dtTmp) + (3600000 * Number));
	case 'd':
		return new Date(Date.parse(dtTmp) + (86400000 * Number));
	case 'w':
		return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
	case 'q':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3,
				dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
						.getSeconds());
	case 'm':
		return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp
				.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
				.getSeconds());
	case 'y':
		return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp
				.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp
				.getSeconds());
	}
};

// +---------------------------------------------------
// | 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
// +---------------------------------------------------
Date.prototype.DateDiff = function(strInterval, dtEnd) {
	var dtStart = this;
	if (typeof dtEnd == 'string')// 如果是字符串转换为日期型
	{
		dtEnd = Utils.StringToDate(dtEnd);
	}
	switch (strInterval) {
	case 's':
		return parseInt((dtEnd - dtStart) / 1000);
	case 'n':
		return parseInt((dtEnd - dtStart) / 60000);
	case 'h':
		return parseInt((dtEnd - dtStart) / 3600000);
	case 'd':
		return parseInt((dtEnd - dtStart) / 86400000);
	case 'w':
		return parseInt((dtEnd - dtStart) / (86400000 * 7));
	case 'm':
		return (dtEnd.getMonth() + 1)
				+ ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12)
				- (dtStart.getMonth() + 1);
	case 'y':
		return dtEnd.getFullYear() - dtStart.getFullYear();
	}
};

// +---------------------------------------------------
// | 日期输出字符串，重载了系统的toString方法
// +---------------------------------------------------
Date.prototype.toString = function(showWeek) {
	var myDate = this;
	var str = myDate.toLocaleDateString();
	if (showWeek) {
		var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
		str += ' 星期' + Week[myDate.getDay()];
	}
	return str;
};



// +---------------------------------------------------
// | 把日期分割成数组
// +---------------------------------------------------
Date.prototype.toArray = function() {
	var myDate = this;
	var myArray = Array();
	myArray[0] = myDate.getFullYear();
	myArray[1] = myDate.getMonth();
	myArray[2] = myDate.getDate();
	myArray[3] = myDate.getHours();
	myArray[4] = myDate.getMinutes();
	myArray[5] = myDate.getSeconds();
	return myArray;
};

// +---------------------------------------------------
// | 取得日期数据信息
// | 参数 interval 表示数据类型
// | y 年 m月 d日 w星期 ww周 h时 n分 s秒
// +---------------------------------------------------
Date.prototype.DatePart = function(interval) {
	var myDate = this;
	var partStr = '';
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
	switch (interval) {
	case 'y':
		partStr = myDate.getFullYear();
		break;
	case 'm':
		partStr = myDate.getMonth() + 1;
		break;
	case 'd':
		partStr = myDate.getDate();
		break;
	case 'w':
		partStr = Week[myDate.getDay()];
		break;
	case 'ww':
		partStr = myDate.WeekNumOfYear();
		break;
	case 'h':
		partStr = myDate.getHours();
		break;
	case 'n':
		partStr = myDate.getMinutes();
		break;
	case 's':
		partStr = myDate.getSeconds();
		break;
	}
	return partStr;
};

// +---------------------------------------------------
// | 取得当前日期所在月的最大天数
// +---------------------------------------------------
Date.prototype.MaxDayOfDate = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2
			.Format('yyyy-MM-dd'));
	return result;
};

// +---------------------------------------------------
// | 取得当前日期所在周是一年中的第几周
// +---------------------------------------------------
Date.prototype.WeekNumOfYear = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var year = ary[0];
	var month = ary[1] + 1;
	var day = ary[2];
	return result;
};

String.prototype.getParameter = function(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(this) || [
			undefined, null ])[1]);
};

(function($) {
	jQuery.fn.showLoading = function(){
		var $this = $(this);
		if($this.find('.loading').length!=0){
			$this.find('.loading').show();
		}else{
			$this.prepend('<span class="loading">正在加载...</span>');
		}
	};
	jQuery.fn.hideLoading = function(){
		$(this).find('.loading').hide();
	};
})(jQuery);