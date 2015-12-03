(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountAddController', AccountAddController);

  /** @ngInject */
  function AccountAddController($state, utils, AreaService, $log) {
    var vm = this;

    vm.selected = AreaService.selected;

    vm.submit = submit;
    vm.selectArea = selectArea;

    function selectArea(type) {
      switch(type) {
        case 'province':
          $state.go('area', {type: type});
          break;
        case 'city':
          if(vm.selected.province && vm.selected.province.id) {
            $state.go('area', {type: type});
          } else {
            utils.alert({
              content: '请先选择省份'
            });
          }

          break;
        case 'district':
          if(vm.selected.city && vm.selected.city.id) {
            $state.go('area', {type: type});
          } else {
            utils.alert({
              content: '请先选择城市'
            });
          }

          break;
        case 'street':
          if(vm.selected.district && vm.selected.district.id) {
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
          
        }
      });
    }

    $log.debug('AccountAddController end');

  }
})();
