'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'show note by id',
  auth: {
    mode: 'try'
  },
    handler: function(req, rep){
      Note.showOne(req.params.noteId, req.payload, function(err, note){
        console.log('controllernote', note);
        rep(note.rows).code(note ? 200 : 400);
      });
    }
};
