(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
    $scope.note = {};
    $scope.title = 'One note page';

    function getRecent(){
      Note.recent().then(function(response){
        $scope.notes = response.data.notes;
        console.log($scope.notes);
      });
    }

    getRecent();

    $scope.create = function(note){
      Note.create(note).then(function(response){
        $scope.note = {};
        getRecent();
      });
    };

    $scope.show = function(note){
      Note.showOne($scope.note).then(function(response){
      debugger;
        $scope.note = response.data;
      });
    };

  }]);
})();
