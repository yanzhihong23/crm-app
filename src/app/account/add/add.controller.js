(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountAddController', AccountAddController);

  /** @ngInject */
  function AccountAddController($scope, $rootScope, $state, $stateParams, $ionicModal, utils, AreaService, ApiService, UserService, $log) {
    var vm = this, 
        mapModal,
        id = $stateParams.id, 
        detailId = $stateParams.detailId,
        isUpdate = $stateParams.type === 'update',
        user = UserService.getUser();

    vm.title = isUpdate ? '店铺地址修改' : '店铺地址申请';
    vm.submit = submit;
    vm.selectArea = selectArea;
    vm.showMap = showMap;
    vm.hideModal = hideModal;
    vm.confirm = confirm;

    init();

    function init() {
      if(isUpdate) {
        initUpdate();
      } else {
        initAdd();
      }
    }

    function initAdd() {
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
            }
          };

          AreaService.selected = vm.info.area;
          AreaService.getCityList(obj.capitalId);
          AreaService.getDistrictList(obj.cityId);
          AreaService.getStreetList(obj.districtId);
        }
      });
    }

    function initUpdate() {
      ApiService.accountApplyDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          var detail = data.data.detail;
          vm.info = {
            companyName: detail.companyName,
            realname: detail.applyName,
            idNo: detail.personNum,
            phone: detail.phone,
            area: {
              province: {
                id: detail.capital,
                name: detail.capitalName
              },
              city: {
                id: detail.city,
                name: detail.cityName
              },
              district: {
                id: detail.district,
                name: detail.districtName
              },
              street: {
                id: detail.street,
                name: detail.streetName
              }
            },
            address: detail.detailAddress,
            village: detail.village,
            remark: detail.addressAuditOpinion
          };

          AreaService.selected = vm.info.area;
          AreaService.getCityList(detail.capital);
          AreaService.getDistrictList(detail.city);
          AreaService.getStreetList(detail.district);
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

    function submit() {
      utils.confirm({
        content: '确认提交该店铺地址申请',
        onOk: function() {
          doApply();
        }
      });
    }

    function doApply() {
      vm.info.storeId = detailId || id;
      vm.info.userId = user.userId;
      vm.info.update = isUpdate;
      ApiService.addAccountApply(vm.info).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:account:apply');
          var deep = isUpdate ? -2 : -1;
          utils.goBack(deep);
        } else {
          $log.error('account apply error');
        }
      });
    }

    function showMap() {
      $ionicModal.fromTemplateUrl('app/components/map/map.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        mapModal = modal;
        modal.show();
      });
    }

    function hideModal() {
      mapModal.remove();
    }

    function confirm() {
      if(vm.info.point) {
        console.log(vm.info.point);
        mapModal.remove();
      } else {
        utils.alert({
          content: '选择无效'
        });
      }
    }

    $log.debug('AccountAddController end');

  }
})();
