const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) { 
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src/components');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  content = content.replace(/<Image([^>]+)fill([^>]*)>/gs, (match, p1, p2) => {
    if (!match.includes('sizes=')) {
      changed = true;
      return '<Image' + p1 + 'fill sizes="(max-width: 768px) 100vw, 50vw"' + p2 + '>';
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
})
