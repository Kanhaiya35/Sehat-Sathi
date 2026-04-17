/* ── Sehat Sathi – Global Config + API Layer (Production Ready) ─────────── */
'use strict';

(function (global) {

  /* ───────────────── CONFIG ───────────────── */
  const IS_LOCAL =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.hostname === '';

  const CONFIG = Object.freeze({
    BASE_URL: IS_LOCAL
      ? 'http://localhost:5000'
      : 'https://api.sehatsathi.in',

    KEYS: Object.freeze({
      USER: 'ss_user',
      DARK: 'ss_dark',
      LANG: 'lang',
    }),

    API_TIMEOUT_MS: 10000,
    MIN_PASSWORD_LEN: 8,
  });

  global.SS_CONFIG = CONFIG;

  /* ───────────────── API WRAPPER ───────────────── */

  async function apiCall(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message = data?.message || `Request failed (${response.status})`;
        throw new Error(message);
      }

      return data;

    } catch (err) {

      if (err.name === 'AbortError') {
        console.error('API TIMEOUT:', endpoint);
        showError('Request timed out. Please try again.');
      } else {
        console.error('API ERROR:', err.message);
        showError(err.message || 'Something went wrong');
      }

      throw err;
    }
  }

  global.apiCall = apiCall;

  /* ───────────────── UI HELPERS ───────────────── */

  function showError(message) {
    // Replace alert with better UX later (toast system)
    if (!message) return;
    alert(message);
  }

  global.showError = showError;

})(window);