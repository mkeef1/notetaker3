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

    function showOne(noteId){
      console.log('client model note', noteId);
      return $http.get('/notes/' + noteId);
    }

    return {create:create, recent:recent, showOne:showOne};
  }]);
})();
