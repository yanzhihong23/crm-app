(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('JsBridgeService', JsBridgeService);

  /** @ngInject */
  function JsBridgeService($log, $rootScope) {
    var vm = this, isAndroid = ionic.Platform.isAndroid();

    this.init = function() {
      if(window.WebViewJavascriptBridge) {
        vm.bridge = WebViewJavascriptBridge;
      } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
          vm.bridge = WebViewJavascriptBridge;
        }, false);
      }

      // for handle android back event
      window.back = function() {
        $rootScope.$ionicGoBack();
      };
    };

    this.send = function(msg) {
      if(isAndroid) {
        msg = JSON.stringify(msg);
      }

      if(vm.bridge) {
        vm.bridge.send(msg);
      }
    };

    this.exit = function() {
      if(vm.bridge) {
        vm.bridge.exit();
      }
    };
  }
})();
