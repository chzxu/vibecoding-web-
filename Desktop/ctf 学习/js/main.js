// CTF 学习导航 - 主脚本 v2.0
// 丛中笑 🦞 开发

// ==================== 网站配置 ====================
const sites = {
    // CTF 平台
    buuctf: { name: 'BUUCTF', url: 'https://buuoj.cn', category: 'ctf', icon: '🏆' },
    bugku: { name: 'BugKu', url: 'https://ctf.bugku.com', category: 'ctf', icon: '🐛' },
    adworld: { name: '攻防世界', url: 'https://adworld.xctf.org.cn', category: 'ctf', icon: '⚔️' },
    ctfhub: { name: 'CTFHub', url: 'https://www.ctfhub.com', category: 'ctf', icon: '🚀' },
    qingcen: { name: '青椿CTF', url: 'https://ctf.qingcen.net/', category: 'ctf', icon: '🌸' },
    
    // 安全社区
    freebuf: { name: 'FreeBuf', url: 'https://www.freebuf.com', category: 'community', icon: '🔥' },
    xz: { name: '先知社区', url: 'https://xz.aliyun.com', category: 'community', icon: '👨‍💻' },
    anquanke: { name: '安全客', url: 'https://www.anquanke.com', category: 'community', icon: '🛡️' },
    seebug: { name: 'Seebug', url: 'https://www.seebug.org', category: 'community', icon: '🔍' },
    knownsec: { name: '知道创宇', url: 'https://www.knownsec.com', category: 'community', icon: '🏢' },
    'baidu-src': { name: '百度 SRC', url: 'https://bsrc.baidu.com', category: 'community', icon: '🎯' },
    'tencent-src': { name: '腾讯 SRC', url: 'https://security.tencent.com', category: 'community', icon: '🐧' },
    huoxian: { name: '火线安全', url: 'https://www.huoxian.cn', category: 'community', icon: '🔥' },
    learnweb: { name: 'Web安全学习笔记', url: 'file:///C:/Users/ZiXuChen/Learn-Web-Hacking/build/html/index.html', category: 'community', icon: '📖' },
    
    // Writeup 平台
    writeupcn: { name: 'CTF WriteUp集合', url: 'https://github.com/ctf-wiki/ctf-wiki', category: 'writeup', icon: '📝' },
    skywt: { name: 'SkyWt WriteUp', url: 'https://skywt.cn/blog/tags/CTF/', category: 'writeup', icon: '📄' },
    
    // CodeFather
    codefather: { name: 'CodeFather', url: 'https://www.codefather.cn', category: 'codefather', icon: '🐟' }
};

// ==================== 数据存储 ====================
let clickData = JSON.parse(localStorage.getItem('ctfClickData'));
if (!clickData) {
    clickData = { clicks: {}, daily: {}, total: 0, lastClick: null, codefatherVisits: 0 };
} else {
    if (!clickData.clicks) clickData.clicks = {};
    if (!clickData.daily) clickData.daily = {};
    if (!clickData.total) clickData.total = 0;
    if (!clickData.codefatherVisits) clickData.codefatherVisits = 0;
}

