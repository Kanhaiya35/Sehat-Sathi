/* ── Sehat Sathi – Translation Engine v2 ───────────────────── */
'use strict';

const LANG_MAP = {
  en: typeof LANG_EN !== 'undefined' ? LANG_EN : null,
  hi: typeof LANG_HI !== 'undefined' ? LANG_HI : null,
  mr: typeof LANG_MR !== 'undefined' ? LANG_MR : null,
  ta: typeof LANG_TA !== 'undefined' ? LANG_TA : null,
  bn: typeof LANG_BN !== 'undefined' ? LANG_BN : null,
};

let currentLang = localStorage.getItem('ss_lang') || 'en';

/* ── Core translation function ── */
function applyTranslations(lang) {
  const dict = LANG_MAP[lang] || LANG_MAP['en'];
  if (!dict) return;

  /* 1. Text content: data-translate */
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (dict[key] === undefined) return;
    const hasChildElements = el.children.length > 0;
    if (hasChildElements) {
      let replaced = false;
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
          node.textContent = dict[key];
          replaced = true;
        }
      });
      if (!replaced) el.appendChild(document.createTextNode(dict[key]));
    } else {
      el.textContent = dict[key];
    }
  });

  /* 2. Placeholder: data-translate-placeholder */
  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  /* 3. Title attribute: data-translate-title */
  document.querySelectorAll('[data-translate-title]').forEach(el => {
    const key = el.getAttribute('data-translate-title');
    if (dict[key] !== undefined) el.title = dict[key];
  });

  /* 4. Sync all language selects on page */
  document.querySelectorAll('select').forEach(sel => {
    if (sel.querySelector('option[value="en"]') &&
        sel.querySelector('option[value="hi"]')) {
      sel.value = lang;
    }
  });

  document.documentElement.lang = lang;
}

/* ── setLanguage: called from selects & language popup ── */
function setLanguage(lang) {
  if (!LANG_MAP[lang]) {
    console.warn(`[Sehat Sathi] Language "${lang}" not loaded, falling back to English.`);
    lang = 'en';
  }
  currentLang = lang;
  localStorage.setItem('ss_lang', lang);
  /* Re-build map in case scripts loaded after translate.js */
  LANG_MAP.en = typeof LANG_EN !== 'undefined' ? LANG_EN : LANG_MAP.en;
  LANG_MAP.hi = typeof LANG_HI !== 'undefined' ? LANG_HI : LANG_MAP.hi;
  LANG_MAP.mr = typeof LANG_MR !== 'undefined' ? LANG_MR : LANG_MAP.mr;
  LANG_MAP.ta = typeof LANG_TA !== 'undefined' ? LANG_TA : LANG_MAP.ta;
  LANG_MAP.bn = typeof LANG_BN !== 'undefined' ? LANG_BN : LANG_MAP.bn;
  applyTranslations(lang);
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  const popup = document.getElementById('langPopup');
  if (popup) popup.classList.add('hidden');
}

/* ── toggleDarkMode ── */
function toggleDarkMode() {
  const html   = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('ss_dark', isDark ? '1' : '0');
  document.querySelectorAll(
    '#darkBtn, #darkBtnH, #darkBtnV, [data-dark-toggle]'
  ).forEach(btn => {
    const svg = btn.querySelector('svg');
    if (!svg) return;
    if (isDark) {
      svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707
           m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`;
    } else {
      svg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`;
    }
  });
}

/* ── Mobile hamburger toggle ── */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  /* Restore dark mode */
  if (localStorage.getItem('ss_dark') === '1') {
    document.documentElement.classList.add('dark');
  }

  /* Build map now that all lang scripts are loaded */
  LANG_MAP.en = typeof LANG_EN !== 'undefined' ? LANG_EN : null;
  LANG_MAP.hi = typeof LANG_HI !== 'undefined' ? LANG_HI : null;
  LANG_MAP.mr = typeof LANG_MR !== 'undefined' ? LANG_MR : null;
  LANG_MAP.ta = typeof LANG_TA !== 'undefined' ? LANG_TA : null;
  LANG_MAP.bn = typeof LANG_BN !== 'undefined' ? LANG_BN : null;

  applyTranslations(currentLang);

  /* Show language popup only on very first visit */
  if (!localStorage.getItem('ss_visited')) {
    const popup = document.getElementById('langPopup');
    if (popup) popup.classList.remove('hidden');
    localStorage.setItem('ss_visited', '1');
  }

  /* Attach language select listeners (replaces inline onchange) */
  document.querySelectorAll('select[data-lang-select]').forEach(sel => {
    sel.addEventListener('change', e => setLanguage(e.target.value));
  });

  /* Attach dark-mode toggle listeners (replaces inline onclick) */
  document.querySelectorAll('[data-dark-toggle]').forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
  });

  /* Attach mobile menu toggle (replaces inline onclick) */
  document.querySelectorAll('[data-menu-toggle]').forEach(btn => {
    const targetId = btn.getAttribute('data-menu-toggle');
    btn.addEventListener('click', () => {
      document.getElementById(targetId)?.classList.toggle('hidden');
    });
  });

  /* Alert banner dismiss */
  document.querySelectorAll('[data-dismiss-banner]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('[id]')?.classList.add('hidden');
    });
  });

  /* Voice accessibility placeholder */
  document.querySelectorAll('[data-voice-btn]').forEach(btn => {
    btn.addEventListener('click', () => alert('Voice accessibility coming soon!'));
  });
});