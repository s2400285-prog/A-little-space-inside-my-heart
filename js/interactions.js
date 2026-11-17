/* Small discoveries use native buttons and dialogs, so they work with keyboards too. */
(() => {
  'use strict';
  const { showNote, toast, storage } = window.Diary;
  const wishes = [
    'I hope today gives you a small reason to smile, Baby.',
    'May we always make room for kindness, especially on the difficult days.',
    'A little wish: more silly moments and honest conversations, at a pace that feels right for us.',
    'You deserve rest, joy, and room to be yourself.',
    'Even an ordinary little hello from you can brighten my day.'
  ];
  let previous = -1;
  document.querySelectorAll('[data-star]').forEach(button => button.addEventListener('click', () => {
    let index; do { index = Math.floor(Math.random() * wishes.length); } while (index === previous);
    previous = index; showNote(wishes[index], 'A little wish for you');
  }));
  document.querySelectorAll('[data-note]').forEach(button => button.addEventListener('click', () => showNote(button.dataset.note)));
  document.querySelectorAll('[data-bloom]').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const on = button.classList.toggle('bloomed'); button.setAttribute('aria-pressed', String(on));
      if (on) toast('A little care helps love grow. We can be patient with each other.');
    });
  });
  document.querySelectorAll('.understanding-card').forEach(card => card.addEventListener('click', () => {
    const open = card.getAttribute('aria-expanded') !== 'true';
    card.setAttribute('aria-expanded', String(open)); card.querySelector('.card-message').hidden = !open;
  }));
  document.getElementById('one-more')?.addEventListener('click', () => showNote('I’m sorry for everything, Baby. I don’t want us to hurt each other. I don’t want to feel ignored, and I don’t want you to feel misunderstood. I just want us to love each other in a way where both of us feel heard, valued, and appreciated.\n\nYou don’t have to have an answer right now. When we’re ready, I’d love to hear what has been inside your heart, too.', 'One more thing, Baby…'));
  document.getElementById('final-letter')?.addEventListener('click', () => showNote('Baby Julie, thank you for making a little room for my words. This diary is only my side of the conversation. There is room here for your truth, your feelings, and the things I haven’t understood yet.\n\nYou don’t owe me an immediate answer or a perfect response. I hope that when we talk, we can be gentle with each other and honest about what we both need.\n\nI can’t promise that I’ll never get anything wrong. I can promise to take responsibility, listen, and keep learning. Whatever our next conversation holds, I want it to begin with care.\n\nI love you. — James ♡', 'There is room for your heart, too.'));
  const fallback = img => { if (img.dataset.fallback && !img.dataset.usedFallback) { img.dataset.usedFallback = 'true'; img.src = img.dataset.fallback; img.alt = 'Illustrated placeholder for our photo — a memory waiting to be added'; } };
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => fallback(img));
    if (img.complete && !img.naturalWidth) fallback(img);
  });
  document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
    const img = button.querySelector('img');
    document.getElementById('expanded-photo').src = img.src;
    document.getElementById('expanded-photo').alt = img.alt;
    document.getElementById('expanded-caption').textContent = button.closest('figure').querySelector('figcaption').textContent;
    document.getElementById('photo-dialog').showModal();
  }));
  const saved = storage.get('captions', {});
  document.querySelectorAll('[data-caption]').forEach(label => {
    if (saved && typeof saved[label.dataset.caption] === 'string') label.textContent = saved[label.dataset.caption];
    const input = document.querySelector(`[data-edit-caption="${label.dataset.caption}"]`);
    if (input) input.value = label.textContent;
  });
  document.getElementById('save-captions')?.addEventListener('click', () => {
    const captions = {};
    document.querySelectorAll('[data-edit-caption]').forEach(input => {
      const key = input.dataset.editCaption;
      const value = input.value.trim(); captions[key] = value;
      document.querySelector(`[data-caption="${key}"]`).textContent = value;
    });
    const persisted = storage.set('captions', captions);
    toast(persisted ? 'Our captions are saved in this browser. ♡' : 'Captions updated for this visit. Browser storage is unavailable.');
  });
  // Object URLs only preview user-selected files. No file leaves this browser.
  const objectUrls = new Map();
  document.querySelectorAll('[data-upload]').forEach(input => input.addEventListener('change', () => {
    const file = input.files[0]; if (!file) return;
    const key = input.dataset.upload;
    const type = key.startsWith('photo') ? 'image/' : key === 'video' ? 'video/' : 'audio/';
    if (!file.type.startsWith(type)) { toast('Please choose a compatible photo, video, or audio file.'); input.value = ''; return; }
    const oldUrl = objectUrls.get(key);
    const url = URL.createObjectURL(file); objectUrls.set(key, url);
    if (key.startsWith('photo')) {
      const img = document.querySelector(`[data-photo="${key.slice(-1)}"] img`);
      img.dataset.usedFallback = ''; img.src = url; img.alt = key === 'photo1' ? 'Our first photo together' : 'Another little memory of us';
    } else {
      const media = document.getElementById(key === 'video' ? 'memory-video' : 'our-song');
      media.pause(); media.src = url; media.load();
    }
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    toast('Added to this visit. A little more us. ♡');
  }));
  window.addEventListener('pagehide', () => objectUrls.forEach(url => URL.revokeObjectURL(url)));
})();