// ==================== 吉祥物语录 ====================
const mascotQuotes = {
    encourage: [
        "兄弟，今天刷了几道题？加油！我看好你！💪",
        "每一道题都是成长的机会，坚持就是胜利！🦞",
        "大佬都是从小白过来的，你也可以！✨",
        "刷题路上不孤单，有我陪着你！🚀",
        "今天的努力，是明天比赛时的底气！💯",
        "别放弃，下一道题就会了！🎯",
        "CTF 选手的修养：越挫越勇！🔥",
        "代码写累了？看看安全社区，换个思路！📚",
        "鱼皮的 CodeFather 也不错，编程 + 安全双修！🐟",
        "Web技术演化看了吗？了解历史才能更好理解漏洞！📖",
        "ceshiya 闯关模式超好玩，边玩边学！🎮"
    ],
    tip: [
        "做不出来的题，看 WriteUp 不丢人，学会了就是自己的！📚",
        "建议从 Web 方向入手，HTTP 协议搞懂了再学别的！🌐",
        "每天至少刷 1 道题，保持手感很重要！⏰",
        "准备好笔记本，记录每道题的知识点！📝",
        "多混 CTF 社区，很多大佬会分享经验！💬",
        "工具要用熟，但别依赖工具，原理最重要！🔧",
        "比赛时团队配合很关键，找个靠谱的队友！👥",
        "FreeBuf 和先知社区多逛逛，了解最新安全动态！📰",
        "编程基础很重要，CodeFather 上的项目可以练手！💻",
        "学 Web 安全之前，先理解 Web 技术是怎么演化的～📚",
        "ceshiya 闯关模式可以帮你快速理解常见漏洞！🎮"
    ],
    about: [
        "我是丛中笑，你的数字兄弟 🦞",
        "这个导航页会记录你每一次刷题的努力",
        "看着热力图慢慢变绿，超有成就感！",
        "风雨丛中笑，兄弟心中照 ❤️",
        "CTF 平台 + 安全社区 + CodeFather，一站式学习！"
    ]
};

// ==================== 工具函数 ====================
function getDateKey(d) {
    const date = d || new Date();
    return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
}

function saveData() {
    try { localStorage.setItem('ctfClickData', JSON.stringify(clickData)); } catch (e) {}
}

// ==================== 初始化 ====================
function init() {
    try {
        renderHeatmap();
        updateCounts();
        updateStats();
        initMascot();
        initBackToTop();
        initScrollReveal();
        initSearch();
        initLeaderboard();
        renderLeaderboard();
        initRoadmapCheckboxes();
        initCountdown();
    } catch (e) {
        console.error('初始化错误:', e);
    }
}

// ==================== 访问网站 ====================
function visitSite(siteKey) {
    const site = sites[siteKey];
    if (!site) { console.error('站点不存在:', siteKey); return; }
    
    window.open(site.url, '_blank');

    const dateKey = getDateKey();
    clickData.total++;
    clickData.lastClick = { site: site.name, time: new Date().toLocaleString('zh-CN') };
    if (!clickData.clicks[siteKey]) clickData.clicks[siteKey] = 0;
    clickData.clicks[siteKey]++;
    if (!clickData.daily[dateKey]) clickData.daily[dateKey] = 0;
    clickData.daily[dateKey]++;
    if (siteKey === 'codefather') clickData.codefatherVisits++;
    saveData();

    updateCounts();
    updateStats();
    renderHeatmap();
    renderLeaderboard();

    const msgs = [
        `兄弟，又去${site.name}学习了？加油！🦞`,
        `${site.name}走起！今天也要进步！💪`,
        `好的开始是成功的一半，${site.name}冲！🚀`
    ];
    showMascotMessage(msgs[Math.floor(Math.random() * msgs.length)]);
}

// ==================== 更新计数 ====================
function updateCounts() {
    Object.keys(sites).forEach(key => {
        const el = document.getElementById('count-' + key);
        if (el) el.textContent = (clickData.clicks[key] || 0) + '次';
    });
    const cc = document.getElementById('count-codefather');
    if (cc) cc.textContent = clickData.codefatherVisits || 0;
}

function updateStats() {
    document.getElementById('total-clicks').textContent = clickData.total;
    if (clickData.lastClick) {
        document.getElementById('last-click').textContent =
            clickData.lastClick.site + ' · ' + (clickData.lastClick.time.split(' ')[1] || '').slice(0, 5);
    }
    document.getElementById('streak-days').textContent = calculateStreak();
}

function calculateStreak() {
    const dates = Object.keys(clickData.daily).sort();
    if (dates.length === 0) return 0;
    const today = getDateKey();
    let streak = 0, cur = new Date(today);
    while (true) {
        const key = getDateKey(cur);
        if (clickData.daily[key]) { streak++; cur.setDate(cur.getDate() - 1); }
        else if (key === today) { cur.setDate(cur.getDate() - 1); }
        else break;
    }
    return streak;
}

