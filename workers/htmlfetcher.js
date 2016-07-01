// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('../helpers/http-helpers');
var archive = require('../helpers/archive-helpers');
var request = require('request');

archive.pushToQueue('www.metavision.com/');
var inputUrl, versionUrl, timestamp;
archive.popUrl().then(function(url) {
  inputUrl = url;
  timestamp = Date.now();
  versionUrl = inputUrl + timestamp;
  return http.downloadSite(inputUrl);
})
.then(function(body) {
  return archive.storeSite(versionUrl, body);
})
.then(function() {
  return archive.updateDirectory(inputUrl, timestamp);
})
.catch(function(err) {
  console.log('err ', err);
});

//   archive.storeSite(versionUrl, data);
// }).catch(function(err) {
//   console.log(err);
// });