#!/usr/bin/env python3
"""Deterministic pixel-art sprite generator for the compiler-board portfolio.

Every asset is generated from this script (no external art), palette-locked
to the site's CSS tokens. Output: 1x-scale PNGs meant to be upscaled with
image-rendering: pixelated / canvas imageSmoothingEnabled = false.
"""

from PIL import Image, ImageDraw
import os

OUT = "public/assets"  # run from repo root: python3 scripts/gen_sprites.py
os.makedirs(OUT, exist_ok=True)

# ---- palette (matches src/index.css @theme) -------------------------------
T = (0, 0, 0, 0)  # transparent

OUTLINE = (12, 11, 15, 255)
INK0 = (17, 16, 20, 255)      # ink-950
INK1 = (26, 23, 29, 255)      # ink-900
INK2 = (36, 30, 36, 255)      # ink-850
INK3 = (46, 39, 47, 255)
BOARD0 = (22, 19, 26, 255)
BOARD1 = (27, 23, 31, 255)
BOARD2 = (35, 30, 40, 255)

BONE = (238, 231, 219, 255)   # fg
BONE_MID = (201, 187, 171, 255)
BONE_DIM = (120, 110, 100, 255)

AMBER = (240, 168, 90, 255)
AMBER_MID = (181, 126, 66, 255)
AMBER_DARK = (111, 78, 44, 255)

TEAL = (120, 214, 198, 255)
TEAL_MID = (74, 154, 141, 255)
TEAL_DARK = (44, 95, 87, 255)

VIOLET = (183, 164, 255, 255)
VIOLET_MID = (127, 111, 201, 255)
VIOLET_DARK = (74, 65, 120, 255)

LIME = (213, 239, 115, 255)
LIME_MID = (154, 184, 78, 255)
LIME_DARK = (92, 110, 46, 255)


def canvas(w, h):
    img = Image.new("RGBA", (w, h), T)
    return img, ImageDraw.Draw(img)


def rect(d, x0, y0, x1, y1, fill):
    d.rectangle([x0, y0, x1, y1], fill=fill)


def frame(d, x0, y0, x1, y1, color):
    d.rectangle([x0, y0, x1, y1], outline=color)


def save(img, name):
    img.save(f"{OUT}/{name}", optimize=True)
    print(name, img.size)


# ---- tile-memory.png (16x16, seamless) ------------------------------------
def tile_memory():
    img, d = canvas(16, 16)
    rect(d, 0, 0, 15, 15, BOARD0)
    # cell seams every 8px
    for i in (0, 8):
        d.line([(i, 0), (i, 15)], fill=BOARD1)
        d.line([(0, i), (15, i)], fill=BOARD1)
    # solder via
    rect(d, 4, 4, 5, 5, BOARD2)
    rect(d, 12, 12, 12, 12, BOARD2)
    save(img, "tile-memory.png")


# ---- module-cpu.png (56x52) — the compiler core ---------------------------
def module_cpu():
    w, h = 56, 52
    img, d = canvas(w, h)
    # pins
    for x in range(8, w - 8, 6):
        rect(d, x, 2, x + 2, 5, BONE_DIM)
        rect(d, x, h - 6, x + 2, h - 3, BONE_DIM)
    for y in range(10, h - 10, 6):
        rect(d, 2, y, 5, y + 2, BONE_DIM)
        rect(d, w - 6, y, w - 3, y + 2, BONE_DIM)
    # package
    rect(d, 6, 6, w - 7, h - 7, INK2)
    frame(d, 6, 6, w - 7, h - 7, OUTLINE)
    frame(d, 8, 8, w - 9, h - 9, AMBER_DARK)
    # substrate dots
    for x in range(11, w - 11, 4):
        rect(d, x, 11, x, 11, AMBER_DARK)
        rect(d, x, h - 12, x, h - 12, AMBER_DARK)
    # die
    dx0, dy0, dx1, dy1 = 18, 16, w - 19, h - 17
    rect(d, dx0, dy0, dx1, dy1, INK0)
    frame(d, dx0, dy0, dx1, dy1, TEAL_MID)
    # die core grid
    for x in range(dx0 + 3, dx1 - 1, 4):
        for y in range(dy0 + 3, dy1 - 1, 4):
            rect(d, x, y, x + 1, y + 1, TEAL_DARK)
    # hot core center (canvas pulses over this)
    cx, cy = (dx0 + dx1) // 2, (dy0 + dy1) // 2
    rect(d, cx - 1, cy - 1, cx + 1, cy + 1, TEAL)
    # pin-1 notch
    rect(d, 9, 9, 10, 10, BONE_MID)
    save(img, "module-cpu.png")


