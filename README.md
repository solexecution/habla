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
   *Again / Hard / Good*.
2. **Words come back on a schedule.** *Good* pushes a word further out; *Hard*
   keeps it close; *Again* resurfaces it in the same session.
3. **Sessions mix due reviews with new words**, capped at 12 cards so a round
   stays short enough to actually do daily. A day streak keeps you honest.

There's also a **Quiz** mode (multiple choice, both directions) for a quick check,
a **Words** browser to read any theme, and tap-to-hear pronunciation via the
device's Spanish text-to-speech voice.

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

## Offline & install

- A **service worker** (`sw.js`) caches the whole app shell on first load, so it
  runs with no signal afterward.
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
├── words.js              the 187-word dataset (es / en / pronunciation / theme)
├── sw.js                 service worker (offline caching)
├── manifest.webmanifest  PWA manifest
├── icons/                app icons (192/512 maskable + Apple touch)
└── tools/gen_icons.py    regenerates the icons (pure stdlib, no Pillow)
```

## Editing the word list

Edit `words.js`. Each entry is `{ es, en, pron, cat }` and `cat` must be one of
the keys in `CATEGORIES`. A console warning fires if the total drifts from 187.
Bump `CACHE` in `sw.js` (e.g. `habla-v2`) whenever you change any asset so
installed clients pick up the new version.
