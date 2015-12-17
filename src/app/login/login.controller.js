(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, ApiService, $state, UserService, utils) {
    var vm = this;

    vm.user = {
      // username: '13020189461', // 销售
      // username: '18521352006', // 销售主管
      // username: '13681945800', // 财务
      // username: '15757631778', // 运营审核
      // username: '13817889024', // 运营审核
      // username: '13795200571', // 经销商
      // password: 'zjdd1234'
    };

    vm.submit = submit;

    function submit() {
      ApiService.login(vm.user).success(function(data) {
        if(+data.flag === 1) {
          var info = data.data;
          vm.user.isLeader = info.isLeader === '1';
          vm.user.realName = info.username;
          vm.user.orgId = info.orgid;
          vm.user.roleId = info.roleid;
          vm.user.userId = info.uid;
          // save user info
          UserService.setUser(vm.user);


          utils.disableBack();
          $state.go('home');
        } else {
          // toastr.error('用户名或密码错误', 'Error');
        }
      });
    }
  }
})();
