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
      .state('list', {
        url: '/list/:type',
        templateUrl: 'app/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
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
      .state('preview', {
        url: '/preview',
        templateUrl: 'app/preview/preview.html',
        controller: 'PreviewController',
        controllerAs: 'preview'
      })
      .state('result', {
        url: '/result',
        templateUrl: 'app/result/result.html',
        controller: 'ResultController',
        controllerAs: 'result'
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
