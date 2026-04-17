/* ── Sehat Sathi – Admin Dashboard ──────────────────────────────────────── */
'use strict';

let currentPage   = 1;
let totalPages    = 1;
let searchTimeout = null;
const API_BASE = window.location.origin;

function $(id){
  return document.getElementById(id);
}

async function api(url, options = {}) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(API_BASE + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      credentials: "include", // 🔥 IMPORTANT
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "API error");

    return data;

  } catch (err) {
    console.error("API ERROR:", err);
    throw err;
  }
}
// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await api('/api/auth/me'); // 🔥 backend validation
    const user = data.user;

    if (!user) throw new Error("Not logged in");
    if (user.role !== "admin") throw new Error("Not admin");

    $('adminGuard').classList.add('hidden');
    $('adminLayout').classList.remove('hidden');

    $('adminName').textContent = user.name || "Admin";

    loadStats();

  } catch (err) {
    $('guardIcon').textContent  = '🚫';
    $('guardTitle').textContent = 'Access Denied';
    $('guardMsg').textContent   = err.message;
    $('guardLinks').classList.remove('hidden');
  }
});


// ── Section Switching ────────────────────────────────────────────────────────
function showSection(name) {
  ['overview','users','queries','alerts'].forEach(s => {
    document.getElementById('sec-' + s)?.classList.toggle('hidden', s !== name);
    const btn = document.getElementById('nav-' + s);
    if (btn) {
      btn.classList.toggle('active-nav', s === name);
      btn.classList.toggle('text-gray-400', s !== name);
    }
  });
  const titles = {
    overview: ['Overview',         'Platform Statistics'],
    users:    ['User Management',  'View and manage registered users'],
    queries:  ['Chat Queries',     'Most active chat sessions'],
    alerts:   ['Outbreak Alerts',  'Create and manage health alerts'],
  };
  document.getElementById('sectionTitle').textContent    = titles[name]?.[0] || name;
  document.getElementById('sectionSubtitle').textContent = titles[name]?.[1] || '';

  if (name === 'users')   loadUsers();
  if (name === 'queries') loadTopQueries();
  if (name === 'alerts')  loadAlerts();
}

