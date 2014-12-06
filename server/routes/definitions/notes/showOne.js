'use strict';

var Note = require('../../../models/note');

module.exports = {
  description: 'show note by id',
    handler: function(req, rep){
      Note.showOne(req.payload, function(err, note){
        //req.payload
        console.log('payload', req.payload);
        console.log('controllernote', note);
        console.log('paramsid', req.params.id);
        rep(note).code(note ? 200 : 400);
      });
    }
};
