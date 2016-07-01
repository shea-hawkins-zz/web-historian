// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('../helpers/http-helpers');
var archive = require('../helpers/archive-helpers');
var request = require('request');
archive.popQueue().then(function(queue) {
  var worked = [];
  queue.forEach(function(inputUrl) {
    // If we haven't already seen this site
    // this queue pop.
    if (worked.indexOf(inputUrl) === -1) {
      worked.push(inputUrl);
      var timestamp = Date.now();
      var versionUrl = inputUrl + timestamp;
      http.downloadSite(inputUrl)
      .then(function(body) {
        return archive.storeSite(versionUrl, body);
      })
      .then(function() {
        return archive.updateDirectory(inputUrl, timestamp);
      })
      .catch(function(err) {
        console.log('err ', err);
      });
    }
  });
});
