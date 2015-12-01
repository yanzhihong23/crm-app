(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('ApiService', ApiService);

  /** @ngInject */
  function ApiService($http, $log, APISERVER, AppService, utils) {
  	var headers = AppService.getHeaders();

  	this.getSwitchInfo = function() {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/getSwitchInfo',
  			headers: headers
  		});
  	};

  	this.getStoreInfo = function() {
  		return $http({
  			method: 'POST',
  			url: APISERVER + '/getStoreInfo',
  			headers: headers
  		});
  	};

    this.getTaskList = function(obj) {
    	return $http({
    		method: 'POST',
    		url: APISERVER + '/getOwnerTaskList',
    		headers: headers,
    		data: utils.param({
    			taskStatus: obj.type || 0, //0: published, 1: in progress, 3: need review, 4: completed
					start: obj.start || 0
    		})
    	});
    };

    this.getTaskDetail = function(obj) {
    	return $http({
    		method: 'POST',
    		url: APISERVER + '/getTaskDetail',
    		headers: headers,
    		data: utils.param({
    			taskId: obj.taskId
    		})
    	});
    };

    this.reviewTask = function(obj) {
    	return $http({
    		method: 'POST',
    		url: APISERVER + '/reviewTask',
    		headers: headers,
    		data: utils.param({
    			taskId: obj.taskId,
    			attitudeScore: obj.attitude,
    			satisfactionScore: obj.satisfaction,
    			methodScore: obj.method,
    			content: obj.comment
    		})
    	});
    };

    this.publishTask = function(obj) {
    	return $http({
    		method: 'POST',
    		url: APISERVER + '/publishTask',
    		headers: headers,
    		data: utils.param({
    			taskTitle: obj.title,
					taskContent: obj.content,
					taskType: obj.type
    		})
    	});
    };

    $log.debug('ApiService end');
    
  }
})();
