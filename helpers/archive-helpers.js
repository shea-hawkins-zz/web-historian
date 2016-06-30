var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var redis = require('redis');
var client = redis.createClient();
var url = require('url');


exports.parseURl = function(inputUrl) {
  var urlObj = url.parse(inputUrl);
  inputUrl = !urlObj.protocol ? 'http://' + inputUrl : inputUrl;
  urlObj = url.parse(inputUrl);
  return !urlObj.hostname ? false : urlObj.hostname + urlObj.pathname;
};

exports.isInDirectoryAsync = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    client.hexists('directory', inputUrl, function(err, result) {
      result === 1 ? resolve(inputUrl) : reject(err);
    });    
  });
};

exports.getSiteVersionsAsync = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    client.hget('directory', inputUrl, function(err, result) {
      !err ? resolve(JSON.parse(result)) : reject(err);
    });
  });
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
