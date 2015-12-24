/* global moment:false */
(function() {
  'use strict';

  angular
    .module('crmApp')
    .constant('moment', moment)
    .constant('HOST', 'http://b2b-test.zaijiadd.com')
    .factory('APISERVER', function($location, HOST) {
    	var host = /zaijiadd.com/.test($location.host()) ? $location.protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '') : HOST;

    	return host + '/cobra';
    })
    .constant('$ionicLoadingConfig', {
	    template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
	  });

})();
