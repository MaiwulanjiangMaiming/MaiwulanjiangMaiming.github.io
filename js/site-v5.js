function injectHeaderFooter(){var header=document.querySelector('header.site-header');var footer=document.querySelector('footer.site-footer');var isInPages=location.pathname.includes('/pages/');var prefix=isInPages?'../':'';var brandText='Under Achiever Hub';var navLinks=[{text:'Home',href:prefix+'index.html'},{text:'Publications',href:'papers.html'},{text:'Research',href:'research.html'},{text:'Projects',href:'projects.html'},{text:'Everyday MRI',href:'everyday.html'},{text:'Moments',href:'moments.html'},{text:'About me',href:'about.html'}];var motto='"Everything negative — pressure, challenges — is all an opportunity for me to rise." - Kobe Bryant';var toggleBtn='<button id="theme-toggle" aria-label="Toggle theme">☀️</button>';var searchBtn='<button id="search-btn" aria-label="Search" onclick="openSearch()"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>';if(!header){header=document.createElement('header');header.className='site-header';var navHtml='<nav class="nav">'+navLinks.map(function(l){return'<a href="'+l.href+'">'+l.text+'</a>'}).join('')+'</nav>';header.innerHTML='<div class="container"><div class="brand">'+brandText+'</div>'+navHtml+searchBtn+toggleBtn+'</div>';document.body.insertBefore(header,document.body.firstChild)}else{var existingNav=header.querySelector('.nav');if(existingNav&&!document.getElementById('theme-toggle')){existingNav.insertAdjacentHTML('afterend',searchBtn+toggleBtn)}}if(!footer){footer=document.createElement('footer');footer.className='site-footer';footer.innerHTML='<div class="container">© <span id="year"></span> Maiwulanjiang Maiming<div class="motto">'+motto+'</div></div>';document.body.appendChild(footer);if(!document.getElementById('year')){var yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear()}}}function setActiveNav(){var p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(function(a){var h=a.getAttribute('href');if(h===p)a.classList.add('active')})}
function dp(){return location.pathname.includes('/pages/')?'../':''}
var EM_CB='?v=20260626c';
function j(u){var url=u+(u.indexOf('?')===-1?EM_CB:'');return fetch(url,{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}).catch(function(err){console.error('Failed to load '+url+':',err);throw err})}
function t(u){var url=u+(u.indexOf('?')===-1?EM_CB:'');return fetch(url,{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).catch(function(err){console.error('Failed to load '+url+':',err);throw err})}
function fmtDate(s){var d=new Date(s);return d.getFullYear()+"-"+(String(d.getMonth()+1).padStart(2,'0'))+"-"+(String(d.getDate()).padStart(2,'0'))}
function cardHtml(title,meta,desc,href,tags,idx){var tagHtml=(tags||[]).map(function(x){return '<span class="pill">'+x+'</span>'}).join('');var delay=idx!==undefined?' style="animation-delay:'+((idx||0)*80)+'ms"':'';return '<div class="card card-reveal"'+delay+'><h3><a href="'+href+'">'+title+'</a></h3><div class="muted">'+meta+'</div><p>'+desc+'</p><div>'+tagHtml+'</div></div>'}
function sortByDateDesc(list){return (list||[]).slice().sort(function(a,b){var da=new Date(a.date||0).getTime();var db=new Date(b.date||0).getTime();return db-da})}
function groupByYear(list){var g={};(list||[]).forEach(function(pa){var y=Number(pa.year||0);g[y]=(g[y]||[]);g[y].push(pa)});var years=Object.keys(g).map(function(x){return Number(x)}).sort(function(a,b){return b-a});return {years:years,groups:g}}
function renderTimeline(years){var tl=document.getElementById('timeline');if(!tl)return;tl.innerHTML=years.map(function(y){return '<a href="#y-'+y+'">'+y+'</a>'}).join('')}
function observeYearHeadings(years){var links=document.querySelectorAll('.timeline a');var map={};years.forEach(function(y){map['y-'+y]=Array.from(links).find(function(l){return l.getAttribute('href')==='#y-'+y})});var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var id=en.target.id;Object.values(map).forEach(function(l){if(l)l.classList.remove('active')});var L=map[id];if(L)L.classList.add('active')}})},{rootMargin:'-40% 0px -50% 0px',threshold:0.01});years.forEach(function(y){var el=document.getElementById('y-'+y);if(el)io.observe(el)})}
function setupScrollReveal(){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}})},{rootMargin:'0px 0px -50px 0px',threshold:0.1});document.querySelectorAll('.card-reveal, .research-item, .project-line, .cv-card').forEach(function(el){observer.observe(el)})}
function enhanceLinks(){document.querySelectorAll('.card h3 a').forEach(function(a){a.addEventListener('click',function(e){var card=a.closest('.card');if(card){card.classList.add('active-scale');setTimeout(function(){card.classList.remove('active-scale')},150)}})})}
function setupViewTransitions(){}
function ensureLightbox(){if(document.querySelector('.lightbox'))return;var d=document.createElement('div');d.className='lightbox';d.innerHTML='<img>';d.addEventListener('click',function(){d.classList.remove('open')});document.body.appendChild(d)}
function bindLightbox(sel){ensureLightbox();var d=document.querySelector('.lightbox');document.querySelectorAll(sel).forEach(function(img){img.addEventListener('click',function(){d.querySelector('img').src=img.src;d.classList.add('open')})})}
function sanitizeSup(s){if(!s)return '';return s.replace(/^\s*(Supervisor(s)?\s*:\s*)/i,'').trim()}
function shortenSentences(s,n){if(!s)return '';var txt=s.replace(/\s+/g,' ').trim();var parts=txt.split(/[。.!?]+\s*/).filter(Boolean);return parts.slice(0,n).join('. ')+ (parts.length>n?'.':'' )}
function renderHome(){Promise.all([j(dp()+'data/projects.json'),j(dp()+'data/papers.json')]).then(function(arr){var projects=arr[0].slice(0,3).map(function(pr,i){return cardHtml(pr.name,(pr.tech||[]).join(', '),pr.summary,pr.link||'#',pr.tags,i)}).join('');var lpr=document.getElementById('latest-projects');if(lpr)lpr.innerHTML=projects;var papers=arr[1].slice(0,3).map(function(pa,i){var meta=(pa.authors||[]).join(', ')+' · '+pa.venue+' · '+pa.year;var h=pa.pdf||pa.link||'#';return cardHtml(pa.title,meta,pa.abstract||'',h,pa.tags,i)}).join('');var lpa=document.getElementById('latest-papers');if(lpa)lpa.innerHTML=papers;enhanceLinks();setupScrollReveal()}).catch(function(err){console.error('Error loading home data:',err)})}
function renderPapers(){var el=document.getElementById('papers');if(el)el.innerHTML='<div class="loading"><span class="loading-spinner"></span>Loading publications...</div>';j(dp()+'data/papers.json').then(function(list){var gb=groupByYear(list);renderTimeline(gb.years);var html=gb.years.map(function(y){var items=gb.groups[y].map(function(pa,i){var l=pa.pdf||pa.link||'#';var meta=(pa.authors||[]).join(', ')+' · '+pa.venue+' · '+pa.year;var extra=pa.type?'<span class="pill">'+pa.type+'</span>':'';return '<div class="card card-reveal" style="animation-delay:'+(i*60)+'ms"><h3><a href="'+l+'" target="_blank">'+pa.title+'</a></h3><div>'+meta+' '+extra+'</div><p>'+ (pa.abstract||'') +'</p></div>'}).join('');return '<h2 class="year-heading" id="y-'+y+'">'+y+'</h2>'+items}).join('');if(el)el.innerHTML=html;observeYearHeadings(gb.years);setupScrollReveal()}).catch(function(err){if(el)el.innerHTML='<p class="muted">Failed to load publications. Please try again later.</p>'})}
/* ===== Everyday MRI (reads from the EverydayMRI GitHub repo via jsDelivr) ===== */
var EM_BASE='https://cdn.jsdelivr.net/gh/MaiwulanjiangMaiming/EverydayMRI@main/';
var EM_BASE_RAW='https://raw.githubusercontent.com/MaiwulanjiangMaiming/EverydayMRI/main/';
function emFetchJson(){
  // When running locally (localhost or file://), prefer the local data file first
  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:';
  if (isLocal) {
    return j(dp() + 'data/everyday.json').catch(function(){
      return j(EM_BASE + 'index.json').catch(function(){ return j(EM_BASE_RAW + 'index.json') });
    });
  }
  return j(EM_BASE+'index.json').catch(function(){return j(EM_BASE_RAW+'index.json').catch(function(){return j(dp()+'data/everyday.json')})});
}
function emFetchText(u){return t(u).catch(function(){return t(u.replace(EM_BASE,EM_BASE_RAW))})}
function renderEveryday(){
  var wrap=document.getElementById('everyday');if(!wrap)return;
  wrap.innerHTML='<div class="loading"><span class="loading-spinner"></span>Loading roadmap…</div>';
  emFetchJson().then(function(data){
    var phases=data.phases||[];
    var total=0,doneN=0;
    phases.forEach(function(p){(p.papers||[]).forEach(function(x){total++;if(x.status==='done')doneN++})});
    var pct=total?Math.round(doneN/total*100):0;
    var tl=document.getElementById('timeline');
    if(tl)tl.innerHTML=phases.map(function(p){
      var n=(p.papers||[]).length;
      var dn=(p.papers||[]).filter(function(x){return x.status==='done'}).length;
      return '<a href="#'+p.id+'" data-phase="'+p.id+'"><span class="em-tl-id">'+p.id+'</span><span class="em-tl-count">'+dn+'/'+n+'</span></a>'
    }).join('');
    var stats='<div class="em-stats card"><div class="em-progress-wrap"><div class="em-progress-bar"><div class="em-progress-fill" style="width:'+pct+'%"></div></div><div class="em-progress-text"><strong>'+doneN+'</strong> / '+total+' papers read · <strong>'+pct+'%</strong></div></div><div class="em-actions"><a class="pill" href="'+(data.repo||'#')+'" target="_blank" rel="noopener">GitHub Repo ↗</a><a class="pill" href="'+EM_BASE+'roadmap.md" target="_blank" rel="noopener">Full Roadmap ↗</a></div></div>';
    var body=phases.map(function(p){
      var cards=(p.papers||[]).map(function(pa,i){
        var st=pa.status==='done'?'em-done':(pa.status==='reading'?'em-reading':'em-planned');
        var stBadge='<span class="pill '+st+'">'+pa.status+'</span>';
        var topic=pa.topic?'<span class="pill">'+pa.topic+'</span>':'';
        var meta=pa.authors+(pa.year?(' · '+pa.year):'')+' · '+pa.venue;
        var doiHtml=pa.doi?'<a class="em-doi-link" href="https://doi.org/'+pa.doi+'" target="_blank" rel="noopener">📄 Paper ↗</a>':'';
        var titleHtml=(pa.note&&pa.status==='done')?'<a href="#" data-note="'+pa.note+'" class="em-note-link">'+pa.title+'</a>':'<span>'+pa.title+'</span>';
        return '<div class="card card-reveal em-paper" style="animation-delay:'+(i*40)+'ms"><div class="em-paper-head"><span class="em-id">'+pa.id+'</span>'+stBadge+doiHtml+'</div><h3>'+titleHtml+'</h3><div class="muted em-meta">'+meta+'</div><div class="em-tags">'+topic+'</div></div>'
      }).join('');
      var focus=p.focus?'<span class="pill em-focus">★ focus</span>':'';
      return '<section class="em-phase"><h2 class="year-heading" id="'+p.id+'">'+p.id+' · '+p.title+' '+focus+'</h2><p class="muted em-goal">'+(p.goal||'')+'</p><div class="list">'+cards+'</div></section>'
    }).join('');
    wrap.innerHTML=stats+body;
    setupScrollReveal();
    bindNoteLinks();
    observePhaseHeadings(phases);
  }).catch(function(err){
    wrap.innerHTML='<p class="muted">Failed to load the roadmap. The EverydayMRI repo may still be private or unpublished.</p>'
  })
}
function observePhaseHeadings(phases){
  var links=document.querySelectorAll('.timeline a');
  var map={};
  phases.forEach(function(p){map[p.id]=Array.from(links).find(function(l){return l.getAttribute('href')==='#'+p.id})});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var id=en.target.id;Object.values(map).forEach(function(l){if(l)l.classList.remove('active')});var L=map[id];if(L)L.classList.add('active')}})},{rootMargin:'-40% 0px -50% 0px',threshold:0.01});
  phases.forEach(function(p){var el=document.getElementById(p.id);if(el)io.observe(el)})
}
function ensureReader(){if(document.getElementById('em-reader'))return;var d=document.createElement('div');d.id='em-reader';d.className='em-reader';d.innerHTML='<div class="em-reader-inner"><button class="em-reader-close" aria-label="Close reader">×</button><article class="em-reader-body" id="em-reader-body"></article></div>';d.addEventListener('click',function(e){if(e.target===d||e.target.classList.contains('em-reader-close')){d.classList.remove('open');document.body.style.overflow=''}});document.body.appendChild(d)}
function openNote(rel){
  ensureReader();
  var body=document.getElementById('em-reader-body');
  body.innerHTML='<div class="loading"><span class="loading-spinner"></span>Loading note…</div>';
  var r=document.getElementById('em-reader');r.classList.add('open');document.body.style.overflow='hidden';
  emFetchText(EM_BASE+rel).then(function(md){
    var html=window.marked?(marked.parse?marked.parse(md):marked(md)):'<pre>'+md+'</pre>';
    body.innerHTML=html
  }).catch(function(){body.innerHTML='<p class="muted">Failed to load this note.</p>'})
}
function bindNoteLinks(){document.querySelectorAll('.em-note-link').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();openNote(a.getAttribute('data-note'))})})}
function extractYear(s){var m=(s||'').match(/\b(20\d{2}|19\d{2})\b/);return m?parseInt(m[1],10):0}
function renderResearch(){var el=document.getElementById('research');if(el)el.innerHTML='<div class="loading"><span class="loading-spinner"></span>Loading research...</div>';j(dp()+'data/research.json').then(function(list){var sorted=(list||[]).slice().sort(function(a,b){return extractYear(b.period)-extractYear(a.period)});var html=sorted.map(function(r,i){var sup=sanitizeSup(r.supervisors);var summary=shortenSentences(r.summary||'',2);var line1='<div class="meta-line"><span class="label">Institution</span><span class="value">'+r.institution+'</span><span class="label">Location</span><span class="value">'+r.location+'</span></div>';var line2='<div class="meta-line"><span class="label">Period</span><span class="value">'+r.period+'</span>'+ (sup?'<span class="label">Supervisors</span><span class="value"><em>'+sup+'</em></span>':'') +'</div>';return '<div class="research-item card-reveal" style="animation-delay:'+(i*80)+'ms"><h3>'+r.title+'</h3>'+line1+line2+'<p>'+summary+'</p></div>'}).join('');if(el)el.innerHTML=html;setupScrollReveal()}).catch(function(err){if(el)el.innerHTML='<p class="muted">Failed to load research. Please try again later.</p>'})}
function renderResearchProjects(){j(dp()+'data/projects.json').then(function(list){var el=document.getElementById('research-projects');if(!el)return;var html=list.filter(function(p){return p.category==='research'}).map(function(p,i){return '<div class="project-line card-reveal" style="animation-delay:'+(i*50)+'ms"><span class="name">'+p.name+'</span> — <span class="desc">'+(p.summary||'')+'</span> <span class="tech">'+(p.tech||[]).join(', ')+'</span></div>'}).join('');el.innerHTML=html||'<p class="muted">No research projects found.</p>';setupScrollReveal()}).catch(function(){var el=document.getElementById('research-projects');if(el)el.innerHTML='<p class="muted">Failed to load projects.</p>'})}
function renderPersonalProjects(){j(dp()+'data/projects.json').then(function(list){var html=list.filter(function(p){return p.category!=='research'}).map(function(p,i){return '<div class="project-line card-reveal" style="animation-delay:'+(i*50)+'ms"><span class="name">'+p.name+'</span> — <span class="desc">'+(p.summary||'')+'</span> <span class="tech">'+(p.tech||[]).join(', ')+'</span></div>'}).join('');var el=document.getElementById('projects-personal');if(el)el.innerHTML=html;setupScrollReveal()})}
function fetchGitHubRepos(username,retries){retries=retries||0;var maxRetries=2;var cacheKey='github_repos_'+username;var cacheTimeKey=cacheKey+'_time';var cached=localStorage.getItem(cacheKey);var cacheTime=localStorage.getItem(cacheTimeKey);if(cached&&cacheTime&&(Date.now()-parseInt(cacheTime))<43200000){var data=JSON.parse(cached);var filtered=data.filter(function(repo){return repo.name!==username});if(filtered.length!==data.length){localStorage.setItem(cacheKey,JSON.stringify(filtered));localStorage.setItem(cacheTimeKey,Date.now().toString())}return Promise.resolve(filtered)}return fetch('https://api.github.com/users/'+username+'/repos?sort=updated&per_page=100&type=owner',{headers:{'Accept':'application/vnd.github.v3+json'}}).then(function(r){if(r.status===403||r.status===429){var resetHeader=r.headers.get('x-ratelimit-reset');if(resetHeader){var resetTime=parseInt(resetHeader,10)*1000;var waitMs=Math.max(resetTime-Date.now(),0);console.warn('GitHub API rate limited. Resets at '+new Date(resetTime).toLocaleString())}if(retries<maxRetries)return fetchGitHubRepos(username,retries+1);throw new Error('API rate limit exceeded')}if(!r.ok)throw new Error('HTTP '+r.status);return r.json()}).then(function(repos){if(repos.message){if(retries<maxRetries)return fetchGitHubRepos(username,retries+1);throw new Error(repos.message)}var filtered=repos.filter(function(repo){return !repo.private && !repo.fork && repo.name!==username}).sort(function(a,b){return b.stargazers_count-a.stargazers_count});localStorage.setItem(cacheKey,JSON.stringify(filtered));localStorage.setItem(cacheTimeKey,Date.now().toString());return filtered}).catch(function(err){if(retries<maxRetries){console.log('Retrying GitHub fetch... (attempt '+(retries+1)+')');return new Promise(function(resolve){setTimeout(function(){resolve(fetchGitHubRepos(username,retries+1))},2000)})}console.error('Failed to fetch GitHub repos:',err);throw err})}
var EXT_MAP={'MatrixSpy':'MaiwulanjiangMaiming.matrixspy','Project-Manager-X':'MaiwulanjiangMaiming.project-manager-x','NiftiSpy':'MaiwulanjiangMaiming.niftispy'};
var EXT_OPENVSX={'MatrixSpy':'maiwulanjiangmaiming/matrixspy','Project-Manager-X':'maiwulanjiangmaiming/project-manager-x','NiftiSpy':'maiwulanjiangmaiming/niftispy'};
var EXT_EXTRA=[{name:'EverydayMRI',description:'Daily MRI reading journal — 3 papers/day, 8-phase roadmap from MRI physics to non-Cartesian MRF and deep learning reconstruction. Deep reading notes with writing lessons.',topics:['mri','mrf','non-cartesian','reading-notes','fingerprinting','reconstruction'],category:'Research'},{name:'NiftiSpy',html_url:'https://github.com/MaiwulanjiangMaiming/NiftiSpy',description:'High-performance NIfTI medical image viewer with streaming, Range requests, and WebWorker parsing',language:'TypeScript',stargazers_count:0,forks_count:0,topics:['nifti','medical-imaging','mri','neuroimaging','viewer'],category:'Extension'},{name:'DualWeChat',html_url:'https://github.com/MaiwulanjiangMaiming/DualWeChat',description:'macOS 微信双开 — 修改 Bundle Identifier 绕过单实例检测，一键安装，支持 5 种自定义图标配色',language:'Shell',stargazers_count:2,forks_count:0,topics:[],category:'Tool'}];
function classifyRepo(repo){if(repo.category)return repo.category;var isExt=!!EXT_MAP[repo.name];if(isExt)return'Extension';var desc=(repo.description||'').toLowerCase();var topics=(repo.topics||[]).map(function(t){return t.toLowerCase()});var lang=(repo.language||'').toLowerCase();if(/github\.io|website|personal|blog|portfolio/i.test(desc+topics.join(',')))return'Website';if(/research|paper|thesis|dissertation|academic|study/i.test(desc+topics.join(',')))return'Research';if(/library|framework|sdk|api/i.test(desc+topics.join(',')))return'Library';if(/cli|tool|utility|script|automation/i.test(desc+topics.join(',')))return'Tool';if(/tutorial|learning|course|notes|cheatsheet/i.test(desc+topics.join(',')))return'Learning';if(/demo|example|playground|sandbox/i.test(desc+topics.join(',')))return'Demo';return'Project'}
function fetchExtDownloads(repoName){var cacheKey='ext_dl_'+repoName;var cacheTimeKey=cacheKey+'_time';var cached=localStorage.getItem(cacheKey);var cacheTime=localStorage.getItem(cacheTimeKey);if(cached&&cacheTime&&(Date.now()-parseInt(cacheTime))<3600000){try{return Promise.resolve(JSON.parse(cached))}catch(e){}}var result={vscode:0,openvsx:0};var promises=[];var vsId=EXT_MAP[repoName];if(vsId){promises.push(fetch('https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=3.0-preview.1',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json; api-version=3.0-preview.1'},body:JSON.stringify({filters:[{criteria:[{filterType:7,value:vsId}]}],assetTypes:[],flags:0x192})}).then(function(r){return r.json()}).then(function(d){try{var ext=d.results[0].extensions[0];var stat=ext.statistics.find(function(s){return s.statisticName==='install'});if(stat)result.vscode=stat.value}catch(e){}}).catch(function(){}))}var ovId=EXT_OPENVSX[repoName];if(ovId){promises.push(fetch('https://open-vsx.org/api/'+ovId).then(function(r){return r.json()}).then(function(d){if(d.downloadCount)result.openvsx=d.downloadCount}).catch(function(){}))}return Promise.all(promises).then(function(){localStorage.setItem(cacheKey,JSON.stringify(result));localStorage.setItem(cacheTimeKey,Date.now().toString());return result})}
function renderGitHubRepos(username) {
  var container = document.getElementById('github-repos');
  if (!container) return;
  container.innerHTML = '<div class="loading"><span class="loading-spinner"></span>Loading repositories...</div>';

  // Fetch all repos from GitHub API (with localStorage cache)
  var reposPromise = fetchGitHubRepos(username);

  reposPromise.then(function(repos) {
    // Filter out the user page itself & deduplicate by name
    var seen = {};
    repos = repos.filter(function(repo) {
      if (repo.name === username || seen[repo.name]) return false;
      seen[repo.name] = true;
      return true;
    });

    // Merge EXT_EXTRA overrides into existing repos & add missing ones
    var extraMap = {};
    EXT_EXTRA.forEach(function(e) { extraMap[e.name] = e; });
    repos.forEach(function(r) {
      var ex = extraMap[r.name];
      if (ex) {
        if (ex.category) r.category = ex.category;
        if (ex.description) r.description = ex.description;
        if (ex.topics && ex.topics.length) r.topics = ex.topics;
      }
    });
    var existingNames = {};
    repos.forEach(function(r) {
      existingNames[r.name] = true;
    });
    EXT_EXTRA.forEach(function(e) {
      if (!existingNames[e.name]) {
        repos.push(e);
      }
    });

    if (!repos || repos.length === 0) {
      container.innerHTML = '<div class="loading"><p class="muted">No public repositories found.</p></div>';
      return;
    }

    var html = repos.map(function(repo, i) {
      // Language pill
      var lang = repo.language
        ? '<span class="repo-lang"><span class="lang-dot" data-lang="' + repo.language + '"></span>' + repo.language + '</span>'
        : '';

      // Stars
      var stars = repo.stargazers_count > 0
        ? '<span class="repo-stat"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg> ' + repo.stargazers_count + '</span>'
        : '';

      // Forks
      var forks = repo.forks_count > 0
        ? '<span class="repo-stat"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.25a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg> ' + repo.forks_count + '</span>'
        : '';

      // Is this repo an extension?
      var isExt = !!EXT_MAP[repo.name];

      // Legacy variable kept for compatibility; not used in the template
      var extBadge = isExt
        ? '<span class="repo-stat ext-badge"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/></svg> Extension</span>'
        : '';

      // Extension downloads placeholder (only for extension repos)
      var dlPlaceholder = isExt
        ? '<span class="repo-stat ext-downloads" data-repo="' + repo.name + '"><svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M2.75 14A1.75 1.75 0 011 12.25v-2.5a.75.75 0 011.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-2.5a.75.75 0 011.5 0v2.5A1.75 1.75 0 0113.25 14H2.75zM7.25 7.689V2a.75.75 0 011.5 0v5.689l1.97-1.969a.749.749 0 011.275.326.749.749 0 01-.215.734l-3.25 3.25a.75.75 0 01-1.06 0l-3.25-3.25a.749.749 0 01.326-1.275.749.749 0 01.734.215L7.25 7.689z"/></svg> <span class="dl-count">—</span></span>'
        : '';

      // Topics pills
      var topics = (repo.topics || []).slice(0, 3).map(function(t) {
        return '<span class="pill">' + t + '</span>';
      }).join('');

      // Category banner (placed AFTER the h3 and BEFORE description)
      var category = classifyRepo(repo);
      var banner = '<div class="repo-banner cat-' + category.toLowerCase() + '">' + category + '</div>';

      return '<div class="card card-reveal github-repo" style="animation-delay:' + (i * 60) + 'ms">' +
        '<h3><a href="' + repo.html_url + '" target="_blank" rel="noopener">' + repo.name + '</a></h3>' +
        banner +
        '<p class="repo-desc">' + (repo.description || 'No description provided') + '</p>' +
        '<div class="repo-meta">' + lang + stars + forks + dlPlaceholder + '</div>' +
        (topics ? '<div class="repo-topics">' + topics + '</div>' : '') +
        '</div>';
    }).join('');

    container.innerHTML = html;
    setupScrollReveal();

    // Fetch extension downloads for each extension repo and update the placeholder
    repos.forEach(function(repo) {
      if (EXT_MAP[repo.name]) {
        fetchExtDownloads(repo.name).then(function(dl) {
          var el = container.querySelector('.ext-downloads[data-repo="' + repo.name + '"] .dl-count');
          if (!el) return;
          var dlText;
          if (dl.vscode > 0 && dl.openvsx > 0) {
            dlText = formatNum(dl.vscode) + ' VS Code / ' + formatNum(dl.openvsx) + ' OpenVSX';
          } else if (dl.vscode > 0) {
            dlText = formatNum(dl.vscode) + ' VS Code';
          } else if (dl.openvsx > 0) {
            dlText = formatNum(dl.openvsx) + ' OpenVSX';
          } else {
            dlText = '0';
          }
          el.textContent = dlText;
        });
      }
    });
  });
}
function formatNum(n){if(n>=1000000)return(n/1000000).toFixed(1)+'M';if(n>=1000)return(n/1000).toFixed(1)+'K';return n.toString()}
function clearRepoCache(username){localStorage.removeItem('github_repos_'+username);localStorage.removeItem('github_repos_'+username+'_time');renderGitHubRepos(username)}
function renderMoments(){var el=document.getElementById('gallery');if(el)el.innerHTML='<div class="loading" style="grid-column:1/-1"><span class="loading-spinner"></span>Loading gallery...</div>';j(dp()+'data/moments.json').then(function(list){var html=list.map(function(m,i){return '<img src="'+m.url+'" alt="'+(m.caption||'')+'." class="card-reveal" style="animation-delay:'+(i*60)+'ms">'}).join('');if(el)el.innerHTML=html;bindLightbox('#gallery img');setupScrollReveal()}).catch(function(err){if(el)el.innerHTML='<p class="muted" style="grid-column:1/-1">Failed to load gallery. Please try again later.</p>'})}
function setupSearchOverlay(){if(document.getElementById('search-overlay'))return;var overlay=document.createElement('div');overlay.id='search-overlay';overlay.innerHTML='<div id="search-overlay-inner"><input id="search-input" placeholder="Search papers, research, projects…"><div id="search-results" class="list"></div></div>';overlay.addEventListener('click',function(e){if(e.target===overlay)closeSearch()});document.body.appendChild(overlay)}
var fuseIndex=null;
function buildSearchIndex(){return Promise.all([j(dp()+'data/papers.json'),j(dp()+'data/research.json'),j(dp()+'data/projects.json'),emFetchJson().catch(function(){return{phases:[]}})]).then(function(arr){var docs=[];arr[0].forEach(function(p){docs.push({type:'paper',title:p.title,body:(p.abstract||'')+' '+(p.authors||[]).join(' '),url:p.pdf||p.link||'#'})});arr[1].forEach(function(r){docs.push({type:'research',title:r.title,body:r.summary||'',url:'research.html'})});arr[2].forEach(function(p){docs.push({type:'project',title:p.name,body:p.summary||'',url:p.link||'projects.html'})});(arr[3].phases||[]).forEach(function(ph){(ph.papers||[]).forEach(function(pa){if(pa.status==='done')docs.push({type:'everyday',title:pa.title,body:pa.topic||'',url:'everyday.html'})})});fuseIndex=new Fuse(docs,{keys:['title','body'],threshold:0.35,includeScore:true})})}
function openSearch(){setupSearchOverlay();var overlay=document.getElementById('search-overlay');overlay.classList.add('open');setTimeout(function(){var input=document.getElementById('search-input');if(input)input.focus()},80);if(!fuseIndex)buildSearchIndex()}
function closeSearch(){var overlay=document.getElementById('search-overlay');if(overlay)overlay.classList.remove('open')}
function setupSearchInput(){document.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openSearch()}if(e.key==='Escape')closeSearch()});document.addEventListener('input',function(e){if(e.target.id!=='search-input'||!fuseIndex)return;var q=e.target.value.trim();var results=document.getElementById('search-results');if(!q){results.innerHTML='';return}var matches=fuseIndex.search(q).slice(0,8);results.innerHTML=matches.map(function(m){var d=m.item;var typePill='<span class="pill">'+d.type+'</span>';return'<div class="card" style="padding:.75rem 1rem"><h3 style="margin:0 0 .25rem;font-size:1rem"><a href="'+d.url+'">'+d.title+'</a></h3><div style="font-size:.85rem;color:var(--muted)">'+d.body.slice(0,120)+'…</div><div style="margin-top:.35rem">'+typePill+'</div></div>'}).join('')||'<p class="muted" style="padding:1rem">No results found.</p>'})}
function setupClickEmojis(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;var emojis=['🧲','⚛️','🔬','🩻','💻','🖥️','⚙️','🎥','👁️','📸','🤖','🧠','📊','🚀','✨','💡','🎯','📡','🔍','🎓'];var activeEmojis=0;var maxEmojis=20;document.addEventListener('click',function(e){var target=e.target;if(target.closest('a, button, input, textarea, [role="button"]'))return;if(activeEmojis>=maxEmojis)return;var emoji=emojis[Math.floor(Math.random()*emojis.length)];var el=document.createElement('div');el.className='click-emoji';el.textContent=emoji;el.style.left=e.clientX+'px';el.style.top=e.clientY+'px';document.body.appendChild(el);activeEmojis++;var timeoutId=setTimeout(function(){el.remove();activeEmojis--;clearTimeout(timeoutId)},1500)})}
function getEffectiveTheme(mode){
  if(mode==='light'||mode==='dark')return mode;
  return window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
}
function getThemeMode(){
  var mode=localStorage.getItem('theme-mode');
  if(!mode){
    var legacy=localStorage.getItem('theme');
    mode=(legacy&&legacy!=='auto')?legacy:'auto';
    if(legacy){localStorage.setItem('theme-mode',mode);localStorage.removeItem('theme')}
  }
  return mode;
}
function setupThemeToggle(){
  var mode=getThemeMode();
  document.documentElement.setAttribute('data-theme',getEffectiveTheme(mode));
  document.documentElement.setAttribute('data-theme-mode',mode);
  updateThemeIcon();
  var btn=document.getElementById('theme-toggle');
  if(!btn)return;
  btn.addEventListener('click',function(e){
    var currentMode=document.documentElement.getAttribute('data-theme-mode')||'auto';
    var nextMode=currentMode==='light'?'dark':(currentMode==='dark'?'auto':'light');
    var nextEff=getEffectiveTheme(nextMode);
    var curEff=document.documentElement.getAttribute('data-theme');
    localStorage.setItem('theme-mode',nextMode);
    document.documentElement.setAttribute('data-theme-mode',nextMode);
    if(nextEff!==curEff){
      animateThemeTransition(nextEff,e.clientX,e.clientY);
    }else{
      updateThemeIcon();
      document.documentElement.dispatchEvent(new CustomEvent('themechange'));
    }
  });
}
function animateThemeTransition(next,cx,cy){
  var atm=document.createElement('div');
  atm.className='theme-atmosphere '+(next==='light'?'sunrise':'nightfall');
  if(next==='light'){
    var x=cx!==undefined?cx:window.innerWidth/2;
    var y=cy!==undefined?cy:window.innerHeight/2;
    atm.style.setProperty('--tx',x+'px');
    atm.style.setProperty('--ty',y+'px');
  }
  document.body.appendChild(atm);
  document.documentElement.setAttribute('data-theme',next);
  updateThemeIcon();
  document.documentElement.dispatchEvent(new CustomEvent('themechange'));
  atm.addEventListener('animationend',function(){atm.remove()})
}
function updateThemeIcon(){
  var btn=document.getElementById('theme-toggle');
  if(!btn)return;
  var mode=document.documentElement.getAttribute('data-theme-mode')||'auto';
  var eff=document.documentElement.getAttribute('data-theme')||'dark';
  btn.textContent=eff==='light'?'☀️':'🌙';
  btn.setAttribute('data-mode',mode);
  btn.classList.remove('icon-swap');
  void btn.offsetWidth;
  btn.classList.add('icon-swap');
  var title=mode==='light'?'Light mode (click → dark)':(mode==='dark'?'Dark mode (click → auto)':'Auto · follows system (click → light)');
  btn.setAttribute('title',title);
  btn.setAttribute('aria-label',title);
}
var systemThemeListener=null;
function setupSystemThemeListener(){
  if(systemThemeListener)return;
  var mql=window.matchMedia('(prefers-color-scheme: light)');
  systemThemeListener=function(e){
    var mode=document.documentElement.getAttribute('data-theme-mode')||'auto';
    if(mode!=='auto')return;
    var next=e.matches?'light':'dark';
    var current=document.documentElement.getAttribute('data-theme');
    if(next===current)return;
    var btn=document.getElementById('theme-toggle');
    var r=btn&&btn.getBoundingClientRect?btn.getBoundingClientRect():null;
    var cx=r?r.left+r.width/2:window.innerWidth/2;
    var cy=r?r.top+r.height/2:window.innerHeight/2;
    animateThemeTransition(next,cx,cy);
  };
  if(mql.addEventListener){mql.addEventListener('change',systemThemeListener)}else{mql.addListener(systemThemeListener)}
}
function setupTypewriter(){var el=document.getElementById('typewriter');if(!el)return;var phrases=['MRI reconstruction.','quantitative mapping.','clinical AI.','making images from nothing.','teaching machines to see.'];var i=0,j=0,deleting=false;function tick(){var phrase=phrases[i%phrases.length];el.textContent=deleting?phrase.slice(0,j--):phrase.slice(0,j++);if(!deleting&&j>phrase.length){deleting=true;setTimeout(tick,1800);return}if(deleting&&j<0){deleting=false;i++;setTimeout(tick,400);return}setTimeout(tick,deleting?40:75)}tick()}
function setupHeaderScroll(){var header=document.querySelector('.site-header');if(!header)return;var lastScroll=window.pageYOffset||0;var ticking=false;window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(function(){var scroll=window.pageYOffset||0;if(scroll>lastScroll&&scroll>140){header.classList.add('hidden')}else{header.classList.remove('hidden')}lastScroll=scroll;ticking=false})}},{passive:true})}
document.addEventListener('DOMContentLoaded',function(){injectHeaderFooter();setActiveNav();setupThemeToggle();setupSystemThemeListener();setupTypewriter();setupSearchInput();setupHeaderScroll();var yearEl=document.getElementById('year');if(yearEl)yearEl.textContent=new Date().getFullYear();setupViewTransitions();setupClickEmojis()});
