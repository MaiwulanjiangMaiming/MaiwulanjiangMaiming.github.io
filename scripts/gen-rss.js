const fs = require('fs');
const path = require('path');

const papersPath = path.join(__dirname, '..', 'content', 'papers.json');
const papers = JSON.parse(fs.readFileSync(papersPath, 'utf8'));

const items = papers.map(function(p) {
  const link = p.pdf || p.link || '#';
  const pubDate = new Date(p.year + '-01-01').toUTCString();
  const desc = (p.abstract || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const title = p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return '  <item>\n    <title>' + title + '</title>\n    <link>' + link + '</link>\n    <pubDate>' + pubDate + '</pubDate>\n    <description>' + desc + '</description>\n  </item>';
}).join('\n');

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Maiwulanjiang Maiming — Publications</title>\n    <link>https://mawlan.me/papers.html</link>\n    <description>Academic publications in medical imaging, MRI reconstruction, and clinical AI.</description>\n    <language>en</language>\n' + items + '\n  </channel>\n</rss>';

const outPath = path.join(__dirname, '..', 'feed.xml');
fs.writeFileSync(outPath, xml);
console.log('Generated:', outPath);
