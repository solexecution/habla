#!/usr/bin/env python3
"""Generate PWA icons (pure stdlib PNG encoder — no Pillow needed).

Draws a maskable speech-bubble mark on an indigo background, which reads as
"conversation" for the Hablá Spanish learning app. Produces 192 and 512 px
square PNGs plus a 180 px Apple touch icon.
"""
import struct
import zlib
import math
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "icons")

BG = (79, 70, 229)        # indigo-600
BG2 = (109, 40, 217)      # violet-700 (for a subtle diagonal)
BUBBLE = (255, 255, 255)
DOT = (79, 70, 229)


def lerp(a, b, t):
    return int(round(a + (b - a) * t))


def make_png(size, maskable=True):
    # Safe zone: keep the mark within the inner ~80% for maskable icons.
    cx = cy = size / 2
    # Speech bubble body: rounded rectangle
    bw = size * 0.56
    bh = size * 0.44
    bx0, by0 = cx - bw / 2, cy - bh / 2 - size * 0.03
    bx1, by1 = cx + bw / 2, cy + bh / 2 - size * 0.03
    radius = size * 0.11
    # tail
    tail_x = cx - bw * 0.12
    tail_top = by1 - size * 0.01
    tail_h = size * 0.14
    tail_w = size * 0.14

    dot_r = size * 0.035
    dot_y = (by0 + by1) / 2
    dot_dx = bw * 0.24

    raw = bytearray()
    for y in range(size):
        raw.append(0)  # filter type 0
        for x in range(size):
            # background diagonal gradient
            t = (x + y) / (2 * size)
            r, g, b = lerp(BG[0], BG2[0], t), lerp(BG[1], BG2[1], t), lerp(BG[2], BG2[2], t)

            px, py = x + 0.5, y + 0.5
            inside = False
            # rounded-rect body
            if bx0 <= px <= bx1 and by0 <= py <= by1:
                # corner rounding
                inside = True
                for (ccx, ccy) in ((bx0 + radius, by0 + radius), (bx1 - radius, by0 + radius),
                                   (bx0 + radius, by1 - radius), (bx1 - radius, by1 - radius)):
                    if ((px < bx0 + radius and py < by0 + radius) or
                        (px > bx1 - radius and py < by0 + radius) or
                        (px < bx0 + radius and py > by1 - radius) or
                        (px > bx1 - radius and py > by1 - radius)):
                        # find nearest corner center
                        pass
                # explicit corner test
                def corner_ok(cxx, cyy):
                    return (px - cxx) ** 2 + (py - cyy) ** 2 <= radius ** 2
                if px < bx0 + radius and py < by0 + radius:
                    inside = corner_ok(bx0 + radius, by0 + radius)
                elif px > bx1 - radius and py < by0 + radius:
                    inside = corner_ok(bx1 - radius, by0 + radius)
                elif px < bx0 + radius and py > by1 - radius:
                    inside = corner_ok(bx0 + radius, by1 - radius)
                elif px > bx1 - radius and py > by1 - radius:
                    inside = corner_ok(bx1 - radius, by1 - radius)
            # tail triangle
            if not inside and tail_top <= py <= tail_top + tail_h:
                prog = (py - tail_top) / tail_h
                half = (tail_w / 2) * (1 - prog)
                if abs(px - tail_x) <= half:
                    inside = True

            if inside:
                r, g, b = BUBBLE
                # three conversation dots
                for k in (-1, 0, 1):
                    if (px - (cx + k * dot_dx)) ** 2 + (py - dot_y) ** 2 <= dot_r ** 2:
                        r, g, b = DOT
                        break
            raw.extend((r, g, b))

    compressed = zlib.compress(bytes(raw), 9)

    def chunk(typ, data):
        c = struct.pack(">I", len(data)) + typ + data
        c += struct.pack(">I", zlib.crc32(typ + data) & 0xFFFFFFFF)
        return c

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")
    return png


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for size, name in ((192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")):
        data = make_png(size)
        with open(os.path.join(OUT_DIR, name), "wb") as f:
            f.write(data)
        print("wrote", name, len(data), "bytes")


if __name__ == "__main__":
    main()
