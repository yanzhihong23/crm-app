(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $state, UserService, ApiService) {
    var vm = this, user = UserService.getUser();

    vm.roleId = user.roleId;
    
    // switch(user.roleId) {
    //   case 2: // 销售主管
    //   case 3: // 销售
    //   case 4: // 财务
    //   case 5: // 运营
    //   case 6: // 运营审核
    // }
  }
})();
