'use strict';

/* ── All Indian States & Union Territories ─────────────────────────── */
const INDIA_STATES = [
  // States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman & Nicobar Islands', 'Chandigarh',
  'Dadra & Nagar Haveli and Daman & Diu', 'Delhi', 'Jammu & Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
];

let _schemes = [];

/* ── Fetch + render ─────────────────────────────────────────────────── */
async function loadSchemes() {
  const root = document.getElementById('schemeCards');
  if (!root) return;

  /* Skeleton */
  root.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-4">
      ${Array(6).fill(`
        <div class="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-5
                    border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded w-1/2"></div>
        </div>`).join('')}
    </div>`;

  try {
    const res = await fetch('/data/schemes.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const raw = await res.json();

    /* Ignore entries with no scheme_name */
    _schemes = raw.filter(s => s && String(s.scheme_name || '').trim() !== '');

    buildSchemeUI();
  } catch (err) {
    root.innerHTML = `
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700
                  rounded-2xl p-6 text-center">
        <p class="text-sm font-semibold text-red-600 dark:text-red-400">
          Could not load schemes — ${err.message}
        </p>
        <p class="text-xs text-gray-400 mt-1">
          Make sure <code>/data/schemes.json</code> is accessible.
        </p>
      </div>`;
  }
}

/* ── Build dropdown + grid ──────────────────────────────────────────── */
function buildSchemeUI() {
  const root = document.getElementById('schemeCards');
  if (!root) return;

  root.innerHTML = `
    <!-- ── State / UT filter bar ── -->
    <div class="flex items-center gap-3 mb-6 flex-wrap">

      <label class="text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap">
        State / UT:
      </label>

      <div class="relative">
        <select id="stateFilter"
          onchange="filterSchemes()"
          class="appearance-none pl-9 pr-8 py-2 text-sm font-medium rounded-xl
                 border border-gray-200 dark:border-gray-600
                 bg-white dark:bg-gray-700 dark:text-white
                 focus:ring-2 focus:ring-primary-500 outline-none cursor-pointer
                 hover:border-primary-400 transition-colors min-w-[200px]">

          <option value="all">All States &amp; UTs</option>

          <optgroup label="── States ──">
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </optgroup>

          <optgroup label="── Union Territories ──">
            <option value="Andaman &amp; Nicobar Islands">Andaman &amp; Nicobar Islands</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra &amp; Nagar Haveli and Daman &amp; Diu">Dadra &amp; Nagar Haveli and Daman &amp; Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Jammu &amp; Kashmir">Jammu &amp; Kashmir</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </optgroup>

        </select>

        <!-- pin icon -->
        <svg class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <!-- chevron -->
        <svg class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      <!-- Count badge -->
      <span id="schemeCount"
        class="text-xs font-semibold px-3 py-1.5 rounded-full
               bg-primary-50 dark:bg-primary-900/30
               text-primary-700 dark:text-primary-400
               border border-primary-200 dark:border-primary-700">
        ${_schemes.length} schemes
      </span>
    </div>

    <!-- ── Card grid ── -->
    <div id="schemeGrid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"></div>`;

  renderGrid(_schemes);
}

/* ── Filter on dropdown change ─────────────────────────────────────── */
window.filterSchemes = function () {
  const val      = document.getElementById('stateFilter')?.value || 'all';
  const filtered = val === 'all' ? _schemes : _schemes.filter(s => s.state === val);
  renderGrid(filtered);
};

/* ── Render card grid ───────────────────────────────────────────────── */
function renderGrid(list) {
  const grid  = document.getElementById('schemeGrid');
  const badge = document.getElementById('schemeCount');
  if (!grid) return;

  if (badge) badge.textContent = `${list.length} scheme${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-14 text-gray-400 dark:text-gray-500">
        <svg class="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm">No schemes found for this state / UT.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(s => `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm
                border border-gray-100 dark:border-gray-700
                border-l-4 border-l-primary-500
                hover:shadow-md transition-all duration-200">
      <h3 class="font-bold text-gray-800 dark:text-white text-sm leading-snug mb-2">
        ${s.scheme_name}
      </h3>
      ${s.state ? `
      <span class="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full
                   bg-emerald-50 dark:bg-emerald-900/30
                   text-emerald-700 dark:text-emerald-400
                   border border-emerald-200 dark:border-emerald-700">
        📍 ${s.state}
      </span>` : ''}
    </div>`).join('');
}

/* ── Auto-init ──────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadSchemes);