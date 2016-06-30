var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('../helpers/http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    console.log(http.getDataAsync(req).then(function(data) {
      console.log(data);
    }));


    // exports.isInDirectory('www.google.com')
    // .then(function() {
    //   return exports.getSiteVersions('www.google.com');
    // })
    // .then(function(versions) {
    //   versions[versions.length - 1];
    // });

  }

};