// ==================== 热力图 ====================
function renderHeatmap() {
    const heatmap = document.getElementById('heatmap');
    const monthsContainer = document.getElementById('heatmap-months');
    if (!heatmap) return;
    heatmap.innerHTML = '';
    if (monthsContainer) monthsContainer.innerHTML = '';

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    const startDayOfWeek = startDate.getDay();

    if (monthsContainer) renderMonthLabels(startDate, today, monthsContainer);

    for (let col = 0; col < 53; col++) {
        for (let row = 0; row < 7; row++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            const daysToAdd = col * 7 + row - startDayOfWeek;
            const cellDate = new Date(startDate);
            cellDate.setDate(cellDate.getDate() + daysToAdd);
            if (cellDate >= startDate && cellDate <= today) {
                const key = getDateKey(cellDate);
                const clicks = clickData.daily[key] || 0;
                const level = clicks === 0 ? 0 : clicks <= 2 ? 1 : clicks <= 5 ? 2 : clicks <= 10 ? 3 : 4;
                cell.className = 'heatmap-cell level-' + level;
                cell.dataset.date = key;
                cell.dataset.clicks = clicks;
                cell.style.visibility = 'visible';
                cell.addEventListener('mouseenter', (e) => showTooltip(e, key, clicks));
                cell.addEventListener('mouseleave', hideTooltip);
            } else {
                cell.style.visibility = 'hidden';
                cell.style.width = '12px';
                cell.style.height = '12px';
            }
            heatmap.appendChild(cell);
        }
    }
}

function renderMonthLabels(startDate, endDate, container) {
    const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    let html = '<div class="month-labels">', lastMonth = -1, cur = new Date(startDate);
    while (cur <= endDate) {
        const m = cur.getMonth();
        if (m !== lastMonth && cur.getDate() <= 7) {
            html += '<span class="month-label">' + months[m] + '</span>';
            lastMonth = m;
        }
        cur.setDate(cur.getDate() + 7);
    }
    html += '</div>';
    container.innerHTML = html;
}

function showTooltip(e, date, clicks) {
    const t = document.getElementById('tooltip');
    const d = new Date(date);
    t.innerHTML = '<strong>' + (d.getMonth()+1) + '月' + d.getDate() + '日</strong><br>点击 ' + clicks + ' 次';
    t.style.display = 'block';
    let x = e.clientX + 10, y = e.clientY - 30;
    if (x + 150 > window.innerWidth) x = window.innerWidth - 160;
    if (y < 10) y = e.clientY + 20;
    t.style.left = x + 'px';
    t.style.top = y + 'px';
}
function hideTooltip() { document.getElementById('tooltip').style.display = 'none'; }

// ==================== 数据管理 ====================
function resetData() {
    if (confirm('⚠️ 确定要重置所有点击记录吗？此操作不可恢复！')) {
        localStorage.removeItem('ctfClickData');
        clickData = { clicks: {}, daily: {}, total: 0, lastClick: null, codefatherVisits: 0 };
        updateCounts(); updateStats(); renderHeatmap(); renderLeaderboard();
        toast('数据已重置，重新开始记录！🔄', 'info');
    }
}

function showData() {
    const json = JSON.stringify(clickData, null, 2);
    const lines = Object.keys(clickData.daily).length;
    alert('📊 数据概览\n\n' + json + '\n\n总点击：' + clickData.total + '\n有数据的天数：' + lines);
}

