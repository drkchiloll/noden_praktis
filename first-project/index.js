var CountStream = require('./lib/countstream'),
    countStream = new CountStream('book'),
    http        = require('http');

http.get('http://www.manning.com', function(res) {
  res.pipe(countStream);
});

countStream.on('total', function(count) {
  console.log('Total Matches:', count);
})
