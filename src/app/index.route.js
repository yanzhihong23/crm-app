(function() {
  'use strict';

  angular
    .module('crmApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'home'
      })
      .state('list:apply:rights', {
        url: '/list/apply/rights',
        templateUrl: 'app/rights/list/apply.html',
        controller: 'RightsApplyListController',
        controllerAs: 'list'
      })
      .state('list:audit:rights', {
        url: '/list/audit/rights',
        templateUrl: 'app/rights/list/audit.html',
        controller: 'RightsAuditListController',
        controllerAs: 'list'
      })
      .state('list:apply:account', {
        url: '/list/apply/account',
        templateUrl: 'app/account/list/apply.html',
        controller: 'AccountApplyListController',
        controllerAs: 'list'
      })
      .state('list:audit:account', {
        url: '/list/audit/account',
        templateUrl: 'app/account/list/audit.html',
        controller: 'AccountAuditListController',
        controllerAs: 'list'
      })
      .state('list:apply:grounding', {
        url: '/list/apply/grounding',
        templateUrl: 'app/grounding/list/apply.html',
        controller: 'GroundingApplyListController',
        controllerAs: 'list'
      })
      .state('list:audit:grounding', {
        url: '/list/audit/grounding',
        templateUrl: 'app/grounding/list/audit.html',
        controller: 'GroundingAuditListController',
        controllerAs: 'list'
      })
      .state('list:client', {
        url: '/list/client',
        templateUrl: 'app/list/client.html',
        controller: 'ClientListController',
        controllerAs: 'list'
      })
      .state('list:invitation', {
        url: '/list/invitation',
        templateUrl: 'app/list/invitation.html',
        controller: 'InvitationListController',
        controllerAs: 'list'
      })
      .state('rights:add', {
        url: '/rights/add',
        templateUrl: 'app/rights/add/add.html',
        controller: 'RightsAddController',
        controllerAs: 'add'
      })
      .state('rights:input', {
        url: '/rights/input',
        templateUrl: 'app/rights/input/input.html',
        controller: 'RightsInputController',
        controllerAs: 'add'
      })
      .state('rights:pay', {
        url: '/rights/pay/:id',
        templateUrl: 'app/rights/pay/pay.html',
        controller: 'RightsPayController',
        controllerAs: 'add'
      })
      .state('rights:preview', {
        url: '/rights/preview/:type/:id',
        templateUrl: 'app/rights/preview/preview.html',
        controller: 'RightsPreviewController',
        controllerAs: 'preview'
      })
      .state('rights:result', {
        url: '/rights/result/:id',
        templateUrl: 'app/rights/result/result.html',
        controller: 'RightsResultController',
        controllerAs: 'result'
      })
      // .state('result', {
      //   url: '/result',
      //   templateUrl: 'app/result/result.html',
      //   controller: 'ResultController',
      //   controllerAs: 'result'
      // })
      .state('account:add', {
        url: '/account/add/:id/:type/:detailId',
        templateUrl: 'app/account/add/add.html',
        controller: 'AccountAddController',
        controllerAs: 'add'
      })
      .state('account:preview', {
        url: '/account/preview/:type/:id',
        templateUrl: 'app/account/preview/preview.html',
        controller: 'AccountPreviewController',
        controllerAs: 'preview'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('grounding:upload', {
        url: '/grounding/upload/:type/:id',
        templateUrl: 'app/grounding/upload/upload.html',
        controller: 'UploadController',
        controllerAs: 'upload'
      })
      .state('grounding:preview', {
        url: '/grounding/preview/:type/:id',
        templateUrl: 'app/grounding/preview/preview.html',
        controller: 'PreviewController',
        controllerAs: 'preview'
      })
      .state('client:add', {
        url: '/client/add',
        templateUrl: 'app/client/add.html',
        controller: 'ClientAddController',
        controllerAs: 'add'
      })
      .state('client:preview', {
        url: '/client/preview/:id',
        templateUrl: 'app/client/preview.html',
        controller: 'ClientPreviewController',
        controllerAs: 'preview'
      })
      .state('invitation', {
        url: '/invitation/:id',
        templateUrl: 'app/invitation/invitation.html',
        controller: 'InvitationController',
        controllerAs: 'invitation'
      })
      .state('area', {
        url: '/area/:type',
        templateUrl: 'app/area/area.html',
        controller: 'AreaController',
        controllerAs: 'area'
      })
      .state('bank', {
        url: '/bank',
        templateUrl: 'app/bank/bank.html',
        controller: 'BankController',
        controllerAs: 'bank'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .state('announcement', {
        url: '/announcement/:publish',
        templateUrl: 'app/announcement/list.html',
        controller: 'AnnouncementListController',
        controllerAs: 'list'
      })
      .state('announcement:add', {
        url: '/announcement/add',
        templateUrl: 'app/announcement/add.html',
        controller: 'AnnouncementAddController',
        controllerAs: 'add'
      })
      .state('announcement:detail', {
        url: '/announcement/detail/:id',
        templateUrl: 'app/announcement/detail.html',
        controller: 'AnnouncementDetailController',
        controllerAs: 'detail'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
