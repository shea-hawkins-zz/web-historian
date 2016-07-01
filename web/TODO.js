

Input: Client types URL
Output: Most Recent Target page or Waiting page

1) Page is present in directory.
  - Check if in directory. loadDirectoryAsync(), isInDirectory(dir), getSiteVersions(dir)
  - Load latest html. loadSiteAsync()
  - Respond with html. serveAsset(html)
IF NOT IN DIRECTORY
2) Page is in queue.
  - loadQueueAsync()
  - isInQueue(queue)
  - serveAsset(loadingPage)
IF NOT IN QUEUE
3) Page is not in directory or queue.
  - appendToQueue(item)
  - serveAsset(loadingPage )



Sites Directory
{
  www.google.com: ['2016-06-29', '2016-06-30'],
  www.facebook.com: ['2016-06-28']
}

Site Storage
{
  www.google.com2016-06-29: '<HTML></HTML>',
  www.facebook.com2016-06-28: '<HTML></HTML>'
}


Queues
Live Queue:
[www.google.com, www.facebook.com, nba.com, nfl.com, github.com]

Worked Queue:
[www.google.com, www.facebook.com, nba.com ..]