function exportData() {
    const dataStr = JSON.stringify(clickData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ctf-click-data-backup-' + getDateKey() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('✅ 数据已导出！', 'success');
}

function importData() {
    document.getElementById('import-file-input').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!imported.clicks || !imported.daily) {
                toast('❌ 文件格式不对，导入失败', 'error');
                return;
            }
            if (!confirm('确定导入该备份数据？当前数据将被覆盖！')) return;
            clickData = imported;
            if (!clickData.codefatherVisits) clickData.codefatherVisits = 0;
            saveData();
            updateCounts(); updateStats(); renderHeatmap(); renderLeaderboard();
            toast('✅ 数据导入成功！', 'success');
        } catch (_) {
            toast('❌ 文件解析失败，请检查备份文件', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ==================== 🏆 榜单 ====================
function initLeaderboard() {
    // 绑定点击事件
    document.addEventListener('click', function(e) {
        const item = e.target.closest('.leaderboard-item');
        if (item) {
            const key = item.dataset.site;
            if (sites[key]) visitSite(key);
        }
    });
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;
    
    const entries = Object.keys(sites)
        .map(key => ({ key, name: sites[key].name, icon: sites[key].icon, count: clickData.clicks[key] || 0 }))
        .filter(e => e.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    if (entries.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:var(--text-secondary);padding:20px;">还没有点击记录，去刷题吧！🚀</div>';
        return;
    }

    container.innerHTML = entries.map((e, i) => {
        let rankClass = '';
        if (i === 0) rankClass = 'gold';
        else if (i === 1) rankClass = 'silver';
        else if (i === 2) rankClass = 'bronze';
        return '<div class="leaderboard-item" data-site="' + e.key + '">' +
            '<div class="rank ' + rankClass + '">#' + (i + 1) + '</div>' +
            '<div class="lb-icon">' + (e.icon || '📎') + '</div>' +
            '<div class="lb-name">' + e.name + '</div>' +
            '<div class="lb-count">' + e.count + '次</div>' +
            '</div>';
    }).join('');
}

// ==================== 🎮 吉祥物 ====================
function initMascot() {
    const bubble = document.getElementById('mascot-bubble');
    const text = document.getElementById('mascot-text');
    const mascot = document.getElementById('mascot');
    if (!bubble || !text || !mascot) return;
    mascot.addEventListener('click', (e) => { if (e.target.classList.contains('mascot-btn')) return; toggleMascotBubble(); });
    setInterval(() => {
        if (bubble.classList.contains('show')) return;
        showMascotMessage(mascotQuotes.encourage[Math.floor(Math.random() * mascotQuotes.encourage.length)]);
    }, 300000);
}
function toggleMascotBubble() {
    const b = document.getElementById('mascot-bubble'), t = document.getElementById('mascot-text');
    if (!b || !t) return;
    if (b.classList.contains('show')) b.classList.remove('show');
    else { t.textContent = mascotQuotes.encourage[Math.floor(Math.random() * mascotQuotes.encourage.length)]; b.classList.add('show'); }
}
function showMascotMessage(msg) {
    const b = document.getElementById('mascot-bubble'), t = document.getElementById('mascot-text'), body = document.querySelector('.mascot-body');
    if (!b || !t) return;
    t.textContent = msg; b.classList.add('show');
    if (body) { body.classList.add('mascot-happy'); setTimeout(() => body.classList.remove('mascot-happy'), 500); }
    setTimeout(() => b.classList.remove('show'), 3000);
}
function mascotAction(type) {
    const b = document.getElementById('mascot-bubble'), t = document.getElementById('mascot-text'), body = document.querySelector('.mascot-body');
    const q = mascotQuotes[type];
    if (!b || !t || !q) return;
    t.textContent = q[Math.floor(Math.random() * q.length)]; b.classList.add('show');
    if (body) { body.classList.add('mascot-happy'); setTimeout(() => body.classList.remove('mascot-happy'), 500); }
}

// ==================== 🃏 Web技术演化折叠卡片 ====================
function toggleEvoCard(el) {
    el.classList.toggle('open');
}

// ==================== 🎯 Ceshiya 相关 ====================
function openCeshiyaDir() {
    window.open('file:///C:/Users/ZiXuChen/Downloads/ceshiya-master/ceshiya-master/', '_blank');
}
function showCeshiyaTips() {
    showMascotMessage('打开命令行，cd 到 ceshiya-master 目录，然后执行 start.bat 或 npm run dev 就能启动啦！🎮');
}

// ==================== 🔝 返回顶部 ====================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        btn.classList.toggle('show', window.scrollY > 400);
    });
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== 👁️ 滚动显现动画 ====================
function initScrollReveal() {
    const els = document.querySelectorAll('.scroll-reveal');
    if (els.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    els.forEach(el => observer.observe(el));
}

// ==================== 🔍 搜索 ====================
function initSearch() {
    const input = document.getElementById('site-search');
    const results = document.getElementById('search-results');
    if (!input || !results) return;

    let timer;
    input.addEventListener('input', function() {
        clearTimeout(timer);
        timer = setTimeout(() => doSearch(this.value, results), 150);
    });
    input.addEventListener('focus', function() {
        if (this.value.trim()) results.classList.add('show');
    });
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !results.contains(e.target)) {
            results.classList.remove('show');
        }
    });
}

