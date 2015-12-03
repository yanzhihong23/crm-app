(function() {
  'use strict';

  angular
    .module('crmApp')
    .directive('textarea', textarea);

  /** @ngInject */
  function textarea() {
    var directive = {
      restrict: 'E',
      link: function(scope, element, attr) {
        var update = function() {
          element.css("height", "auto");
          var height = element[0].scrollHeight; 
          element.css("height", element[0].scrollHeight + "px");
        };

        scope.$watch(attr.ngModel, function(){
          update();
        });
      }
    };

    return directive;
  }
})();
