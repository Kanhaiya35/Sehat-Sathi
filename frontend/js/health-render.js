/* ── Sehat Sathi – Health Page Dynamic Renderer ─────────────── */
'use strict'

/* Color map → Tailwind classes */
const CLR = {
  red:    { bg:'bg-red-50 dark:bg-red-900/20',    hdr:'border-red-100 dark:border-red-800',    icon:'text-red-600 dark:text-red-400',    title:'text-red-700 dark:text-red-400',    sub:'text-red-400',    note:'bg-red-50 dark:bg-red-900/20',    noteTxt:'text-red-700 dark:text-red-400'    },
  orange: { bg:'bg-orange-50 dark:bg-orange-900/20', hdr:'border-orange-100 dark:border-orange-800', icon:'text-orange-600 dark:text-orange-400', title:'text-orange-700 dark:text-orange-400', sub:'text-orange-400', note:'bg-orange-50 dark:bg-orange-900/20', noteTxt:'text-orange-700 dark:text-orange-400' },
  blue:   { bg:'bg-blue-50 dark:bg-blue-900/20',  hdr:'border-blue-100 dark:border-blue-800',  icon:'text-blue-600 dark:text-blue-400',  title:'text-blue-700 dark:text-blue-400',  sub:'text-blue-400',  note:'bg-blue-50 dark:bg-blue-900/20',  noteTxt:'text-blue-700 dark:text-blue-400'  },
  purple: { bg:'bg-purple-50 dark:bg-purple-900/20', hdr:'border-purple-100 dark:border-purple-800', icon:'text-purple-600 dark:text-purple-400', title:'text-purple-700 dark:text-purple-400', sub:'text-purple-400', note:'bg-purple-50 dark:bg-purple-900/20', noteTxt:'text-purple-700 dark:text-purple-400' },
}

const SCHEME_CLR = {
  primary:{ border:'border-l-4 border-primary-500', icon:'text-primary-600 dark:text-primary-400', iconBg:'bg-primary-50 dark:bg-primary-900/30' },
  blue:   { border:'border-l-4 border-blue-500',    icon:'text-blue-600 dark:text-blue-400',       iconBg:'bg-blue-50 dark:bg-blue-900/30'    },
  pink:   { border:'border-l-4 border-pink-500',    icon:'text-pink-600 dark:text-pink-400',       iconBg:'bg-pink-50 dark:bg-pink-900/30'    },
  teal:   { border:'border-l-4 border-teal-500',    icon:'text-teal-600 dark:text-teal-400',       iconBg:'bg-teal-50 dark:bg-teal-900/30'    },
  purple: { border:'border-l-4 border-purple-500',  icon:'text-purple-600 dark:text-purple-400',   iconBg:'bg-purple-50 dark:bg-purple-900/30' },
  amber:  { border:'border-l-4 border-amber-500',   icon:'text-amber-600 dark:text-amber-400',     iconBg:'bg-amber-50 dark:bg-amber-900/30'  },
}

/* SVG icons for disease cards */
const DISEASE_ICONS = {
  malaria:  `<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
  dengue:   `<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
  tb:       `<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>`,
  diabetes: `<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 2c-4 4-6 7.5-6 10a6 6 0 0012 0c0-2.5-2-6-6-10z"/></svg>`,
}

const SCHEME_ICONS = {
  primary:  `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>`,
  blue:     `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
  pink:     `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>`,
  teal:     `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
  purple:   `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>`,
  amber:    `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>`,
}

/* ── Get current language data ── */
function getLangData() {
  const lang = localStorage.getItem('ss_lang') || 'en'
  return HEALTH_DATA[lang] || HEALTH_DATA['en']
}

