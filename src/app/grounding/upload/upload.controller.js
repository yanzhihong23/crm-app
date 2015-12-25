(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('UploadController', UploadController);

  /** @ngInject */
  function UploadController($log, ApiService, $scope, $rootScope, $state, $stateParams, UserService, utils) {
    var vm = this, 
        id = $stateParams.id,
        isUpdate = $stateParams.type === 'update',
        userId = UserService.getUserId();

    vm.file = {};
    vm.user = {};
    vm.disabled = true;

    vm.save = save;

    init();
    handler();

    $scope.$watch(function() {
      return vm.file;
    }, function(val) {
      if(val.onePreview && val.twoPreview && val.threePreview && val.fourPreview) {
        vm.disabled = false;
      }
    }, true);

    function init() {
      if(isUpdate) {
        ApiService.shopDetail({id: id}).success(function(data) {
          if(data.flag === 1) {
            var detail = data.data.detail;
            var imgs = data.data.imgs.map(function(obj) {
              return obj.imgUrl;
            });

            vm.user = {
              username: detail.username,
              password: detail.password,
              shopName: detail.shopName,
              shopAlipay: detail.payAlipayNum
            };

            vm.file.onePreview = imgs[0];
            vm.file.twoPreview = imgs[1];
            vm.file.threePreview = imgs[2];
            vm.file.fourPreview = imgs[3];
          }
        });
      }
    }

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
      var params = angular.copy(vm.user);
      params.update = isUpdate;
      params.userId = userId;
      params.id = id;
      params.fileUrls = [vm.file.onePreview, vm.file.twoPreview, vm.file.threePreview, vm.file.fourPreview];

      ApiService.openStoreApply(params).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:grounding:apply');
          var deep = isUpdate ? -2 : -1;
          utils.goBack(deep);
        }
      });
    }
    
  }
})();
