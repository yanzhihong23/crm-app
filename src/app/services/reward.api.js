(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('RewardApi', RewardApi);

  /** @ngInject */
  function RewardApi($http, $log, APISERVER, md5) {
    var headers = {'Conetent-Type': 'application/json'};

    this.applyList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/getApplayAwardList',
        header: headers,
        data: {
          awardType: obj.type,
          applyState: obj.status, // 0: 未申请, 1: 申请中, 2: 申请成功, 3: 申请失败
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10,
          userId: obj.userId
        }
      });
    };

    this.apply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/applayAward',
        header: headers,
        data: {
          applayAwardId: obj.id, // 奖励申请id
          bankname: obj.bank.name, // 收款银行
          bankcode: obj.bank.id, // 银行Code
          bankSubbranch: obj.bankBranch, // 支行
          bankAccountName: obj.accountName, // 收款银行账户名
          bankNum: obj.bankAccount //收款银行账号
        }
      });
    };

    this.detail = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/getApplayAwardDet',
        header: headers,
        data: {
          applayAwardId: obj.id // 奖励申请id
        }
      });
    };

    this.bankInfo = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/getApplayAwardBankMsg',
        header: headers,
        data: {
          userId: obj.userId
        }
      });
    };

    this.approveList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/' + (obj.status ? 'getApproveApplyAward' : 'getNotApproveList'),
        header: headers,
        data: {
          awardType: obj.type,
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10,
          userId: obj.userId
        }
      });
    };

    this.audit = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applayAward/approveAward',
        header: headers,
        data: {
          applayAwardId: obj.id, // 奖励申请id
          userId: obj.userId,
          roleApproveState: obj.status,
          failReason: obj.comment
        }
      });
    }

    $log.debug('RewardApi end');
    
  }
})();
