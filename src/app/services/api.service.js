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

    // 用户信息报备
    this.clientList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/queryAllInviteUserMsg',
        header: headers,
        data: {
          page: obj.pageIndex || 0,
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
          applyRole: obj.applyRole
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
          pageCount: obj.itemsPerPage || 10
        }
      });
    };

    this.invitaion = function(obj) {
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
          visitTime: obj.date,
          applyRole: obj.applyRole,
          userState: obj.state, // 0: 已邀约, 1: 已到访
          remark: obj.remark
        }
      });
    };

    this.updateInvitation = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/applyFlow/updateInviteUser',
        header: headers,
        data: {
          inviteUserid: obj.id,
          userState: obj.state
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
    }

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

    // 开店申请列表
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