# ---- module-pay.png (44x34) — payment router ------------------------------
def module_pay():
    w, h = 44, 34
    img, d = canvas(w, h)
    # feet
    rect(d, 4, h - 3, 8, h - 1, OUTLINE)
    rect(d, w - 9, h - 3, w - 5, h - 1, OUTLINE)
    # chassis
    rect(d, 2, 6, w - 3, h - 4, INK2)
    frame(d, 2, 6, w - 3, h - 4, OUTLINE)
    # top accent
    rect(d, 4, 8, w - 5, 9, AMBER_MID)
    # antenna
    rect(d, w - 8, 1, w - 8, 5, BONE_DIM)
    rect(d, w - 9, 0, w - 7, 1, AMBER)
    # ports (4)
    for i in range(4):
        x = 6 + i * 9
        rect(d, x, 14, x + 6, 20, INK0)
        frame(d, x, 14, x + 6, 20, BOARD2)
        rect(d, x + 2, 16, x + 4, 18, AMBER_DARK)
    # LED row (canvas blinks over these)
    for i in range(5):
        rect(d, 6 + i * 5, 24, 7 + i * 5, 25, AMBER_DARK)
    rect(d, w - 10, 24, w - 7, 25, TEAL_DARK)
    save(img, "module-pay.png")


# ---- module-ml.png (50x34) — accelerator card -----------------------------
def module_ml():
    w, h = 50, 34
    img, d = canvas(w, h)
    # connector fingers
    for x in range(8, 40, 3):
        rect(d, x, h - 4, x + 1, h - 1, AMBER_MID)
    # card body
    rect(d, 2, 6, w - 3, h - 5, INK2)
    frame(d, 2, 6, w - 3, h - 5, OUTLINE)
    rect(d, 4, 8, w - 5, 9, VIOLET_MID)
    # bracket
    rect(d, 2, 2, 4, h - 5, BONE_DIM)
    rect(d, 2, 2, 4, 4, BONE_MID)
    # two fans
    for cx in (17, 35):
        cy = 20
        frame(d, cx - 7, cy - 7, cx + 7, cy + 7, VIOLET_DARK)
        d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], outline=VIOLET_MID)
        # blades (canvas alternates a + overlay for spin)
        d.line([(cx - 4, cy), (cx + 4, cy)], fill=BONE_DIM)
        d.line([(cx, cy - 4), (cx, cy + 4)], fill=BONE_DIM)
        rect(d, cx - 1, cy - 1, cx + 1, cy + 1, VIOLET)
    save(img, "module-ml.png")


# ---- module-qnt.png (38x48) — ticker tower --------------------------------
def module_qnt():
    w, h = 38, 48
    img, d = canvas(w, h)
    # base
    rect(d, 4, h - 4, w - 5, h - 1, OUTLINE)
    # tower
    rect(d, 2, 4, w - 3, h - 4, INK2)
    frame(d, 2, 4, w - 3, h - 4, OUTLINE)
    rect(d, 4, 6, w - 5, 7, LIME_MID)
    # screen (canvas draws the live sparkline inside)
    rect(d, 5, 10, w - 6, 26, INK0)
    frame(d, 5, 10, w - 6, 26, LIME_DARK)
    # static baseline hint
    for x in range(7, w - 8, 2):
        rect(d, x, 22, x, 22, LIME_DARK)
    # button row
    for i in range(3):
        rect(d, 6 + i * 6, 31, 9 + i * 6, 33, BOARD2)
    # LED
    rect(d, w - 9, 31, w - 8, 32, LIME_MID)
    # vents
    for y in range(37, 42, 2):
        d.line([(6, y), (w - 7, y)], fill=INK0)
    save(img, "module-qnt.png")


# ---- module-sys.png (40x54) — server rack ---------------------------------
def module_sys():
    w, h = 40, 54
    img, d = canvas(w, h)
    rect(d, 2, 2, w - 3, h - 3, INK2)
    frame(d, 2, 2, w - 3, h - 3, OUTLINE)
    rect(d, 4, 4, w - 5, 5, TEAL_MID)
    # 5 sleds
    for i in range(5):
        y = 8 + i * 9
        rect(d, 5, y, w - 6, y + 6, INK0)
        frame(d, 5, y, w - 6, y + 6, BOARD2)
        # handle
        rect(d, 7, y + 2, 12, y + 3, BONE_DIM)
        # drive lights (canvas blinks over)
        rect(d, w - 10, y + 2, w - 9, y + 3, TEAL_DARK)
        rect(d, w - 13, y + 2, w - 12, y + 3, AMBER_DARK)
    save(img, "module-sys.png")