function doSearch(query, container) {
    const q = query.trim().toLowerCase();
    if (!q) { container.classList.remove('show'); return; }

    const matches = Object.keys(sites)
        .map(key => ({ key, ...sites[key], clicks: clickData.clicks[key] || 0 }))
        .filter(s => s.name.toLowerCase().includes(q) || (s.desc || '').toLowerCase().includes(q) || s.url.toLowerCase().includes(q))
        .slice(0, 8);

    if (matches.length === 0) {
        container.innerHTML = '<div class="no-results">没有找到相关站点 😅</div>';
    } else {
        const catMap = { ctf: '🎮 CTF', community: '📰 社区', codefather: '💻 CodeFather' };
        container.innerHTML = matches.map(s =>
            '<div class="result-item" onclick="visitSite(\'' + s.key + '\')">' +
            '<span class="ri-name">' + (s.icon || '📎') + ' ' + s.name + '</span>' +
            '<span class="ri-cat">' + (catMap[s.category] || s.category) + '</span>' +
            '<span class="ri-url">' + s.clicks + '次</span>' +
            '</div>'
        ).join('');
    }
    container.classList.add('show');
}

// ==================== ⌨️ 键盘快捷键 ====================
document.addEventListener('keydown', function(e) {
    // 如果正在输入框中，不触发
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleShortcutsModal();
        return;
    }

    // 数字键导航
    const navKeys = {
        '1': 'top',
        '2': 'ctf-platforms',
        '3': 'security-communities',
        '4': 'web-history',
        '5': 'ceshiya',
        '6': 'codefather',
        '7': 'toolbox',
        '8': 'ctf-types',
        '9': 'roadmap'
    };

    if (!e.ctrlKey && !e.metaKey && !e.altKey && navKeys[e.key]) {
        e.preventDefault();
        const target = document.getElementById(navKeys[e.key]);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Ctrl + F 聚焦搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('site-search');
        if (searchInput) searchInput.focus();
    }
});

// ==================== ⌨️ 快捷键提示弹窗 ====================
function toggleShortcutsModal() {
    const modal = document.getElementById('shortcuts-modal');
    if (!modal) return;
    modal.classList.toggle('show');
}

// ==================== 🍞 Toast 通知 ====================
function toast(msg, type) {
    type = type || 'info';
    const container = document.getElementById('toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast toast-' + type;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => {
        t.classList.add('toast-removing');
        setTimeout(() => t.remove(), 300);
    }, 3000);
}

// ==================== 🏠 导航平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ==================== 🧰 内置工具箱 ====================

