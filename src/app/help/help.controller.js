(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('HelpController', HelpController);

  /** @ngInject */
  function HelpController($log, $scope, $ionicModal, ApiService) {
    var vm = this, videoModal, video;

    vm.showVideo = showVideo;
    vm.hide = hide;

    ApiService.help().success(function(data) {
      if(data.flag === 1) {
        vm.info = data.data;
      }
    });

    $ionicModal.fromTemplateUrl('app/help/video.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      videoModal = modal;
    });

    function showVideo() {
      videoModal.show();
      setTimeout(function() {
        video = document.getElementById('tutorial_video');
        video.play();
      }, 1000);
    }

    function hide() {
      video.pause();
      videoModal.hide();
    }
  }
})();
