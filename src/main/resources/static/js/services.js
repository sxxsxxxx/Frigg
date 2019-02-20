var CentralService = angular.module('CentralService', ['ngResource'])
	.factory('Proxy', ['$resource', function($resource){
		var Units = {
				'create': { method: 'POST', params: { action: 'create' } },
				'update': { method: 'POST', params: { action: 'update' } },
				'delete': { method: 'DELETE', params: { action: 'delete', id: '@id' } },
				'exists': { method: 'GET', params: { action: 'exists', id: '@id' } },
				'get': { method: 'GET', params: { action: 'get', id: '@id', fields: '@fields' } },
				'findAll': { method: 'GET', params: { action: 'find', scope: 'all', fields: '@fields' }, isArray: true },
				'queryAll': { method: 'GET', params: { action: 'query', scope: 'all', start: '@start', limit: '@limit', sort: '@sort', fields: '@fields' } }
		};
		return {
			Skin: $resource('./skin', {'_': Date.now()}, {
				'set': {method: 'GET', params: {action: 'set', name: '@name'}}
			}),
			User: $resource('./api/lo/users/:action/:target/:scope', { "_": Date.now() }, $.extend({}, Units, {
				'addRole': { method: 'POST', params: { action: 'change', target: 'role', scope: 'add'} },
				'removeRole': { method: 'POST', params: { action: 'change', target: 'role', scope: 'remove'} },
				'changePassword': { method: 'POST', params: { action: 'change', target: 'password', oldPwd: '@oldPwd', newPwd: '@newPwd' } },
				'updateParentId': { method: 'GET', params: { action: 'change', target: 'parent'} },
				'findByParentId': { method: 'GET', params: { action: 'find', scope: 'byParentId', parentId: '@parentId', fields: '@fields' }, isArray: true },
				'findByGroupId': { method: 'GET', params: { action: 'find', scope: 'byGroupId', groupId: '@groupId', fields: '@fields' }, isArray: true },
				'get': { method: 'GET', params: { action: 'find', scope: 'get', id: '@id', fields: '@fields' }}
			})),
			Module: $resource('./api/module/:action/:target/:scope', { "_": Date.now() }, $.extend({}, Units, {
				'list': {method: 'POST', params: { action: 'list'}},
				'save': {method: 'POST', params: { action: 'save'}},
				'add': {method: 'POST', params: { action: 'add'}},
				'del':  {method: 'POST', params: { action: 'delete'}},
				'get': {method: 'GET', params: {action: 'get'}}
			}))
		};
	}]);