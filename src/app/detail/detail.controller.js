(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($state, $stateParams, $log, ApiService, localStorageService) {
    var vm = this;

    vm.review = review;

    getTaskDetail();

    function getTaskDetail() {
      ApiService.getTaskDetail({taskId: $stateParams.id}).success(function(data) {
        if(+data.flag === 1) {
          vm.info = data.data;

          vm.info.publishDate = moment(vm.info.publishDate).format('YYYY.MM.DD');
          vm.info.currentDate = moment().format('YYYY.MM.DD HH:mm:ss');

          if(vm.info.acceptedDate) {
            vm.info.acceptedDate = moment(vm.info.acceptedDate).format('YYYY.MM.DD HH:mm:ss');
          }

          if(vm.info.finishDate) {
            vm.info.finishDate = moment(vm.info.finishDate).format('YYYY.MM.DD HH:mm:ss');
          }

          if(vm.info.reviewDate) {
            vm.info.reviewDate = moment(vm.info.reviewDate).format('YYYY.MM.DD HH:mm:ss');
          }

          vm.info.reviewText = '最终评价';
          if(vm.info.acceptorType === 3) { // MP
            if(vm.info.status !== 3) {
              vm.info.reviewText = '每日评价';
              if(vm.info.status > 3) {
                vm.info.reviewDisabled = true;
              }
            }
          } else if(vm.info.status !== 3) {
            vm.info.reviewDisabled = true;
          }
        }
      });
    }

    function review() {
      localStorageService.set('info', vm.info);
      
      $state.go('review', {id: $stateParams.id});
    }
  }
})();
