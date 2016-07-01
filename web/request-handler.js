var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('../helpers/http-helpers');
var qs = require('querystring');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    var inputUrl, versionUrl;
    http.getData(req).then(function(data) {
      var form = qs.parse(data);
      inputUrl = archive.parseUrl(form.url);
      return archive.isInDirectory(inputUrl);
    })
    .then(function(inputUrl) {
      return archive.getSiteVersions(inputUrl);
    })
    .then(function(versions) {
      versionUrl = inputUrl + versions[versions.length - 1];
    })
    .then(function() {
      return archive.loadSite(versionUrl);
    })
    .then(function(html) {
      http.serveAssets(res, html);
    })
    .catch(function(err) {
      console.log('adding ' + inputUrl + ' to queue');
      archive.pushToQueue(inputUrl);
      http.serveFile(res, path.join(__dirname + '/public/loading.html'));
    });
  } else if (req.method === 'GET') {
    http.serveFile(res, path.join(__dirname + '/public/index.html'));
  }
};
 

