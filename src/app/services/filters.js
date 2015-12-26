(function() {
  'use strict';

  angular
    .module('crmApp')
    .filter('payment', payment)
    .filter('payMode', payMode)
    .filter('applyType', applyType)
    .filter('applicantType', applicantType)
    .filter('agencyType', agencyType)
    .filter('inviteStatus', inviteStatus)
    .filter('applyRole', applyRole)
    .filter('card', card)
    .filter('phoneEncrypt', phoneEncrypt);

  /** @ngInject */
  function applyType() {
    var map = {
      '0': '经销权',
      '1': '开店权'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function applicantType() {
    var map = {
      '0': '个人',
      '1': '公司'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function agencyType() {
    var map = {
      '0': '独家',
      '1': '非独家'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function applyRole() {
    var map = {
      '0': '经销商',
      '1': '小店'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function payMode() {
    var map = {
      '0': '银行转账',
      '1': '支付宝',
      '2': '刷卡',
      '3': '现金'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function payment() {
    var map = {
      '0': '定金',
      '1': '全额'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function inviteStatus() {
    var map = {
      '0': '已邀约',
      '1': '已到访'
    };

    return function(id) {
      return map[id] || id;
    };
  }

  function card() {
    return function(str) {
      if(str && str.length >= 16) {
        return str.substr(0, 4) + ' ' + str.substr(4, 4) + ' ' + str.substr(8, 4) + ' ' + str.substr(12, 4) + ' ' + str.substr(16);
      } else {
        return str;
      }
    };
  }

  function phoneEncrypt() {
    return function(str) {
      if(str && str.length === 11) {
        return str.substr(0, 3) + '****' + str.substr(7);
      } else {
        return str;
      }
    };
  }
})();
