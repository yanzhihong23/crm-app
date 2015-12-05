(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsPreviewController', RightsPreviewController);

  /** @ngInject */
  function RightsPreviewController($rootScope, $log, $state, $stateParams, $filter, ApiService, localStorageService, UserService, utils) {
    var vm = this, 
        id = $stateParams.id, 
        isAudit = $stateParams.type === 'audit',
        user = UserService.getUser();

    vm.id = id;
    vm.isAudit = isAudit;
    vm.title = id ? '申请信息详情' : '申请信息确认';

    vm.submit = submit;
    vm.audit = audit;

    init();

    function init() {
      if(!id) { // add new
        vm.info = localStorageService.get('rightsApplyInfo');
      } else {
        if(isAudit) {
          getDetail();
        } else {
          // data saved in result page
          vm.info = localStorageService.get('rightsApplyPreview');
        }
      }
    }

    function getDetail() {
      ApiService.rightsApplyDetail({id: $stateParams.id}).success(function(data) {
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

            alipayAccount: obj.payAlipayNum
          }
        } else {
          $log.error('get rights apply detail error');
        }
      });
    }

    function submit() {
      // $state.go('rights:result');
      vm.info.userId = user.userId;
      ApiService.addRightsApply(vm.info).success(function(data) {
        if(data.flag === 1) {
          utils.disableBack();
          $state.go('list:apply:rights', {},{reload: true});
        } else {
          $log.errot('add rights apply error');
        }
      });
    }

    function audit() {
      utils.confirm({
        content: '请再次确认收到' + vm.info.realname + '的付款金额' + $filter('currency')(vm.info.payAmount, '￥'),
        onOk: function() {
          ApiService.rightsAudit({
            userId: user.userId,
            roleId: user.roleId,
            status: 1,
            storeId: id
          }).success(function(data) {
            if(data.flag === 1) {
              $rootScope.$broadcast('reload:list:audit:rights');
              $state.go('list:audit:rights', {},{reload: true});
            } else {
              $log.error('rights audit error');
            }
          });
        }
      })
    }

  }
})();
