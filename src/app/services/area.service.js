(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('AreaService', AreaService);

  /** @ngInject */
  function AreaService($state, utils, AreaApi) {
    var vm = this;

    vm.selected = {};

    vm.select = select;

    getProvinceList();

    function select(type, index) {
      switch(type) {
        case 'province':
          vm.selected.province = vm.provinceList[index];
          vm.selected.city = null;
          vm.selected.district = null;
          vm.selected.street = null;

          getCityList(vm.provinceList[index].id);
          break;
        case 'city':
          vm.selected.city = vm.cityList[index];
          vm.selected.district = null;
          vm.selected.street = null;

          getDistrictList(vm.cityList[index].id);
          break;
        case 'district':
          vm.selected.district = vm.districtList[index];
          vm.selected.street = null;

          getStreetList(vm.districtList[index].id);
          break;
        case 'street':
          vm.selected.street = vm.streetList[index];
      }
    }

    function getProvinceList() {
      AreaApi.province().success(function(data) {
        if(data.flag === 1) {
          vm.provinceList = data.data.privinceList.map(function(obj) {
            return {
              id: obj.provinceId,
              name: obj.provinceName
            }
          });
        }
      });
    }

    function getCityList(id) {
      AreaApi.city({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.cityList = data.data.cityList.map(function(obj) {
            return {
              id: obj.cityId,
              name: obj.cityName
            };
          });
        }
      });
    }

    function getDistrictList(id) {
      AreaApi.district({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.districtList = data.data.countryList.map(function(obj) {
            return {
              id: obj.countryId,
              name: obj.countryName
            };
          });
        }
      });
    }

    function getStreetList(id) {
      AreaApi.street({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.streetList = data.data.townList.map(function(obj) {
            return {
              id: obj.townId,
              name: obj.townName
            };
          });
        }
      });
    }



  }
})();
