(function() {
  'use strict';

  angular
    .module('crmApp')
    .directive('back', back);

  /** @ngInject */
  function back($ionicHistory, $rootScope, $log) {
    var directive = {
      restrict: 'E',
      scope: true,
      template: '<img src="assets/images/back-btn@2x.png" width="38" class="back-btn" ng-show="hasBack">',
      link: function(scope, element, attr) {
        element.bind('click', function() {
          $ionicHistory.goBack();
        });

        $rootScope.$on('$stateChangeSuccess', function(evt, toState, fromState, fromParams) {
          scope.hasBack = $ionicHistory.backView();
        }); 
      }
    };

    return directive;
  }

})();