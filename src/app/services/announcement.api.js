(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('AnnouncementApi', AnnouncementApi);

  /** @ngInject */
  function AnnouncementApi($http, $log, APISERVER, md5) {
    var headers = {'Conetent-Type': 'application/json'};

    this.list = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/announcement/' + (obj.isPublish ? 'list' : 'listByUserId'),
        header: headers,
        data: {
          userId: obj.userId,
          page: obj.pageIndex || 1,
          pageCount: obj.itemsPerPage || 10
        }
      });
    };

    this.detail = function(obj) {
      return $http({
        method: 'GET',
        url: APISERVER + '/announcement/detail/' + obj.id
      });
    };

    this.add = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/announcement/submit',
        header: headers,
        data: {
          creater: obj.userId,
          title: obj.title,
          content: obj.content
        }
      });
    };

    this.updateStatus = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER + '/announcement/updateAnnouncementStatus',
        header: headers,
        data: {
          userId: obj.userId,
          announcementId: obj.id
        }
      });
    };


    $log.debug('AnnouncementApi end');
    
  }
})();
