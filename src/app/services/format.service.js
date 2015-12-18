(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('FormatService', FormatService);

  /** @ngInject */
  function FormatService() {
    this.applyInfoFormat = function(obj) {
      if(obj) {
        return {
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
            name: obj.payBankName,
            id: obj.payBankCode
          },
          bankBranch: obj.paySubbranchBank,
          bankAccount: obj.bankNumone,

          payerName: obj.payPersonName,

          alipayAccount: obj.payAlipayNum,

          posNo: obj.possNum,

          managerCheck: obj.managersCheck,
          financeCheck: obj.financeCheck,
          checkerId: obj.whoCheck
        };
      } else {
        return {};
      }
    };

  }
})();