// 切换工具箱输出标签
function toolboxTab(type) {
    const output = document.getElementById('toolbox-output');
    const input = document.getElementById('toolbox-input');
    if (!output || !input) return;
    try {
        const text = input.value;
        switch(type) {
            case 'b64e': output.textContent = btoa(unescape(encodeURIComponent(text))); break;
            case 'b64d': try { output.textContent = decodeURIComponent(escape(atob(text))); } catch(e) { output.textContent = '⚠️ 无效的 Base64'; } break;
            case 'hexe': output.textContent = Array.from(new TextEncoder().encode(text)).map(b => b.toString(16).padStart(2,'0')).join(' '); break;
            case 'hexd': try { output.textContent = new TextDecoder().decode(new Uint8Array(text.trim().split(/\s+/).filter(Boolean).map(h => parseInt(h,16)))); } catch(e) { output.textContent = '⚠️ 无效的 Hex'; } break;
            case 'rot13': output.textContent = text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c <= 'Z' ? (c.charCodeAt(0)-65+13)%26+65 : (c.charCodeAt(0)-97+13)%26+97)); break;
            case 'urle': output.textContent = encodeURIComponent(text); break;
            case 'urld': output.textContent = decodeURIComponent(text); break;
            default: output.textContent = '';
        }
        // 识别哈希
        const hashId = identifyHash(text);
        const extra = document.querySelector('.toolbox-extra');
        if (extra && hashId) extra.innerHTML = '<div class="hash-result">🔍 检测到：<strong>' + hashId + '</strong></div>';
        else if (extra) extra.innerHTML = '';
    } catch(e) { output.textContent = '⚠️ 转换失败: ' + e.message; }
}

function identifyHash(str) {
    const s = str.trim();
    if (s.length === 32 && /^[a-f0-9]{32}$/i.test(s)) return 'MD5 (32位)';
    if (s.length === 40 && /^[a-f0-9]{40}$/i.test(s)) return 'SHA1';
    if (s.length === 64 && /^[a-f0-9]{64}$/i.test(s)) return 'SHA256';
    if (s.length === 128 && /^[a-f0-9]{128}$/i.test(s)) return 'SHA512';
    if (s.length === 16 && /^[a-f0-9]{16}$/i.test(s)) return '可能为 MySQL old password / MD5半截';
    if (s.length === 56 && /^[a-f0-9]{56}$/i.test(s)) return 'SHA224';
    return null;
}

function copyToolboxOutput() {
    const out = document.getElementById('toolbox-output');
    if (!out || !out.textContent) return;
    navigator.clipboard.writeText(out.textContent).then(() => toast('已复制到剪贴板！📋', 'success')).catch(() => {});
}

function clearToolbox() {
    document.getElementById('toolbox-input').value = '';
    document.getElementById('toolbox-output').textContent = '';
    const extra = document.querySelector('.toolbox-extra');
    if (extra) extra.innerHTML = '';
}

// ==================== 🗺️ 菜鸡路线规划复选框 ====================
function initRoadmapCheckboxes() {
    const checkboxes = document.querySelectorAll('.roadmap-checkbox');
    if (checkboxes.length === 0) return;

    // 从 localStorage 加载状态
    const saved = JSON.parse(localStorage.getItem('ctfRoadmapProgress') || '{}');
    
    checkboxes.forEach(cb => {
        const id = cb.dataset.rid;
        if (saved[id]) cb.checked = true;
        
        cb.addEventListener('change', function() {
            this.parentElement.classList.toggle('done', this.checked);
            saveRoadmapState();
            updateRoadmapProgress();
        });
        
        // 初始状态
        cb.parentElement.classList.toggle('done', cb.checked);
    });
    
    updateRoadmapProgress();
}

function saveRoadmapState() {
    const state = {};
    document.querySelectorAll('.roadmap-checkbox').forEach(cb => {
        state[cb.dataset.rid] = cb.checked;
    });
    localStorage.setItem('ctfRoadmapProgress', JSON.stringify(state));
}

function updateRoadmapProgress() {
    const el = document.getElementById('roadmap-progress');
    if (!el) return;
    const total = document.querySelectorAll('.roadmap-checkbox').length;
    const done = document.querySelectorAll('.roadmap-checkbox:checked').length;
    const pct = total > 0 ? Math.round(done / total * 100) : 0;
    el.textContent = done + '/' + total + ' (' + pct + '%)';
    
    // 动画填充进度条
    const bar = document.querySelector('.roadmap-progress-fill');
    if (bar) bar.style.width = pct + '%';
}

