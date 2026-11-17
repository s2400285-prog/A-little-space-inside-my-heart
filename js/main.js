/* Shared diary state. Every storage operation is guarded for private browsing. */
(() => {
  'use strict';
  const keys = ['welcome', 'apology', 'my-feelings', 'understanding', 'memories', 'promise', 'ending'];
  const paths = ['index.html', ...keys.slice(1).map(key => `pages/${key}.html`)];
  const page = document.body.dataset.page;
  const memory = {};
  const storage = {
    get(key, fallback) { try { const value = localStorage.getItem(`julie-diary:${key}`); return value ? JSON.parse(value) : fallback; } catch { return memory[key] ?? fallback; } },
    set(key, value) { memory[key] = value; try { localStorage.setItem(`julie-diary:${key}`, JSON.stringify(value)); return true; } catch { return false; } }
  };
  let toastTimer;
  function toast(message) {
    const box = document.getElementById('toast');
    box.textContent = message; box.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => box.classList.remove('visible'), 4500);
  }
  function showNote(message, title = 'A little note for you') {
    const dialog = document.getElementById('note-dialog');
    document.getElementById('note-title').textContent = title;
    const content = document.getElementById('note-content');
    content.replaceChildren();
    message.split('\n\n').forEach(text => { const p = document.createElement('p'); p.textContent = text; content.append(p); });
    if (!dialog.open) dialog.showModal();
  }
  function progress() {
    const raw = storage.get('read', []);
    const read = Array.isArray(raw) ? raw.filter(key => keys.includes(key)) : [];
    return [...new Set(read)];
  }
  function updateProgress() {
    const count = progress().length;
    document.getElementById('reading-progress').textContent = `${count} of 7 pages explored · at your own pace`;
    const flowers = document.querySelector('.progress-flowers');
    flowers.textContent = keys.map(key => progress().includes(key) ? '✿' : '❀').join(' ');
    if (page === 'ending') {
      document.getElementById('final-secret').hidden = count < keys.length;
      document.getElementById('secret-hint').hidden = count === keys.length;
    }
  }
  function markRead() { const read = progress(); if (!read.includes(page)) { storage.set('read', [...read, page]); } updateProgress(); }
  window.Diary = { storage, toast, showNote, markRead };
  updateProgress();
  // Reaching the bottom marks the page as explored, rather than simply opening it.
  const marker = page === 'welcome' ? document.querySelector('.welcome-footer') : document.querySelector('.page-bottom');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { markRead(); observer.disconnect(); }
    }, { threshold: 0.2 }); observer.observe(marker);
  } else { markRead(); }
  document.querySelectorAll('.page-turn a').forEach(link => link.addEventListener('click', markRead));
  if (page === 'welcome') {
    const last = storage.get('last', 'welcome');
    if (keys.includes(last) && last !== 'welcome') {
      const resume = document.getElementById('resume-link'); resume.href = paths[keys.indexOf(last)]; resume.hidden = false;
    }
  } else { storage.set('last', page); }
  document.querySelector('[data-restart]')?.addEventListener('click', () => storage.set('last', 'welcome'));
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
    }
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  });
  // Deliberate animation only after an invitation is clicked; reduced motion is respected.
  const openLetter = event => {
    event.preventDefault();
    if (document.body.classList.contains('opening')) return;
    document.body.classList.add('opening');
    document.getElementById('open-envelope').classList.add('is-open'); markRead();
    setTimeout(() => { document.body.classList.add('leaving'); window.location.href = 'pages/apology.html'; }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 850);
  };
  document.getElementById('open-envelope')?.addEventListener('click', openLetter);
  document.getElementById('open-letter')?.addEventListener('click', openLetter);
})();
