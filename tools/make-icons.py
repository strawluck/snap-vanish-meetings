"""Draws the Snap Vanish icon (a gold circle dissolving into dust) as PNGs.
Pure standard library, so it runs anywhere: python3 tools/make-icons.py"""
import math, random, struct, zlib, pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / "extension" / "icons"

def png(path, size, px):
    raw = b"".join(b"\x00" + bytes(px[y * size * 4:(y + 1) * size * 4]) for y in range(size))
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
                     + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))

def draw(size):
    S = 4  # supersample
    big = size * S
    acc = [0.0] * (size * size * 4)
    rnd = random.Random(7)
    grains = [(0.62 + rnd.random() * 0.36, 0.12 + rnd.random() * 0.5, 0.025 + rnd.random() * 0.035) for _ in range(26)]
    for y in range(big):
        for x in range(big):
            u, v = (x + 0.5) / big, (y + 0.5) / big
            r = g = b = a = 0.0
            # rounded dark tile
            d = max(abs(u - 0.5), abs(v - 0.5))
            if d < 0.48:
                r, g, b, a = 0.08, 0.07, 0.09, 1.0
            # gold disc, eaten away on the right by a noisy edge
            dx, dy = u - 0.42, v - 0.55
            dist = math.hypot(dx, dy)
            edge = 0.58 + 0.06 * math.sin(v * 31) + 0.04 * math.sin(v * 71 + 1)
            if dist < 0.27 and u < edge:
                t = (v - 0.28) / 0.54
                r, g, b, a = 0.91 - 0.12 * t, 0.69 - 0.3 * t, 0.29 - 0.06 * t, 1.0
            for gx, gy, gr in grains:
                if math.hypot(u - gx, v - gy) < gr:
                    r, g, b, a = 0.85, 0.55, 0.28, 1.0
            i = ((y // S) * size + (x // S)) * 4
            acc[i] += r * a; acc[i + 1] += g * a; acc[i + 2] += b * a; acc[i + 3] += a
    px = []
    n = S * S
    for i in range(0, len(acc), 4):
        a = acc[i + 3] / n
        if a > 0:
            px += [round(acc[i] / n / a * 255), round(acc[i + 1] / n / a * 255), round(acc[i + 2] / n / a * 255), round(a * 255)]
        else:
            px += [0, 0, 0, 0]
    return px

OUT.mkdir(parents=True, exist_ok=True)
for s in (16, 32, 48, 128):
    png(OUT / f"icon-{s}.png", s, draw(s))
print("icons written to", OUT)
