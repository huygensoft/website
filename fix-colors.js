const fs = require('fs');
const path = require('path');

function replaceInlineColors(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            replaceInlineColors(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove specific hardcoded colors
            content = content.replace(/color:\s*(#333|#555|#000|black)(;?)/gi, '');
            // Also inline styles that become empty after color strip
            content = content.replace(/style="\s*"/g, '');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

replaceInlineColors(path.join(__dirname, 'public', 'services'));
console.log('Fixed inline colors in services pages');
