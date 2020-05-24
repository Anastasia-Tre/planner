
const fs = require('fs');

let file;

try {
    file = fs.readFileSync('try.json', 'utf-8');
} catch (error) {
    fs.writeFileSync('try.json', '[]');
}
//const file = fs.readFileSync('try.json', 'utf-8') || fs.writeFileSync('try.json', []);
console.log('*');