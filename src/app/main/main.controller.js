(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $state, $rootScope, UserService, ApiService, $ionicNavBarDelegate) {
    var vm = this, user;

    init();

    $rootScope.$on('login:succ', function() {
      init();
    });

    function init() {
      user = UserService.getUser();
      vm.roleId = user.roleId;
    }
    
    // switch(user.roleId) {
    //   case 2: // 销售主管
    //   case 3: // 销售
    //   case 4: // 财务
    //   case 5: // 运营
    //   case 6: // 运营审核
    // }
  }
})();
