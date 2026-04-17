'use strict';

/* ================= INIT ================= */

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  setupEvents();
});

/* ================= PAGE INIT ================= */

function initPage() {
  const user = getUser();

  if (!user) {
    document.getElementById('authGuardV')?.classList.remove('hidden');
    return;
  }

  document.getElementById('mainContentV')?.classList.remove('hidden');

  // Load data
  loadCentres();
  loadSchedule();
  loadOutbreakAlerts();

  // Navbar user
  const nameEl = document.getElementById('navUserNameV');
  if (nameEl) nameEl.textContent = user.name?.split(' ')[0] || '';

  document.getElementById('navAuthV')?.classList.add('hidden');
  document.getElementById('navUserV')?.classList.remove('hidden');
}

/* ================= EVENTS ================= */

function setupEvents() {
  const searchBtn = document.getElementById('searchBtn');
  const refreshBtn = document.getElementById('refreshBtn');
  const reminderBtn = document.getElementById('calcReminderBtn');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const type = document.getElementById('centreTypeFilter')?.value || '';
      loadCentres(type);
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => loadCentres());
  }

  if (reminderBtn) {
    reminderBtn.addEventListener('click', calculateReminder);
  }
}

/* ================= VACCINATION CENTRES ================= */

async function loadCentres(type = '') {
  try {
    const url = `/api/vaccination/centres${type ? '?type=' + encodeURIComponent(type) : ''}`;
    const data = await apiCall(url);

    renderCentres(data.centres);

    const count = document.getElementById('centreCount');
    if (count) count.textContent = `(${data.total} found)`;

  } catch (err) {
    document.getElementById('centresList').innerHTML =
      '<p class="text-red-500 text-sm">Failed to load centres. Please try again.</p>';
  }
}

function renderCentres(centres) {
  const container = document.getElementById('centresList');
  if (!container) return;

  if (!centres?.length) {
    container.innerHTML = `
      <div class="text-center py-12 text-gray-400">
        <div class="text-4xl mb-2">🔍</div>
        <p>No centres found.</p>
      </div>`;
    return;
  }

  container.innerHTML = centres.map(c => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
      <div class="flex justify-between gap-3">
        <div>
          <h4 class="font-bold text-gray-800 dark:text-white">${c.name}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">📍 ${c.address}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            📞 <a href="tel:${c.phone}" class="text-primary-600">${c.phone}</a>
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">⏰ ${c.hours}</p>

          <div class="mt-2 flex flex-wrap gap-1">
            ${c.vaccines.map(v => `
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                ${v}
              </span>
            `).join('')}
          </div>
        </div>

        <a href="https://maps.google.com/?q=${c.lat},${c.lng}"
           target="_blank"
           class="text-xs text-primary-600 underline">
          Open Map
        </a>
      </div>
    </div>
  `).join('');
}

/* ================= VACCINATION SCHEDULE ================= */

async function loadSchedule() {
  try {
    const data = await apiCall('/api/vaccination/schedule');

    const table = document.getElementById('scheduleTableBody');
    if (!table) return;

    table.innerHTML = data.schedule.map(row => `
      <tr>
        <td class="px-4 py-2 font-medium">${row.age}</td>
        <td class="px-4 py-2">${row.vaccines.join(', ')}</td>
        <td class="px-4 py-2 hidden sm:table-cell">${row.note || '-'}</td>
        <td class="px-4 py-2 text-green-600">Recommended</td>
      </tr>
    `).join('');

  } catch {
    document.getElementById('scheduleTableBody').innerHTML =
      '<tr><td colspan="4" class="text-red-500 text-center">Failed to load</td></tr>';
  }
}

/* ================= OUTBREAK ALERTS ================= */

let outbreakLoaded = false;

async function loadOutbreakAlerts() {
  if (outbreakLoaded) return; // prevent duplicate calls
  outbreakLoaded = true;

  const container = document.getElementById('outbreakAlerts');
  if (!container) return;

  try {
    const res = await fetch('/api/outbreaks');
    const data = await res.json();

    if (!data.alerts?.length) {
      container.innerHTML = '<p class="text-xs text-gray-400">No alerts</p>';
      return;
    }

    container.innerHTML = data.alerts.map(a => `
      <div class="p-2 rounded bg-red-50 border border-red-200">
        <strong>🦠 ${a.title}</strong><br>
        <span class="text-xs text-gray-500">${a.date}</span>
      </div>
    `).join('');

  } catch {
    container.innerHTML =
      '<p class="text-red-500 text-xs">Failed to load alerts</p>';
  }
}

/* ================= REMINDER ================= */

function calculateReminder() {
  const dob = document.getElementById('childDob')?.value;
  const result = document.getElementById('reminderResult');

  if (!dob) return;

  const ageMonths = Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 30));

  let msg = '';

  if (ageMonths < 2) msg = 'BCG, OPV, Hep-B';
  else if (ageMonths < 4) msg = 'Pentavalent + OPV';
  else if (ageMonths < 9) msg = 'MR Vaccine';
  else msg = 'Booster doses';

  result.innerHTML = `Next Vaccine: ${msg}`;
  result.classList.remove('hidden');
}