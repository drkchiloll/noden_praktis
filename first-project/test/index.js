var assert      = require('assert'),
    CountStream = require('../lib/countstream'),
    countStream = new CountStream('example'),
    fs          = require('fs'),
    passed      = 0;

countStream.on('total', function(count) {
  assert.equal(count, 2);
  passed++;
});
//This example should show 2 (second 1 in this comment)
fs.createReadStream(__filename).pipe(countStream);

process.on('exit', function() {
  console.log('Assertions passed:', passed);
});
