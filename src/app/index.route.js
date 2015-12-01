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
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('list', {
        url: '/list',
        templateUrl: 'app/list/list.html',
        controller: 'ListController',
        controllerAs: 'list'
      })
      .state('detail', {
        url: '/detail/:id',
        templateUrl: 'app/detail/detail.html',
        controller: 'DetailController',
        controllerAs: 'detail'
      })
      .state('review', {
        url: '/review/:id',
        templateUrl: 'app/review/review.html',
        controller: 'ReviewController',
        controllerAs: 'review'
      })
      .state('publish', {
        url: '/publish',
        templateUrl: 'app/publish/publish.html',
        controller: 'PublishController',
        controllerAs: 'publish'
      })
      .state('help', {
        url: '/help',
        templateUrl: 'app/help/help.html',
        controller: 'HelpController',
        controllerAs: 'help'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
