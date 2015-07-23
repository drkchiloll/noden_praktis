var stream = require('stream'),
    util   = require('util'),
    fs     = require('fs');

function JsonByLine(source) {
  stream.Readable.call(this);
  this._source = source;
  this._foundLineEnd = false;
  this._buffer = '';

  source.on('readable', function() {
    this.read();
  }.bind(this));
}

util.inherits(JsonByLine, stream.Readable);

JsonByLine.prototype._read = function(size) {
  var chunk;
  var line;
  var lineIndex;
  var result;

  if (this._buffer.length === 0) {
    chunk = this._source.read();
    this._buffer += chunk;
  }

  lineIndex = this._buffer.indexOf('\n');

  if (lineIndex !== -1) {
    line = this._buffer.slice(0, lineIndex);
    if (line) {
      result = JSON.parse(line);
      this._buffer = this._buffer.slice(lineIndex + 1);
      this.emit('object', result);
      this.push(util.inspect(result));
    } else {
      this._buffer = this._buffer.slice(1);
    }
  }
};

var input = fs.createReadStream(__dirname + '/json-lines.txt', {
  encoding : 'utf8'
});
var jsonbyline = new JsonByLine(input);

jsonbyline.on('object', function(obj) {
  console.log('pos:', obj.position, '- letter:', obj.letter);
});
