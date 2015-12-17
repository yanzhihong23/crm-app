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
      $log.info('login success');
      
      init();
    });

    function init() {
      user = $rootScope.user;

      vm.rights = {
        sale: user.roleId == 2 || user.roleId == 3 || user.roleId == 7 || user.orgId == 11,
        manager: user.userId == 98,
        finance: user.roleId == 4,
        operate: user.roleId == 6
      };
    }
    
    // switch(user.roleId) {
    //   case 2: // 销售主管
    //   case 3: // 销售
    //   case 4: // 财务
    //   case 5: // 运营
    //   case 6: // 运营审核
    //   case 7: // 经销商
    // }
  }
})();
