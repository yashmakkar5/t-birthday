# PIPPO: An Interactive Midnight Birthday Adventure for Tiya 🖤🔴🐧

A handcrafted, game-like interactive birthday surprise website made with HTML5, CSS3, and Vanilla JavaScript.

---

## ✨ Features

1. **Mysterious Midnight Countdown Screen (`#050505`)**:
   - Real-time countdown clock targeted to **28 October 2026, 12:00 AM IST** (`2026-10-27T18:30:00Z`).
   - Interactive Poké Ball that vibrates, glows with a pulsing red aura, and tilts dynamically tracking cursor movements.
   - Automatically unlocks without refreshing the moment midnight arrives (or if visited after midnight).
   - **Dev Preview Mode**: Top banner toggle (or `?preview=true` query parameter) allowing instant unlock for testing ahead of time.

2. **Poké Ball Opening Animation**:
   - Shakes energetically, flashes its center button, splits into two halves, and bursts into 180+ glowing particles.
   - Smooth warm light transition into the birthday game world.
   - Automatically starts the uploaded background music on loop!

3. **Background Music with Loop & Optional Mute Button**:
   - Uses the uploaded audio track (`birthday-song.mp3`).
   - Automatically loops repeatedly after she clicks the Poké Ball.
   - **Floating Mute Button**: Discreet, floating audio toggle in the bottom corner with animated soundwave indicators so Tiya can mute/unmute anytime.
   - Full music player card in Section 5 with play/pause, restart, volume slider, interactive scrubber, and dancing audio visualizer.

4. **Pippo the Orange Penguin Mascot**:
   - Lovable orange body (`#FF8C42`), yellow beak (`#FFD84D`), yellow feet, and expressive blinking eyes.
   - Tap/click Pippo anytime for a joyful bounce, cute chirp, and floating heart particles.
   - Different avatars: guide Pippo, singer Pippo with party hat, peeking letter Pippo, and finale Pippo holding a glowing orange heart.

5. **Living Animated Scrapbook ("Little Moments, Little Memories 📸")**:
   - Uses all **11 authentic uploaded photographs of Tiya** from babyhood to today.
   - Polaroid-style frames with washi tape, photo corner mounts, organic tilts, and handwritten captions.
   - Hover straightens the photo; clicking opens the responsive Lightbox modal with keyboard navigation (← / → / Esc).

6. **Interactive 3D Envelope & Birthday Letter 💌**:
   - 3D wax seal and folding flap that unseals realistically.
   - Parchment card slides out with a gentle paragraph-by-paragraph reveal animation.
   - Full heartfelt message celebrating Tiya's friendship, listening to rants and overthinking sessions, and ending with a giant penguin hug!
   - Controls to "Show All Text", "Read Again", or "Close Envelope".

7. **Final Celebration Screen & Confetti 🎉**:
   - Warm peach finale card with Pippo waving goodbye.
   - Interactive canvas confetti shower with a "More Confetti! 🎊" button.
   - Quick navigation links to jump back to Memories, Letter, or Song.

---

## 🚀 How to Run Locally

Because the project is built with standard **HTML, CSS, and JavaScript**, no build step or package installations are required!

### Option 1: Python HTTP Server (Recommended)
Open your terminal in this directory and run:
```bash
python -m http.server 8000
```
Then open your browser to [http://localhost:8000](http://localhost:8000).

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` in Windows Explorer to open it in Chrome, Edge, Safari, or Firefox.

---

## 🌐 Deploying to the Web

You can deploy this site in under 60 seconds with 100% free hosting:
- **GitHub Pages**: Push this directory to a GitHub repository, go to `Settings > Pages`, and select `main` branch.
- **Netlify**: Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` or import the GitHub repo on Vercel.

---

## 📁 Project Structure

```
d:/AI/web dev using python/
├── index.html                   # Semantic HTML5 markup with embedded SVG Pippo
├── styles.css                   # Custom CSS styling, animations, 3D envelope, and responsive layout
├── script.js                    # Countdown clock, particle canvas, audio engine, lightbox, envelope
├── birthday-song.mp3            # User's uploaded background music track (loops on Poké Ball open)
├── README.md                    # Documentation & deployment guide
└── assets/
    ├── audio/
    │   ├── birthday-song.mp3    # Loopable birthday soundtrack
    │   └── birthday-song.wav    # Fallback chime audio
    └── images/
        ├── tiya_01.jpg          # Funny pout photo
        ├── tiya_02.jpg          # Tiya with Pikachu
        ├── tiya_03.jpg          # Baby Tiya smiling
        ├── tiya_04.jpg          # Cat-eye glasses aesthetic
        ├── tiya_05.jpg          # Baby Tiya with big eyes
        ├── tiya_06.jpg          # Baby Tiya with plush puppy
        ├── tiya_07.jpg          # Baby Tiya under Mickey quilt
        ├── tiya_08.jpg          # Toddler Tiya in cap
        ├── tiya_09.jpg          # Mirror selfie in jacket
        ├── tiya_10.jpg          # Balcony forest view
        └── tiya_11.jpg          # Peace sign mirror selfie
```
