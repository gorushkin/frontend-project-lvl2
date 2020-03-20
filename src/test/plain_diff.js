const fs = require('fs');

console.log('start');

const file = fs.readFileSync('src/test/tempFull.txt', 'utf8');
console.log('type: ', typeof file);

console.log('file: ', file);

