(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsAddController', RightsAddController);

  /** @ngInject */
  function RightsAddController($log, $ionicActionSheet, $state, $scope, AreaService, ApiService, localStorageService, RightsApplyService, utils) {
    var vm = this,
        applyTypes = [
          { text: '经销权', id: 0 },
          { text: '开店权', id: 1 }
        ],
        applicantTypes = [
          { text: '个人', id: 0 },
          { text: '公司', id: 1 }
        ],
        agencyTypes = [
          { text: '独家', id: 0 },
          { text: '非独家', id: 1 }
        ];


    vm.info = {
      applyType: applyTypes[0],
      applicantType: applicantTypes[0],
      agencyType: agencyTypes[0],
      area: AreaService.selected
    };

    RightsApplyService.info = vm.info;

    vm.showApplyTypeAction = showApplyTypeAction;
    vm.showApplicantTypeAction = showApplicantTypeAction;
    vm.showAgencyTypeAction = showAgencyTypeAction;
    vm.next = next;
    vm.selectArea = selectArea;

    $scope.$watch(function() {
      return vm.info.area;
    }, function(val) {
      if(val.city && val.city.id) {
        $log.debug(val);
        ApiService.dealerCountLimit({id: val.city.id}).success(function(data) {
          if(data.flag === 1) {
            vm.dealerCountLimt = data.data.result && data.data.result.dealershipNumAble;
          }
        });
      } 
    }, true);

    $scope.$watch(function() {
      return vm.info.dealerCount;
    }, function(val) {
      if(val) {
        vm.info.dealerCount = Math.min(vm.dealerCountLimt || 1, val);
      }
    });

    function showApplyTypeAction() {
      var applyTypeAction = $ionicActionSheet.show({
        buttons: applyTypes,
        // destructiveText: 'Delete',
        titleText: '选择申请类型',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.applyType = applyTypes[index];
         return true;
        }
      });
    }

    function showApplicantTypeAction() {
      var applicantTypeAction = $ionicActionSheet.show({
        buttons: applicantTypes,
        // destructiveText: 'Delete',
        titleText: '选择申请人类别',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.applicantType = applicantTypes[index];
          return true;
        }
      });
    }

    function showAgencyTypeAction() {
      var agencyTypeAction = $ionicActionSheet.show({
        buttons: agencyTypes,
        // destructiveText: 'Delete',
        titleText: '选择代理类型',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.agencyType = agencyTypes[index];
          return true;
        }
      });
    }

    function selectArea(type) {
      switch(type) {
        case 'province':
          $state.go('area', {type: type});
          break;
        case 'city':
          if(vm.info.area.province && vm.info.area.province.id) {
            $state.go('area', {type: type});
          } else {
            utils.alert({
              content: '请先选择省份'
            });
          }

          break;
        case 'district':
          if(vm.info.area.city && vm.info.area.city.id) {
            $state.go('area', {type: type});
          } else {
            utils.alert({
              content: '请先选择城市'
            });
          }

          break;
        case 'street':
          if(vm.info.area.district && vm.info.area.district.id) {
            $state.go('area', {type: type});
          } else {
            utils.alert({
              content: '请先选择区县'
            });
          }

          break;
      }
    }

    function next() {
      localStorageService.set('rightsApplyInfo', vm.info);
      $state.go('rights:input');
    }
  }
})();
