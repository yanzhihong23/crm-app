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
      })
      .state('rights:list', {
        url: '/rights/list',
        templateUrl: 'app/rights/list/list.html',
        controller: 'RightsListController',
        controllerAs: 'rightsList'
      })
      .state('rights:add', {
        url: '/rights/add',
        templateUrl: 'app/rights/add/add.html',
        controller: 'RightsAddController',
        controllerAs: 'rightsAdd'
      })
      .state('rights:input', {
        url: '/rights/input',
        templateUrl: 'app/rights/input/input.html',
        controller: 'RightsInputController',
        controllerAs: 'rightsInput'
      })
      .state('rights:pay', {
        url: '/rights/pay',
        templateUrl: 'app/rights/pay/pay.html',
        controller: 'RightsPayController',
        controllerAs: 'rightsPay'
      })
      .state('rights:preview', {
        url: '/rights/preview',
        templateUrl: 'app/rights/preview/preview.html',
        controller: 'RightsPreviewController',
        controllerAs: 'rightsPreview'
      })
      .state('rights:result', {
        url: '/rights/result',
        templateUrl: 'app/rights/result/result.html',
        controller: 'RightsResultController',
        controllerAs: 'rightsResult'
      })
      .state('account:list', {
        url: '/account/account',
        templateUrl: 'app/account/list/list.html',
        controller: 'AccountListController',
        controllerAs: 'accountList'
      })
      .state('account:add', {
        url: '/account/add',
        templateUrl: 'app/rights/add/add.html',
        controller: 'AccountAddController',
        controllerAs: 'accountAdd'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