# ---- sprite-packet.png (4 frames, 12x9 each) ------------------------------
def sprite_packet():
    colors = [
        (AMBER, AMBER_MID),   # pay
        (VIOLET, VIOLET_MID), # ml
        (LIME, LIME_MID),     # qnt
        (TEAL, TEAL_MID)      # sys
    ]
    fw, fh = 12, 9
    img, d = canvas(fw * 4, fh)
    for i, (main, mid) in enumerate(colors):
        x = i * fw
        # tail
        rect(d, x + 0, 4, x + 1, 5, mid)
        # body
        rect(d, x + 3, 1, x + 10, 7, mid)
        rect(d, x + 4, 2, x + 9, 6, main)
        # glint
        rect(d, x + 5, 3, x + 6, 3, BONE)
        # bit
        rect(d, x + 8, 5, x + 8, 5, OUTLINE)
    save(img, "sprite-packet.png")


# ---- sprite-avatar.png (2 frames, 14x18 each) -----------------------------
def sprite_avatar():
    fw, fh = 14, 18
    HAIR = (74, 56, 44, 255)
    JACKET = (62, 118, 108, 255)   # readable teal jacket
    JACKET_HI = (86, 156, 143, 255)
    PANTS = (40, 36, 46, 255)
    img, d = canvas(fw * 2, fh)
    for f in range(2):
        x = f * fw
        # hair
        rect(d, x + 3, 0, x + 10, 1, HAIR)
        rect(d, x + 3, 1, x + 4, 3, HAIR)
        rect(d, x + 9, 1, x + 10, 2, HAIR)
        # face
        rect(d, x + 4, 2, x + 9, 5, BONE_MID)
        rect(d, x + 5, 3, x + 5, 4, OUTLINE)  # eye
        rect(d, x + 8, 3, x + 8, 4, OUTLINE)  # eye
        # jacket body
        rect(d, x + 2, 6, x + 11, 12, JACKET)
        frame(d, x + 2, 6, x + 11, 12, OUTLINE)
        rect(d, x + 3, 7, x + 10, 7, JACKET_HI)  # shoulder highlight
        rect(d, x + 6, 8, x + 7, 12, INK0)       # zipper
        # laptop under arm
        rect(d, x + 10, 9, x + 13, 11, AMBER)
        frame(d, x + 10, 9, x + 13, 11, AMBER_MID)
        # legs (walk frames)
        if f == 0:
            rect(d, x + 4, 13, x + 5, 16, PANTS)
            rect(d, x + 8, 13, x + 9, 15, PANTS)
            rect(d, x + 4, 17, x + 5, 17, BONE_DIM)
            rect(d, x + 8, 16, x + 9, 16, BONE_DIM)
        else:
            rect(d, x + 4, 13, x + 5, 15, PANTS)
            rect(d, x + 8, 13, x + 9, 16, PANTS)
            rect(d, x + 4, 16, x + 5, 16, BONE_DIM)
            rect(d, x + 8, 17, x + 9, 17, BONE_DIM)
    save(img, "sprite-avatar.png")


# ---- heap-towers.png (240x56, seamless horizontally) ----------------------
def heap_towers():
    w, h = 240, 56
    img, d = canvas(w, h)
    towers = [
        # (x, width, height, accent)
        (4, 26, 34, TEAL_DARK),
        (36, 20, 46, AMBER_DARK),
        (62, 30, 26, VIOLET_DARK),
        (98, 22, 40, TEAL_DARK),
        (126, 32, 30, AMBER_DARK),
        (164, 20, 50, VIOLET_DARK),
        (190, 28, 36, LIME_DARK),
        (224, 12, 24, TEAL_DARK)
    ]
    for tx, tw, th, accent in towers:
        y0 = h - th
        rect(d, tx, y0, tx + tw - 1, h - 1, INK1)
        frame(d, tx, y0, tx + tw - 1, h - 1, INK2)
        # roof accent
        rect(d, tx + 2, y0 - 1, tx + tw - 3, y0 - 1, accent)
        # window bits on a 4px grid
        for wx in range(tx + 3, tx + tw - 3, 4):
            for wy in range(y0 + 4, h - 4, 5):
                v = (wx * 7 + wy * 13) % 10
                if v < 3:
                    color = BONE_DIM
                elif v < 4:
                    color = accent
                else:
                    continue
                rect(d, wx, wy, wx + 1, wy, color)
    save(img, "heap-towers.png")