// ── Stats ────────────────────────────────────────────────────────────────────
async function loadStats() {
  try {
    const data = await apiCall('/api/admin/stats');
    const s    = data.stats;

    document.getElementById('stat-users').textContent  = s.totalUsers  || 0;
    document.getElementById('stat-chats').textContent  = s.totalChats  || 0;
    document.getElementById('stat-msgs').textContent   = s.totalMessages || 0;
    document.getElementById('stat-alerts').textContent = s.activeAlerts || 0;

    // Language distribution
    const langEl   = document.getElementById('langDistribution');
    const langNames = { en:'English', hi:'Hindi', mr:'Marathi', ta:'Tamil', bn:'Bengali' };
    const total     = s.languageDistribution.reduce((acc, l) => acc + l.count, 0);
    if (langEl) {
      langEl.innerHTML = s.languageDistribution.map(l => {
        const pct = total > 0 ? Math.round((l.count / total) * 100) : 0;
        return `
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="text-gray-600 dark:text-gray-400">${langNames[l._id] || l._id}</span>
            <span class="font-medium text-gray-700 dark:text-gray-300">${l.count} (${pct}%)</span>
          </div>
          <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3">
            <div class="bg-primary-500 h-1.5 rounded-full" style="width:${pct}%"></div>
          </div>`;
      }).join('') || '<p class="text-xs text-gray-400">No data yet.</p>';
    }

    // Recent users
    const recentEl = document.getElementById('recentUsers');
    if (recentEl) {
      recentEl.innerHTML = s.recentUsers.map(u => `
        <div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-sm flex-shrink-0">
            ${u.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-800 dark:text-white truncate">${u.name}</p>
            <p class="text-xs text-gray-400 truncate">${u.email}</p>
          </div>
          <span class="text-xs text-gray-400">${new Date(u.createdAt).toLocaleDateString()}</span>
        </div>`).join('') || '<p class="text-xs text-gray-400">No users yet.</p>';
    }
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// ── Users ────────────────────────────────────────────────────────────────────
async function loadUsers(page = 1, search = '') {
  try {
    const url  = `/api/admin/users?page=${page}&limit=15${search ? '&search=' + encodeURIComponent(search) : ''}`;
    const data = await apiCall(url);
    const body = document.getElementById('usersTableBody');
    totalPages  = data.pages || 1;
    currentPage = data.page  || 1;

    document.getElementById('usersPageInfo').textContent = `Page ${currentPage} of ${totalPages} · ${data.total} users`;
    document.getElementById('prevPageBtn').disabled = currentPage <= 1;
    document.getElementById('nextPageBtn').disabled = currentPage >= totalPages;

    if (!data.users?.length) {
      body.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-400 text-sm">No users found.</td></tr>';
      return;
    }

    const langNames = { en:'🇬🇧', hi:'🇮🇳', mr:'🇮🇳', ta:'🇮🇳', bn:'🇧🇩' };
    body.innerHTML = data.users.map(u => `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xs flex-shrink-0">
              ${u.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <p class="font-medium text-gray-800 dark:text-white text-sm">${u.name}</p>
              <p class="text-xs text-gray-400">${u.email}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 hidden sm:table-cell">
          <span class="text-sm">${langNames[u.preferredLanguage] || '🌐'} ${u.preferredLanguage?.toUpperCase() || 'EN'}</span>
        </td>
        <td class="px-4 py-3">
          <span class="text-xs px-2 py-0.5 rounded-full font-medium ${u.role === 'admin' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}">
            ${u.role === 'admin' ? '⚙️ Admin' : '👤 User'}
          </span>
        </td>
        <td class="px-4 py-3">
          <span class="text-xs px-2 py-0.5 rounded-full font-medium ${u.isActive ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'}">
            ${u.isActive ? '✅ Active' : '🚫 Inactive'}
          </span>
        </td>
        <td class="px-4 py-3 hidden md:table-cell text-xs text-gray-400">${new Date(u.createdAt).toLocaleDateString()}</td>
        <td class="px-4 py-3">
          <div class="flex gap-1">
            <button onclick="toggleUserStatus('${u._id}')"
              class="text-xs px-2 py-1 rounded-lg ${u.isActive ? 'text-red-600 border border-red-300 hover:bg-red-50 dark:hover:bg-red-900/30' : 'text-green-600 border border-green-300 hover:bg-green-50 dark:hover:bg-green-900/30'} transition-colors">
              ${u.isActive ? 'Deactivate' : 'Activate'}
            </button>
            ${u.role !== 'admin' ?
              `<button onclick="makeAdmin('${u._id}')" class="text-xs px-2 py-1 rounded-lg text-amber-600 border border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30">Admin</button>` : ''
            }
          </div>
        </td>
      </tr>`).join('');
  } catch (err) {
    document.getElementById('usersTableBody').innerHTML =
      `<tr><td colspan="6" class="px-4 py-8 text-center text-red-400">${err.message}</td></tr>`;
  }
}

function changePage(delta) {
  const newPage = currentPage + delta;
  if (newPage < 1 || newPage > totalPages) return;
  loadUsers(newPage, document.getElementById('userSearch')?.value || '');
}

function debounceSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => loadUsers(1, val), 400);
}

async function toggleUserStatus(id) {
  try {
    await apiCall(`/api/admin/users/${id}/status`, { method: 'PATCH' });
    loadUsers(currentPage, document.getElementById('userSearch')?.value || '');
  } catch (err) { alert('Error: ' + err.message); }
}

async function makeAdmin(id) {
  if (!confirm('Grant admin privileges to this user?')) return;
  try {
    await apiCall(`/api/admin/users/${id}/role`, { method: 'PATCH', body: JSON.stringify({ role: 'admin' }) });
    loadUsers(currentPage);
  } catch (err) { alert('Error: ' + err.message); }
}

// ── Top Queries ──────────────────────────────────────────────────────────────
async function loadTopQueries() {
  try {
    const data = await apiCall('/api/admin/top-queries');
    const body = document.getElementById('queriesTableBody');
    if (!body) return;

    if (!data.sessions?.length) {
      body.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-400">No chat sessions yet.</td></tr>';
      return;
    }

    const providerIcon = { openai:'🤖', gemini:'✨', ollama:'🖥' };
    body.innerHTML = data.sessions.map(s => `
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
        <td class="px-4 py-3">
          <p class="text-sm font-medium text-gray-800 dark:text-white">${s.userId?.name || 'Unknown'}</p>
          <p class="text-xs text-gray-400">${s.userId?.email || ''}</p>
        </td>
        <td class="px-4 py-3">
          <span class="text-sm font-bold text-primary-600 dark:text-primary-400">${s.queryCount}</span>
        </td>
        <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
          ${providerIcon[s.provider] || '🤖'} ${s.provider || 'openai'}
        </td>
        <td class="px-4 py-3 hidden sm:table-cell text-sm text-gray-500 dark:text-gray-400 uppercase">${s.language || 'en'}</td>
        <td class="px-4 py-3 hidden md:table-cell text-xs text-gray-400">${new Date(s.createdAt).toLocaleDateString()}</td>
      </tr>`).join('');
  } catch (err) {
    document.getElementById('queriesTableBody').innerHTML =
      `<tr><td colspan="5" class="px-4 py-8 text-center text-red-400">${err.message}</td></tr>`;
  }
}

