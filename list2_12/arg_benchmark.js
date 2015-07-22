var args = {
  '-h1' : displayHelp,
  '-r'  : readFile
};

function displayHelp() {
  console.log('Argument processor:', args);
}

function readFile(file) {
  // console.log(file);
  if (file && file.length) {
    console.log('Reading:', file);
    console.time('read');
    var stream = require('fs').createReadStream(file);
    stream.on('end', function() {
      console.timeEnd('read');
    });
    stream.pipe(process.stdout);
  } else {
    console.error('A file must be provided with the -r option');
    process.exit(1);
  }
}

if (process.argv.length > 0) {
  process.argv.forEach(function(arg, index) {
    // console.log(process.argv.slice(index + 1));
    if (args[arg]) {
      console.log(process.argv.slice(index + 1) instanceof Array);
      // args[arg].apply(this, process.argv.slice(index + 1));
      args[arg](process.argv.slice(index + 1).join(''));
    }
  });
}
