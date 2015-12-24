(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AnnouncementListController', AnnouncementListController)
    .controller('AnnouncementAddController', AnnouncementAddController)
    .controller('AnnouncementDetailController', AnnouncementDetailController);

  /** @ngInject */
  function AnnouncementListController($log, $scope, $state, $stateParams, $rootScope, UserService, AnnouncementApi) {
    var vm = this, 
        pageIndex, 
        itemsPerPage, 
        userId = UserService.getUserId();

    vm.isPublish = $stateParams.publish;
    vm.title = vm.isPublish ? '公告发布记录' : '公告列表';
    vm.doRefresh = init;
    vm.loadMore = load;
    vm.detail = detail;

    $rootScope.$on('login:succ', function() {
      $log.info('login success');
      
      init();
    });

    init();

    function init() {
      pageIndex = 1;
      itemsPerPage = 10;

      vm.hasMoreData = true;
      vm.items = [];

      load();
    }

    function load() {
      AnnouncementApi.list({
        userId: userId,
        pageIndex: pageIndex,
        isPublish: vm.isPublish
      }).success(function(data) {
        if(data.flag === 1) {
          data.data.forEach(function(obj) {
            var item =  {
              id: obj.id,
              title: obj.title,
              content: obj.content,
              date: moment(obj.createdTime).format('YYYY-MM-DD'),
              read: !!obj.alreadyLook
            };

            vm.items.push(item);
          });

          $log.debug(vm.items);

          if(data.data.length < itemsPerPage) {
            vm.hasMoreData = false;
          }
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

      pageIndex++;
    }

    function detail(index) {
      var item = vm.items[index];
      if(!item.read && !vm.isPublish) {
        AnnouncementApi.updateStatus({userId: userId, id: item.id})
          .success(function(data) {
            if(data.flag === 1) {
              init();
            }
          });
      }

      $state.go('announcement:detail', {id: item.id});
    }
  }

  function AnnouncementAddController($log, $state, $rootScope, UserService, AnnouncementApi, utils) {
    var vm = this, userId = UserService.getUserId();

    vm.info = {
      userId: userId
    };

    vm.submit = function() {
      AnnouncementApi.add(vm.info).success(function(data) {
        if(data.flag === 1) {
          utils.alert({
            title: '恭喜您',
            content: '公告发布成功！',
            callback: function() {
              utils.goBack();
            }
          });
        } else {

        }
      });
    }
  }

  function AnnouncementDetailController($log, $stateParams, AnnouncementApi, UserService, utils) {
    var vm = this, id = $stateParams.id;

    AnnouncementApi.detail({id: id}).success(function(data) {
      if(data.flag === 1) {
        vm.info = data.data;
        vm.info.content = vm.info.content.replace(/\n/g, '<br>');
        vm.info.date = moment(data.data.createdTime).format('YYYY-MM-DD HH:mm:ss');
      }
    });


  }
})();
