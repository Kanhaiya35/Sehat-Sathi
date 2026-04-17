/* ── Sehat Sathi Chatbot Page ───────────────────────────────── */
'use strict';

let sessionId = null;
let chatLang  = localStorage.getItem('ss_lang') || 'en';
let isSending = false;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', async () => {
  const user = getUser();

  if (!user) {
    document.getElementById('authGuard').classList.remove('hidden');
    return;
  }

  document.getElementById('chatUI').classList.remove('hidden');

  /* Sync language select */
  const sel = document.getElementById('chatLangSelect');
  if (sel) {
    sel.value = chatLang;
    sel.addEventListener('change', e => {
      chatLang = e.target.value;
      setLanguage(chatLang);
    });
  }

  /* Timestamp on welcome message */
  const wt = document.getElementById('welcomeTime');
  if (wt) wt.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  /* Load history */
  const history = await loadHistory();
  if (history?.length) {
    sessionId = history[0].sessionId;
    loadSession(sessionId);
  } else {
    sessionId = generateUUID();
  }

  /* Image upload listener */
  const imageInput = document.getElementById('imageUpload');
  if (imageInput) {
    imageInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) uploadImage(file);
    });
  }

  /* Image upload button */
  document.getElementById('imgUploadBtn')?.addEventListener('click', () =>
    document.getElementById('imageUpload').click()
  );

  /* Voice button */
  document.getElementById('voiceBtn')?.addEventListener('click', startVoiceInput);

  /* Send button */
  document.getElementById('sendBtn')?.addEventListener('click', sendMessage);

  /* New chat button(s) */
  document.querySelectorAll('[data-new-chat]').forEach(btn =>
    btn.addEventListener('click', newSession)
  );

  /* Textarea enter-to-send */
  document.getElementById('chatInput')?.addEventListener('keydown', handleChatKey);

  /* Textarea auto-resize */
  document.getElementById('chatInput')?.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 160) + 'px';
  });
});

/* ── SEND MESSAGE ── */
async function sendMessage() {
  const input   = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message || isSending) return;

  appendMessage('user', message);
  input.value = '';
  input.style.height = 'auto';

  isSending = true;
  document.getElementById('sendBtn').disabled = true;
  showTyping();

  try {
    const token = localStorage.getItem('token');
    const res   = await fetch('/api/chat/message', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message, provider: 'gemini', language: chatLang, sessionId }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); }
    catch { throw new Error('Server returned invalid response'); }

    hideTyping();

    if (data.success) {
      appendMessage('assistant', formatMarkdown(data.response));
    } else {
      appendMessage('assistant', '⚠️ AI could not respond');
    }

    if (data.sessionId) sessionId = data.sessionId;
    loadHistory();
  } catch (err) {
    hideTyping();
    appendMessage('assistant', '❌ Server error. Try again.');
    console.error(err);
  }

  isSending = false;
  document.getElementById('sendBtn').disabled = false;
  input.focus();
}

/* ── ENTER KEY SEND ── */
function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

/* ── ADD MESSAGE UI ── */
function appendMessage(role, content) {
  const container = document.getElementById('messages');
  if (!container) return;

  const isUser = role === 'user';
  const div    = document.createElement('div');
  div.className = 'flex gap-3 items-start';
  if (isUser) div.classList.add('flex-row-reverse');

  /* avatar */
  const avatar = document.createElement('div');
  avatar.className = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0';
  avatar.textContent = isUser ? (getUser()?.name?.[0]?.toUpperCase() || 'U') : '🏥';
  avatar.classList.add(isUser ? 'bg-primary-100' : 'bg-blue-100');
  if (isUser) avatar.classList.add('text-primary-700');

  /* bubble */
  const bubble = document.createElement('div');
  bubble.className = 'max-w-2xl px-4 py-3 text-sm leading-relaxed rounded-2xl';
  bubble.classList.add(isUser ? 'bg-green-500' : 'bg-white', isUser ? 'text-white' : 'border');
  bubble.innerHTML = formatMarkdown(content);

  /* time */
  const time = document.createElement('div');
  time.className = 'text-xs text-gray-400 mt-1';
  time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const wrap = document.createElement('div');
  wrap.className = 'flex-1';
  wrap.appendChild(bubble);
  wrap.appendChild(time);

  div.appendChild(avatar);
  div.appendChild(wrap);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/* ── TYPING INDICATOR ── */
function showTyping() {
  const container = document.getElementById('messages');
  const div = document.createElement('div');
  div.id = 'typingIndicator';
  div.className = 'text-sm text-gray-500';
  div.innerText = 'Sehat Sathi AI is typing...';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
function hideTyping() {
  document.getElementById('typingIndicator')?.remove();
}

/* ── VOICE INPUT ── */
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Voice recognition not supported');
    return;
  }
  const recognition  = new webkitSpeechRecognition();
  recognition.lang   = 'hi-IN';
  recognition.start();
  recognition.onresult = e => {
    document.getElementById('chatInput').value = e.results[0][0].transcript;
  };
}

/* ── IMAGE UPLOAD ── */
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  appendMessage('user', '📷 Image uploaded');
  showTyping();
  try {
    const token = localStorage.getItem('token');
    const res   = await fetch('/api/chat/image', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    hideTyping();
    appendMessage('assistant', formatMarkdown(data.response));
  } catch {
    hideTyping();
    appendMessage('assistant', '❌ Image analysis failed');
  }
}

/* ── MARKDOWN FORMATTER ── */
function formatMarkdown(text) {
  if (!text) return '';
  text = text.replace(/\n/g,         '<br>');
  text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  text = text.replace(/\*(.*?)\*/g,  '<i>$1</i>');
  text = text.replace(/`(.*?)`/g,    '<code>$1</code>');
  return text;
}

/* ── NEW CHAT SESSION ── */
function newSession() {
  sessionId = generateUUID();
  const container = document.getElementById('messages');
  container.innerHTML = `
    <div class="flex gap-3 items-start">
      <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">🏥</div>
      <div class="bg-white rounded-2xl px-4 py-3 shadow text-sm">
        <p class="font-semibold text-primary-700 mb-1">Sehat Sathi AI</p>
        <p>Hello! Ask me health related questions.</p>
      </div>
    </div>`;
}

/* ── LOAD HISTORY SIDEBAR ── */
async function loadHistory() {
  try {
    const token = localStorage.getItem('token');
    const res   = await fetch('/api/chat/history', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    const list = document.getElementById('historyList');
    if (!list) return [];

    list.innerHTML = '';
    if (!data.sessions || data.sessions.length === 0) {
      list.innerHTML = "<p class='text-xs text-gray-400 p-2'>No chat history</p>";
      return [];
    }

    data.sessions.forEach(s => {
      const btn = document.createElement('button');
      btn.className =
        'w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-xs ' +
        (s.sessionId === sessionId ? 'bg-gray-100 font-semibold' : '');
      btn.innerText = s.messages?.[0]?.content?.slice(0, 30) || 'Chat';
      btn.addEventListener('click', () => loadSession(s.sessionId));
      list.appendChild(btn);
    });

    return data.sessions;
  } catch (err) {
    console.error('History error', err);
    return [];
  }
}

/* ── LOAD PREVIOUS CHAT ── */
async function loadSession(sid) {
  try {
    const token = localStorage.getItem('token');
    const res   = await fetch(`/api/chat/session/${sid}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    sessionId  = sid;
    const container = document.getElementById('messages');
    container.innerHTML = '';
    data.session.messages.forEach(m => appendMessage(m.role, m.content));
  } catch (err) {
    console.error('Session load error', err);
  }
}

/* ── UUID GENERATOR ── */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}