// ── Alerts ───────────────────────────────────────────────────────────────────
async function createAlert() {
  const title    = document.getElementById('alertTitle')?.value.trim();
  const message  = document.getElementById('alertMessage')?.value.trim();
  const severity = document.getElementById('alertSeverity')?.value;
  const region   = document.getElementById('alertRegion')?.value.trim();
  const msgEl    = document.getElementById('alertFormMsg');
  const btn      = document.getElementById('alertBtnText');
  const spin     = document.getElementById('alertBtnSpinner');

  if (!title || !message || !severity || !region) {
    if (msgEl) { msgEl.textContent = '❌ Please fill all fields.'; msgEl.className = 'mb-4 p-3 rounded-xl text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'; msgEl.classList.remove('hidden'); }
    return;
  }

  if (btn) btn.textContent = 'Publishing...';
  if (spin) spin.classList.remove('hidden');

  try {
    await apiCall('/api/admin/alerts', { method: 'POST', body: JSON.stringify({ title, message, severity, region }) });

    if (msgEl) { msgEl.textContent = '✅ Alert published successfully!'; msgEl.className = 'mb-4 p-3 rounded-xl text-sm bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'; msgEl.classList.remove('hidden'); }

    // Clear form
    ['alertTitle','alertMessage','alertRegion'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('alertSeverity').value = 'medium';

    loadAlerts();
    // Update stats badge
    const statsAlerts = document.getElementById('stat-alerts');
    if (statsAlerts) statsAlerts.textContent = parseInt(statsAlerts.textContent || 0) + 1;

    setTimeout(() => msgEl?.classList.add('hidden'), 4000);
  } catch (err) {
    if (msgEl) { msgEl.textContent = '❌ ' + err.message; msgEl.className = 'mb-4 p-3 rounded-xl text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'; msgEl.classList.remove('hidden'); }
  } finally {
    if (btn) btn.textContent = '🚨 Publish Alert';
    if (spin) spin.classList.add('hidden');
  }
}

async function loadAlerts() {
  try {
    const data = await apiCall('/api/admin/alerts');
    const list = document.getElementById('alertsList');
    if (!list) return;

    if (!data.alerts?.length) {
      list.innerHTML = '<p class="text-sm text-gray-400">No alerts created yet.</p>';
      return;
    }

    const sevColor = { low:'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700', medium:'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700', high:'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700', critical:'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700' };
    const sevText  = { low:'text-green-700 dark:text-green-400', medium:'text-amber-700 dark:text-amber-400', high:'text-orange-700 dark:text-orange-400', critical:'text-red-700 dark:text-red-400' };

    list.innerHTML = data.alerts.map(a => `
      <div class="rounded-xl p-4 border ${sevColor[a.severity] || sevColor.medium}">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h4 class="font-semibold text-sm text-gray-800 dark:text-white">${a.title}</h4>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-xs font-bold uppercase ${sevText[a.severity] || ''}">${a.severity}</span>
            <span class="text-xs px-1.5 py-0.5 rounded-full font-medium ${a.isActive ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}">
              ${a.isActive ? 'Live' : 'Inactive'}
            </span>
          </div>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">📍 ${a.region} · ${new Date(a.createdAt).toLocaleDateString()}</p>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-3">${a.message}</p>
        ${a.isActive ? `<button onclick="deactivateAlert('${a._id}')" class="text-xs px-3 py-1 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30">Deactivate</button>` : ''}
      </div>`).join('');
  } catch (err) {
    document.getElementById('alertsList').innerHTML = `<p class="text-red-400 text-sm">${err.message}</p>`;
  }
}

async function deactivateAlert(id) {
  if (!confirm('Deactivate this alert?')) return;
  try {
    await apiCall(`/api/admin/alerts/${id}/deactivate`, { method: 'PATCH' });
    loadAlerts();
    loadStats();
  } catch (err) { alert('Error: ' + err.message); }
}