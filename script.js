/**
 * PIPPO: An Interactive Midnight Birthday Adventure for Tiya 🖤🔴🐧
 * Complete Interactive Game Engine & Motion Controller
 */

(function () {
  'use strict';

  // =========================================================================
  // CONFIGURATION & CONSTANTS
  // =========================================================================
  // Target: 28 October 2026, 12:00 AM Indian Standard Time (IST is UTC+05:30)
  // UTC equivalent: 2026-10-27T18:30:00.000Z
  const TARGET_MIDNIGHT_UTC = new Date('2026-10-27T18:30:00.000Z').getTime();

  // Scrapbook Photos Data (11 authentic high-res uploaded photographs)
  const SCRAPBOOK_PHOTOS = [
    {
      idx: 1,
      src: 'assets/images/tiya_01.jpg',
      caption: 'The iconic funny face 😜',
      tag: 'Classic Tiya Energy'
    },
    {
      idx: 2,
      src: 'assets/images/tiya_02.jpg',
      caption: 'Caught with Pikachu! ⚡',
      tag: 'Pikachu Approved'
    },
    {
      idx: 3,
      src: 'assets/images/tiya_03.jpg',
      caption: 'The cutest smile in the world 🌸',
      tag: 'Little Baby Tiya'
    },
    {
      idx: 4,
      src: 'assets/images/tiya_04.jpg',
      caption: 'Deep thoughts & cat-eye frames 👓',
      tag: 'Unmatched Aesthetic'
    },
    {
      idx: 5,
      src: 'assets/images/tiya_05.jpg',
      caption: 'Those big curious eyes 🥺',
      tag: 'Pure Innocence'
    },
    {
      idx: 6,
      src: 'assets/images/tiya_06.jpg',
      caption: 'Besties with the big puppy 🐶',
      tag: 'Fluffy Companions'
    },
    {
      idx: 7,
      src: 'assets/images/tiya_07.jpg',
      caption: 'Dreaming peaceful dreams 😴✨',
      tag: 'Mickey Quilt Days'
    },
    {
      idx: 8,
      src: 'assets/images/tiya_08.jpg',
      caption: 'Rocking the cap since day one 🧢',
      tag: 'Born Cool'
    },
    {
      idx: 9,
      src: 'assets/images/tiya_09.jpg',
      caption: 'Warm jacket & winter aesthetics 🧥',
      tag: 'Mirror Check'
    },
    {
      idx: 10,
      src: 'assets/images/tiya_10.jpg',
      caption: 'Lost in green serenity 🌲',
      tag: 'Quiet Moments'
    },
    {
      idx: 11,
      src: 'assets/images/tiya_11.jpg',
      caption: 'Peace, smiles & good times ✌️',
      tag: 'Main Character Energy'
    }
  ];

  // State Management
  let isUnlocked = false;
  let hasOpenedPokeball = false;
  let isDevPreview = false;
  let currentPhotoIndex = 0;
  let audioContext = null;

  // DOM Elements
  const body = document.body;
  const devBanner = document.getElementById('devBanner');
  const devToggleBtn = document.getElementById('devToggleBtn');
  const devToggleText = document.getElementById('devToggleText');

  // Countdown Elements
  const screenCountdown = document.getElementById('screenCountdown');
  const timerDays = document.getElementById('timerDays');
  const timerHours = document.getElementById('timerHours');
  const timerMinutes = document.getElementById('timerMinutes');
  const timerSeconds = document.getElementById('timerSeconds');

  // Poké Ball Elements
  const pokeballWrapper = document.getElementById('pokeballWrapper');
  const pokeball = document.getElementById('pokeball');
  const pokeballInstruction = document.getElementById('pokeballInstruction');
  const pokeballCallout = document.getElementById('pokeballCallout');
  const openFlash = document.getElementById('openFlash');

  // Birthday World & HUD Elements
  const birthdayWorld = document.getElementById('birthdayWorld');
  const hudProgressFill = document.getElementById('hudProgressFill');
  const hudProgressText = document.getElementById('hudProgressText');
  const navChips = document.querySelectorAll('.nav-chip');

  // Floating Mute & Scroll Down Elements
  const floatingMuteBtn = document.getElementById('floatingMuteBtn');
  const floatingMuteIcon = document.getElementById('floatingMuteIcon');
  const floatingMuteText = document.getElementById('floatingMuteText');
  const sideScrollIndicator = document.getElementById('sideScrollIndicator');

  // Pippo Actor Elements
  const pippoMainActor = document.getElementById('pippoMainActor');
  const songPippoActor = document.getElementById('songPippoActor');

  // Scrapbook Elements
  const scrapbookCards = document.querySelectorAll('.polaroid-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Envelope & Letter Elements
  const envelope = document.getElementById('envelope');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const unfoldedLetterWrapper = document.getElementById('unfoldedLetterWrapper');
  const btnOpenLetter = document.getElementById('btnOpenLetter');
  const btnLetterClose = document.getElementById('btnLetterClose');
  const btnLetterSkip = document.getElementById('btnLetterSkip');
  const btnLetterReplay = document.getElementById('btnLetterReplay');
  const letterParas = document.querySelectorAll('.letter-para, .letter-signoff');

  // Music Player Elements
  const bgAudio = document.getElementById('bgAudio');
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const playIcon = document.getElementById('playIcon');
  const playBtnText = document.getElementById('playBtnText');
  const btnRestartAudio = document.getElementById('btnRestartAudio');
  const btnMuteToggle = document.getElementById('btnMuteToggle');
  const volIcon = document.getElementById('volIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeLabel = document.getElementById('currentTimeLabel');
  const durationLabel = document.getElementById('durationLabel');
  const musicPlayerCard = document.querySelector('.music-player-card');
  const trackStatus = document.getElementById('trackStatus');

  // Final Screen Elements
  const btnConfettiBurst = document.getElementById('btnConfettiBurst');
  const btnRevisitLetter = document.getElementById('btnRevisitLetter');
  const particleCanvas = document.getElementById('particleCanvas');
  const pCtx = particleCanvas.getContext('2d');

  // =========================================================================
  // AUDIO SYNTHESIS & SOUND EFFECTS (WEB AUDIO API FALLBACK)
  // =========================================================================
  function getAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    return audioContext;
  }

  // Cute Pippo Chirp Sound Effect
  function playPippoChirp() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.16); // D6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  // Paper Unseal Sound Effect for Envelope
  function playPaperSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {}
  }

  // =========================================================================
  // HIGH-PERFORMANCE CANVAS PARTICLES & CONFETTI SYSTEM
  // =========================================================================
  let particles = [];
  let confettiActive = false;

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x;
      this.y = y;
      this.isBurst = isBurst;
      const angle = isBurst ? Math.random() * Math.PI * 2 : (Math.random() * 0.6 + 0.2) * Math.PI;
      const speed = isBurst ? Math.random() * 12 + 4 : Math.random() * 3 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = isBurst ? Math.sin(angle) * speed : Math.sin(angle) * speed;
      this.gravity = isBurst ? 0.25 : 0.08;
      this.drag = 0.96;
      this.size = Math.random() * 8 + 4;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.alpha = 1;
      this.decay = isBurst ? Math.random() * 0.015 + 0.01 : Math.random() * 0.005 + 0.002;
      
      const colors = ['#FF8C42', '#FFD84D', '#FF5E36', '#FFD4B8', '#FFFFFF', '#FF3B30'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.random() > 0.4 ? 'circle' : (Math.random() > 0.5 ? 'rect' : 'heart');
    }

    update() {
      this.vx *= this.drag;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;
      this.alpha -= this.decay;
      return this.alpha > 0 && this.y < particleCanvas.height + 20;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;

      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      } else if (this.shape === 'heart') {
        ctx.font = `${this.size * 1.4}px sans-serif`;
        ctx.fillText('🧡', -this.size / 2, this.size / 2);
      }
      ctx.restore();
    }
  }

  function spawnPokeballBurst(cx, cy) {
    for (let i = 0; i < 180; i++) {
      particles.push(new Particle(cx, cy, true));
    }
  }

  function spawnCelebrationConfetti() {
    for (let i = 0; i < 70; i++) {
      const x = Math.random() * particleCanvas.width;
      particles.push(new Particle(x, -20, false));
    }
  }

  function renderParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (!p.update()) {
        particles.splice(i, 1);
      } else {
        p.draw(pCtx);
      }
    }

    if (confettiActive && Math.random() < 0.35) {
      const x = Math.random() * particleCanvas.width;
      particles.push(new Particle(x, -20, false));
    }

    requestAnimationFrame(renderParticles);
  }
  requestAnimationFrame(renderParticles);

  // =========================================================================
  // COUNTDOWN LOGIC & MIDNIGHT UNLOCK
  // =========================================================================
  function updateCountdown() {
    if (isDevPreview) return;

    const now = Date.now();
    const diff = TARGET_MIDNIGHT_UTC - now;

    if (diff <= 0) {
      setCountdownValues(0, 0, 0, 0);
      if (!isUnlocked) {
        unlockPokeball();
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdownValues(days, hours, minutes, seconds);
  }

  function setCountdownValues(d, h, m, s) {
    timerDays.textContent = String(d).padStart(2, '0');
    timerHours.textContent = String(h).padStart(2, '0');
    timerMinutes.textContent = String(m).padStart(2, '0');
    timerSeconds.textContent = String(s).padStart(2, '0');
  }

  function unlockPokeball() {
    isUnlocked = true;
    pokeballWrapper.classList.add('unlocked');
    pokeballWrapper.setAttribute('aria-label', 'Poké Ball is unlocked! Click to begin Tiya\'s birthday adventure!');
    pokeballInstruction.textContent = 'Something special is waiting inside...';
    pokeballCallout.innerHTML = '<span class="sparkle-icon">✨</span> Tap the Poké Ball to begin!';
  }

  function lockPokeball() {
    isUnlocked = false;
    pokeballWrapper.classList.remove('unlocked');
    pokeballWrapper.setAttribute('aria-label', 'Interactive Poké Ball. Locked until midnight.');
    pokeballInstruction.textContent = 'Something special is waiting inside...';
    pokeballCallout.innerHTML = '<span class="lock-icon">🔒</span> Unlocks at midnight IST';
  }

  // Dev Preview Toggle Controller
  function initDevPreview() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('preview') === 'true' || urlParams.get('unlock') === 'true') {
      triggerDevUnlock();
    }

    devToggleBtn.addEventListener('click', () => {
      if (!isUnlocked) {
        triggerDevUnlock();
      } else {
        triggerDevLock();
      }
    });
  }

  function triggerDevUnlock() {
    isDevPreview = true;
    devToggleText.textContent = 'Reset to Countdown';
    devToggleBtn.style.background = 'var(--accent-orange)';
    devToggleBtn.style.color = '#000';
    setCountdownValues(0, 0, 0, 0);
    unlockPokeball();
  }

  function triggerDevLock() {
    isDevPreview = false;
    devToggleText.textContent = 'Unlock Now';
    devToggleBtn.style.background = 'rgba(255, 255, 255, 0.12)';
    devToggleBtn.style.color = '#FFFFFF';
    lockPokeball();
    updateCountdown();
  }

  // =========================================================================
  // POKÉ BALL INTERACTION & 3D TILT EFFECT
  // =========================================================================
  function initPokeball() {
    pokeballWrapper.addEventListener('mousemove', (e) => {
      if (hasOpenedPokeball) return;
      const rect = pokeballWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 30;
      const rotateY = (x / rect.width) * 30;
      pokeball.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    pokeballWrapper.addEventListener('mouseleave', () => {
      if (hasOpenedPokeball) return;
      pokeball.style.transform = '';
    });

    function handlePokeballClick() {
      if (!isUnlocked) {
        pokeball.animate([
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(0)' }
        ], { duration: 400 });
        return;
      }

      if (hasOpenedPokeball) return;
      hasOpenedPokeball = true;

      pokeball.classList.add('opening');
      
      const rect = pokeballWrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      spawnPokeballBurst(cx, cy);
      playPippoChirp();
      startBackgroundMusic();

      setTimeout(() => {
        openFlash.classList.add('active');
        
        setTimeout(() => {
          screenCountdown.classList.add('fade-out');
          birthdayWorld.classList.add('active');
          body.classList.remove('state-locked');
          body.classList.add('state-unlocked');
          
          // Show floating audio controller and side scroll logo
          floatingMuteBtn.style.display = 'flex';
          if (sideScrollIndicator) sideScrollIndicator.style.display = 'flex';

          updateHUD(2);
          openFlash.classList.remove('active');

          const meetSection = document.getElementById('sectionPippo');
          if (meetSection) {
            meetSection.scrollIntoView({ behavior: 'smooth' });
          }

          setTimeout(() => {
            triggerPippoBounce(pippoMainActor);
          }, 600);

        }, 400);

      }, 650);
    }

    pokeballWrapper.addEventListener('click', handlePokeballClick);
    pokeballWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePokeballClick();
      }
    });
  }

  // =========================================================================
  // BACKGROUND MUSIC & CONTROLLER (WITH REPEAT & OPTIONAL MUTE)
  // =========================================================================
  function startBackgroundMusic() {
    bgAudio.loop = true; // Auto-repeat background track
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setMusicPlayingState(true);
      }).catch(() => {
        setMusicPlayingState(false);
        trackStatus.textContent = 'Tap Play Happy Birthday 🎵';
      });
    }
  }

  function setMusicPlayingState(playing) {
    if (playing) {
      musicPlayerCard.classList.add('is-playing');
      playIcon.textContent = '⏸';
      playBtnText.textContent = 'Pause Music';
      trackStatus.textContent = 'Now Playing Tiya\'s Birthday Track 🎵';
      floatingMuteBtn.classList.remove('is-muted');
      floatingMuteIcon.textContent = '🔊';
      floatingMuteText.textContent = 'Music';
    } else {
      musicPlayerCard.classList.remove('is-playing');
      playIcon.textContent = '▶';
      playBtnText.textContent = 'Play Happy Birthday 🎵';
      trackStatus.textContent = 'Paused';
    }
  }

  function initAudioControls() {
    btnTogglePlay.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          setMusicPlayingState(true);
        }).catch(() => {
          playPippoChirp();
        });
      } else {
        bgAudio.pause();
        setMusicPlayingState(false);
      }
    });

    btnRestartAudio.addEventListener('click', () => {
      bgAudio.currentTime = 0;
      if (bgAudio.paused) {
        bgAudio.play();
        setMusicPlayingState(true);
      }
    });

    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      bgAudio.volume = val;
      if (val === 0) {
        bgAudio.muted = true;
        volIcon.textContent = '🔇';
      } else {
        bgAudio.muted = false;
        volIcon.textContent = val < 0.5 ? '🔉' : '🔊';
      }
    });

    btnMuteToggle.addEventListener('click', toggleMute);
    floatingMuteBtn.addEventListener('click', toggleMute);

    function toggleMute() {
      bgAudio.muted = !bgAudio.muted;
      if (bgAudio.muted) {
        volIcon.textContent = '🔇';
        floatingMuteIcon.textContent = '🔇';
        floatingMuteText.textContent = 'Muted';
        floatingMuteBtn.classList.add('is-muted');
      } else {
        volIcon.textContent = bgAudio.volume < 0.5 ? '🔉' : '🔊';
        floatingMuteIcon.textContent = '🔊';
        floatingMuteText.textContent = 'Music';
        floatingMuteBtn.classList.remove('is-muted');
        if (bgAudio.paused) {
          bgAudio.play();
          setMusicPlayingState(true);
        }
      }
    }

    bgAudio.addEventListener('timeupdate', () => {
      if (!isNaN(bgAudio.duration) && bgAudio.duration > 0) {
        const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
        progressFill.style.width = `${pct}%`;
        currentTimeLabel.textContent = formatTime(bgAudio.currentTime);
        durationLabel.textContent = formatTime(bgAudio.duration);
      }
    });

    bgAudio.addEventListener('loadedmetadata', () => {
      durationLabel.textContent = formatTime(bgAudio.duration);
    });

    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      if (!isNaN(bgAudio.duration) && bgAudio.duration > 0) {
        bgAudio.currentTime = pct * bgAudio.duration;
      }
    });

    bgAudio.addEventListener('play', () => setMusicPlayingState(true));
    bgAudio.addEventListener('pause', () => setMusicPlayingState(false));
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // =========================================================================
  // PIPPO CHARACTER INTERACTIONS
  // =========================================================================
  function initPippoActors() {
    [pippoMainActor, songPippoActor].forEach(actor => {
      if (!actor) return;
      actor.addEventListener('click', (e) => {
        triggerPippoBounce(actor);
        spawnFloatingHearts(e.clientX, e.clientY);
        playPippoChirp();
      });
      actor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerPippoBounce(actor);
          const rect = actor.getBoundingClientRect();
          spawnFloatingHearts(rect.left + rect.width / 2, rect.top);
          playPippoChirp();
        }
      });
    });
  }

  function triggerPippoBounce(actor) {
    if (!actor) return;
    actor.classList.remove('clicked');
    void actor.offsetWidth;
    actor.classList.add('clicked');
  }

  function spawnFloatingHearts(x, y) {
    const emojis = ['🧡', '✨', '💖', '🐧', '🎂'];
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('span');
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.position = 'fixed';
      heart.style.left = `${x + (Math.random() - 0.5) * 40}px`;
      heart.style.top = `${y + (Math.random() - 0.5) * 20}px`;
      heart.style.fontSize = `${Math.random() * 14 + 18}px`;
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.transition = 'all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -${Math.random() * 80 + 50}px) scale(1.3)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => heart.remove(), 1200);
    }
  }

  // =========================================================================
  // LIVING SCRAPBOOK & LIGHTBOX MODAL
  // =========================================================================
  function initScrapbook() {
    scrapbookCards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'), 10) - 1;
        openLightbox(idx);
        updateHUD(3);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-idx'), 10) - 1;
          openLightbox(idx);
          updateHUD(3);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });

    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    window.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(index) {
    if (index < 0 || index >= SCRAPBOOK_PHOTOS.length) return;
    currentPhotoIndex = index;
    const photo = SCRAPBOOK_PHOTOS[index];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    lightboxTag.textContent = `${photo.tag} • (${index + 1} of ${SCRAPBOOK_PHOTOS.length})`;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
  }

  function navigateLightbox(dir) {
    let next = currentPhotoIndex + dir;
    if (next < 0) next = SCRAPBOOK_PHOTOS.length - 1;
    if (next >= SCRAPBOOK_PHOTOS.length) next = 0;
    openLightbox(next);
  }

  // =========================================================================
  // INTERACTIVE ENVELOPE & ELONGATED READABLE LETTER
  // =========================================================================
  function initEnvelope() {
    function openEnvelope() {
      envelope.classList.add('opened');
      playPaperSound();
      updateHUD(4);

      // Smoothly transition into full unfolded letter view
      setTimeout(() => {
        if (envelopeWrapper) envelopeWrapper.style.display = 'none';
        if (unfoldedLetterWrapper) {
          unfoldedLetterWrapper.style.display = 'block';
          unfoldedLetterWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          const rect = unfoldedLetterWrapper.getBoundingClientRect();
          spawnFloatingHearts(rect.left + rect.width / 2, rect.top + 60);
        }
      }, 400);
    }

    function closeEnvelope() {
      if (unfoldedLetterWrapper) unfoldedLetterWrapper.style.display = 'none';
      if (envelopeWrapper) {
        envelopeWrapper.style.display = 'flex';
        envelope.classList.remove('opened');
        envelopeWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    envelope.addEventListener('click', openEnvelope);
    btnOpenLetter.addEventListener('click', openEnvelope);
    btnLetterClose.addEventListener('click', closeEnvelope);

    btnLetterSkip.addEventListener('click', () => {
      letterParas.forEach(p => {
        p.style.display = 'block';
        p.style.opacity = '1';
      });
    });

    btnLetterReplay.addEventListener('click', () => {
      // Re-trigger letter entry animation
      unfoldedLetterWrapper.classList.remove('unfolded-letter-wrapper');
      void unfoldedLetterWrapper.offsetWidth;
      unfoldedLetterWrapper.classList.add('unfolded-letter-wrapper');
      unfoldedLetterWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const rect = unfoldedLetterWrapper.getBoundingClientRect();
      spawnFloatingHearts(rect.left + rect.width / 2, rect.top + 60);
    });
  }

  // =========================================================================
  // FLOATING SIDE SCROLL DOWN LOGO CONTROLLER
  // =========================================================================
  function initSideScrollIndicator() {
    if (!sideScrollIndicator) return;

    sideScrollIndicator.addEventListener('click', () => {
      const sections = [
        document.getElementById('sectionPippo'),
        document.getElementById('sectionScrapbook'),
        document.getElementById('sectionLetter'),
        document.getElementById('sectionSong'),
        document.getElementById('sectionFinal')
      ].filter(Boolean);

      const currentScroll = window.scrollY + 120;
      let targetSection = null;

      for (let sec of sections) {
        if (sec.offsetTop > currentScroll) {
          targetSection = sec;
          break;
        }
      }

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // At end, cycle back up to memories
        const scrap = document.getElementById('sectionScrapbook');
        if (scrap) scrap.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Dim side scroll when near bottom of page
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 120) {
        sideScrollIndicator.style.opacity = '0.35';
      } else {
        sideScrollIndicator.style.opacity = '1';
      }
    }, { passive: true });
  }

  // =========================================================================
  // HUD NAVIGATION & SECTION PROGRESSION
  // =========================================================================
  function updateHUD(stepNumber) {
    const total = 5;
    const pct = Math.min(100, (stepNumber / total) * 100);
    hudProgressFill.style.width = `${pct}%`;

    navChips.forEach((chip, i) => {
      if (i + 1 <= stepNumber) {
        chip.style.opacity = '1';
      }
    });
  }

  function initHUDNav() {
    navChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const targetId = chip.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          navChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });

    const sections = document.querySelectorAll('.game-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navChips.forEach(chip => {
            if (chip.getAttribute('data-target') === id) {
              chip.classList.add('active');
            } else {
              chip.classList.remove('active');
            }
          });

          if (id === 'sectionPippo') updateHUD(1);
          if (id === 'sectionScrapbook') updateHUD(2);
          if (id === 'sectionLetter') updateHUD(3);
          if (id === 'sectionSong') updateHUD(4);
          if (id === 'sectionFinal') {
            updateHUD(5);
            confettiActive = true;
          }
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
  }

  // =========================================================================
  // FINAL CELEBRATION ACTIONS
  // =========================================================================
  function initFinalCelebration() {
    btnConfettiBurst.addEventListener('click', () => {
      spawnCelebrationConfetti();
      spawnCelebrationConfetti();
      playPippoChirp();
    });

    btnRevisitLetter.addEventListener('click', (e) => {
      e.preventDefault();
      const letterSec = document.getElementById('sectionLetter');
      if (letterSec) {
        letterSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (envelopeWrapper && envelopeWrapper.style.display !== 'none') {
            envelope.click();
          }
        }, 400);
      }
    });
  }

  // =========================================================================
  // INITIALIZATION ON DOM READY
  // =========================================================================
  function init() {
    updateCountdown();
    setInterval(updateCountdown, 1000);

    initDevPreview();
    initPokeball();
    initAudioControls();
    initPippoActors();
    initScrapbook();
    initEnvelope();
    initSideScrollIndicator();
    initHUDNav();
    initFinalCelebration();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
