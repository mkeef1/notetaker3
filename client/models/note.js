(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function recent(){
      return $http.get('/notes?limit=10&offset=0');
    }

    function showOne(note){
      console.log('client model note', note);
      return $http.get('/notes/' + {note:note});
    }

    return {create:create, recent:recent, showOne:showOne};
  }]);
})();
