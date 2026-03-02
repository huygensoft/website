const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/services/3cx');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/"\.\/src\//g, '"../../src/');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
