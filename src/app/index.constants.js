/* global moment:false */
(function() {
  'use strict';

  angular
    .module('crmApp')
    .constant('moment', moment)
    .constant('HOST', 'http://b2b-test.zaijiadd.com')
    .constant('PATTERN', {
        id: /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
        phone: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
    })
    .factory('APISERVER', function($location, HOST) {
    	var host = /zaijiadd.com/.test($location.host()) ? $location.protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '') : HOST;

    	return host + '/cobra';
    })
    .constant('$ionicLoadingConfig', {
	    template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
	  });

})();
