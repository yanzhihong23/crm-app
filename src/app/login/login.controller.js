(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($log, ApiService, $state, UserService, utils) {
    var vm = this;

    vm.user = {
      // username: '18616725872', // ceo
      // password: 'zjdd1234',
      // username: '13764903755', // 销售主管
      username: '13020189461', // 销售
      password: '123456'
    };

    vm.submit = submit;

    function submit() {
      ApiService.login(vm.user).success(function(data) {
        if(+data.flag === 1) {
          // toastr.success('登录成功', 'Toastr fun!');

          var info = data.data;
          vm.user.isLeader = info.isLeader === '1';
          vm.user.realName = info.username;
          vm.user.orgId = info.orgid;
          vm.user.roleId = info.roleid;
          vm.user.uId = info.uid;
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
