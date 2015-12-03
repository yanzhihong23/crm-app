(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AreaController', AreaController);

  /** @ngInject */
  function AreaController($state, $stateParams, AreaService, utils) {
    var vm = this, type = $stateParams.type;

    switch(type) {
      case 'province':
        vm.list = AreaService.provinceList;
        vm.title = '选择省份';
        break;
      case 'city':
        vm.list = AreaService.cityList;
        vm.title = '选择城市';
        break;
      case 'district':
        vm.list = AreaService.districtList;
        vm.title = '选择区/县';
        break;
      case 'street':
        vm.list = AreaService.streetList;
        vm.title = '选择街道';
        break;
    }

    vm.select = select;

    function select(index) {
      AreaService.select(type, index);
      utils.goBack();
    }

  }
})();
