(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('PublishController', PublishController);

  /** @ngInject */
  function PublishController($log, $scope, ApiService, utils) {
    var vm = this;

    vm.submit = submit;
    vm.task = {
      type: 1
    };

    $scope.$watch(function() {
      return vm.task.type;
    }, function(val) {
      if(val===1) {
        vm.task.title = '推广任务30天';
        vm.task.content = '推广累计20天每日订单数65单以上，且每日复购金额达到500元以上，并且总用户数达到600以上，小店微信群人数达到200（需满足80%为小区有效用户）以上。'
      } else {
        vm.task.title = '';
        vm.task.content = '';
      }
    });

    getStoreInfo();

    function getStoreInfo() {
      ApiService.getStoreInfo().success(function(data) {
        if(+data.flag === 1) {
          vm.info = data.data;
        } else {

        }
      });
    }

    function submit() {
      utils.confirm({
        title: '发布任务',
        content: '您正在发布“' + vm.task.title + '”任务，是否确认发布？',
        cancelText: '取消',
        okText: '接受',
        okType: 'button-assertive',
        onOk: publish
      });
    }

    function publish() {
      ApiService.publishTask(vm.task).success(function(data) {
        if(+data.flag === 1) {
          utils.alert({
            title: '任务发布成功',
            content: '您的任务已经发布成功。<br>亲爱的供应商正在来接任务的路上~ <br>请耐心等待。',
            callback: utils.goBack
          });
        } else {
          utils.alert({
            title: '任务发布成功',
            content: data.msg
          });
        }
      });
    }
    
  }
})();
