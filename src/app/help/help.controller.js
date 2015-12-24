(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('HelpController', HelpController);

  /** @ngInject */
  function HelpController($log, $scope, $ionicModal, ApiService) {
    var vm = this, videoModal;

    vm.showVideo = showVideo;
    vm.hide = hide;

    ApiService.help().success(function(data) {
      if(data.flag === 1) {
        vm.info = data.data;
      }
    });

    function showVideo() {
      $ionicModal.fromTemplateUrl('app/help/video.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        videoModal = modal;
        videoModal.show();
      });
    }

    function hide() {
      videoModal.remove();
    }

  }
})();
