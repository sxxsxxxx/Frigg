var Central = angular.module("Central", ["ngResource", "ngRoute", "ngAnimate", "ui.bootstrap", "minicolors", "CentralService"])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'partials/combine.html',
			controller:  'CommonCombineController'
		}).when('/portal', {
			templateUrl: 'partials/portal.html',
			controller:  'PortalController'
		}).when('/admin/module', {
			templateUrl: 'admin/module.html',
			controller:  'ModuleController'
		}).when('/admin/portal', {
			templateUrl: 'admin/portal.html',
			controller:  'PortalAdminController'
		}).when('/admin/user', {
			templateUrl: 'admin/user.html',
			controller:  'UserController'
//		}).otherwise({
//			redirectTo: '/'
		});
	}])
	.controller('CombineController', function($scope, Proxy){
		
	});
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
