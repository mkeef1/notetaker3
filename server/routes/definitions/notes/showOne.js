'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'show note by id',
  auth: {
    mode: 'try'
  },
    handler: function(req, rep){
      Note.showOne(req.params.noteId, function(err, note){
        console.log('controllernote', note);
        console.log('controllernoteparam', req.params.noteId);
        rep(note).code(note ? 200 : 400);
      });
    }
};
