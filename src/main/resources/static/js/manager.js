var ModuleConfig = {
		_renderModuleConfigRow : function(key, value, row){
			var div = $('<div class="form-group">\
							<div class="checkbox"> <label><input type="checkbox" name="selected" ></label> </div>\
							<label class="control-label" name="adesc">扩展属性</label>\
							<div class="akey"> <input type="text" class="form-control" name="akey"></div>\
							<div class="avalue"> <input type="text" name="avalue" class="form-control"></div>\
						</div>');
			div.find('[name="akey"]').val(key).attr('title', key);
			div.find('[name="avalue"]').val(value);
			
			div.data('old-attribute', {key:value}).appendTo(row);
		},
		loadModuleConfigs: function(refresh){
			var menu = $('#nv_left').find('.menu.navi');
			if(refresh){
				menu.find('li.active>a')[0].click();
			}else{
				menu.empty();
				var modules = ModuleConfigHelper.getAllConfig();
				for (var i in modules) {
					ModuleConfig.renderNavButton(modules[i], menu);
				}
				menu.find('li>a')[0].click();
			}
		},
		renderNavButton: function (module, menu){
			var html = '<li>\
							<i class="opr-del-btn fa fa-minus-circle"></i>\
							<a class="nav-btn" href="javascript:;"><i class="'+ module.icon +'"></i><span class="left_menu_title">'+ module.caption +'</span></a>\
						</li>';
			var $html = $(html).data('data', module).appendTo(menu);
			$html.find('.nav-btn').click(function(){
				$(this).parent().addClass('active').siblings().removeClass('active');
				ModuleConfig.renderContent(module);
			});
			$html.find('.opr-del-btn').click(function(){
				var $that = $(this);
				CentralProxy.delModulesInf(module, function(){
					Message.success('删除成功');
					$that.parent().remove();
					var modules = ModuleConfigHelper.getAllConfig();
					for(var i in modules){
						if(modules[i].id == module.id){
							modules.splice(i,1);
							break;
						}
					}
					
					ModuleConfigHelper.setConfig(modules);
					menu.find('li>a')[0].click();
				});
			});
		},
		renderContent: function(module) {
			$('.config-field').empty();
			$('#nv_content').data('data',module);
			var index = 0;
			for(var i in module.conf){
				+function(){
					var row = $('<div class="row">').appendTo('.config-field');
					if(index % 1 > 0){
						row.addClass('even');
					}
					index++;
					ModuleConfig._renderModuleConfigRow(i, module.conf[i], row);
				}();
			}
			$('.config-field').find('input[type="text"]').on('input blur', function(){
				var val = $(this).val();
				var group = $(this).parent().parent();
				var old = group.data('old-attribute');
				if(val != old.value){
					group.addClass('has-warning');
				} else {
					group.removeClass('has-warning');
				}
			});
		},
		deleteModuleConfigs: function(){
			var names = [];
			$('.config-field .row :checked').each(function(index, item){
				var div = $(this).parent().parent().parent().parent();
				div.remove();
			});
			ModuleConfig.saveModuleConfigs(true);
		},
		saveModuleConfigs: function(noNeedValidate){
			var okFlag = false, validate = true;
			$('.config-field .has-warning').each(function(index, item){
				if($(this).hasClass('new-row')){
					//var description = $(item).find('input[name="descr"]').val();
					var value = $(item).find('input[name="avalue"]').val();
					var name = $(item).find('input[name="akey"]').val();
					if(value.length == 0 || name.length == 0){
						validate = false;
						return;
					}
				}
			});
			if(!noNeedValidate && !validate){
				Message.show('填写内容不能为空。');
				return;
			}
			$('.config-field .has-warning').each(function(index, item){
				if($(this).hasClass('new-row')){
					//var description = $(item).find('input[name="descr"]').val();
					var value = $(item).find('input[name="avalue"]').val();
					var name = $(item).find('input[name="akey"]').val();
					ModuleConfig._renderModuleConfigRow(name, value, $(this).empty().removeClass('new-row'));
				}
				okFlag = true;
			});
			
			if(okFlag || noNeedValidate){
				var contentPane = $('#nv_content');
				var rows = contentPane.find('.config-field>.row');
				var data = contentPane.data('data');
				data.conf = {};
				$(rows).each(function(i,row){
					var key = $(row).find('input[name="akey"]').val();
					var value = $(row).find('input[name="avalue"]').val();
					data.conf[key] = value;
				});
				CentralProxy.saveModulesInf(data, function(){
					Message.info('保存成功！');
					$('#nv_content').data('data',data);
					var modules = ModuleConfigHelper.getAllConfig();
					for(var i in modules){
						if(modules[i].id == data.id){
							modules[i] = data;
							ModuleConfigHelper.setConfig(modules);
						}
					}
				})
			} else {
				Message.show('未修改配置，无需保存', {cls: 'warning'});
			}
		},
		createModuleConfigClick: function(){
			var html = '<div class="form-group">\
							<div class="checkbox"> <label><input type="checkbox" name="selected" ></label> </div>\
							<label class="control-label" name="adesc">扩展属性</label>\
							<div class="akey"> <input type="text" class="form-control" name="akey"></div>\
							<div class="avalue"> <input type="text" name="avalue" class="form-control"></div>\
						</div>';
			var row = $('<div class="row new-row has-warning">').prependTo('.config-field');
			$(html).appendTo(row);
			$('.config-field').scrollTop(0);
			row.find('input:first').focus();
		},
		
		addNewModule: function(){
			var dialog = $('#myModal').modal();
			$('#btn_submit').click(function(){
				var moduleCaption = $('#moduleCaption').val();
				var moduleName = $('#moduleName').val();
				var modulePath = $('#modulePath').val();
				var moduleColor = $('#moduleColor').val();
				var moduleIcon = $('#moduleIcon').val();
				if($.trim(moduleName) == '' || $.trim(moduleCaption) == '' || $.trim(modulePath) == ''){
					Message.warn("请检查必填项");
					return;
				}
					
				var module = {
						caption: moduleCaption,
						name: moduleName,
						relativePath: modulePath,
						color: moduleColor,
						icon: moduleIcon
				};

				CentralProxy.saveModulesInf(module, function(resp){
					var newModule = resp;
					var modules = ModuleConfigHelper.getAllConfig();
					modules[modules.length] = newModule;
					ModuleConfigHelper.setConfig(modules);
					var menu = $('#nv_left').find('.menu.navi');
					ModuleConfig.renderNavButton(newModule, menu);
					menu.find('li>a')[menu.find('li>a').length-1].click();
					dialog.modal('hide');
				});
			});
	        
		},
		
		delModule: function(){
			var liArr = $('#nv_left').find('.menu.navi>li');
			var delBtn = $('#BtnDelModule');
			var okBtn = $('#BtnDelModuleOK');
			liArr.find('.opr-del-btn').addClass('active');
			delBtn.parent().addClass('hidden');
			okBtn.click(function(){
				liArr.find('.opr-del-btn').removeClass('active');
				delBtn.parent().removeClass('hidden');
				okBtn.parent().addClass('hidden');
			}).parent().removeClass('hidden');
			
	        
		}
};
