const fs = require('fs');
const path = require('path');

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };
  const yaml = match[1];
  const body = match[2].trim();
  const data = {};
  yaml.split('\n').forEach(function(line) {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(function(s) {
        return s.trim().replace(/^["']|["']$/g, '');
      });
    } else if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  });
  if (body) data.body = body;
  return { data: data, body: body };
}

function processDirectory(dir, outputFile) {
  if (!fs.existsSync(dir)) {
    console.log('Directory not found, skipping:', dir);
    return;
  }
  const files = fs.readdirSync(dir).filter(function(f) { return f.endsWith('.md'); });
  const items = files.map(function(f) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const parsed = parseFrontMatter(content);
    return parsed.data;
  });
  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log('Generated ' + outputFile + ' from ' + files.length + ' files');
}

const dataDir = path.join(__dirname, '..', 'data');
processDirectory(path.join(dataDir, 'papers'), path.join(dataDir, 'papers.json'));
processDirectory(path.join(dataDir, 'research'), path.join(dataDir, 'research.json'));
processDirectory(path.join(dataDir, 'projects'), path.join(dataDir, 'projects.json'));
