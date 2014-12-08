/* jshint camelcase:false */

'use strict';

var pg = require('../postgres/manager'),
    crypto = require('crypto'),
    bucket = process.env.AWS_BUCKET,
    AWS    = require('aws-sdk'),
    s3     = new AWS.S3(),
    async  = require('async'),
    fs     = require('fs');

function Note(){
}

Note.create = function(user, obj, images, cb){
  var awsLinks = {links: ['none']};
  obj.tags = obj.tags ? formatTags(obj.tags[0]) : 'default';
  if(images.file){
    awsLinks = reformatAwsFiles(images.file);
  }
  pg.query('select add_note($1, $2, $3, $4, $5)', [user.id, obj.title, obj.body, obj.tags, awsLinks.links], function(err, results){
    uploadFilesToS3(images.file, awsLinks, cb);
  });
};

Note.query = function(user, query, cb){
  pg.query('select * from query_notes($1, $2, $3)', [user.id, query.limit, query.offset], function(err, results){
    cb(err, results && results.rows ? results.rows : null);
  });
};

Note.showOne = function(noteId, cb){
  pg.query('select * from get_note($1)', [noteId], cb);
};

module.exports = Note;

function formatTags(tags){
  tags = tags.split(',').map(function(s){return s.trim();}).join(',');
  return tags;
}

function reformatAwsFiles(images){
  var folder = crypto.randomBytes(48).toString('hex'),
  links = [];
  links = images.map(function(f){
    return 'htt[s://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + folder + '/' + f.originalFilename;
  });
  return {links: links, folder: folder};
}

function uploadFilesToS3(images, awsLinks, cb){
  if(!images){return cb();}
  var index = 0;
  async.forEach(images, function(file, callback){
    if((/^image/).test(file.headers['content-type'])){
      fs.readFile(file.path, function(err, body){
        var params = {Bucket: bucket, Key: awsLinks.folder + '/' + file.originalFilename, Body: body, ACL: 'public-read'};
        index++;
        s3.putObject(params, function(err){
          console.log('S3 upload: ', err);
          callback(null);
        });
      });
    }else{callback(null);}
  }, cb);
}
