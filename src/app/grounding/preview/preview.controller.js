(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('PreviewController', PreviewController);

  /** @ngInject */
  function PreviewController($log, ApiService, $scope, $rootScope, $state, $stateParams, UserService, utils) {
    var vm = this,
        id = $stateParams.id;

    ApiService.accountApplyDetail({id: id}).success(function(data) {
      if(data.flag === 1) {
        vm.imgs = data.data.imgs.map(function(obj) {
          return obj.imgUrl;
        });
      }
    });
    
  }
})();
