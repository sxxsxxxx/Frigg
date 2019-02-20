/**
 *  二级详情页面
 */

var DetailShow = {
    show: function (opts) {
        var opts_default = {
            data: {
            	title: '',
            	time: '',
            	content: '',
            	pics: []
            }
        };
        var detailShow = {};
        detailShow.options = $.extend(true, opts_default, opts);
        DetailShow.showDetail(detailShow);
        return detailShow;
    },
    
    showDetail: function(detailShow) {
        var row = detailShow.options.data;
        var dialog = DetailDialog.init();
        /*dialog.find('.modal-dialog').addClass('modal-dialog-detail');*/
        var detailHtml = '<div class="title-detail-pane">\
                                <div class="head">\
                                    <span class="title"></span>\
                                    <span class="time"></span>\
                                </div>\
					        	<div id="photos-coverflow-container">\
									<div id="photos-coverflow"></div>\
								</div>\
                                <div class="content"></div>\
                        </div>';
        var $html = $(detailHtml);
        $html.find('.title').text(row.title).attr('title', row.title);
        $html.find('.time').text(row.time);     
        //内容是否要解析html标签
        if(row.html){
        	var cHtml = $('<div></div>');
    		cHtml.html(row.content);
    		$html.find('.content').html(cHtml);
        }else{
        	$html.find('.content').text(Utils.escapeHtml(row.content));
        }
		
        function appendPhotos(row, photosList) {
        	if(!row.pics || row.pics.length == 0){
        		return;
        	}
			for(var i in row.pics){
				if(row.pics[i] && row.pics[i].indexOf('http://')>=0){
					var html = '<img class="cover" src="' + row.pics[i] + '"/>';
					$(html).appendTo(photosList);
				}
			}
		}
        appendPhotos(row, $html.find('#photos-coverflow'));
        $html.appendTo(dialog.find('.modal-content'));
    }
};


var DetailDialog = {
	    init: function () {
	        var dlgHtml = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
	        	                <div class="modal-dialog modal-lg detail-dialog">\
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