(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsResultController', RightsResultController);

  /** @ngInject */
  function RightsResultController($log, ApiService, $state, $stateParams, localStorageService) {
    var vm = this, id = $stateParams.id;
    vm.id = id;

    vm.triggerApply = triggerApply;
    vm.finalPay = finalPay;

    getDetail();

    function getDetail() {
      ApiService.rightsApplyDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          var obj = data.data.result;
          vm.info = {
            isTriggered: obj.whetherStartApply,
            applyStatus: obj.applyStatus,
            date: obj.createdDate,
            companyName: obj.companyName,
            realname: obj.applyName,
            idNo: obj.personNum,
            phone: obj.phone,
            postAddr: obj.postAddr,
            email: obj.mailAddr,
            applyType: {
              id: obj.applyType
            },
            applicantType: {
              id: obj.applyPersonType
            },
            agencyType: {
              id: obj.agencyType
            },
            payMode: {
              id: obj.payWay
            },
            payType: {
              id: obj.paymoneyType
            },
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
            dealerCount: obj.dealershipNum,
            storeCount: obj.storeNumm,
            emergencyContact: obj.urgencyPerson,
            emergencyPhone: obj.urgencyPhone,
            contractAmount: obj.contractAmount,
            paidAmount: obj.paidMoney,
            payAmount: obj.needPaymoney,

            bank: {
              name: obj.payBank,
              id: obj.payBankId
            },
            bankBranch: obj.paySubbranchBank,
            bankAccount: obj.bankNumome,

            alipayAccount: obj.payAlipayNum,

            posNo: obj.possNum
          }

          localStorageService.set('rightsApplyPreview', vm.info);
        } else {
          $log.error('get rights apply detail error');
        }
      });
    }

    function triggerApply() {
      ApiService.triggerRightsApply({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.info.isTriggered = true;
        } else {
          $log.error('trigger rights apply error');
        }
      });
    }

    function finalPay() {
      $state.go('rights:pay', {id: id});
    }
  }
})();
