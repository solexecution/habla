#!/usr/bin/env python3
"""
Generate human-quality Spanish pronunciation clips for every word in words.js.

Uses Microsoft edge-tts neural voices (free, no API key) and, when available,
ffmpeg to trim silence and normalise loudness so every clip sounds consistent.
Output: audio/<id>.mp3, one per word. Idempotent — existing clips are skipped
unless --force is passed.

Prereqs:  pip install edge-tts   (ffmpeg optional but recommended)
Usage:    python tools/gen_audio.py           # from the project root
          python tools/gen_audio.py --force    # regenerate everything
"""
import asyncio, json, os, subprocess, sys, shutil, tempfile

VOICE = "es-ES-ElviraNeural"   # natural peninsular Spanish female voice
RATE = "-6%"                    # a touch slower for learners
CONCURRENCY = 8

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT, "audio")
WORDS_JSON = os.path.join(ROOT, "tools", "_words.json")

HAS_FFMPEG = shutil.which("ffmpeg") is not None


def clean_text(es: str) -> str:
    return es.replace("…", " ").replace("  ", " ").strip()


async def synth(sem, edge_tts, w, force):
    out = os.path.join(AUDIO_DIR, w["id"] + ".mp3")
    if os.path.exists(out) and not force:
        return ("skip", w["id"])
    async with sem:
        try:
            tmp = out + ".tmp.mp3"
            comm = edge_tts.Communicate(clean_text(w["es"]), VOICE, rate=RATE)
            await comm.save(tmp)
            if HAS_FFMPEG:
                normed = out + ".norm.mp3"
                cmd = [
                    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                    "-i", tmp,
                    "-af", "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-45dB:"
                           "stop_periods=1:stop_silence=0.15:stop_threshold=-45dB,"
                           "loudnorm=I=-16:TP=-1.5:LRA=11",
                    "-ar", "24000", "-b:a", "48k", normed,
                ]
                r = subprocess.run(cmd)
                if r.returncode == 0 and os.path.exists(normed):
                    os.replace(normed, out)
                    os.remove(tmp)
                else:
                    os.replace(tmp, out)
            else:
                os.replace(tmp, out)
            return ("ok", w["id"])
        except Exception as e:
            return ("err", w["id"] + ": " + str(e))


async def main():
    force = "--force" in sys.argv
    try:
        import edge_tts
    except ImportError:
        print("edge-tts not installed. Run: pip install edge-tts", file=sys.stderr)
        sys.exit(1)

    with open(WORDS_JSON, encoding="utf-8") as f:
        words = json.load(f)

    os.makedirs(AUDIO_DIR, exist_ok=True)
    sem = asyncio.Semaphore(CONCURRENCY)
    results = await asyncio.gather(*(synth(sem, edge_tts, w, force) for w in words))

    ok = sum(1 for s, _ in results if s == "ok")
    skip = sum(1 for s, _ in results if s == "skip")
    errs = [m for s, m in results if s == "err"]
    print(f"generated {ok}, skipped {skip}, errors {len(errs)} "
          f"(ffmpeg: {'yes' if HAS_FFMPEG else 'no'})")
    for m in errs:
        print("  ERR", m)
    if errs:
        sys.exit(2)


if __name__ == "__main__":
    asyncio.run(main())
