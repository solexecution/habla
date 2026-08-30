# Hablá — Spanish Conversation Starters (offline PWA)

A phone-first Progressive Web App for learning **187 high-frequency Spanish
words and phrases** — the ones that actually get a conversation going. It works
fully offline once loaded and remembers your progress on your device.

## Why these 187 words

The set is weighted toward what you reach for in the first minutes of talking to
someone, then rounded out with the glue that holds any sentence together:

| Theme | Count | Theme | Count |
|---|---|---|---|
| Greetings & goodbyes | 15 | Essential verbs | 20 |
| Politeness | 12 | Connectors & fillers | 12 |
| Introducing yourself | 15 | Numbers | 16 |
| Icebreaker questions | 15 | Time & days | 15 |
| Common responses | 12 | People & family | 12 |
| Question words | 10 | Common places | 10 |
| Feelings & states | 12 | Useful nouns | 11 |

**Total: 187.** Every entry has the Spanish, the English meaning, and a light
phonetic hint (stress in CAPS), e.g. `gracias → GRAH-syahs`.

## The learning method

The best-proven way to move vocabulary into long-term memory is **spaced
repetition** — reviewing each word just before you'd forget it. Hablá uses a
lightweight SM-2-style scheduler:

1. **Flip & rate.** See the Spanish, guess, flip the card, then rate yourself
   *Again / Hard / Good*. The back shows the meaning **and a short example
   sentence** — words learned in context stick far better than words in isolation.
2. **Words come back on a schedule.** *Good* pushes a word further out; *Hard*
   keeps it close; *Again* resurfaces it in the same session.
3. **Sessions mix due reviews with new words**, capped at 12 cards so a round
   stays short enough to actually do daily. New words are introduced
   **highest-frequency first** (each entry carries a `pri` tier) so the
   highest-payoff vocabulary lands before the long tail. A day streak keeps you
   honest.

Every entry has `{ id, es, en, pron, cat, ex, exEn, pri, hook }` — Spanish,
English, pronunciation, theme, an example sentence with its translation, a
frequency tier, and a **memory hook**: a mnemonic linking the Spanish to an
English cognate and/or a genuine Slovak look-alike (e.g. *escuela* ≈ SK *škola*,
*madre* ≈ SK *matka*, *teléfono* ≈ SK *telefón*, *poder* ≈ "potent/power").
Hooks show on the flashcard back, in Recall feedback, and in the word browser.

**Recall** is the productive-practice mode — the highest-leverage step, since
*generating* an answer builds far stronger memory than recognising one:
- **Type mode:** you type the Spanish from memory. Matching is forgiving (accents
  and punctuation optional, one-character typos accepted with a nudge), with
  on-screen accent buttons (á é í ó ú ñ ¿ ¡), a progressive hint, and native audio
  on every answer. Results feed the same spaced-repetition scheduler.
- **Hands-free mode:** a glanceable, audio-first, big-button flow for the car —
  reveal-and-hear then a two-button self-rating, plus an optional **Auto** passive
  listen-and-repeat loop that needs no tapping at all.

There's also a **Quiz** mode (multiple choice, both directions) for a quick check,
a **Words** browser to read any theme, and tap-to-hear pronunciation on every word.

## Interface

- **Light & dark theme** — follows your system by default, with a header toggle to
  pin either one (remembered across visits, applied before first paint so there's
  no flash).
- **Keyboard shortcuts** — in Learn: <kbd>Space</kbd>/<kbd>Enter</kbd> flips a card,
  <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd> rate *Again / Hard / Good*. In Quiz:
  <kbd>1</kbd>–<kbd>4</kbd> pick an answer.
- **No native dialogs** — confirmations use an in-page modal (Esc to dismiss,
  Enter to confirm); notices use a toast.
- Reduced-motion aware, safe-area aware, and fully keyboard-navigable.

## Audio

Pronunciation uses **pre-recorded human-quality neural audio** — one clip per
word in `audio/<id>.mp3` (~1.3 MB for all 187, cached for offline). If a clip is
ever missing or blocked, playback falls back to the device's Spanish
text-to-speech voice (the app picks the most natural voice installed).

Regenerate the clips with the free Microsoft `edge-tts` neural voices:

```bash
pip install edge-tts            # ffmpeg optional, used to trim/normalise
node -e "const{WORDS}=require('./words.js');require('fs').writeFileSync('tools/_words.json',JSON.stringify(WORDS.map(w=>({id:w.id,es:w.es}))))"
python tools/gen_audio.py        # writes audio/<id>.mp3, idempotent
```

## Offline & install

- A **service worker** (`sw.js`) precaches the app shell on install and serves it
  cache-first, so the app runs with no signal after the first load.
- **All 187 audio clips are downloaded on first load** by the page itself (see
  `prefetchAudio` in `app.js`) into a dedicated `habla-audio-v1` cache, with a
  progress bar and retries under More → Offline (“✓ Ready” when complete). Doing
  it from the page (Cache API) rather than the service-worker install makes the
  download complete and visible instead of best-effort. The audio cache is
  preserved across shell updates so clips aren't re-downloaded.
- Progress is stored in `localStorage` on the device — nothing is uploaded.
- **Install to your home screen:** on Android use the browser menu → *Install
  app*; on iPhone/iPad use Share → *Add to Home Screen*. It then launches
  full-screen like a native app.

## Running it

It's plain static files — serve the `spanish-pwa/` folder over HTTP(S) (a service
worker needs a real origin, not `file://`):

```bash
cd spanish-pwa
python3 -m http.server 8000
# open http://localhost:8000 on your phone (same network) or desktop
```

For real phone use, host the folder on any static host (GitHub Pages, Netlify,
etc.) over HTTPS.

## Files

```
spanish-pwa/
├── index.html            app shell + tab views
├── styles.css            styling (dark & light, safe-area aware)
├── app.js                spaced-repetition, quiz, browse, install, offline logic
├── words.js              the 187-word dataset (id / es / en / pron / theme / example / freq)
├── sw.js                 service worker (offline caching of shell + audio)
├── manifest.webmanifest  PWA manifest
├── audio/                187 pre-recorded neural pronunciation clips (<id>.mp3)
├── icons/                app icons (192/512 maskable + Apple touch)
├── tools/gen_icons.py    regenerates the icons (pure stdlib, no Pillow)
└── tools/gen_audio.py    regenerates the audio via edge-tts neural voices
```

## Editing the word list

Edit `words.js`. Each entry is `{ es, en, pron, cat }` and `cat` must be one of
the keys in `CATEGORIES`. A console warning fires if the total drifts from 187.
Bump `CACHE` in `sw.js` (e.g. `habla-v2`) whenever you change any asset so
installed clients pick up the new version.
