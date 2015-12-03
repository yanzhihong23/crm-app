(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('AreaApi', AreaApi);

  /** @ngInject */
  function AreaApi($http, $log, APISERVER, md5) {
    this.province = function() {
      return $http({
        method: 'GET',
        url: APISERVER + '/area/province/list'
      });
    };

    this.city = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/area/city/list/' + obj.id
      });
    };

    this.district = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/area/country/list/' + obj.id
      });
    };

    this.street = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/area/town/list/' + obj.id
      });
    };

    $log.debug('AreaApi end');
    
  }
})();
