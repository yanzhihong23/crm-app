(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountAddController', AccountAddController);

  /** @ngInject */
  function AccountAddController($rootScope, $state, $stateParams, utils, AreaService, ApiService, UserService, $log) {
    var vm = this, id = $stateParams.id, user = UserService.getUser();

    vm.submit = submit;
    vm.selectArea = selectArea;

    init();

    function init() {
      ApiService.rightsApplyDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          var obj = data.data.result;
          vm.info = {
            companyName: obj.companyName,
            realname: obj.applyName,
            idNo: obj.personNum,
            phone: obj.phone,
            area: {
              province: {
                id: obj.capitalId,
                name: obj.capital
              },
              city: {
                id: obj.cityId,
                name: obj.city
              },
              district: {
                id: obj.districtId,
                name: obj.district
              }
            },
          };

          AreaService.selected = vm.info.area;
          AreaService.getCityList(obj.capitalId);
          AreaService.getDistrictList(obj.cityId);
          AreaService.getStreetList(obj.districtId);
        }
      })
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

    function submit() {
      utils.confirm({
        content: '确认提交该店铺地址申请',
        onOk: function() {
          doApply();
        }
      });
    }

    function doApply() {
      vm.info.storeId = id;
      vm.info.userId = user.userId;
      ApiService.addAccountApply(vm.info).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:rights:apply');
          utils.goBack();
        } else {
          $log.error('account apply error');
        }
      });
    }

    $log.debug('AccountAddController end');

  }
})();
