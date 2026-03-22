/* ── Sehat Sathi – Home Page Script ─────────────────────────────────────── */
'use strict';

// Load outbreak alerts into banner
async function loadOutbreakAlerts() {
  try {
    const data = await apiCall('/api/alerts/active');
    const banner = document.getElementById('alertBanner');
    const txt    = document.getElementById('alertBannerText');
    if (!banner || !data.alerts?.length) return;

    const alert = data.alerts[0];
    const colors = {
      low:      'bg-green-600',
      medium:   'bg-amber-500',
      high:     'bg-orange-600',
      critical: 'bg-red-700',
    };
    banner.className = `text-white text-center py-2.5 px-4 text-sm font-medium relative ${colors[alert.severity] || 'bg-amber-500'}`;
    txt.textContent  = `⚠️ ${alert.title} – ${alert.region}: ${alert.message}`;
    banner.classList.remove('hidden');
  } catch { /* silently fail */ }
}

document.addEventListener('DOMContentLoaded', () => {
  loadOutbreakAlerts();
});