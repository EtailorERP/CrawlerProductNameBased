var fs = require('fs');
console.log('in file parser');
fs.watchFile('output.txt', function (curr, prev) {
	console.log('kulwantisngh');
  console.log('the current mtime is: ' + curr.mtime);
  console.log('the previous mtime was: ' + prev.mtime);
});