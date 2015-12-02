(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('ApiService', ApiService);

  /** @ngInject */
  function ApiService($http, $log, APISERVER, md5) {
  	var headers = {'Conetent-Type': 'application/json'};

  	this.login = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/query/login',
        header: headers,
        data: {
          uid: obj.username,
          passwd: md5.createHash(obj.password)
        }
      });
    };

    $log.debug('ApiService end');
    
  }
})();