/* ── Render disease cards ── */
function renderDiseases() {
  const el = document.getElementById('diseaseCards')
  if (!el) return
  const d = getLangData()

  let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">'

  d.diseases.forEach(dis => {
    const c = CLR[dis.color] || CLR.red
    const trtLabel = dis.treatLabel || d.trt_label
    html += `
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all">
      <div class="${c.bg} px-6 py-4 flex items-center gap-3 border-b ${c.hdr}">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg}">
          <span class="${c.icon}">${DISEASE_ICONS[dis.id] || ''}</span>
        </div>
        <div>
          <h3 class="font-bold text-xl ${c.title}">${dis.name}</h3>
          <p class="text-xs ${c.sub}">${dis.subtitle}</p>
        </div>
      </div>
      <div class="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
        <div>
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-xs uppercase tracking-wide">${d.sym_label}</h4>
          <ul class="text-gray-500 dark:text-gray-400 space-y-1 text-xs">
            ${dis.symptoms.map(s => `<li>• ${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-xs uppercase tracking-wide">${d.prev_label}</h4>
          <ul class="text-gray-500 dark:text-gray-400 space-y-1 text-xs">
            ${dis.prevention.map(s => `<li>• ${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-xs uppercase tracking-wide">${trtLabel}</h4>
          <ul class="text-gray-500 dark:text-gray-400 space-y-1 text-xs">
            ${dis.treatment.map(s => `<li>• ${s}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="mx-6 mb-4 ${c.note} rounded-xl p-3 flex items-start gap-2">
        <svg class="w-4 h-4 flex-shrink-0 mt-0.5 ${c.icon}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <p class="text-xs font-semibold ${c.noteTxt}">${dis.emergency}</p>
      </div>
    </div>`
  })

  html += '</div>'

  /* Compact disease row */
  html += '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">'
  d.diseasesCompact.forEach(dc => {
    html += `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
      <h4 class="font-bold dark:text-white mb-2 text-sm">${dc.name}</h4>
      <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        ${dc.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>`
  })
  html += '</div>'

  el.innerHTML = html
}

/* ── Render prevention cards ── */
function renderPrevention() {
  const el = document.getElementById('preventionCards')
  if (!el) return
  const d = getLangData()

  let html = '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">'
  const hoverColors = ['blue','green','amber','primary','purple','red','yellow','teal','pink']

  d.prevention.forEach((card, i) => {
    const hc = hoverColors[i % hoverColors.length]
    html += `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-${hc}-300 hover:shadow-md transition-all">
      <h3 class="font-bold text-gray-800 dark:text-white mb-2 text-sm">${card.title}</h3>
      <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        ${card.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>`
  })

  html += '</div>'

  /* Daily tip widget */
  html += `
  <div class="mt-8 bg-gradient-to-r from-primary-50 to-emerald-50 dark:from-primary-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-primary-100 dark:border-primary-800">
    <h3 class="font-bold text-xl text-primary-800 dark:text-primary-300 mb-4 flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
      ${d.daily_tip_label}
    </h3>
    <div id="dailyTip" class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 min-h-[60px]">
      Loading today's health tip...
    </div>
    <button onclick="loadNextTip()" class="mt-3 text-sm px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
      ${d.next_tip_label}
    </button>
  </div>`

  el.innerHTML = html
}

/* ── Render scheme cards ── */
function renderSchemes() {
  const el = document.getElementById('schemeCards')
  if (!el) return
  const d = getLangData()

  let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">'

  d.schemes.forEach(s => {
    const sc = SCHEME_CLR[s.color] || SCHEME_CLR.primary
    html += `
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm ${sc.border} hover:shadow-md transition-shadow">
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 ${sc.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0">
          <span class="${sc.icon}">${SCHEME_ICONS[s.color] || SCHEME_ICONS.primary}</span>
        </div>
        <div class="flex-1">
          <h3 class="font-bold text-xl text-gray-800 dark:text-white">${s.name}</h3>
          <p class="text-xs ${sc.icon} font-medium mb-2">${s.sub}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">${s.desc}</p>
          ${s.badge1 ? `
          <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-2"><p class="font-semibold text-green-700 dark:text-green-400">${s.badge1}</p><p class="text-gray-400">${s.badge1v}</p></div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2"><p class="font-semibold text-blue-700 dark:text-blue-400">${d.helpline_label}</p><p><a href="tel:${s.badge2v}" class="font-bold text-primary-600">${s.badge2v}</a></p></div>
          </div>` : ''}
          ${s.extra ? `<div class="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">${s.extra.map(e => `<p>${e}</p>`).join('')}</div>` : ''}
          ${s.helpline ? `<div class="mt-3 text-xs text-gray-500 dark:text-gray-400"><p>${d.helpline_label}: <a href="tel:${s.helpline}" class="text-primary-600 font-medium">${s.helpline}</a></p></div>` : ''}
        </div>
      </div>
    </div>`
  })

  html += '</div>'

  /* Eligibility checker form */
  html += `
  <div id="eligibilityChecker" class="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-700">
    <h3 class="text-xl font-bold text-primary-800 dark:text-primary-300 mb-1 flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/></svg>
      ${d.eligibility_title}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">${d.eligibility_sub}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      ${buildSelect('income',     d.el_income_label,  d.el_income_opt)}
      ${buildSelect('caste',      d.el_caste_label,   d.el_caste_opt)}
      ${buildSelect('ration',     d.el_ration_label,  d.el_ration_opt)}
      ${buildSelect('occupation', d.el_occ_label,     d.el_occ_opt)}
    </div>
    <button onclick="checkEligibility()" class="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all flex items-center gap-2">
      ${d.el_check_btn}
    </button>
    <div id="eligibilityResult" class="hidden mt-5 rounded-xl p-5 border-2">
      <div id="eligibilityIcon" class="text-4xl mb-2"></div>
      <h4 id="eligibilityTitle" class="text-lg font-bold mb-1"></h4>
      <p  id="eligibilityText"  class="text-sm mb-3"></p>
      <div id="eligibilityLinks" class="space-y-1 text-sm"></div>
    </div>
  </div>`

  el.innerHTML = html
}

function buildSelect(id, label, options) {
  return `
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">${label}</label>
    <select id="${id}" class="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm">
      ${options.map((o, i) => `<option value="${i === 0 ? '' : o.toLowerCase().split(' ')[0]}">${o}</option>`).join('')}
    </select>
  </div>`
}

/* ── Main render + hook into setLanguage ── */
function renderAllHealthCards() {
  renderDiseases()
  renderPrevention()
  renderSchemes()
}

/* Run on page load */
document.addEventListener('DOMContentLoaded', () => {
  renderAllHealthCards()
})

/* Hook into setLanguage so re-render fires on language switch */
const _origSetLanguage = typeof setLanguage === 'function' ? setLanguage : null
function setLanguage(lang) {
  if (_origSetLanguage) _origSetLanguage(lang)
  /* Re-render cards in new language after a tick */
  setTimeout(renderAllHealthCards, 0)
}