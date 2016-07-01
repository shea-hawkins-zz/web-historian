var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var redis = require('redis');
var client = redis.createClient();
var url = require('url');

exports.parseUrl = function(inputUrl) {
  var urlObj = url.parse(inputUrl);
  inputUrl = !urlObj.protocol ? 'http://' + inputUrl : inputUrl;
  urlObj = url.parse(inputUrl);
  return !urlObj.hostname ? false : urlObj.hostname + urlObj.pathname;
};

exports.isInDirectory = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    client.hexists('directory', inputUrl, function(err, result) {
      result === 1 ? resolve(inputUrl) : reject(err);
    });    
  });
};

exports.getSiteVersions = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    client.hget('directory', inputUrl, function(err, result) {
      !err ? resolve(JSON.parse(result)) : reject(err);
    });
  });
};

exports.loadSite = function(versionUrl) {
  return new Promise(function(resolve, result) {
    client.hget('storage', versionUrl, function(err, result) {
      !err ? resolve(result) : reject(err);
    });
  });
};

exports.pushToQueue = function(inputUrl) {
  return new Promise(function(resolve, reject) {
    client.lpush('siteQueue', inputUrl, function(err, data) {
      !err ? resolve(data) : reject(err);
    });
  });
};

exports.popUrl = function() {
  return new Promise(function(resolve, reject) {
    client.lpop('siteQueue', function(err, data) {
      data ? resolve(data) : reject(err);
    });
  });
};

exports.trimQueue = function(start, end) {
  return new Promise(function(resolve, reject) {
    client.ltrim('siteQueue', end - start, start - end, function(err, data) {
      !err ? resolve(data) : reject(err);
    });
  });
};

exports.popQueue = function() {
  return new Promise(function(resolve, reject) {
    client.llen('siteQueue', function(err, data) {
      !err ? resolve(data) : reject(err);
    });
  }).then(function(len) {
    return new Promise(function(resolve, reject) {
      client.lrange('siteQueue', 0, len - 1, function(err, data) {
        !err ? resolve(data) : reject(err);
      });
    });
  }).then(function(queue) {
    exports.trimQueue(0, queue.length - 1);
    return queue;
  });
};

exports.removeFromQueue = function(inputUrl) {
  return new Promise(function(resolve, result) {
    client.lrem('siteQueue', 0, inputUrl, function(err, result) {
      !err ? resolve(result) : reject(err);
    });
  });
};

exports.storeSite = function(versionUrl, data) {
  return new Promise(function(resolve, reject) {
    client.hset('storage', versionUrl, data, function(err, result) {
      !err ? resolve(result) : reject(err);
    });
  });
};

exports.updateDirectory = function(inputUrl, timestamp) {
  return new Promise(function(resolve, reject) {
    exports.isInDirectory(inputUrl).then(function() {
      return exports.getSiteVersions(inputUrl)
        .catch(function() {
          return [];
        });
    }).then(function(siteVersions) {
      siteVersions.push(timestamp);
      client.hset('directory', inputUrl, JSON.stringify(siteVersions), function(err, data) {
        !err ? resolve(result) : reject(err);
      });
    });
  });
};



