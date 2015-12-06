(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('UploadController', UploadController);

  /** @ngInject */
  function UploadController($log, ApiService, $scope, $rootScope, $state, $stateParams, UserService, utils) {
    var vm = this, 
        id = $stateParams.id,
        userId = UserService.getUserId();

    vm.file = {};

    vm.save = save;

    handler();

    function handler() {
      var arr = ['one', 'two', 'three', 'four'];
      arr.forEach(function(item) {
        $scope.$watch(function() {
          return vm.file[item];
        }, function (val) {
          if (val) {
            // resize image
            utils.resizeImg(val, item);
          }
        });

        // upload
        $rootScope.$on(item, function(evt, data){
          $log.debug(item + 'changed');
          ApiService.upload({
            userId: userId,
            file: data.file,
            fileType: data.fileType
          }).success(function(data) {
            if(data.flag === 1) {
              var imgUrl = data.data.fileUrl[0];
              vm.file[item + 'Preview'] = imgUrl;
            }
          });
        });
      });
    }

    function save() {
      ApiService.openStoreApply({
        userId: userId,
        storeId: id,
        fileUrls: [vm.file.onePreview]
      }).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:grounding:apply');
          utils.goBack();
        }
      });
    }
    
  }
})();
