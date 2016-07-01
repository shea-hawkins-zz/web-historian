var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var http = require('../helpers/http-helpers');
var request = require('request');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  res.end(asset);
  callback && callback();
};

exports.serveFile = function(res, filePath) {
  fs.readFile(filePath, function(err, data) {
    exports.serveAssets(res, data);
  });
};

exports.getData = function(req) {
  return new Promise(function(resolve, reject) {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      resolve(data);
    });
  });
};

exports.downloadSite = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    request('http://' + inputUrl, function(err, response, body) {
      !err ? resolve(body) : reject(err);
    });
  });
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
