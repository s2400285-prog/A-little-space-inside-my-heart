/* Shared audio/video controller. No autoplay; progress follows real media events. */
(() => {
  'use strict';
  const audio = document.getElementById('our-song');
  const video = document.getElementById('memory-video');
  if (!audio || !video) return;
  const clock = seconds => {
    if (!Number.isFinite(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  };
  function setup(media, prefix, name, other) {
    const play = document.getElementById(`${prefix}-play`);
    const progress = document.getElementById(`${prefix}-progress`);
    const time = document.getElementById(`${prefix}-time`);
    const status = document.getElementById(`${prefix}-status`);
    const record = document.querySelector('.record');
    const missing = prefix === 'music' ? 'Our song is waiting to be added. ♡' : 'Our video is waiting to be added. ♡';
    const sync = () => {
      play.textContent = media.paused ? '▶' : 'Ⅱ';
      play.setAttribute('aria-label', `${media.paused ? 'Play' : 'Pause'} ${name}`);
      if (prefix === 'music') record.classList.toggle('playing', !media.paused);
    };
    const update = () => {
      const valid = Number.isFinite(media.duration) && media.duration > 0;
      progress.disabled = !valid;
      progress.value = valid ? (media.currentTime / media.duration) * 100 : 0;
      time.textContent = `${clock(media.currentTime)} / ${clock(media.duration)}`;
      progress.setAttribute('aria-valuetext', `${clock(media.currentTime)} of ${clock(media.duration)}`);
    };
    play.addEventListener('click', async () => {
      if (media.error) { window.Diary.toast(missing + ' Open “Make this little corner ours” to try your file.'); return; }
      if (!media.paused) { media.pause(); return; }
      other.pause();
      try { await media.play(); status.textContent = prefix === 'music' ? 'A little soundtrack for our memories.' : 'One of our little moments.'; }
      catch { status.textContent = 'This file couldn’t play. Please choose a supported media file.'; window.Diary.toast(status.textContent); sync(); }
    });
    progress.addEventListener('input', () => { if (Number.isFinite(media.duration) && media.duration > 0) { media.currentTime = (Number(progress.value) / 100) * media.duration; update(); } });
    ['play', 'pause', 'ended'].forEach(event => media.addEventListener(event, sync));
    ['timeupdate', 'durationchange', 'loadedmetadata'].forEach(event => media.addEventListener(event, update));
    media.addEventListener('loadstart', () => { status.textContent = 'Getting our little memory ready…'; update(); sync(); });
    media.addEventListener('loadedmetadata', () => { status.textContent = 'Ready whenever you are. ♡'; });
    const onError = () => { status.textContent = missing; progress.disabled = true; sync(); };
    media.addEventListener('error', onError);
    media.querySelectorAll('source').forEach(source => source.addEventListener('error', onError));
    if (media.error || (prefix === 'video' && media.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) onError();
    update(); sync();
  }
  setup(audio, 'music', 'our song', video);
  setup(video, 'video', 'memory video', audio);
  const mute = document.getElementById('video-mute');
  mute.setAttribute('aria-pressed', 'false');
  mute.addEventListener('click', () => {
    video.muted = !video.muted; mute.textContent = video.muted ? '×♪' : '♪';
    mute.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video'); mute.setAttribute('aria-pressed', String(video.muted));
  });
  document.getElementById('video-fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (video.requestFullscreen) { video.controls = true; await video.requestFullscreen(); }
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else window.Diary.toast('Fullscreen isn’t available in this browser.');
    } catch { video.controls = false; window.Diary.toast('Fullscreen isn’t available just now.'); }
  });
  document.addEventListener('fullscreenchange', () => { video.controls = Boolean(document.fullscreenElement); });
})();