# ---- cartridge icons (20x20) ----------------------------------------------
def cartridge(name, accent, accent_mid, painter):
    w, h = 20, 20
    img, d = canvas(w, h)
    # cartridge shell
    rect(d, 1, 2, 18, 17, INK2)
    frame(d, 1, 2, 18, 17, OUTLINE)
    rect(d, 3, 0, 16, 2, INK2)
    frame(d, 3, 0, 16, 2, OUTLINE)
    # grip lines
    d.line([(3, 15), (16, 15)], fill=INK0)
    # label window
    rect(d, 4, 4, 15, 13, INK0)
    frame(d, 4, 4, 15, 13, accent_mid)
    painter(d, accent, accent_mid)
    save(img, f"cartridge-{name}.png")


def paint_qnt(d, accent, mid):
    # sparkline
    pts = [(5, 11), (7, 9), (9, 10), (11, 6), (13, 8), (14, 5)]
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i + 1]], fill=accent)
    rect(d, 14, 5, 14, 5, BONE)


def paint_sys(d, accent, mid):
    # memory chip
    rect(d, 7, 6, 12, 11, mid)
    frame(d, 7, 6, 12, 11, accent)
    for y in (7, 9, 11):
        rect(d, 5, y, 6, y, accent)
        rect(d, 13, y, 14, y, accent)
    rect(d, 9, 8, 10, 9, BONE)


def paint_pay(d, accent, mid):
    # payment card
    rect(d, 5, 6, 14, 12, mid)
    frame(d, 5, 6, 14, 12, accent)
    rect(d, 5, 8, 14, 9, INK0)   # magstripe
    rect(d, 6, 11, 8, 11, BONE)  # chip glint


def cartridges():
    cartridge("qnt", LIME, LIME_MID, paint_qnt)
    cartridge("sys", TEAL, TEAL_MID, paint_sys)
    cartridge("pay", AMBER, AMBER_MID, paint_pay)


# ---- contact sheet for visual QA ------------------------------------------
def contact_sheet():
    names = [
        "tile-memory.png", "module-cpu.png", "module-pay.png", "module-ml.png",
        "module-qnt.png", "module-sys.png", "sprite-packet.png", "sprite-avatar.png",
        "heap-towers.png", "cartridge-qnt.png", "cartridge-sys.png", "cartridge-pay.png"
    ]
    scale = 4
    pad = 12
    imgs = [(n, Image.open(f"{OUT}/{n}")) for n in names]
    row_w = sum(i.width * scale + pad for _, i in imgs[:8]) + pad
    sheet_w = max(row_w, imgs[8][1].width * scale + pad * 2 + 3 * (24 * scale + pad))
    sheet_h = pad + 56 * scale + pad + 60 * scale + pad
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (17, 16, 20, 255))
    x = pad
    for n, im in imgs[:8]:
        up = im.resize((im.width * scale, im.height * scale), Image.NEAREST)
        sheet.paste(up, (x, pad), up)
        x += up.width + pad
    x = pad
    y2 = pad + 56 * scale + pad
    for n, im in imgs[8:]:
        up = im.resize((im.width * scale, im.height * scale), Image.NEAREST)
        sheet.paste(up, (x, y2), up)
        x += up.width + pad
    sheet.save(f"{OUT}/_contact-sheet.png")
    print("_contact-sheet.png", sheet.size)


if __name__ == "__main__":
    tile_memory()
    module_cpu()
    module_pay()
    module_ml()
    module_qnt()
    module_sys()
    sprite_packet()
    sprite_avatar()
    heap_towers()
    cartridges()
    contact_sheet()


def favicon():
    """16x16 chip favicon -> public/favicon.png (copy manually if OUT differs)."""
    img, d = canvas(16, 16)
    for y in (4, 8, 12):
        rect(d, 0, y, 1, y, BONE_DIM)
        rect(d, 14, y, 15, y, BONE_DIM)
    rect(d, 2, 2, 13, 13, INK2)
    frame(d, 2, 2, 13, 13, AMBER)
    rect(d, 5, 5, 10, 10, INK0)
    frame(d, 5, 5, 10, 10, TEAL)
    rect(d, 7, 7, 8, 8, TEAL)
    img.save("public/favicon.png", optimize=True)
