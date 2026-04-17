/* ── Sehat Sathi Auth Helpers (shared across all pages) ─────────────────── */
'use strict';

/* ================= USER STORAGE ================= */

function getUser() {
  try { return JSON.parse(localStorage.getItem('ss_user')); }
  catch { return null; }
}

/* ================= NAVBAR ================= */

function updateNavbar() {
  const user = getUser();

  const authEls = ['navAuth', 'navAuthH', 'navAuthV'];
  const userEls = ['navUser', 'navUserH', 'navUserV'];
  const nameEls = ['navUserName', 'navUserNameH', 'navUserNameV'];

  authEls.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', !!user);
  });

  userEls.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', !user);
  });

  nameEls.forEach(id => {
    const el = document.getElementById(id);
    if (el && user) el.textContent = user.name?.split(' ')[0] || 'User';
  });

  const adminLink = document.getElementById('navAdmin');
  if (adminLink) adminLink.classList.toggle('hidden', user?.role !== 'admin');

  if (localStorage.getItem('ss_dark') === '1') {
    document.documentElement.classList.add('dark');
  }
}

/* ================= LOGOUT ================= */

async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  } catch { /* ignore */ }
  localStorage.removeItem('ss_user');
  window.location.href = '/';
}

/* ================= DARK MODE ================= */

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ss_dark', isDark ? '1' : '0');
}

/* ================= MOBILE MENU ================= */

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

/* ================= API HELPER ================= */

async function apiCall(url, options = {}) {
  const defaults = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  };

  const res = await fetch(url, { ...defaults, ...options });
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('ss_user');
      const redirect = encodeURIComponent(window.location.pathname);
      window.location.href = `/login.html?redirect=${redirect}`;
    }
    throw new Error(data.message || 'API error');
  }

  return data;
}

/* ================= PAGE GUARDS ================= */

function requireAuth(redirectBack = true) {
  const user = getUser();
  if (!user) {
    const path = redirectBack ? encodeURIComponent(window.location.pathname) : '';
    window.location.href = `/login.html${path ? '?redirect=' + path : ''}`;
    return false;
  }
  return true;
}

function requireAdmin() {
  const user = getUser();
  if (!user) { requireAuth(); return false; }
  if (user.role !== 'admin') { window.location.href = '/'; return false; }
  return true;
}

/* ================= PASSWORD TOGGLE ================= */

function togglePwd(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.type = el.type === 'password' ? 'text' : 'password';
}

/* ================= LOGIN ================= */

