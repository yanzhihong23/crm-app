(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('ApiService', ApiService);

  /** @ngInject */
  function ApiService($http, $log, APISERVER, md5) {
  	var headers = {'Conetent-Type': 'application/json'};

  	this.login = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/query/login',
        header: headers,
        data: {
          uid: obj.username,
          passwd: md5.createHash(obj.password)
        }
      });
    };

    this.bankList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryBankList'
      });
    };

    // 用户信息报备
    this.clientList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryAllInviteUserMsg',
        header: headers,
        data: {
          userId: obj.userId,
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10
        }
      });
    };

    this.client = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryInviteUserMsgById',
        header: headers,
        data: {
          inviteUserid: obj.id
        }
      });
    };

    this.addClient = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/addInviteUserMsg',
        header: headers,
        data: {
          inviteuserName: obj.name,
          personNumber: obj.idNo,
          inviteuserMobile: obj.phone,
          applyRole: obj.applyRole.id,
          userId: obj.userId
        }
      });
    };

    // 邀约
    this.invitedList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryAllInviteUser',
        header: headers,
        data: {
          page: obj.pageIndex || 0,
          pageCount: obj.itemsPerPage || 10,
          userId: obj.userId
        }
      });
    };

    this.invitation = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryInviteUserById',
        header: headers,
        data: {
          inviteUserid: obj.id
        }
      });
    };

    this.addInvitation = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/addInviteUser',
        header: headers,
        data: {
          inviteuserName: obj.name,
          inviteuserMobile: obj.phone,
          visitTime: obj.visitDate,
          applyRole: obj.applyRole.id,
          userState: obj.status.id, // 0: 已邀约, 1: 已到访
          remark: obj.remark,
          userId: obj.userId
        }
      });
    };

    this.updateInvitation = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/updateInviteUserById',
        header: headers,
        data: {
          inviteUserid: obj.id,
          userState: obj.status.id
        }
      });
    };

    // 开户权申请列表
    this.rightsApplyList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryAllApplyStoreSate',
        header: headers,
        data: {
          applyStatus: obj.type,
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10,
          userId: obj.userId
        }
      });
    };

    this.rightsApplyDetail = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryApplyStoreDetails',
        header: headers,
        data: {
          applyStoreId: obj.id
        }
      });
    };
 
    this.addRightsApply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/addApplyStore',
        header: headers,
        data: {
          userId: obj.userId,
          whetherSelf: obj.selfPay.id,
          applyType: obj.applyType.id,
          applyPersonType: obj.applicantType.id,
          agencyType: obj.agencyType.id,
          dealershipNum: obj.dealerCount,
          storeNumm: obj.storeCount,
          applyName: obj.realname,
          personNum: obj.idNo,
          phone: obj.phone,
          postAddr: obj.postAddr,
          mailAddr: obj.email,
          urgencyPerson: obj.emergencyContact,
          urgencyPhone: obj.emergencyPhone,
          companyname: obj.companyName,

          payWay: obj.payMode.id,
          paymoneyType: obj.payType.id,
          contractAmount: obj.contractAmount,
          paidMoney: obj.paidAmount,
          needPaymoney: obj.payAmount,

          capital: obj.area.province.name,
          capitalId: obj.area.province.id,
          city: obj.area.city.name,
          cityId: obj.area.city.id,
          district: obj.area.district.name,
          districtId: obj.area.district.id,

          payPersonName: obj.payerName,

          payBank: obj.bank && obj.bank.name, // TODO
          payBankId: obj.bank && obj.bank.id,
          paySubbranchBank: obj.bankBranch,
          bankNumome: obj.bankAccount,

          payAlipayNum: obj.alipayAccount
        }
      });
    };

    this.dealerCountLimit = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryDealershipNumAble',
        headers: headers,
        data: {
          cityId: obj.id
        }
      });
    };

    this.triggerRightsApply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/updateWhetherStartApply',
        headers: headers,
        data: {
          applyStoreId: obj.id,
          whetherStartApply: 1
        }
      });
    };

    // 开户申请列表
    this.accountApplyList = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/storeinfo/applicationAccount/list/' + obj.type // 0: 申请中, 1: 申请成功, 2: 申请失败
      });
    };

    this.addAccountApply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/storeinfo/add',
        header: headers,
        data: {
          applyName: obj.realname,
          personNum: obj.idNo,
          phone: obj.phone,
          capital: obj.provinceId,
          city: obj.cityId,
          district: obj.districtId,
          street: obj.streetId,
          detailAddress: obj.address,
          village: obj.village,
          applyStoreId: obj.applyStoreId
        }
      });
    };

    this.accountApplyDetail = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/storeinfo/detail/' + obj.id
      });
    };

    // 开户权审批列表(财务、主管)
    this.rightsAuditList = function(obj) {
      var type = obj.status === 0 ? 'queryRoleApproveStoreTry' : 'queryApproveMsg';
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/' + type,
        headers: headers,
        data: {
          roleId: obj.roleId,
          whoCheck: obj.roleId,
          applyStatus: obj.status,
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10,
        }
      });
    };

    this.rightsAudit = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/approveStore',
        headers: headers,
        data: {
          userId: obj.userId,
          roleId: obj.roleId,
          approveState: obj.status,
          applyStoreId: obj.storeId
        }
      });
    };

    // 地址审核(开户申请审核)列表
    this.addrAuditList = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/storeinfo/myApproval/list/' + obj.type // 0: 待审批, 1: 已审批
      });
    };

    this.addrAudit = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/storeinfo/addressAudit',
        header: headers,
        data: {
          storeId: obj.storeId,
          auditOpinion: obj.auditOpinion,
          status: obj.status // 1: 通过, -1: 不通过
        }
      });
    };

    this.picAudit = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/storeinfo/imgAudit',
        header: headers,
        data: {
          storeId: obj.storeId,
          auditOpinion: obj.auditOpinion,
          status: obj.status // 1: 通过, -1: 不通过
        }
      });
    };

    this.picUpload = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/file/upload',
        header: headers,
        data: obj.file
      });
    };

    this.openStoreApply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/storeinfo/applicationShop',
        header: headers,
        data: {
          storeId: obj.storeId,
          fileUrls: obj.fileUrls
        }
      });
    };

    // 开店(上架)申请列表
    this.storeApplyList = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/storeinfo/applicationAccount/list/' + obj.type // 3: 待申请, 4: 申请中, 5: 申请成功, 6: 申请失败
      });
    };

    this.picAuditList = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/storeinfo/myApproval/list/' + obj.type // 2: 待审批, 3: 已审批
      });
    };

    $log.debug('ApiService end');
    
  }
})();
