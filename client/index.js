(function(){
  'use strict';

  angular.module('hapi-auth', ['ui.router', 'angularFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',     {url:'/',           templateUrl:'/views/home/home.html'})
        .state('register', {url:'/register',   templateUrl:'/views/users/users.html',   controller:'UsersCtrl'})
        .state('login',    {url:'/login',      templateUrl:'/views/users/users.html',   controller:'UsersCtrl'})
        .state('notes',    {url:'/notes',      templateUrl:'/views/notes/notes.html',   controller:'NotesCtrl'})
        .state('showOne',    {url:'/notes/:noteId',      templateUrl:'/views/notes/oneNote.html',   controller:'NotesCtrl'});
      }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);
})();