async function handleLogin() {
  const email    = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const btn      = document.getElementById('loginBtn');
  const errEl    = document.getElementById('errorMsg');
  const sucEl    = document.getElementById('successMsg');

  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  errEl?.classList.add('hidden');
  sucEl?.classList.add('hidden');

  if (btn) btn.disabled = true;
  const btnText    = document.getElementById('loginBtnText');
  const btnSpinner = document.getElementById('loginSpinner');
  if (btnText)    btnText.textContent = 'Signing in...';
  if (btnSpinner) btnSpinner.classList.remove('hidden');

  try {
    const BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'http://localhost:5000'
      : 'https://api.sehatsathi.in';

    const res  = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || 'Login failed.');
      return;
    }

    localStorage.setItem('ss_user', JSON.stringify(data.user));

    if (sucEl) {
      sucEl.textContent = '✅ Login successful! Redirecting...';
      sucEl.classList.remove('hidden');
    }

    const redirect = new URLSearchParams(window.location.search).get('redirect') || '/';
    setTimeout(() => { window.location.href = redirect; }, 800);

  } catch {
    showError('Network error. Please try again.');
  } finally {
    if (btn) btn.disabled = false;
    if (btnText)    btnText.textContent = 'Sign In';
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

/* ================= REGISTER ================= */

function initRegisterPage() {
  const regBtn = document.getElementById('regBtn');
  if (!regBtn) return;

  const pwdInput       = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');

  if (togglePassword) {
    togglePassword.addEventListener('click', () => togglePwd('password'));
  }

  if (pwdInput) {
    pwdInput.addEventListener('input', function () {
      const v   = this.value;
      const bar = document.getElementById('pwdStrength');
      const txt = document.getElementById('pwdStrengthText');
      if (!bar || !txt) return;

      let score = 0;
      if (v.length >= 8)              score++;
      if (/[A-Z]/.test(v))            score++;
      if (/[a-z]/.test(v))            score++;
      if (/\d/.test(v))               score++;
      if (/[^A-Za-z0-9]/.test(v))     score++;

      const pct    = (score / 5) * 100;
      const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-500', 'bg-green-500'];
      const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

      bar.className  = `h-full rounded-full transition-all duration-300 ${colors[score - 1] || 'bg-red-400'}`;
      bar.style.width = pct + '%';
      txt.textContent = score > 0 ? labels[score - 1] : '';
    });
  }

  regBtn.addEventListener('click', handleRegister);
}

async function handleRegister() {
  const name     = document.getElementById('name')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const phone    = document.getElementById('phone')?.value.trim();
  const language = document.getElementById('language')?.value;
  const terms    = document.getElementById('terms')?.checked;

  const errEl = document.getElementById('errorMsg');
  const sucEl = document.getElementById('successMsg');
  errEl?.classList.add('hidden');
  sucEl?.classList.add('hidden');

  if (!name || !email || !password)          return showError('Please fill all required fields.');
  if (name.length < 2)                       return showError('Name must be at least 2 characters.');
  if (!/^\S+@\S+\.\S+$/.test(email))         return showError('Invalid email format.');
  if (password.length < 8)                   return showError('Password must be at least 8 characters.');
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
    return showError('Password must contain uppercase, lowercase and a digit.');
  if (phone && !/^[6-9]\d{9}$/.test(phone))  return showError('Enter valid 10-digit Indian mobile number.');
  if (!terms)                                return showError('Please accept the Terms of Use.');

  const btn       = document.getElementById('regBtn');
  const btnText   = document.getElementById('regBtnText');
  const btnSpinner = document.getElementById('regSpinner');

  if (btn) btn.disabled = true;
  if (btnText)    btnText.textContent = 'Creating account...';
  if (btnSpinner) btnSpinner.classList.remove('hidden');

  try {
    const BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      ? 'http://localhost:5000'
      : 'https://api.sehatsathi.in';

    const res  = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone: phone || undefined, language })
    });

    const data = await res.json();

    if (!res.ok) { showError(data.message || 'Registration failed.'); return; }

    localStorage.setItem('ss_user', JSON.stringify(data.user));

    if (sucEl) {
      sucEl.textContent = '✅ Account created! Redirecting...';
      sucEl.classList.remove('hidden');
    }

    setTimeout(() => { window.location.href = '/'; }, 1000);

  } catch {
    showError('Network error. Please try again.');
  } finally {
    if (btn) btn.disabled = false;
    if (btnText)    btnText.textContent = 'Create Account';
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

/* ================= ERROR ================= */

function showError(msg) {
  const el = document.getElementById('errorMsg');
  if (!el) return;
  el.textContent = '❌ ' + msg;
  el.classList.remove('hidden');
}

/* ================= PAGE INIT ================= */

document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  initRegisterPage();

  /* Login page wiring */
  const loginBtn       = document.getElementById('loginBtn');
  const togglePassword = document.getElementById('togglePassword');

  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  /* Only wire togglePassword once (register page wires its own) */
  if (togglePassword && !document.getElementById('regBtn')) {
    togglePassword.addEventListener('click', () => togglePwd('password'));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.getElementById('loginBtn')) handleLogin();
  });

  /* Logout buttons (data-action="logout") */
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', logout);
  });

  /* Dark mode toggles (data-action="dark-toggle") */
  document.querySelectorAll('[data-action="dark-toggle"]').forEach(btn => {
    btn.addEventListener('click', toggleDarkMode);
  });

  /* Mobile menu toggles (data-action="menu-toggle", data-target="<id>") */
  document.querySelectorAll('[data-action="menu-toggle"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) document.getElementById(targetId)?.classList.toggle('hidden');
    });
  });

  /* Redirect already-logged-in users away from login page */
  if (window.location.pathname.includes('login')) {
    const u = localStorage.getItem('ss_user');
    if (u) window.location.href = '/';
  }
});