const fs = require('fs');
const path = require('path');

const USERNAME = 'MaiwulanjiangMaiming';
const TOKEN = process.env.GITHUB_TOKEN || '';
const OUTPUT = path.join(__dirname, '..', 'data', 'repos.json');

async function fetchRepos() {
  const headers = { 'Accept': 'application/vnd.github.v3+json' };
  if (TOKEN) headers['Authorization'] = 'token ' + TOKEN;

  let allRepos = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      'https://api.github.com/users/' + USERNAME + '/repos?sort=updated&per_page=100&type=owner&page=' + page,
      { headers }
    );
    if (!res.ok) throw new Error('GitHub API error: ' + res.status);
    const repos = await res.json();
    if (repos.length === 0) break;
    allRepos = allRepos.concat(repos);
    page++;
  }

  const filtered = allRepos
    .filter(function (r) { return !r.private && !r.fork && r.name !== USERNAME; })
    .sort(function (a, b) { return b.stargazers_count - a.stargazers_count; })
    .map(function (r) {
      return {
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        topics: r.topics || [],
        updated_at: r.updated_at
      };
    });

  fs.writeFileSync(OUTPUT, JSON.stringify(filtered, null, 2));
  console.log('Generated ' + OUTPUT + ' with ' + filtered.length + ' repos');
}

fetchRepos().catch(function (err) {
  console.error('Failed:', err);
  process.exit(1);
});
