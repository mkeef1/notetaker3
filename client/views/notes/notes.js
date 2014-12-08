(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', '$stateParams', '$upload', function($rootScope, $scope, $state, Note, $stateParams, $upload){
    $scope.note = {};
    $scope.photos = [];
    $scope.files = [];
    $scope.title = 'One note page';

    function getRecent(){
      Note.recent().then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    getRecent();

    $scope.create = function(note){
      $scope.upload = $upload.upload({url: '/notes', method: 'post', data: $scope.note, file: $scope.files});
      Note.create(note).then(function(response){
        $scope.note = {};
        getRecent();
      });
    };

    $scope.show = function(noteId){
    Note.showOne($stateParams.noteId).then(function(response){
      debugger;
      $scope.note = response.data[0];
      $rootScope.currentState = $scope.note.notetitle;
        $scope.note = response.data;
      });
    };

//    $scope.show = function(noteId){
  //    $state.go('showOne', {noteId: noteId});
    //};

  }]);
})();