function resetRoadmap() {
    if (!confirm('确定重置所有路线图进度？')) return;
    localStorage.removeItem('ctfRoadmapProgress');
    document.querySelectorAll('.roadmap-checkbox').forEach(cb => {
        cb.checked = false;
        cb.parentElement.classList.remove('done');
    });
    updateRoadmapProgress();
    toast('路线图已重置 🔄', 'info');
}

// ==================== 🏁 CTF 赛事倒计时 ====================
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // 每分钟刷新
}

function getCTFEvents() {
    const now = new Date();
    const year = now.getFullYear();
    
    // CTF 赛事时间表（每年有固定赛历，这里放一些经典赛事）
    const events = [
        { name: '**CTF 赛后看 WriteUp', desc: '很多比赛会赛后公开题目，刚好练手', date: new Date(year, 3, 30), icon: '📝' },
        { name: '🔰 DEF CON CTF 资格赛', desc: '世界顶级CTF，每年5月', date: new Date(year, 4, 17), icon: '🏆' },
        { name: '🌐 国家网络安全宣传周', desc: '国内CTF赛事密集期', date: new Date(year, 8, 9), icon: '🇨🇳' },
        { name: '🎃 XCTF 国际赛', desc: 'XCTF国际联赛', date: new Date(year, 9, 15), icon: '⚔️' },
        { name: '🛡️ KCTF 2026', desc: '看雪CTF，经典逆向/Pwn赛事', date: new Date(year, 6, 1), icon: '🔐' },
        { name: '🚩 TCTF 2026', desc: '腾讯CTF，面向全球高校', date: new Date(year, 6, 20), icon: '🐧' },
    ];
    
    return events.sort((a, b) => a.date - b.date);
}

function updateCountdown() {
    const container = document.getElementById('countdown-list');
    if (!container) return;
    
    const now = new Date();
    const events = getCTFEvents();
    
    // 找出最近的3个（含已过的——展示后续）
    const upcoming = events.filter(e => e.date >= now).slice(0, 3);
    
    if (upcoming.length === 0) {
        container.innerHTML = '<div class="countdown-empty">暂无近期赛事 📅</div>';
        return;
    }
    
    container.innerHTML = upcoming.map(e => {
        const diff = e.date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        let timeStr, urgencyClass = '';
        if (days > 30) {
            const months = Math.floor(days / 30);
            timeStr = months + '个月后';
        } else if (days > 0) {
            timeStr = days + '天' + hours + '小时后';
            if (days <= 7) urgencyClass = 'urgent';
        } else if (days === 0 && hours > 0) {
            timeStr = hours + '小时后';
            urgencyClass = 'urgent';
        } else {
            timeStr = '进行中！🔥';
            urgencyClass = 'happening-now';
        }
        
        return '<div class="countdown-item ' + urgencyClass + '">' +
            '<div class="countdown-icon">' + e.icon + '</div>' +
            '<div class="countdown-info">' +
            '<div class="countdown-name">' + e.name + '</div>' +
            '<div class="countdown-desc">' + e.desc + '</div>' +
            '</div>' +
            '<div class="countdown-time">' + timeStr + '</div>' +
            '</div>';
    }).join('');
}

// ==================== 导航下拉（移动端兼容） ====================
// 点击时打开下拉，hover 时也保持打开
function initNavDropdowns() {
    document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.nav-dropdown');
            // 关闭其他
            document.querySelectorAll('.nav-dropdown.open').forEach(d => {
                if (d !== parent) d.classList.remove('open');
            });
            parent.classList.toggle('open');
        });
    });
    // 点击其他地方关闭
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });
}

// 追加到 init
const origInit = init;
init = function() {
    origInit();
    initNavDropdowns();
};

// ==================== 🚀 DOM 加载完成 ====================
document.addEventListener('DOMContentLoaded', init);
