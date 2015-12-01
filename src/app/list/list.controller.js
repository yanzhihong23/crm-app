(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($state, $log, $scope, ApiService, $ionicHistory) {
    var vm = this;

    vm.onTabSelect = onTabSelect;
    vm.showDetail = showDetail;
    vm.publish = publish;
    vm.type = 0;

    $scope.$watch(function() {
      return vm.type;
    }, function(val) {
      onTabSelect(val);
    })

    function onTabSelect(type) {
      ApiService.getTaskList({type: type}).success(function(data) {
        if(+data.flag === 1) {
          vm.tasks = data.data.list.map(function(obj) {
            var bgClass, desc;
            switch(obj.status) {
              case '0':
                bgClass = 'assertive-bg';
                desc = '正在等待外包商前来接受任务';
                break;
              case '1':
              case '2':
                bgClass = 'positive-bg';
                desc = '正在进行推广'
                break;
              case '3':
                bgClass = 'energized-bg';
                desc = '已确认完成任务.<span class="balanced">进行评价</span>'
                break;
              case '4':
                bgClass = 'balanced-bg';
                desc = '已确认完成任务'
            }

            return {
              id: obj.taskId,
              title: obj.taskTitle,
              type: obj.taskType,
              status: obj.status,
              bgClass: bgClass,
              desc: desc,
              publishDate: moment(obj.publishDate).format('YYYY.MM.DD'),
              acceptorName: obj.acceptorName,
              acceptedDate: moment(obj.acceptedDate).format('YYYY.MM.DD HH:mm:ss'),
              storeName: obj.storeName
            };
          });
        }
      });
    }

    function showDetail(id) {
      $state.go('detail', {id: id});
    }

    function publish() {
      // $ionicHistory.goBack();
      $state.go('publish');
    }

  }
})();
